import { Alert } from "react-native";
import sendSms from "../helper/smshelper";
import voiceMessageHelper from "../helper/voiceMessageHelper";

let isSent = false;
let isSentLevel2 = false;

const sendCriticalSpeedMessage = (speed: number, carNumberPlate: string,) => {
    const calculatedSpeed = Math.round(speed * 3.6 * 100) / 100;
    if (calculatedSpeed > 90 && !isSent) {
        Alert.alert("", "Hızınız çok yüksek.");
        sendSms(`${carNumberPlate} plakalı araç ${calculatedSpeed} km/saat hızla gitmektedir.`, "5514480910");
        sendSms(`${carNumberPlate} plakalı araç ${calculatedSpeed} km/saat hızla gitmektedir.`, "5395804404");
        isSent = true;
    }

    if (calculatedSpeed > 120 && !isSentLevel2) {
        Alert.alert("", "Hızınız çok çok yüksek.");
        voiceMessageHelper(`${carNumberPlate} plakalı araç ${calculatedSpeed} km/saat hızla gitmektedir.`, "5514480910");
        voiceMessageHelper(`${carNumberPlate} plakalı araç ${calculatedSpeed} km/saat hızla gitmektedir.`, "5395804404");
        sendSms(`${carNumberPlate} plakalı araç ${calculatedSpeed} km/saat hızla gitmektedir.`, "5303286789");
        isSentLevel2 = true;
    }
}

export default sendCriticalSpeedMessage;
