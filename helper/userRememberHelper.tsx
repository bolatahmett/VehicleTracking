import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { Driver } from "../model/Driver";
import { User } from "../model/User";

const rememberDriver = async (driverItem: any, showMessage: any) => {
    try {
        await AsyncStorage.setItem('Driver', JSON.stringify(driverItem));
    } catch (error) {
        Alert.alert("", "rememberDriver error");
    }
};

const rememberUser = async (userItem: any, showMessage: any) => {
    try {
        await AsyncStorage.setItem('User', JSON.stringify(userItem));
    } catch (error) {
        Alert.alert("", "rememberUser error");
    }
};

const getRememberedDriver = async (showMessage: any, setUserName: any, setPassword: any, loginByInfo: any) => {
    try {
        const driverItem = await AsyncStorage.getItem('Driver');
        if (driverItem !== null) {
            const driver: Driver = JSON.parse(driverItem) as Driver;
            loginByInfo(driver.UserName, driver.Password);
        }
    } catch (error) {
        Alert.alert("", "getRememberedDriver error");
    }
};

const getRememberedUser = async (showMessage: any, setUserName: any, setPassword: any, loginByInfo: any) => {
    try {
        const userItem = await AsyncStorage.getItem('User');
        if (userItem !== null) {
            const userInfo: User = JSON.parse(userItem) as User;
            loginByInfo(userInfo.Name, userInfo.Password);
        }
    } catch (error) {
        Alert.alert("", "getRememberedUser error");
    }
};

const rememberAskingForPermission = async (isAsked: boolean, showMessage: any) => {
    try {
        await AsyncStorage.setItem('IsAskedForPermission', JSON.stringify(isAsked));
    } catch (error) {
        Alert.alert("", "IsAskedForPermission error");
    }
};

const isRememberedAskingForPermission = async (showMessage: any) => {
    try {
        return await AsyncStorage.getItem('IsAskedForPermission');
    } catch (error) {
        Alert.alert("", "getRememberedDriver error");
    }
};

export { rememberUser, getRememberedUser, rememberAskingForPermission, isRememberedAskingForPermission }