import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import SettingsScreen from '../screens/SettingsScreen';
import MapScreen from "../screens/MapScreen";
import { showMessage } from "../redux/actions/actions";
import ShuttleList from "../components/ShuttleList";
import { createDrawerNavigator } from "@react-navigation/drawer";
import styles from "../constants/style";
import { View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomDrawerContent from "../components/CustomDrawerContent";
import CarScreen from "../screens/CarScreen";
import PassengerScreen from "../screens/PassengerScreen";
import DriverScreen from "../screens/DriverScreen";
import Toast, { BaseToast } from 'react-native-toast-message';
import RouteMapScreen from "../screens/RouteMapScreen";
import ReportScreen from "../screens/ReportScreen";

const Drawer = createDrawerNavigator();

const toastDuration = 4000;

const toastConfig = {

    basbusToast: (props: any) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: "#fb5b5a" }}
            text2NumberOfLines={3}
            visibilityTime={toastDuration}
        />
    ),
};

function HomeStack(props: any) {

    useEffect(() => {
        if (props.userMessage) {

            Toast.show({
                type: 'basbusToast',
                text1: "Basbus Bilgi",
                text2: props.userMessage,
            });

            setTimeout(() => {
                props.showMessage(null);
            }, toastDuration);
        }
    }, [props.userMessage])

    return (
        <>
            <Drawer.Navigator initialRouteName="Map"
                screenOptions={{
                    drawerStyle: { height: '100%' },
                    overlayColor: 'transparent',
                }}
                drawerContent={props => <CustomDrawerContent {...props} />}
            >
                <Drawer.Group>
                    <Drawer.Screen name="Basbus" component={MapScreen}
                        options={{
                            title: 'Basbus Yönetici',
                            drawerIcon: ({ focused, size }) => (
                                <View>
                                    <Image
                                        style={{ width: 50, height: 50 }}
                                        source={require("./../assets/images/icon.png")}
                                    />
                                </View>
                            ),
                        }}
                    />

                </Drawer.Group>
                <Drawer.Group screenOptions={{ drawerContentContainerStyle: { height: 500 } }}>

                    <Drawer.Screen name="Map" component={MapScreen} options={{
                        title: "Anasayfa", drawerIcon: ({ focused, size }) => (
                            <Ionicons
                                name="md-home"
                                size={size}
                                color={focused ? '#7cc' : '#ccc'}
                            />
                        ), drawerItemStyle: styles.drawerItemStyle, drawerContentContainerStyle: { height: 500 }
                    }} />
                    <Drawer.Screen name="Modal" component={ShuttleList} options={{
                        title: "Servisler", drawerItemStyle: styles.drawerItemStyle, drawerIcon: ({ focused, size }) => (
                            <Ionicons
                                name="md-bus"
                                size={size}
                                color={focused ? '#7cc' : '#ccc'}
                            />
                        ),
                    }} />
                    <Drawer.Screen name="Passengers" component={PassengerScreen} options={{
                        title: "Öğrenciler", drawerItemStyle: styles.drawerItemStyle, drawerIcon: ({ focused, size }) => (
                            <Ionicons
                                name="md-person-circle-outline"
                                size={size}
                                color={focused ? '#7cc' : '#ccc'}
                            />
                        ),
                    }} />
                    <Drawer.Screen name="Drivers" component={DriverScreen} options={{
                        title: "Sürücüler", drawerItemStyle: styles.drawerItemStyle, drawerIcon: ({ focused, size }) => (
                            <Ionicons
                                name="md-person"
                                size={size}
                                color={focused ? '#7cc' : '#ccc'}
                            />
                        ),
                    }} />
                    <Drawer.Screen name="Cars" component={CarScreen} options={{
                        title: "Araçlar", drawerItemStyle: styles.drawerItemStyle, drawerIcon: ({ focused, size }) => (
                            <Ionicons
                                name="md-car"
                                size={size}
                                color={focused ? '#7cc' : '#ccc'}
                            />
                        ),
                    }} />
                    <Drawer.Screen name="RouteOperations" component={RouteMapScreen} options={{
                        title: "Rota İşlemleri", drawerItemStyle: styles.drawerItemStyle, drawerIcon: ({ focused, size }) => (
                            <Ionicons
                                name="md-map"
                                size={size}
                                color={focused ? '#7cc' : '#ccc'}
                            />
                        ),
                    }} />
                    {/* <Drawer.Screen name="Report" component={ReportScreen} options={{
                        title: "Raporlama", drawerItemStyle: styles.drawerItemStyle, drawerIcon: ({ focused, size }) => (
                            <Ionicons
                                name="md-map"
                                size={size}
                                color={focused ? '#7cc' : '#ccc'}
                            />
                        ),
                    }} /> */}
                </Drawer.Group>
                <Drawer.Group>
                    <Drawer.Screen name="Settings" key={"Settings"} navigationKey={"Settings"} component={SettingsScreen} options={{
                        title: "Ayarlar", drawerItemStyle: [styles.drawerItemStyle], drawerIcon: ({ focused, size }) => (
                            <Ionicons
                                name="md-settings"
                                size={size}
                                color={focused ? '#7cc' : '#ccc'}
                            />
                        ),
                    }} />
                </Drawer.Group>
            </Drawer.Navigator>
            <Toast config={toastConfig} />
        </>
    )
}

const mapStateToProps = (state: any) => {
    const trackCoordinate = state.rootReducer.addTrackCoordinate;
    const selectedShuttle = state.rootReducer.selectedShuttle;
    const selectedSchool = state.rootReducer.selectedSchool;
    const isShuttleStarted = state.rootReducer.isShuttleStarted;
    const userMessage = state.rootReducer.userMessage;
    return { trackCoordinate, selectedShuttle, selectedSchool, isShuttleStarted, userMessage };
};

export default connect(mapStateToProps, {
    showMessage
})(HomeStack);