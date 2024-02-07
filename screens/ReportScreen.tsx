import React, { useRef, useState } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, Linking, Modal, FlatList } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import styles from '../constants/style';
import ItemSeparatorView from '../components/ItemSeperatorView';
import EditPersonalInfo from '../components/EditPersonalInfo';
import { useNavigation } from '@react-navigation/native';
import { setDriver, showMessage, userLogout } from '../redux/actions/actions';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import voiceMessageChecker from '../helper/voiceMessageChecker';
import { getTableItemsWithPath } from '../dto/ServerHelper';
import { Passenger } from '../model/Passenger';
import moment from 'moment';

function ReportScreen(props: any) {

    const navigation = useNavigation();
    const [action, setAction] = useState(0);
    const [showReportDidNotReceiveTheCall, setShowReportDidNotReceiveTheCall] = useState(false)
    const [failedVoiceMessageItems, setFailedVoiceMessageItems] = useState(undefined as any);

    const reportDidNotReceiveTheCall = () => {

        const currentDate = moment().format('YYYYMMDD')

        getTableItemsWithPath(`/Passenger`).then((response: any) => {

            if (response) {

                Object.keys(response).forEach((element: any) => {
                    const passenger = response[element] as Passenger;
                    const shuttleId = passenger.ShuttleId && passenger.ShuttleId.split(",")[0];
                    console.log(passenger.GuardianNumber)
                    console.log(passenger.Organisation)
                    console.log(currentDate)
                    console.log(shuttleId)
                    // voiceMessageChecker(passenger.GuardianNumber, passenger.Organisation, currentDate, shuttleId)
                    //     .then((voiceResult: any) => {

                    //         if (voiceResult === "Cevaplananlar / Açan" || voiceResult === "Cevaplanmayanlar" || voiceResult === "Meşgule Alınan") {
                    //             //TODO: Success
                    //         } else {
                    //             const item = {
                    //                 Passenger: passenger,
                    //                 Result: voiceResult,
                    //             };
                    //             console.log("setFailedVoiceMessageItems")
                    //             setFailedVoiceMessageItems((oldArray: any) => [...oldArray, item]);
                    //         }

                    //     }).catch((error: any) => {

                    //     });

                });
            }

        });

        setShowReportDidNotReceiveTheCall(false)
    }

    const DidNotReceiveTheCallItemView = ({ item }: any) => {
        return (
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: 'center', marginRight: 20, marginLeft: 20 }}>
                <Text style={styles.rollCallFlatItemText}>{item.Passenger.PassengerName}</Text>
                <Text style={styles.rollCallFlatItemText}>{item.Result}</Text>

            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: "#f8f7f7eb", flexDirection: "row", justifyContent: 'center', alignItems: 'stretch' }}>
                {
                    // @ts-ignore
                    <FontAwesome
                        name="microphone-slash"
                        size={25}
                        color={"black"}
                        style={{ margin: 5 }}
                    />
                }
                <TouchableOpacity onPress={() => reportDidNotReceiveTheCall()} style={{
                    width: "80%",
                    backgroundColor: "#fb5b5a",
                    borderRadius: 10,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 5
                }}>
                    <Text style={styles.setttingsMenuText}>{"Çağrı gitmeyen öğrenciler"}</Text>
                </TouchableOpacity>
            </View>
            <ItemSeparatorView />

            <Modal
                key={"ReportDidNotReceiveTheCall"}
                animationType="slide"
                transparent={false}
                visible={showReportDidNotReceiveTheCall}
            >
                <View style={{
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 10,
                    marginBottom: 10,
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
                    flex: 1,
                }}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={failedVoiceMessageItems}
                        renderItem={DidNotReceiveTheCallItemView}
                        keyExtractor={(item: any, index: any) => index.toString()}
                        showsHorizontalScrollIndicator={true}
                        ItemSeparatorComponent={(props) => {
                            return (<View style={{ height: 1, backgroundColor: 'gray' }} />);
                        }}
                    />

                </View>
            </Modal>
        </View>
    );
}

const mapStateToProps = (state: any) => {
    const selectedDriver = state.rootReducer.selectedDriver;
    const isShuttleStarted = state.rootReducer.isShuttleStarted;
    return { selectedDriver, isShuttleStarted };
};

export default connect(mapStateToProps, {
    setDriver,
    showMessage,
    userLogout,
})(ReportScreen);