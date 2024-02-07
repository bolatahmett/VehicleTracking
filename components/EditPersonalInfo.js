var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useEffect, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import styles from "../constants/style";
import { updateItemOnDb } from "../dto/ServerHelper";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function EditPersonalInfo(props) {
    var _a = useState(undefined), driver = _a[0], setDriver = _a[1];
    useEffect(function () {
        AsyncStorage.getItem('driver').then(function (item) {
            if (item != null) {
                setDriver(JSON.parse(item).driver);
            }
        });
    }, []);
    useEffect(function () {
        if (driver) {
            setValue("Name", driver.Name);
            setValue("Surname", driver.Surname);
            setValue("UserName", driver.UserName);
            setValue("Password", driver.Password);
            setValue("PhoneNumber", driver.PhoneNumber);
        }
    }, [driver]);
    var _b = useForm({
        defaultValues: {
            Name: '',
            Surname: '',
            UserName: '',
            Password: '',
            PhoneNumber: ''
        }
    }), control = _b.control, handleSubmit = _b.handleSubmit, errors = _b.formState.errors, setValue = _b.setValue;
    var onSubmit = function (data) {
        var result = __assign(__assign({}, driver), data);
        updateItemOnDb("Driver", result, driver.Id);
        var jsonValue = JSON.stringify({ driver: driver });
        AsyncStorage.setItem('driver', jsonValue);
        Alert.alert('Bilgi', 'Kayıt işlemi başarılı.');
    };
    return (React.createElement(View, null,
        React.createElement(Controller, { control: control, rules: {
                required: true,
            }, render: function (_a) {
                var _b = _a.field, onChange = _b.onChange, onBlur = _b.onBlur, value = _b.value;
                return (React.createElement(TextInput, { style: styles.formText, placeholder: "Ad\u0131", onBlur: onBlur, onChangeText: onChange, value: value }));
            }, name: "Name" }),
        errors.Name && React.createElement(Text, null, "Bo\u015F ge\u00E7ilemez."),
        React.createElement(Controller, { control: control, rules: {
                required: true,
            }, render: function (_a) {
                var _b = _a.field, onChange = _b.onChange, onBlur = _b.onBlur, value = _b.value;
                return (React.createElement(TextInput, { style: styles.formText, placeholder: "Soyad\u0131", onBlur: onBlur, onChangeText: onChange, value: value }));
            }, name: "Surname" }),
        errors.Surname && React.createElement(Text, null, "Bo\u015F ge\u00E7ilemez."),
        React.createElement(Controller, { control: control, rules: {
                required: true,
            }, render: function (_a) {
                var _b = _a.field, onChange = _b.onChange, onBlur = _b.onBlur, value = _b.value;
                return (React.createElement(TextInput, { style: styles.formText, placeholder: "Kullan\u0131c\u0131 ad\u0131", onBlur: onBlur, onChangeText: onChange, value: value }));
            }, name: "UserName" }),
        errors.UserName && React.createElement(Text, null, "Bo\u015F ge\u00E7ilemez."),
        React.createElement(Controller, { control: control, rules: {
                required: true,
            }, render: function (_a) {
                var _b = _a.field, onChange = _b.onChange, onBlur = _b.onBlur, value = _b.value;
                return (React.createElement(TextInput, { style: styles.formText, placeholder: "\u015Eifre", onBlur: onBlur, onChangeText: onChange, value: value }));
            }, name: "Password" }),
        errors.Password && React.createElement(Text, null, "Bo\u015F ge\u00E7ilemez."),
        React.createElement(Controller, { control: control, rules: {
                required: true,
            }, render: function (_a) {
                var _b = _a.field, onChange = _b.onChange, onBlur = _b.onBlur, value = _b.value;
                return (React.createElement(TextInput, { style: styles.formText, placeholder: "Telefon numaras\u0131", onBlur: onBlur, onChangeText: onChange, value: value }));
            }, name: "PhoneNumber" }),
        errors.PhoneNumber && React.createElement(Text, null, "Bo\u015F ge\u00E7ilemez."),
        React.createElement(TouchableOpacity, { onPress: handleSubmit(onSubmit), style: {
                width: "80%",
                backgroundColor: "#fb5b5a",
                borderRadius: 10,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                margin: 5,
                alignSelf: 'center',
            } },
            React.createElement(Text, { style: styles.setttingsMenuText }, "Kaydet"))));
}
