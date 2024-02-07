import * as Location from 'expo-location';
import { Alert } from 'react-native';

const requestPermissions = async (setGranted: any, showMessage: any) => {

    await Location.getForegroundPermissionsAsync().then(async (foregroundPermissions: any) => {
        if (foregroundPermissions.status === 'granted') {
            await Location.requestBackgroundPermissionsAsync().then((backgroundPermissions: any) => {
                if (backgroundPermissions.status === 'granted') {
                    setGranted(true)
                } else {
                    const message = 'Lütfen konum izinlerini kontrol ediniz! Konum ayarlarından "Her zaman izin ver" olarak izin verilmelidir.';
                    showMessage != null ? showMessage(message) : Alert.alert(message);
                    setGranted(false);
                }
            })
        } else {
            const message = 'Lütfen konum izinlerini kontrol ediniz!'
            showMessage != null ? showMessage(message) : Alert.alert(message);
            setGranted(false);
        }
    });
}

export default requestPermissions;