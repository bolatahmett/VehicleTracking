import { getPreciseDistance } from "geolib";
import moment from "moment";
import { useState } from "react";
import { updateItemOnDbWithPath } from "../dto/ServerHelper";
import externalNotificationHelper from "../helper/externalNotificationHelper";
import sendSms from "../helper/smshelper";
import { Passenger } from "../model/Passenger";
import { PassengerShuttleAction } from "../model/PassengerShuttleAction";
import { School } from "../model/School";
import { Shuttle } from "../model/Shuttle";
import AskToTheDriverPassengerStatus from "./AskToTheDriverPassengerStatus";
import PlaySound from "./PlaySound";
import SendMessage from "./SendMessage";

let sentMessageOnDoor: string[] = [];
let sentMessageTypeClosest: string[] = [];

let isClosedToSchool: any = {};

const CalculateDistance = (
    props: {
        passengerShuttleActions: PassengerShuttleAction[],
        passengersOfTheShuttle: Passenger[],
        setPassengerShuttleActions: any,
        selectedShuttle: Shuttle,
        showMessage: any
        selectedSchool: School
    },
    coords: any, //.longitude .latitude,
    shuttleDetail: any,
    setDriverAnswer: any,
    setModalContent: any,
    getPassengerDistance: (passenger: Passenger) => number) => {


    const canCalculate = props.passengerShuttleActions && props.passengerShuttleActions.length > 0 && props.passengerShuttleActions.filter((item: PassengerShuttleAction) => item.PassengerStatus < 2);
    if (!canCalculate)
        return;

    const calculate1000 = props.passengerShuttleActions.filter((item: PassengerShuttleAction) => item.PassengerStatus === 0);
    const willBeAtTheDoorSoon = props.passengerShuttleActions.filter((item: PassengerShuttleAction) => item.PassengerStatus === 1);

    if (calculate1000 && calculate1000.length > 0 && willBeAtTheDoorSoon.length < 5) {
        const passenger = props.passengersOfTheShuttle.find(x => x.Id === calculate1000[0].PassengerId);

        if (passenger) {
            let prevPassenger: Passenger | any = undefined;
            let totalPdis = 0;
            willBeAtTheDoorSoon.forEach((item: PassengerShuttleAction, index: number) => {

                const passengerCalculate = props.passengersOfTheShuttle.find(x => x.Id === item.PassengerId) as Passenger;

                if (index === 0) {

                    totalPdis = getPreciseDistance(
                        { latitude: coords.latitude, longitude: coords.longitude },
                        { latitude: passengerCalculate.Latitude, longitude: passengerCalculate.Longitude }
                    );
                } else {
                    totalPdis = getPreciseDistance(
                        { latitude: prevPassenger.Latitude, longitude: prevPassenger.Longitude },
                        { latitude: passengerCalculate.Latitude, longitude: passengerCalculate.Longitude }
                    ) + totalPdis;
                }

                prevPassenger = passengerCalculate;

            })

            if (prevPassenger) {
                totalPdis = totalPdis + getPreciseDistance(
                    { latitude: prevPassenger.Latitude, longitude: prevPassenger.Longitude },
                    { latitude: passenger.Latitude, longitude: passenger.Longitude }
                );
            } else {
                totalPdis = getPreciseDistance(
                    { latitude: coords.latitude, longitude: coords.longitude },
                    { latitude: passenger.Latitude, longitude: passenger.Longitude }
                );
            }

            if (totalPdis < getPassengerDistance(passenger)) {
                if (sentMessageTypeClosest.find((sentItem) => { if (`${passenger.Id}-${shuttleDetail.expeditionId}` === sentItem) { return sentItem } }) === undefined) {

                    sentMessageTypeClosest.push(`${passenger.Id}-${shuttleDetail.expeditionId}`)

                    const id = props.selectedShuttle!.Id + "-" + shuttleDetail.expeditionId + "-" + passenger!.Id + "-" + 1;
                    const item = {
                        PassengerId: passenger.Id,
                        ShuttleId: props.selectedShuttle?.Id,
                        ExpeditionId: shuttleDetail.expeditionId,
                        DriverId: "",
                        StartedTime: "",
                        EndedTime: "",
                        PassengerStatus: 1,
                        DateTime: new Date().toLocaleString(),
                        Status: "N",
                        Id: id
                    } as PassengerShuttleAction

                    props.setPassengerShuttleActions(item);

                    const currentDate = moment(new Date()).format('YYYYMMDD')
                    updateItemOnDbWithPath(`/${"PassengerShuttleAction"}/${passenger!.Id}/${props.selectedShuttle!.Id}/${currentDate}/${shuttleDetail.expeditionId}/${1}`, item);

                    externalNotificationHelper(1, passenger, props.selectedShuttle)

                    props.showMessage(`${passenger.PassengerName} için "Servis kısa sürede kapıda olacaktır." mesajı gönderildi!`)
                }
            }
        }

    }

    const calculate100 = props.passengerShuttleActions.filter((item: PassengerShuttleAction) => item.PassengerStatus === 1);
    if (calculate100 && calculate100.length > 0) {
        const passenger = props.passengersOfTheShuttle.find(x => x.Id === calculate100[0].PassengerId);
        if (passenger) {

            var pdis = getPreciseDistance(
                { latitude: coords.latitude, longitude: coords.longitude },
                { latitude: passenger.Latitude, longitude: passenger.Longitude }
            );

            const speed = parseFloat((Math.round(coords.speed * 3.6 * 100) / 100).toFixed(2));
            if (pdis < 100 && speed < 15) {
                if (sentMessageOnDoor.find((sentItem) => { if (`${passenger.Id}-${shuttleDetail.expeditionId}` === sentItem) { return sentItem } }) === undefined) {

                    sentMessageOnDoor.push(`${passenger.Id}-${shuttleDetail.expeditionId}`)

                    const id = props.selectedShuttle!.Id + "-" + shuttleDetail.expeditionId + "-" + passenger!.Id + "-" + 2;
                    const item = {
                        PassengerId: passenger.Id,
                        ShuttleId: props.selectedShuttle?.Id,
                        ExpeditionId: shuttleDetail.expeditionId,
                        DriverId: "",
                        StartedTime: "",
                        EndedTime: "",
                        PassengerStatus: 2,
                        DateTime: new Date().toLocaleString(),
                        Status: "N",
                        Id: id
                    } as PassengerShuttleAction

                    props.setPassengerShuttleActions(item);

                    const currentDate = moment(new Date()).format('YYYYMMDD')
                    updateItemOnDbWithPath(`/${"PassengerShuttleAction"}/${passenger!.Id}/${props.selectedShuttle!.Id}/${currentDate}/${shuttleDetail.expeditionId}/${2}`, item);

                    externalNotificationHelper(2, passenger, props.selectedShuttle)

                    props.showMessage(`${passenger.PassengerName} için "Servis kapıda" mesajı gönderildi!`);

                    if ((props.selectedShuttle as Shuttle).Direction === "Gidiş") {
                        AskToTheDriverPassengerStatus(item, props.passengersOfTheShuttle, setDriverAnswer, setModalContent);
                    }

                }
            }
        }

    }

    if (!isClosedToSchool[shuttleDetail.expeditionId]) {

        var pdis = getPreciseDistance(
            { latitude: coords.latitude, longitude: coords.longitude },
            { latitude: props.selectedSchool.Latitude, longitude: props.selectedSchool.Longitude }
        );

        if (pdis < 150) {
            isClosedToSchool[shuttleDetail.expeditionId] = true;
            SendMessage(props, {
                shuttleStatus: 5,
                expeditionId: shuttleDetail.expeditionId,
                startedTime: shuttleDetail.startedTime,
                endedTime: moment(Date.now()).format('DD-MMM-YYYY HH:mm:ss'),
                DateTime: moment(Date.now()).format('DD-MMM-YYYY HH:mm:ss'),
            });

            props.passengerShuttleActions.forEach((passengerShuttleAction: PassengerShuttleAction) => {
                if (passengerShuttleAction.PassengerStatus === 3) {
                    const passenger = props.passengersOfTheShuttle.find((passenger: Passenger) => passenger.Id === passengerShuttleAction.PassengerId);
                    if (passenger) {

                        externalNotificationHelper(5, passenger, props.selectedShuttle)
                    }
                }
            })

            props.showMessage(`"Okula giriş yaptınız, "Servisi bitir." butonuna basmayı unutmayınız!`);
            PlaySound(2);
        }
    }

}

export default CalculateDistance;