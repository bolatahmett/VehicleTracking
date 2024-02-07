import { Passenger } from "../../model/Passenger";

const passengersOfTheShuttle = (state = [] as any, action: { type: any; passengersOfTheShuttle: Passenger[] }) => {
    switch (action.type) {
        case 'SET_PASSENGERS_OF_THE_SHUTTLE':
            return action.passengersOfTheShuttle;
        default:
            return state
    }
}

export default passengersOfTheShuttle;