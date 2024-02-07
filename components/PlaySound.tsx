import { Audio } from 'expo-av';

const PlaySound = async (soundType: number) => {
    try {
        if (soundType === 1) {
            const { sound } = await Audio.Sound.createAsync(require('../assets/sound/serviskapida.mp3'));
            await sound.playAsync();
        }

        if (soundType === 2) {
            const { sound } = await Audio.Sound.createAsync(require('../assets/sound/okulagirisyapti.mp3'));
            await sound.playAsync();
        }
    } catch (error) {

    }
}

export default PlaySound;