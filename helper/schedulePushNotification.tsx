import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

async function schedulePushNotification(title: string, body: string, detail: any) {
    if (Platform.OS === 'android') {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: body,
                data: { data: detail },
            },
            trigger: { seconds: 1 },
        });
    }
}

export default schedulePushNotification;