import { deleteItemOnDb, getTableItems, getTableItemsWithPath, getTableItemWithId, updateItemOnDb } from "../dto/ServerHelper";
import { ShuttleRoute } from "../model/ShuttleRoute";
import { Passenger } from "../model/Passenger";
import moment from "moment";
import { Shuttle } from "../model/Shuttle";
import { database } from "../dto/FireBaseDB";
import { get, limitToFirst, query, ref, update } from "firebase/database";
import * as turf from '@turf/turf';

const updateShuttleTimes = () => {

    getTableItems(`Shuttle`).then((shuttle: any) => {
        shuttle.forEach((element: any) => {

            get(query(ref(database, `/ShuttleBaseTrackRoute/${element["Id"]}`), limitToFirst(1)))
                .then((snapshot) => {

                    var result = snapshot.val();

                    if (result) {

                        const keyOfObj = Object.keys(result);
                        if (keyOfObj) {

                            let updates = {} as any;

                            updates[`/Shuttle/${element["Id"]}/ShuttleTime`] = moment(result[keyOfObj[0]]["Datetime"]).format('HH:mm');
                            update(ref(database), updates);
                        }
                    }

                });

        });

    })

}

const updateOneShuttleTimes = (shuttleId: string) => {

    get(query(ref(database, `/ShuttleBaseTrackRoute/${shuttleId}`), limitToFirst(1)))
        .then((snapshot) => {

            var result = snapshot.val();

            if (result) {

                const keyOfObj = Object.keys(result);
                if (keyOfObj) {

                    let updates = {} as any;
                    updates[`/Shuttle/${shuttleId}/ShuttleTime`] = moment(result[keyOfObj[0]]["Datetime"]).format('HH:mm');
                    update(ref(database), updates);
                }
            }

        });

}

const updatePassengerCounts = () => {

    getTableItemsWithPath("/Passenger").then(passengerItemsResult => {

        // eslint-disable-next-line prefer-const
        let newArray = [] as any[];
        if (passengerItemsResult) {
            const keyOfObj = Object.keys(passengerItemsResult);
            keyOfObj.forEach(element => {
                newArray.push(passengerItemsResult[element])
            })
        }

        const groupBy = function (xs: any[], key: string) {
            return xs.reduce(function (rv, x) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        };

        const groubedByOrg = groupBy(newArray, 'Organisation')

        const keyOfGroubedByOrg = Object.keys(groubedByOrg);
        keyOfGroubedByOrg.forEach((item: any) => {

            const passengerCount = {
                Organisation: item,
                Count: groubedByOrg[item].length
            };

            updateItemOnDb("PassengerCount", passengerCount, item)
        })

    })
}

const updatePassengerCoordinates = (shuttleId: string, currentDate: string) => {

    const updatedPassenger = {} as any;

    getTableItemsWithPath(`/ShuttleBaseTrackRoute/${shuttleId}`).then((response: any) => {

        if (!response) {
            return;
        }

        // eslint-disable-next-line prefer-const
        let keyOfObj = Object.keys(response);
        const shuttleRouteResult = [] as ShuttleRoute[];
        keyOfObj.forEach(element => {
            const shuttleRoute = response[element] as ShuttleRoute;
            shuttleRouteResult.push(shuttleRoute)
        })

        getTableItemsWithPath(`/Shuttle/${shuttleId}/Passengers`).then((passengerResponse: any) => {

            const passengerItems = passengerResponse.split(",");
            passengerItems.forEach((passenger: any) => {

                getTableItemsWithPath(`/PassengerShuttleAction/${passenger}/${shuttleId}/${currentDate}/${shuttleRouteResult[0].ExpeditionId}/3`).then((actionResponse) => {

                    const gotOnToBusTime = actionResponse["DateTime"];

                    shuttleRouteResult.filter((routeItem: ShuttleRoute) => {
                        if (!updatedPassenger[passenger] && moment(routeItem.Datetime).isBetween(moment(gotOnToBusTime).add(-10, "second"), moment(gotOnToBusTime).add(10, "second"))) {
                            updatedPassenger[passenger] = true;
                            getTableItemWithId<Passenger>("Passenger", passenger).then((passengerItem: Passenger) => {
                                passengerItem.Latitude = routeItem.Latitude;
                                passengerItem.Longitude = routeItem.Longitude;
                                const from = turf.point([passengerItem.Latitude, passengerItem.Longitude]);
                                const to = turf.point([routeItem.Latitude, routeItem.Longitude]);

                                var distanceToLine = turf.distance(from, to, { units: 'meters' });

                                if (distanceToLine > 100) {
                                    console.log(distanceToLine)
                                    console.log(passengerItem);
                                }
                            })
                        }
                    })
                })
            });
        })
    })

}

const updateOnePassengerCoordinates = () => {

    const currentDate = "20221219";
    const shuttleId = "ANTAKYA3-31S0276"
    const passengerId = "MERICS43729";
    const updatedPassenger = {} as any;


    getTableItemsWithPath(`/ShuttleRoute/${shuttleId}/${currentDate}`).then((response: any) => {

        if (!response) {
            return;
        }

        // eslint-disable-next-line prefer-const
        let keyOfObj = Object.keys(response);
        const shuttleRouteResult = [] as ShuttleRoute[];
        keyOfObj.forEach(element => {
            const shuttleRoute = response[element] as ShuttleRoute;
            shuttleRouteResult.push(shuttleRoute)
        })

        getTableItemsWithPath(`/PassengerShuttleAction/${passengerId}/${shuttleId}/${currentDate}/${shuttleRouteResult[0].ExpeditionId}/3`).then((actionResponse) => {

            console.log(actionResponse)
            const gotOnToBusTime = actionResponse["DateTime"];

            shuttleRouteResult.filter((routeItem: ShuttleRoute) => {
                if (!updatedPassenger[passengerId] && moment(routeItem.Datetime).isBetween(moment(gotOnToBusTime).add(-10, "second"), moment(gotOnToBusTime).add(10, "second"))) {
                    updatedPassenger[passengerId] = true;
                    getTableItemWithId<Passenger>("Passenger", passengerId).then((passengerItem: Passenger) => {
                        passengerItem.Latitude = routeItem.Latitude;
                        passengerItem.Longitude = routeItem.Longitude;

                        updateItemOnDb("Passenger", passengerItem, passengerId);

                    })

                }
            })

        })
    })

}

const orderPassengerFromRoute = () => {

    getTableItems(`Shuttle`).then((shuttle: any) => {
        shuttle.forEach((element: any) => {

            const currentDate = moment().add(-1, "day").format('YYYYMMDD');
            const shuttleId = element["Id"];

            // const currentDate = "20221205";
            // const shuttleId = "R-ANTAKYA11-31S9144"
            // const updatedPassenger = {} as any;

            getTableItemsWithPath(`/ShuttleRoute/${shuttleId}/${currentDate}`).then((response: any) => {

                if (response) {

                    const keyOfObj = Object.keys(response);
                    const shuttleRouteItems = [] as ShuttleRoute[];
                    keyOfObj.forEach(element => {
                        let shuttleRoute = response[element] as ShuttleRoute;
                        shuttleRoute.Id = element;
                        if (shuttleRoute.Speed < 15) {
                            shuttleRouteItems.push(shuttleRoute);
                        }
                    });

                    getTableItemsWithPath(`/Shuttle/${shuttleId}/Passengers`).then((passengerResponse: any) => {
                        let promiseArray2: any[] = [];
                        const passengerItems = passengerResponse.split(",");
                        passengerItems.forEach((passenger: any) => {
                            const p1 = getTableItemWithId<Passenger>("Passenger", passenger);
                            promiseArray2.push(p1);
                        });

                        Promise.all(promiseArray2).then((passengerResult: Passenger[]) => {

                            const pointAndPassenger: any[] = [];
                            passengerResult.forEach(passengerItem => {
                                shuttleRouteItems.forEach((shuttleRouteItem: ShuttleRoute) => {

                                    const from = turf.point([passengerItem.Latitude, passengerItem.Longitude]);
                                    const to = turf.point([shuttleRouteItem.Latitude, shuttleRouteItem.Longitude]);

                                    shuttleRouteItem.DistanceToLine = turf.distance(from, to, { units: 'meters' });

                                });

                                shuttleRouteItems.sort((a, b) => a.DistanceToLine - b.DistanceToLine);

                                const newItem = {
                                    DateTime: shuttleRouteItems[0].Datetime,
                                    PassengerInfo: passengerItem
                                };

                                pointAndPassenger.push(newItem);

                            });

                            console.log(pointAndPassenger)
                            const resultOrder = pointAndPassenger.sort((a, b) => moment(a.DateTime).diff(moment(b.DateTime))).map((x) => x.PassengerInfo.Id);
                            console.log(resultOrder.join(","));
                            console.log(passengerResponse);

                            if (passengerResponse === resultOrder.join(",")) {
                                console.log("Correct")
                            } else {
                                console.log("Incorrect")
                            }


                        });

                    })

                }

            });
        });
    });
}

const orderPassengerFromRouteForOneShuttle = (shuttleId: string, setNewOrder: any, setOrderCheckResult: any) => {
    const currentDate = moment().format('YYYYMMDD');
    getTableItemsWithPath(`/Shuttle/${shuttleId}/Passengers`).then((passengerResponse: any) => {
        let promiseArray2: any[] = [];
        const passengerItems = passengerResponse.split(",");
        passengerItems.forEach((passenger: any) => {
            const p1 = getTableItemsWithPath(`/PassengerShuttleAction/${passenger}/${shuttleId}/${currentDate}`);
            promiseArray2.push(p1);
        });

        Promise.all(promiseArray2).then((shuttleActionResult: any[]) => {
            const pointAndPassenger: any[] = [];

            shuttleActionResult.forEach((shuttleActionResultItem: any) => {

                const keyOfObj = shuttleActionResultItem && Object.keys(shuttleActionResultItem);
                if (keyOfObj) {

                    let newItem = {
                        DateTime: shuttleActionResultItem[keyOfObj[0]]["5"]["DateTime"],
                        PassengerInfo: shuttleActionResultItem[keyOfObj[0]]["5"]["PassengerId"]
                    };

                    if (shuttleId.startsWith("R-")) {
                        if (shuttleActionResultItem[keyOfObj[0]]["4"]) {
                            newItem = {
                                DateTime: shuttleActionResultItem[keyOfObj[0]]["3"]["DateTime"],
                                PassengerInfo: shuttleActionResultItem[keyOfObj[0]]["3"]["PassengerId"]
                            };
                        }
                    } else {
                        if (shuttleActionResultItem[keyOfObj[0]]["3"]) {
                            newItem = {
                                DateTime: shuttleActionResultItem[keyOfObj[0]]["3"]["DateTime"],
                                PassengerInfo: shuttleActionResultItem[keyOfObj[0]]["3"]["PassengerId"]
                            };
                        } else if (shuttleActionResultItem[keyOfObj[0]]["4"]) {
                            newItem = {
                                DateTime: shuttleActionResultItem[keyOfObj[0]]["4"]["DateTime"],
                                PassengerInfo: shuttleActionResultItem[keyOfObj[0]]["4"]["PassengerId"]
                            };
                        }
                    }

                    pointAndPassenger.push(newItem);
                }

            });

            const resultOrder = pointAndPassenger.sort((a, b) => moment(a.DateTime).diff(moment(b.DateTime))).map((x) => x.PassengerInfo);
            console.log(pointAndPassenger);
            if (passengerResponse === resultOrder.join(",")) {
                setOrderCheckResult(1);
                setNewOrder([]);
            } else {
                setOrderCheckResult(2);
                setNewOrder(resultOrder);
            }
        });
    })
}

export { orderPassengerFromRoute, updateOnePassengerCoordinates, updateShuttleTimes, updatePassengerCoordinates, updateOneShuttleTimes, orderPassengerFromRouteForOneShuttle };