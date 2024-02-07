import { Ionicons, FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Alert, Animated, Platform, Text, TouchableOpacity, View } from "react-native";
import styles from "../constants/style";
import { Card } from "react-native-elements";
import CardTableItem from "./CarTableItem";
import stylesTab from "../constants/stylesTab";
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Timeline } from './../components/Timeline/index';
import { Shuttle } from "../model/Shuttle";
import { getTableItemsWithPath } from "../dto/ServerHelper";
import { PassengerShuttleAction } from "../model/PassengerShuttleAction";
import getPassengerStatusDescription from "../constants/passenger-status-description";
import errorIcon from '../constants/error-icon';
import checkIcon from '../constants/check-icon';
import { connect } from "react-redux";
import voiceMessageChecker from "../helper/voiceMessageChecker";
import { showMessage } from "../redux/actions/actions";

const PassengerDetail = (props: any) => {
    const dateFormat = 'YYYY/MM/DD';
    const dateTimeFormat = 'YYYY/MM/DD HH:mm';

    const [showPassengerShuttleHistory, setShowPassengerShuttleHistory] = useState(false);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(Platform.OS === 'ios');
    const [historyOfPassengerShuttleAction, setHistoryOfPassengerShuttleAction] = useState([] as any);
    const [tempDate, setTempDate] = useState(new Date());
    const [voiceSmsResult, setVoiceSmsResult] = useState("");

    useEffect(() => {
        if (!show) {
            setDate(tempDate)
            getHistoryOfPassengerShuttleAction(tempDate);
        }
    }, [show])

    const getHistoryOfPassengerShuttleAction = (currentDate: Date) => {
        const filterDate = moment(currentDate).format('YYYYMMDD');

        setHistoryOfPassengerShuttleAction([])

        props.shuttleItems.forEach((passengerShuttleItem: Shuttle) => {
            const path = `/PassengerShuttleAction/${props.passenger?.Id}/${passengerShuttleItem.Id}/${filterDate}`;
            getTableItemsWithPath(path).then((items: any) => {
                let result: PassengerShuttleAction[] = [];

                for (const key in items) {
                    for (const statusKey in items[key]) {
                        result.push(items[key][statusKey] as PassengerShuttleAction);
                    }
                }

                if (result) {

                    const mappedResult = result.map((item) => {
                        return {
                            time: {
                                content: moment(item.DateTime).format(dateTimeFormat)
                            },
                            title: {
                                content: <Text >
                                    {((passengerShuttleItem?.Direction === "Gidiş" && item.PassengerStatus === 1) || (passengerShuttleItem?.Direction === "Dönüş" && item.PassengerStatus === 3)) && <Ionicons onPress={() => {
                                        voiceMessageChecker(props.passenger.GuardianNumber, passengerShuttleItem.Organisation, filterDate, passengerShuttleItem.Id)
                                            .then((response: any) => {
                                                Alert.alert("Cağrı Durumu", response);
                                            }).catch((error: any) => {
                                                Alert.alert("Cağrı Durumu", "Çağrı bulunamadı!");
                                            });
                                    }} name={"md-call"} size={14} color={"#000"} style={{ alignSelf: "flex-start" }} />}
                                    {getPassengerStatusDescription(item.PassengerStatus, passengerShuttleItem.Direction)}
                                </Text>,
                            },
                            description: {
                                content: getShuttleName(item.ShuttleId),
                            },
                            icon: passengerShuttleItem?.Direction === "Gidiş" ? (item.PassengerStatus === 4 ? errorIcon : checkIcon) : (item.PassengerStatus === 1 ? errorIcon : checkIcon),
                        }
                    });

                    setHistoryOfPassengerShuttleAction((oldArray: any) => [...oldArray, ...mappedResult])
                }
            });
        });
    }

    const getShuttleName = (shuttleId: string) => {
        const shuttle: Shuttle | undefined = props.shuttleItems && props.shuttleItems.length > 0 ? props.shuttleItems.find((item: any) => { return item && item.Id === shuttleId }) : undefined;
        return shuttle ? `${shuttle.ShuttleName} - ${shuttle.Direction} - ${shuttle.CarNumberPlate}` : "";
    }

    const getAllShuttleNames = (shuttleIds: string) => {

        if (!shuttleIds) {
            return "";
        }

        const arrayShuttleId = shuttleIds.split(',');

        let result: any = [];

        arrayShuttleId.forEach(shuttleId => {
            result.push(getShuttleName(shuttleId));
        });

        return result.join(' | ');
    }

    const handleOnPressCalendar = () => {
        setShow(true);
    };

    const onChange = (event: any, selectedDate: any) => {
        if (selectedDate) {
            const currentDate = selectedDate || date;
            console.log(currentDate)
            setTempDate(currentDate);
            setShow(Platform.OS == "ios");
        }
    };

    const backButtonHandle = () => {
        if (showPassengerShuttleHistory) {
            setShowPassengerShuttleHistory(false);
        } else {
            props.setSelectedPassenger(undefined)
        }
    }

    const nextButtonHandle = () => {
        setShowPassengerShuttleHistory(true);
    }

    return (
        <View style={{ flex: 1, marginTop: 10, marginLeft: 5, marginRight: 5 }}>
            {/* <View style={{ flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-evenly" }}>
                <TouchableOpacity style={{ flex: 1 }} onPress={backButtonHandle}>
                    <Ionicons name={"arrow-back-outline"} size={24} color={"#000"} style={{ alignSelf: "flex-start" }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1 }} onPress={nextButtonHandle}>
                    <Ionicons name={"arrow-forward-outline"} size={24} color={"#000"} style={{ alignSelf: "flex-end" }} />
                </TouchableOpacity>
            </View> */}

            <View style={styles.messageReceiverTabBar}>
                <TouchableOpacity
                    key={"back"}
                    style={styles.messageExit}
                    onPress={backButtonHandle}>
                    {
                        // @ts-ignore
                        <Ionicons name={"arrow-back-circle-outline"} size={24} color={"black"} ></Ionicons>
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    key={"detailPassengerInfo"}
                    style={styles.messageReceiver}
                >
                    <Animated.Text style={{ ...styles.cardText }}>{props.passenger.PassengerName}</Animated.Text>
                </TouchableOpacity>
                <TouchableOpacity
                    key={"forward"}
                    style={styles.messageIcon}
                    onPress={nextButtonHandle}>
                    {
                        // @ts-ignore
                        <Ionicons name={"arrow-forward-circle-outline"} size={24} color={"black"} ></Ionicons>
                    }
                </TouchableOpacity>
            </View>

            {!showPassengerShuttleHistory && <Card containerStyle={{
                flex: 1,
                backgroundColor: 'white',
                borderRadius: 20,
                borderWidth: 0,
                marginBottom: 2,
            }}>
                <CardTableItem leftItem={`Veli:`} rightItem={props.passenger.Guardian} />
                <Card.Divider />
                <CardTableItem leftItem={`Veli Tel No:`} rightItem={props.passenger.GuardianNumber} />
                <Card.Divider />
                <CardTableItem leftItem={`Veli Tel2 No:`} rightItem={props.passenger.GuardianNumber2} />
                <Card.Divider />
                <CardTableItem leftItem={`Adres:`} rightItem={props.passenger.Address} />
                <Card.Divider />
                <CardTableItem leftItem={`Servis:`} rightItem={getAllShuttleNames(props.passenger.ShuttleId)} />
                <Card.Divider />
                <CardTableItem leftItem={`1. Bildirim:`} rightItem={props.passenger.IsNotificationsEnabled ? "Aktif" : "Pasif"} />
                <Card.Divider />
                <CardTableItem leftItem={`2. Bildirim:`} rightItem={props.passenger.IsNotificationsEnabled2 ? "Aktif" : "Pasif"} />
                <Card.Divider />
            </Card>}
            {
                showPassengerShuttleHistory && <View style={stylesTab.historyOfShuttleContainer}>
                    {Platform.OS !== 'ios' && <TouchableOpacity style={stylesTab.calendarContainer} onPress={handleOnPressCalendar}>
                        <Text style={stylesTab.calendarText}>{moment(date).format(dateFormat) + '  '}
                            <FontAwesome
                                name="calendar"
                                size={20}
                                style={styles.itemHeader}
                            >
                            </FontAwesome>
                        </Text>

                    </TouchableOpacity>}

                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={"date"}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                            style={{ width: 150, marginTop: 20, marginRight: 60 }}
                            locale={'tr'}
                        />

                    )}

                    <Timeline
                        style={{ marginLeft: 40, marginTop: 20, marginBottom: 20 }}
                        data={historyOfPassengerShuttleAction} onEndReachedThreshold={undefined} onEndReached={undefined} TimelineFooter={undefined} TimelineHeader={undefined} />
                </View>
            }
        </View>
    )
}

const mapStateToProps = (state: any) => {
    const shuttleItems = state.rootReducer.shuttleItems;
    return { shuttleItems };
};

export default connect(mapStateToProps, {
    showMessage,
})(PassengerDetail);