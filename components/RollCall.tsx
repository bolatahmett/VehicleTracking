import React, { useEffect, useState } from 'react';
import { Passenger } from '../model/Passenger';
import { updateItemOnDbWithPath } from '../dto/ServerHelper';
import { PassengerShuttleAction } from '../model/PassengerShuttleAction';
import styles from '../constants/style';
import { connect } from 'react-redux';
import { FlatList, Switch, TouchableOpacity, Text, View, Alert } from 'react-native';
import { setNextPassenger, setPassengerShuttleActions, setPassengersOfTheShuttle, setShuttleStatus, showMessage } from '../redux/actions/actions';
import _ from 'lodash';
import moment from 'moment';
import { Platform } from 'react-native';
import externalNotificationHelper from '../helper/externalNotificationHelper';

function RollCall(props: any) {

    const [passengerActions, setPassengerActions] = useState([] as any);

    useEffect(() => {

        if (props.passengerShuttleActions === undefined || props.passengerShuttleActions.length === 0) {

            const passengersOfTheShuttleStatus = props.passengersOfTheShuttle.map((item: Passenger) => {
                return { Id: item.Id, Status: "0" };
            })

            setPassengerActions(passengersOfTheShuttleStatus);

        } else {

            const passengersOfTheShuttleStatus = props.passengersOfTheShuttle.map((passenger: Passenger) => {
                const statusAction: PassengerShuttleAction | undefined = props.passengerShuttleActions
                    .find((item: PassengerShuttleAction) => item.PassengerId === passenger.Id && (item.Status === "0" || item.Status === "1"));
                return { Id: passenger.Id, Status: statusAction ? statusAction.Status : "1" };
            })

            setPassengerActions(passengersOfTheShuttleStatus);
        }

    }, [])

    const getRollCall = (passengerItemId: string) => {
        const statusAction = passengerActions.find((item: any) => { return item.Id === passengerItemId });
        return statusAction && statusAction.Status === "0";
    }

    const setRollCall = (status: boolean, passengerId: string) => {

        passengerActions.forEach((element: any) => {
            if (element.Id === passengerId) {
                element.Status = status === true ? "0" : "1";
            }
        });

        setPassengerActions([...passengerActions]);

    }

    const saveRollCall = () => {

        Alert.alert('', 'Servis başlatılacak emin misiniz?.', [
            {
                text: 'Iptal',
                onPress: () => props.showMessage("Iptal edildi."),
                style: 'cancel',
            },
            {
                text: 'Devam', onPress: () => {
                    if (passengerActions && props.selectedShuttle && props.shuttleDetail) {

                        passengerActions.forEach((element: any) => {

                            const id = props.selectedShuttle.Id + "-" + props.shuttleDetail.expeditionId + "-" + element.Id + "-" + element.Status;
                            const item = {
                                PassengerId: element.Id,
                                ShuttleId: props.selectedShuttle!.Id,
                                ExpeditionId: props.shuttleDetail.expeditionId,
                                DriverId: props.selectedShuttle!.DriverId,
                                StartedTime: props.shuttleDetail.startedTime,
                                EndedTime: "",
                                PassengerStatus: parseInt(element.Status),
                                DateTime: new Date().toISOString(),
                                Status: "N",
                                Id: element.Id
                            } as PassengerShuttleAction
                            props.setPassengerShuttleActions(item);

                            const currentDate = moment(new Date()).format('YYYYMMDD')
                            const path = `/${"PassengerShuttleAction"}/${element.Id}/${props.selectedShuttle!.Id}/${currentDate}/${props.shuttleDetail.expeditionId}/${element.Status}`;
                            updateItemOnDbWithPath(path, item);

                            const passenger: Passenger = props.passengersOfTheShuttle.find((x: Passenger) => x.Id === element.Id);
                            externalNotificationHelper(parseInt(element.Status), passenger, props.selectedShuttle)

                        });

                        let first = passengerActions.filter((element: any) => element.Status === "0");

                        if (first && first.length > 0) {
                            props.setNextPassenger(props.passengersOfTheShuttle.find((item: Passenger) => item.Id === first[0].Id))
                        }

                        props.setShuttleStatus(true);
                        props.setRollCallModalVisible(false);
                    }

                }
            },
        ]);

    }

    const PassengerItemView = ({ item }: any) => {
        const passengerItem = item as Passenger;
        return (
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: 'center', marginRight: 20, marginLeft: 20 }}>
                <Text style={styles.rollCallFlatItemText}>{passengerItem.PassengerName}</Text>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: 'center' }}>
                    <Text style={styles.rollCallFlatItemText}>{getRollCall(passengerItem.Id) ? "Geldi." : "Gelmedi."}</Text>
                    <Switch
                        onValueChange={(value) => { setRollCall(value, passengerItem.Id) }}
                        value={getRollCall(passengerItem.Id)}
                        trackColor={{ false: "gray", true: "green" }}
                        thumbColor={getRollCall(passengerItem.Id) ? "#30a566" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        style={{ transform: Platform.OS == "ios" ? [{ scaleX: 1 }, { scaleY: 1 }] : [{ scaleX: 1.4 }, { scaleY: 1.4 }] }}
                    />
                </View>
            </View>
        );
    };

    return (
        <View style={styles.homeContainer}>
            {
                <>
                    <Text style={styles.rollCallMainText}>{"Yoklama"}</Text>
                    {
                        <FlatList
                            style={{ flex: 1 }}
                            data={props.passengersOfTheShuttle}
                            renderItem={PassengerItemView}
                            keyExtractor={(item: any, index: any) => index.toString()}
                            showsHorizontalScrollIndicator={true}
                            ItemSeparatorComponent={(props) => {
                                return (<View style={{ height: 1, backgroundColor: 'gray' }} />);
                            }}
                        />
                    }
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginBottom: 20 }}>

                        <TouchableOpacity style={{
                            backgroundColor: "#fb5b5a",
                            borderRadius: 25,
                            height: 50,
                            alignItems: "center",
                            justifyContent: "center",
                            width: "40%",
                        }} onPress={() => { props.setRollCallModalVisible(false); }}>
                            <Text style={styles.loginText}>Vazgeç</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            backgroundColor: "#fb5b5a",
                            borderRadius: 25,
                            height: 50,
                            alignItems: "center",
                            justifyContent: "center",
                            width: "40%",
                        }} onPress={saveRollCall}>
                            <Text style={styles.loginText}>Kaydet ve Servisi Başlat</Text>
                        </TouchableOpacity>

                    </View>
                </>
            }
        </View>
    );
}

const mapStateToProps = (state: any) => {
    const isShuttleStarted = state.rootReducer.isShuttleStarted;
    const selectedShuttle = state.rootReducer.selectedShuttle;
    const passengersOfTheShuttle = state.rootReducer.passengersOfTheShuttle;
    const shuttleDetail = state.rootReducer.shuttleDetail;
    const passengerShuttleActions = state.rootReducer.passengerShuttleActions;
    return { isShuttleStarted, selectedShuttle, passengersOfTheShuttle, shuttleDetail, passengerShuttleActions };
};

export default connect(mapStateToProps, {
    setPassengerShuttleActions,
    showMessage,
    setShuttleStatus,
    setNextPassenger,
    setPassengersOfTheShuttle,
})(RollCall)