import { PassengerShuttleAction } from "../../model/PassengerShuttleAction";

const passengerShuttleActions = (state = [] as PassengerShuttleAction[], action: { type: any; passengerShuttleAction: PassengerShuttleAction }) => {
    if (action.type === 'SET_PASSENGER_SHUTTLE_ACTION') {

        if (action.passengerShuttleAction === undefined) {
            state = [] as PassengerShuttleAction[];
            return state;
        }

        const index = state.findIndex(x => x.PassengerId === action.passengerShuttleAction.PassengerId);
        if (index > -1) {
            state[index] = action.passengerShuttleAction;
        } else {
            state.push(action.passengerShuttleAction)
        }
    }
    return state
}

export default passengerShuttleActions;