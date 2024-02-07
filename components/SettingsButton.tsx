import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
import Colors from '../constants/Colors';
import styles from "../constants/style";
import useColorScheme from '../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';

const SettingsButton = (props: any) => {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    return (
        <Pressable
            onPress={() => navigation.navigate('Settings')}
            style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
            })}>
            <FontAwesome
                name="user-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={styles.itemHeader}
            />
        </Pressable>
    )
}

export default SettingsButton;