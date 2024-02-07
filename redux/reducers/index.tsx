import { combineReducers } from 'redux'
import { userLogout } from '../actions/actions';
import addTrackCoordinate from './addTrackCoordinate';
import driverItems from './driverItems';
import inactivePassengers from './inactivePassengers';
import isShuttleStarted from './isShuttleStarted';
import nextPassenger from './nextPassenger';
import passengerNotificationDistance from './passengerNotificationDistance';
import passengerShuttleActions from './passengerShuttleActions';
import passengersOfTheShuttle from './passengersOfTheShuttle';
import selectedDriver from './selectedDriver';
import selectedSchool from './selectedSchool';
import selectedShuttle from './selectedShuttle';
import selectedUser from './selectedUser';
import shuttleActiveItems from './shuttleActiveItems';
import shuttleDetail from './shuttleDetail';
import shuttleItems from './shuttleItems';
import userMessage from './userMessage';

const appReducer = combineReducers({
    userLogout,
    addTrackCoordinate,
    selectedShuttle,
    selectedSchool,
    selectedDriver,
    isShuttleStarted,
    passengersOfTheShuttle,
    shuttleDetail,
    nextPassenger,
    passengerShuttleActions,
    userMessage,
    passengerNotificationDistance,
    inactivePassengers,
    selectedUser,
    shuttleItems,
    shuttleActiveItems,
    driverItems,
});

const rootReducer = (
    state: ReturnType<typeof appReducer>,
    action: any
) => {
    if (action.type === "USER_LOGOUT") {
        return appReducer(undefined, { type: undefined } as unknown as any);
    }

    return appReducer(state, action);
};

export default rootReducer;