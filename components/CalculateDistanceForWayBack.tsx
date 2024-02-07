import { getPreciseDistance } from "geolib";
import moment from "moment";
import { updateItemOnDbWithPath } from "../dto/ServerHelper";
import calculateNextPassengerInfo from "../helper/calculateNextPassengerInfo";
import externalNotificationHelper from "../helper/externalNotificationHelper";
import { Passenger } from "../model/Passenger";
import { PassengerShuttleAction } from "../model/PassengerShuttleAction";
import { School } from "../model/School";
import { Shuttle } from "../model/Shuttle";
import SendMessageForBack from "./SendMessageForBack";

let sentMessageOnDoor: string[] = [];
let sentMessageTypeClosest: string[] = [];

let isAwayFromSchool: any = {};

const CalculateDistanceForWayBack = (
    props: {
        passengerShuttleActions: PassengerShuttleAction[],
        passengersOfTheShuttle: Passenger[],
        setPassengerShuttleActions: any,
        selectedShuttle: Shuttle,
        showMessage: any
        selectedSchool: School
    },
    coords: any, //.longitude .latitude,
    shuttleDetail: any,
    getPassengerDistance: (passenger: Passenger) => number,
    setNextPassenger: any) => {

    const canCalculate = props.passengerShuttleActions && props.passengerShuttleActions.length > 0;
    if (!canCalculate)
        return;

    const calculate1000 = props.passengerShuttleActions.filter((item: PassengerShuttleAction) => item.PassengerStatus === 2);
    const willBeAtTheDoorSoon = props.passengerShuttleActions.filter((item: PassengerShuttleAction) => item.PassengerStatus === 3);

    if (calculate1000 && calculate1000.length > 0) {
        const passenger = props.passengersOfTheShuttle.find(x => x.Id === calculate1000[0].PassengerId);
        if (passenger) {

            let prevPassenger: Passenger | any = undefined;
            let totalPdis = 0;
            willBeAtTheDoorSoon.forEach((item: PassengerShuttleAction, index: number) => {

                const passengerCalculate = props.passengersOfTheShuttle.find(x => x.Id === item.PassengerId) as Passenger;

                if (index === 0) {

                    totalPdis = getPreciseDistance(
                        { latitude: coords.latitude, longitude: coords.longitude },
                        { latitude: passengerCalculate.Latitude, longitude: passengerCalculate.Longitude }
                    );
                } else {
                    totalPdis = getPreciseDistance(
                        { latitude: prevPassenger.Latitude, longitude: prevPassenger.Longitude },
                        { latitude: passengerCalculate.Latitude, longitude: passengerCalculate.Longitude }
                    ) + totalPdis;
                }

                prevPassenger = passengerCalculate;

            })

            if (prevPassenger) {
                totalPdis = totalPdis + getPreciseDistance(
                    { latitude: prevPassenger.Latitude, longitude: prevPassenger.Longitude },
                    { latitude: passenger.Latitude, longitude: passenger.Longitude }
                );
            } else {
                totalPdis = getPreciseDistance(
                    { latitude: coords.latitude, longitude: coords.longitude },
                    { latitude: passenger.Latitude, longitude: passenger.Longitude }
                );
            }

            if (totalPdis < getPassengerDistance(passenger)) {
                if (sentMessageTypeClosest.find((sentItem) => { if (`${passenger.Id}-${shuttleDetail.expeditionId}` === sentItem) { return sentItem } }) === undefined) {

                    sentMessageTypeClosest.push(`${passenger.Id}-${shuttleDetail.expeditionId}`)

                    const id = props.selectedShuttle!.Id + "-" + shuttleDetail.expeditionId + "-" + passenger!.Id + "-" + 3;
                    const item = {
                        PassengerId: passenger.Id,
                        ShuttleId: props.selectedShuttle?.Id,
                        ExpeditionId: shuttleDetail.expeditionId,
                        DriverId: "",
                        StartedTime: "",
                        EndedTime: "",
                        PassengerStatus: 3,
                        DateTime: new Date().toLocaleString(),
                        Status: "N",
                        Id: id
                    } as PassengerShuttleAction
                    props.setPassengerShuttleActions(item);

                    const currentDate = moment(new Date()).format('YYYYMMDD')
                    updateItemOnDbWithPath(`/${"PassengerShuttleAction"}/${passenger!.Id}/${props.selectedShuttle!.Id}/${currentDate}/${shuttleDetail.expeditionId}/${3}`, item);

                    externalNotificationHelper(3, passenger, props.selectedShuttle)

                    props.showMessage(`${passenger.PassengerName} için "Servis kısa sürede kapıda olacaktır." mesajı gönderildi!`)
                }
            }
        }
    }


    // const calculate100 = props.passengerShuttleActions.filter((item: PassengerShuttleAction) => item.PassengerStatus === 3);
    // if (calculate100 && calculate100.length > 0) {
    //     const passenger = props.passengersOfTheShuttle.find(x => x.Id === calculate100[0].PassengerId);
    //     if (passenger) {

    //         var pdis = getPreciseDistance(
    //             { latitude: coords.latitude, longitude: coords.longitude },
    //             { latitude: passenger.Latitude, longitude: passenger.Longitude }
    //         );

    //         // const speed = parseFloat((Math.round(coords.speed * 3.6 * 100) / 100).toFixed(2));
    //         // if (pdis < 100 && speed < 10) {
    //         //     if (sentMessageOnDoor.find((sentItem) => { if (`${passenger.Id}-${shuttleDetail.expeditionId}` === sentItem) { return sentItem } }) === undefined) {

    //         //         sentMessageOnDoor.push(`${passenger.Id}-${shuttleDetail.expeditionId}`)
    //         //         props.showMessage(`${passenger.PassengerName} için "Öğrenci indi" mesajı gönderildi.`);

    //         //         const id = props.selectedShuttle!.Id + "-" + shuttleDetail.expeditionId + "-" + passenger!.Id + "-" + 4;
    //         //         const item = {
    //         //             PassengerId: passenger.Id,
    //         //             ShuttleId: props.selectedShuttle?.Id,
    //         //             ExpeditionId: shuttleDetail.expeditionId,
    //         //             DriverId: "",
    //         //             StartedTime: "",
    //         //             EndedTime: "",
    //         //             PassengerStatus: 4,
    //         //             DateTime: new Date().toLocaleString(),
    //         //             Status: "N",
    //         //             Id: id
    //         //         } as PassengerShuttleAction

    //         //         props.setPassengerShuttleActions(item);

    //         //         const currentDate = moment().format('YYYYMMDD')
    //         //         updateItemOnDbWithPath(`/${"PassengerShuttleAction"}/${passenger!.Id}/${props.selectedShuttle!.Id}/${currentDate}/${shuttleDetail.expeditionId}/${4}`, item);

    //         //         calculateNextPassengerInfo(passenger!.Id, props.passengersOfTheShuttle, setNextPassenger, props.setPassengerShuttleActions, "Dönüş");

    //         //     }
    //         // }
    //     }

    // }

    if (!isAwayFromSchool[shuttleDetail.expeditionId]) {

        var pdis = getPreciseDistance(
            { latitude: coords.latitude, longitude: coords.longitude },
            { latitude: props.selectedSchool.Latitude, longitude: props.selectedSchool.Longitude }
        );

        if (pdis > 150) {
            isAwayFromSchool[shuttleDetail.expeditionId] = true;
            SendMessageForBack(props, {
                shuttleStatus: 2,
                expeditionId: shuttleDetail.expeditionId,
                startedTime: shuttleDetail.startedTime,
                endedTime: moment(Date.now()).format('DD-MMM-YYYY HH:mm:ss'),
                DateTime: moment(Date.now()).format('DD-MMM-YYYY HH:mm:ss'),
            });

            props.showMessage(`"Servis okuldan çıktı" mesajı gönderildi.`)

        }
    }

}

export default CalculateDistanceForWayBack;