import { Passenger } from "../model/Passenger"
import { Shuttle } from "../model/Shuttle";
import smshelper from "./smshelper"
import voiceMessageHelper from "./voiceMessageHelper"

const externalNotificationHelper = (status: number, passengerItem: Passenger, shuttle: Shuttle) => {
    if (!passengerItem) {
        return;
    }

    if (!passengerItem.IsNotificationsEnabled) {
        return;
    }

    if (!shuttle) {
        return;
    }

    const numberOfPassenger = `${passengerItem.GuardianNumber.substring(passengerItem.GuardianNumber.length - 10)}`;

    const notification = passengerItem.ActionNotification && passengerItem.ActionNotification[shuttle.Id] && passengerItem.ActionNotification[shuttle.Id].find((x: { Status: number }) => x.Status === status);

    if (notification) {
        const description = notification.Description.includes("kısa") ? `Merhaba ${passengerItem.PassengerName}, ${notification.Description}` : `Merhaba, ${passengerItem.PassengerName} ${notification.Description}`;
        if (notification.IsCheckedSms) {
            smshelper(description, numberOfPassenger)
        } else if (notification.IsCheckedCall) {
            voiceMessageHelper(description, numberOfPassenger)
        }
    } else {
        if (shuttle.Direction === "Gidiş") {
            if (status === 1) {
                voiceMessageHelper(`Merhaba ${passengerItem.PassengerName}, servis kısa sürede kapıda olacak.`, numberOfPassenger)
            }

            if (status === 3) {
                smshelper(`Merhaba, ${passengerItem.PassengerName} servise bindi.`, numberOfPassenger)
            }

            if (status === 4) {
                smshelper(`Merhaba, ${passengerItem.PassengerName} servise gelmedi.`, numberOfPassenger)
            }

            if (status === 5) {
                smshelper(`Merhaba, ${passengerItem.PassengerName} okula giriş yaptı.`, numberOfPassenger)
            }
        }

        if (shuttle.Direction === "Dönüş") {
            if (status === 0) {
                smshelper(`Merhaba, ${passengerItem.PassengerName} servise bindi.`, numberOfPassenger)
            }

            if (status === 1) {
                smshelper(`Merhaba, ${passengerItem.PassengerName} servise binmedi.`, numberOfPassenger)
            }

            if (status === 3) {
                voiceMessageHelper(`Merhaba ${passengerItem.PassengerName}, servis kısa sürede kapıda olacak.`, numberOfPassenger)
            }

            if (status === 4) {
                smshelper(`Merhaba, ${passengerItem.PassengerName} indi.`, numberOfPassenger)
            }
        }

    }
}

export default externalNotificationHelper;
