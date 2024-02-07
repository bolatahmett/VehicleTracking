import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useState } from "react";
import { Text, TouchableOpacity, Image, View, Switch, Platform, Alert, Modal } from "react-native";
import { connect } from "react-redux";
import styles from "../constants/style";
import { Shuttle } from "../model/Shuttle";
import { showMessage } from "../redux/actions/actions";

const ShuttleViewProperties = (props: any) => {

    const [modalVisibility, setModalVisibility] = useState(false);

    const handleSetActiveShuttleVisibility = (value: boolean) => {
        if (props.selectedShuttle) {
            props.setActiveShuttleVisibility(value)
        } else {
            props.showMessage("Servisi seçimi yapmanız gerekmektedir.")
        }
    }

    const handleSetActiveShuttlePassengerVisibility = (value: boolean) => {
        if (props.selectedShuttle) {
            props.setActiveShuttlePassengerVisibility(value)
        } else {
            props.showMessage("Servisi seçimi yapmanız gerekmektedir.")
        }
    }

    const handleSetShuttleRouteVisibility = (value: boolean) => {
        if (props.selectedShuttle) {
            props.setShuttleRouteVisibility(value)
        } else {
            props.showMessage("Servisi seçimi yapmanız gerekmektedir.")
        }
    }

    const handleSetBaseShuttleRouteVisibility = (value: boolean) => {
        if (props.selectedShuttle) {
            props.setBaseShuttleRouteVisibility(value)
        } else {
            props.showMessage("Servisi seçimi yapmanız gerekmektedir.")
        }
    }

    const onPressShuttleMapOptions = () => {

        if (props.selectedShuttle) {
            setModalVisibility(!modalVisibility);
        } else {
            props.showMessage("Servisi seçimi yapmanız gerekmektedir.")
        }
    }

    const getShuttleName = () => {
        if (props.selectedShuttle) {
            return `${props.selectedShuttle.ShuttleName} - ${props.selectedShuttle.Direction == "Gidiş" ? "Sabah" : "Akşam"}`;
        } else {
            return "Servis seçiniz!";
        }
    }

    return (
        <View
            style={{
                alignItems: "flex-start",
                borderRadius: 4,
                position: 'absolute',
                backgroundColor: "aliceblue",
                padding: 10,
                top: 10,
                left: 10,
                borderWidth: 0.2,
                flexDirection: "column"
            }}>

            <Text adjustsFontSizeToFit={false} numberOfLines={2} style={styles.rollCallFlatItemText}>{`Seçili Servis: ${getShuttleName()}`}</Text>
            <TouchableOpacity
                style={{
                    marginTop: 20,
                    justifyContent: "flex-end",
                    alignSelf: "flex-end",
                }}
                onPress={onPressShuttleMapOptions}>
                <LinearGradient
                    colors={["#FF8A65", "#fb5b5a", "#FF8A65"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 0.9 }}
                    style={{
                        elevation: 8,
                        borderRadius: 10,
                        paddingVertical: 5,
                        paddingHorizontal: 6,
                        minWidth: 70,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text style={{ color: "white", fontSize: 12 }} >{"İzleme Detayları"}</Text>
                </LinearGradient>
            </TouchableOpacity>

            <Modal
                key={"shuttleMapOptions"}
                animationType="slide"
                transparent={true}
                visible={modalVisibility}
                style={{ alignSelf: "center" }}
            >
                <View style={{
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 200,
                    backgroundColor: "white",
                    borderRadius: 20,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                }}>

                    <View style={{ flexDirection: "column", alignItems: 'center', marginTop: 20 }}>
                        <Text style={styles.rollCallFlatItemText} adjustsFontSizeToFit={false} numberOfLines={1}>{`Haritada Göster `}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: 'center' }}>
                            <Text style={styles.shuttleShowOptionsText} adjustsFontSizeToFit={false} numberOfLines={1}>{`Servis Konumu : `}</Text>
                            <Switch
                                onValueChange={(value) => { handleSetActiveShuttleVisibility(value) }}
                                value={props.activeShuttleVisibility}
                                trackColor={{ false: "gray", true: "green" }}
                                thumbColor={true ? "#f8f7f7eb" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                style={{ paddingLeft: 10, transform: Platform.OS == "ios" ? [{ scaleX: 1 }, { scaleY: 1 }] : [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                            />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: 'center' }}>
                            <Text style={styles.shuttleShowOptionsText} adjustsFontSizeToFit={false} numberOfLines={1}>{`Öğrenciler : `}</Text>
                            <Switch
                                onValueChange={(value) => { handleSetActiveShuttlePassengerVisibility(value) }}
                                value={props.activeShuttlePassengerVisibility}
                                trackColor={{ false: "gray", true: "green" }}
                                thumbColor={true ? "#f8f7f7eb" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                style={{ paddingLeft: 10, transform: Platform.OS == "ios" ? [{ scaleX: 1 }, { scaleY: 1 }] : [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                            />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: 'center' }}>
                            <Text style={styles.shuttleShowOptionsText} adjustsFontSizeToFit={false} numberOfLines={1}>{`Rota : `}</Text>
                            <Switch
                                onValueChange={(value) => { handleSetShuttleRouteVisibility(value) }}
                                value={props.shuttleRouteVisibility}
                                trackColor={{ false: "gray", true: "green" }}
                                thumbColor={true ? "#f8f7f7eb" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                style={{ paddingLeft: 10, transform: Platform.OS == "ios" ? [{ scaleX: 1 }, { scaleY: 1 }] : [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                            />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: 'center' }}>
                            <Text style={styles.shuttleShowOptionsText} adjustsFontSizeToFit={false} numberOfLines={1}>{`Ana Rota : `}</Text>
                            <Switch
                                onValueChange={(value) => { handleSetBaseShuttleRouteVisibility(value) }}
                                value={props.baseShuttleRouteVisibility}
                                trackColor={{ false: "gray", true: "green" }}
                                thumbColor={true ? "#f8f7f7eb" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                style={{ paddingLeft: 10, transform: Platform.OS == "ios" ? [{ scaleX: 1 }, { scaleY: 1 }] : [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={{
                            marginTop: 10,
                            justifyContent: "flex-end",
                            alignSelf: "flex-end",
                            margin: 30
                        }}
                        onPress={onPressShuttleMapOptions}>
                        <LinearGradient
                            colors={["#FF8A65", "#fb5b5a", "#FF8A65"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 0.9 }}
                            style={{
                                elevation: 8,
                                borderRadius: 10,
                                paddingVertical: 5,
                                paddingHorizontal: 6,
                                minWidth: 70,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text style={{ color: "white", fontSize: 12 }} >{"Tamam"}</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>
            </Modal>
        </View>
    )
}

const mapStateToProps = (state: any) => {
    const selectedShuttle = state.rootReducer.selectedShuttle as Shuttle;
    const nextPassenger = state.rootReducer.nextPassenger;
    const isShuttleStarted = state.rootReducer.isShuttleStarted;
    return { nextPassenger, isShuttleStarted, selectedShuttle };
};

export default connect(mapStateToProps, {
    showMessage,
})(ShuttleViewProperties)