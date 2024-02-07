import { getTableItemsWithPath } from "../dto/ServerHelper";
import { ShuttleRoute } from "../model/ShuttleRoute";


const prepareShuttleBaseTrackRoute = (selectedShuttleId: string) => {
    getTableItemsWithPath(`/ShuttleBaseTrackRoute/${selectedShuttleId}`).then((response: any) => {

        if (response) {

            var keyOfObj = Object.keys(response);
            const result = [] as number[][];
            keyOfObj.forEach(element => {
                var shuttleRoute = response[element] as ShuttleRoute;

                const coordinates = [
                    shuttleRoute.Latitude,
                    shuttleRoute.Longitude,
                ];

                result.push(coordinates)

            })

            ///@ts-ignore
            setBaseRouteCoordinates(result.map((coor) => {
                return { latitude: coor[0], longitude: coor[1] }
            }));
        }

    });
}

export default prepareShuttleBaseTrackRoute;

