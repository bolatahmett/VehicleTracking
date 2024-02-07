
import { LinearGradient } from "expo-linear-gradient";
import _ from "lodash";
import moment from "moment";
import React from "react";
import { TouchableOpacity, Text, Alert } from "react-native";
import { connect } from "react-redux";
import styles from "../constants/style";
import { Passenger } from "../model/Passenger";
import { Shuttle } from "../model/Shuttle";

function ShuttleStartStopButton(props: any) {

    const getStarStopButtonTitle = () => {

        if (!props.selectedShuttle || _.isEmpty(props.selectedShuttle)) {
            return "Servis seçiniz!";
        }

        if (!props.granted) {
            return "Konum izini veriniz!";
        }

        if (!moment(props.selectedShuttle.ShuttleTime, 'hh:mm:ss').isBetween(moment().add(-2, "hour"), moment().add(2, "hour"))) {
            return "Servis başlatılamaz!";
        }

        if (isShuttleStartStopButtonEnable()) {
            if (props.enabledTrack) {
                return "Servisi bitir."
            }

            if (!props.enabledTrack) {
                return "Servisi başlat."
            }
        }
        return "Servis başlatılamaz!";
    }

    const isShuttleStartStopButtonEnable = () => {

        if (props.selectedShuttle && !moment(props.selectedShuttle.ShuttleTime, 'hh:mm:ss').isBetween(moment().add(-2, "hour"), moment().add(2, "hour"))) {
            return false;
        }

        if (props.selectedShuttle && props.passengersOfTheShuttle && props.passengersOfTheShuttle.length > 0) {
            return true;
        }
        return false;
    }

    const handleShuttleStartStopButton = () => {
        if (!props.granted) {
            props.requestPermissions(props.setGranted, props.showMessage);
            return;
        }

        if (props.enabledTrack) {

            Alert.alert("",
                "Servis bitirilecek emin misiniz?",
                [
                    {
                        text: "Hayır",
                        onPress: () => props.showMessage("Iptal edildi!"),
                        style: "cancel"
                    },
                    { text: "Evet", onPress: () => props.stopBackgroundUpdate() }
                ]
            );

        } else {

            Alert.alert(
                "",
                "Servis başlatılacak emin misiniz?",
                [
                    {
                        text: "Hayır",
                        onPress: () => props.showMessage("Iptal edildi!"),
                        style: "cancel"
                    },
                    { text: "Evet", onPress: () => props.startBackgroundUpdate() }
                ]
            );
        }
    }

    return (
        <TouchableOpacity
            style={styles.trackBtn}
            disabled={!isShuttleStartStopButtonEnable()}
            onPress={handleShuttleStartStopButton}>
            <LinearGradient
                colors={isShuttleStartStopButtonEnable() ? ["#FF8A65", "#fb5b5a", "#FF8A65"] : ["#B2BEB5", "#808080", "#B2BEB5"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.9 }}
                style={styles.appButtonContainer}
            >
                <Text style={{ color: "white", fontSize: 12 }} >{getStarStopButtonTitle()}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const mapStateToProps = (state: any) => {
    const selectedShuttle = state.rootReducer.selectedShuttle as Shuttle;
    const passengersOfTheShuttle = state.rootReducer.passengersOfTheShuttle as Passenger[];
    return { selectedShuttle, passengersOfTheShuttle };
};

export default connect(mapStateToProps, {})(ShuttleStartStopButton)