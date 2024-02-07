import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
import Colors from '../constants/Colors';
import styles from "../constants/style";
import useColorScheme from '../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
var SettingsButton = function (props) {
    var colorScheme = useColorScheme();
    var navigation = useNavigation();
    return (React.createElement(Pressable, { onPress: function () { return navigation.navigate('Settings'); }, style: function (_a) {
            var pressed = _a.pressed;
            return ({
                opacity: pressed ? 0.5 : 1,
            });
        } },
        React.createElement(FontAwesome, { name: "user-circle", size: 25, color: Colors[colorScheme].text, style: styles.itemHeader })));
};
export default SettingsButton;
