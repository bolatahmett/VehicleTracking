import { PassengerNotificationDistance } from "../../model/PassengerNotificationDistance";

const passengerNotificationDistance = (state = [] as any, action: { type: any; item: PassengerNotificationDistance }) => {

    if (action.type === 'ADD_PASSENGER_NOTIFICATION_DISTANCE') {
        state.push(action.item)
    }

    return state
}

export default passengerNotificationDistance;
