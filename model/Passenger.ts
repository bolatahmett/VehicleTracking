import { PassengerBase } from "./PassengerBase";
import { ShuttlePassengerLink } from "./ShuttlePassengerLink";

export interface Passenger extends PassengerBase {
    ShuttleId: string;
}