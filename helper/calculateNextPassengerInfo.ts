import { Passenger } from "../model/Passenger";
import { PassengerShuttleAction } from "../model/PassengerShuttleAction";

function calculateNextPassengerInfo(passengerId: string,
    passengersOfTheShuttle: Passenger[],
    setNextPassenger: any,
    passengerShuttleActions: PassengerShuttleAction[],
    direction: string,
    index: number = 0) {

    if (index < passengersOfTheShuttle.length) {
        console.log(index)
        if (canBeNextPassengerInfo(passengersOfTheShuttle[index], passengerShuttleActions, direction)) {
            setNextPassenger(passengersOfTheShuttle[index]);
        } else {
            if (index + 1 < passengersOfTheShuttle.length) {
                calculateNextPassengerInfo(passengersOfTheShuttle[index + 1].Id, passengersOfTheShuttle, setNextPassenger, passengerShuttleActions, direction, index + 1)
            } else {
                setNextPassenger(null);
            }
        }

    } else {
        setNextPassenger(null);
    }
}

const canBeNextPassengerInfo = (passenger: Passenger, passengerShuttleActions: PassengerShuttleAction[], direction: string) => {

    let controlStatus = direction === "Gidiş" ? 3 : 4;

    if (passengerShuttleActions && passengerShuttleActions.length > 0) {
        const temp = passengerShuttleActions.find((item: PassengerShuttleAction) => { return item.PassengerId === passenger.Id }) as PassengerShuttleAction;
        console.log(temp)
        if (temp.PassengerStatus < controlStatus) {
            if (direction === "Dönüş" && temp.PassengerStatus === 1) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

export default calculateNextPassengerInfo;