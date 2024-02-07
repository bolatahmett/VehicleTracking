import getPassengerStatusDescriptionWayBack from "./passenger-status-way-back-description";

const getPassengerStatusDescription = (status: number, shuttleDirection: string | undefined) => {

    if (shuttleDirection === "Gidiş") {

        switch (status.toString()) {
            case "0":
                return "Servis yola çıktı."
            case "1":
                return "Servis kısa sürede kapıda olacak.";
            case "2":
                return "Servis kapıda.";
            case "3":
                return "Öğrenci servise bindi.";
            case "4":
                return "Öğrenci servise gelmedi.";
            case "5":
                return "Servis okula giriş yaptı.";
            default:
                break;
        }
    }

    if (shuttleDirection === "Dönüş") {
        return getPassengerStatusDescriptionWayBack(status);
    }

    return "";
}

export default getPassengerStatusDescription;