import moment from "moment";
import { insertItemOnDb, updateItemOnDb, updateItemOnDbWithPath } from "../dto/ServerHelper";
import { Passenger } from "../model/Passenger";
import { PassengerShuttleAction } from "../model/PassengerShuttleAction";

const SendMessage = (props: any, shuttleDetailItem: any) => {
    props.passengersOfTheShuttle.forEach((itemPassenger: Passenger) => {

        const id = props.selectedShuttle!.Id + "-" + shuttleDetailItem.expeditionId + "-" + itemPassenger!.Id + "-" + shuttleDetailItem.shuttleStatus;

        const item = {
            PassengerId: itemPassenger.Id,
            ShuttleId: props.selectedShuttle.Id,
            ExpeditionId: shuttleDetailItem.expeditionId,
            DriverId: props.selectedShuttle.DriverId,
            StartedTime: shuttleDetailItem.startedTime,
            EndedTime: shuttleDetailItem.endedTime,
            PassengerStatus: shuttleDetailItem.shuttleStatus,
            DateTime: shuttleDetailItem.DateTime,
            Status: "N",
            Id: id
        } as PassengerShuttleAction
        props.setPassengerShuttleActions(item);

        const currentDate = moment(new Date()).format('YYYYMMDD')
        updateItemOnDbWithPath(`/${"PassengerShuttleAction"}/${itemPassenger!.Id}/${props.selectedShuttle!.Id}/${currentDate}/${shuttleDetailItem.expeditionId}/${shuttleDetailItem.shuttleStatus}`, item);

    });
}

export default SendMessage;