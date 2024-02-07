import { ActiveShuttle } from "../../model/ActiveShuttle"
import { Driver } from "../../model/Driver"
import { Passenger } from "../../model/Passenger"
import { PassengerNotificationDistance } from "../../model/PassengerNotificationDistance"
import { PassengerShuttleAction } from "../../model/PassengerShuttleAction"
import { School } from "../../model/School"
import { Shuttle } from "../../model/Shuttle"
import { User } from "../../model/User"

export const userLogout = () => ({
    type: 'USER_LOGOUT'
})

export const addTrackCoordinate = (coordinate: any) => ({
    type: 'ADD_TRACK_COORDINATE',
    coordinate: coordinate
})

export const setSelectedShuttle = (shuttle: Shuttle) => ({
    type: 'SET_SELECTED_SHUTTLE',
    shuttle: shuttle
})

export const setShuttleItems = (items: Shuttle[]) => ({
    type: 'SET_SHUTTLE_ITEMS',
    items: items
})

export const setActiveShuttle = (items: Shuttle[]) => ({
    type: 'SET_ACTIVE_SHUTTLE_ITEMS',
    items: items
})

export const setSchool = (school: School) => ({
    type: 'SET_SELECTED_SCHOOL',
    school: school
})

export const setDriver = (driver: Driver) => ({
    type: 'SET_SELECTED_DRIVER',
    driver: driver
})

export const setDriverItems = (drivers: Driver[]) => ({
    type: 'SET_DRIVER_ITEMS',
    items: drivers
})

export const setShuttleStatus = (isShuttleStarted: boolean) => ({
    type: 'SET_SHUTTLE_STATUS',
    isShuttleStarted: isShuttleStarted
})

export const setPassengersOfTheShuttle = (passengersOfTheShuttle: Passenger[]) => ({
    type: 'SET_PASSENGERS_OF_THE_SHUTTLE',
    passengersOfTheShuttle: passengersOfTheShuttle
})

// starting shuttle detail
export const setShuttleDetail = (item: any) => ({
    type: 'SHUTTLE_DETAIL',
    shuttleDetail: item
})

export const setNextPassenger = (item: Passenger) => ({
    type: 'SET_NEXT_PASSENGER',
    nextPassenger: item
})

export const setPassengerShuttleActions = (item: PassengerShuttleAction) => ({
    type: 'SET_PASSENGER_SHUTTLE_ACTION',
    passengerShuttleAction: item
})

export const showMessage = (message: any) => ({
    type: 'SHOW_MESSAGE',
    message: message
})

export const addPassengerNotficationDistance = (item: PassengerNotificationDistance) => ({
    type: 'ADD_PASSENGER_NOTIFICATION_DISTANCE',
    item: item,
})

export const setInactivePassengers = (inactivePassengers: Passenger[]) => ({
    type: 'SET_INACTIVE_PASSENGERS',
    inactivePassengers: inactivePassengers
})

export const setUser = (user: User) => ({
    type: 'SET_SELECTED_USER',
    user: user
})