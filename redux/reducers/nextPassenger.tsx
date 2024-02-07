import { Passenger } from "../../model/Passenger";

const nextPassenger = (state = null, action: { type: any; nextPassenger: Passenger }) => {
    switch (action.type) {
        case 'SET_NEXT_PASSENGER':
            return action.nextPassenger;
        default:
            return state
    }
}

export default nextPassenger;