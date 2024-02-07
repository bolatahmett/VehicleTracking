import { Passenger } from "../../model/Passenger";

const inactivePassengers = (state = [] as any, action: { type: any; inactivePassengers: Passenger[] }) => {
    switch (action.type) {
        case 'SET_INACTIVE_PASSENGERS':
            return action.inactivePassengers;
        default:
            return state
    }
}

export default inactivePassengers;