const getPassengerStatusDescriptionWayBack = (status: number) => {
    switch (status.toString()) {
        case "0":
            return "Öğrenci servise bindi.";
        case "1":
            return "Öğrenci servise binmedi.";
        case "2":
            return "Servis okuldan çıktı.";
        case "3":
            return "Servis kısa sürede kapıda olacak.";
        case "4":
            return "Öğrenci indi.";
        case "5":
            return "Servis tamamlandı.";
        default:
            break;
    }
    return "";
}

export default getPassengerStatusDescriptionWayBack;