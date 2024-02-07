import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
import Colors from '../constants/Colors';
import styles from "../constants/style";
import useColorScheme from '../hooks/useColorScheme';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import { setDriver, setSchool, setSelectedShuttle } from "../redux/actions/actions";

const Logout = (props: any) => {
    const colorScheme = useColorScheme();

    const removeData = async () => {
        await AsyncStorage.removeItem('Driver');
    }

    return (
        <Pressable
            onPress={async () => {
                await removeData().then(() => {
                    props.setSchool(null);
                    props.setSelectedShuttle(null);
                    props.setDriver(null);
                    props.navigation.navigate('Login');
                });
            }}
            style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
            })}>
            <FontAwesome
                name="sign-out"
                size={25}
                color={Colors[colorScheme].text}
                style={styles.itemHeader}
            />
        </Pressable>
    )
}

export default connect(() => { }, {
    setSelectedShuttle,
    setSchool,
    setDriver,
})(Logout);