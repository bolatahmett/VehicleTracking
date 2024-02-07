import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
import Colors from '../constants/Colors';
import styles from "../constants/style";
import useColorScheme from '../hooks/useColorScheme';
var Logout = function (props) {
    var colorScheme = useColorScheme();
    return (React.createElement(Pressable, { onPress: function () { return props.navigation.navigate('Login'); }, style: function (_a) {
            var pressed = _a.pressed;
            return ({
                opacity: pressed ? 0.5 : 1,
            });
        } },
        React.createElement(FontAwesome, { name: "sign-out", size: 25, color: Colors[colorScheme].text, style: styles.itemHeader })));
};
export default Logout;
