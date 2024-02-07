import React, { useEffect } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styles from "../constants/style";
import { Passenger } from "../model/Passenger";
import { PassengerShuttleAction } from "../model/PassengerShuttleAction";

const AskToTheDriverPassengerStatus = (data: PassengerShuttleAction, passengerData: Passenger[], setDriverAnswer: any, setModalContent: any) => {

    const modalPassengerContent = <>
        <View style={styles.container}>
            <Text style={[styles.inputText, { fontSize: 16, fontWeight: "bold" }]}>{`${passengerData.find((passengerMessage) => passengerMessage.Id === data.PassengerId)?.PassengerName} servise bindi mi?`}</Text>
            <TouchableOpacity
                style={styles.driverAnswerButtonAccept}
                onPress={() => setDriverAnswer({ Answer: 'Yes', PassengerShuttleAction: data })}>
                {<Text style={{ fontSize: 16, color: "white" }} >{"Evet bindi."}</Text>}
            </TouchableOpacity>
            {/* <TouchableOpacity
                style={styles.driverAnswerButton}
                onPress={() => setDriverAnswer({ Answer: 'Wait', PassengerShuttleAction: data })}>
                {<Text>{"Bekliyoruz."}</Text>}
            </TouchableOpacity> */}
            <TouchableOpacity
                style={styles.driverAnswerButtonReject}
                onPress={() => setDriverAnswer({ Answer: 'No', PassengerShuttleAction: data })}>
                {<Text style={{ fontSize: 16, color: "white" }}>{"Öğrenci servise gelmedi. Devam ediyoruz!"}</Text>}
            </TouchableOpacity>
        </View>
    </>;

    setModalContent((oldItems: any) => [...oldItems, { Index: data.PassengerId, Value: modalPassengerContent, Visible: true }]);
}

export default AskToTheDriverPassengerStatus;