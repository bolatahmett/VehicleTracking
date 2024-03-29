export interface PassengerBase {
    Id: string,
    Organisation: string,
    PassengerName: string,
    Guardian: string,
    GuardianNumber: string,
    IsLogedin: string,
    UserName: string,
    Password: string,
    Status: string,
    ImageUrl: string,
    Address: string,
    Latitude: number,
    Longitude: number,
    SMS: boolean,
    Call: boolean,
    ActionNotification: any,
    IsNotificationsEnabled: boolean;
}