import React, { useEffect } from 'react';
import { useState } from 'react';
import { Text, FlatList, TouchableOpacity, View, Modal, Alert, TextInput } from 'react-native';
import styles from '../constants/style';
import { getTableItemWithId, updateItemOnDbWithPath } from '../dto/ServerHelper';
import { Shuttle } from '../model/Shuttle';
import ItemSeparatorView from '../components/ItemSeperatorView';
import { connect } from 'react-redux';
import { addPassengerNotficationDistance, setPassengersOfTheShuttle, setSelectedShuttle, setShuttleItems, showMessage } from '../redux/actions/actions';
import _ from 'lodash';
import { Ionicons } from '@expo/vector-icons';
import { Card } from 'react-native-elements';
import { Passenger } from '../model/Passenger';
import { useNavigation } from '@react-navigation/native';
import PassengerDetail from './PassengerDetail';
import { orderPassengerFromRouteForOneShuttle } from '../helper/dataHelper';
import { sendSMSToParents, sendSMSToParentsForActivate } from '../helper/bulkSmsHelper';
import FullScreenModal from './FullScreenModal';
import MessageInformationContent from './MessageInformationContent';

function ShuttleList(props: any) {

    const navigation = useNavigation();
    const [shuttleDetail, setShuttleDetail] = useState(undefined as any);
    const [messageModalVisibility, setMessageModalVisibility] = useState(false);
    const [selectedPassenger, setSelectedPassenger] = useState(undefined as Passenger | undefined);
    const [newOrder, setNewOrder] = useState([]);
    const [orderCheckResult, setOrderCheckResult] = useState(0);
    const [shuttleDetailContentVisibility, setShuttleDetailContentVisibility] = useState(false);

    useEffect(() => {
        if (shuttleDetail) {
            setShuttleDetailContentVisibility(true)
        } else {
            setShuttleDetailContentVisibility(false)
        }
    }, [shuttleDetail])

    const updateOrder = () => {
        updateItemOnDbWithPath(`/Shuttle/${shuttleDetail.Id}/Passengers`, newOrder.join(",")).then(() => {
            Alert.alert("", "Güncellendi.");
        });
    }

    const ShuttleCard = () => {
        return <Card wrapperStyle={{ flex: 1 }} containerStyle={{
            flex: 1,
            backgroundColor: 'white',
            borderRadius: 20,
            borderWidth: 0,
            marginBottom: 5,
        }}>
            <Card.Title style={styles.cardText}> {`${shuttleDetail?.ShuttleName} - ${shuttleDetail?.Direction}`}</Card.Title>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.boldCardText}> {`Adı Soyadı: `}</Text>
                <Text style={styles.cardText}> {props.driverItems.find((x: { Id: any; }) => x.Id.toString() === shuttleDetail?.DriverId.toString())?.Name}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.boldCardText}> {`İletişim Numarası: `}</Text>
                <Text style={styles.cardText}> {shuttleDetail?.DriverId}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.boldCardText}> {`Plaka No: `}</Text>
                <Text style={styles.cardText}> {shuttleDetail?.CarNumberPlate}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.boldCardText}> {`Servis Saati: `}</Text>
                <Text style={styles.cardText}> {shuttleDetail?.ShuttleTime}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.boldCardText}> {`Ortalama Süre: `}</Text>
                <Text style={styles.cardText}> {shuttleDetail?.AvaregeTime}</Text>
            </View>
            <View style={{ flexDirection: "row", margin: 2 }}>
                <Text style={styles.boldCardText}> {`Sıralama kontrolü: `}</Text>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => { orderPassengerFromRouteForOneShuttle(shuttleDetail.Id, setNewOrder, setOrderCheckResult) }}>
                    <Ionicons name={"reorder-four-sharp"} size={18} color={"#000"} style={{ alignSelf: "flex-start" }} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", margin: 2 }}>
                <Text style={styles.boldCardText}> {`Bilgilendirme SMS'i gönder: `}</Text>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => { setMessageModalVisibility(true) }}>
                    <Ionicons name={"chatbubbles-outline"} size={18} color={"#000"} style={{ alignSelf: "flex-start" }} />
                </TouchableOpacity>
            </View>
            {/* {(props.selectedSchool.Id.toString() === "2" || props.selectedSchool.Id.toString() === "3") && <View style={{ flexDirection: "row", marginTop: 20 }}>
                <Text style={styles.boldCardText}> {`Bilgilendirme SMS i gönder: `}</Text>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => { sendSMSToParents(shuttleDetail.Id) }}>
                    <Ionicons name={"information-circle"} size={24} color={"#000"} style={{ alignSelf: "flex-start" }} />
                </TouchableOpacity>
            </View>}
            {(props.selectedSchool.Id.toString() === "1" || props.selectedSchool.Id.toString() === "3") && <View style={{ flexDirection: "row", marginTop: 20 }}>
                <Text style={styles.boldCardText}> {`Aktif etme SMS i gönder: `}</Text>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => { sendSMSToParentsForActivate(shuttleDetail.Id, props.selectedSchool.Name) }}>
                    <Ionicons name={"information-circle"} size={24} color={"#000"} style={{ alignSelf: "flex-start" }} />
                </TouchableOpacity>
            </View>} */}
            <Text style={styles.boldCardText}> {`Öğrenciler`}</Text>

            {!selectedPassenger && <FlatList
                style={[styles.flatShuttleContainer, { marginTop: 10 }]}
                data={shuttleDetail?.Passengers.split(",")}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={ShuttlePassengersView}
                keyExtractor={(item, index) => index.toString()}
                key={"shuttleListPassengers"}
            />}
            {!selectedPassenger && newOrder && newOrder.length > 0 && <Text style={styles.boldCardText}> {`Sistem sıralaması`}</Text>}
            {orderCheckResult !== 0 && <Text style={styles.boldCardText}> {orderCheckResult === 1 ? `Sıralama doğru.` : "Sıralama yanlış!"}</Text>}
            {orderCheckResult === 2 && <TouchableOpacity style={{ height: 40, width: 100 }} onPress={() => { updateOrder(); setNewOrder([]); setOrderCheckResult(0) }}>
                <Ionicons name={"save"} size={24} color={"#000"} style={{ alignSelf: "flex-start" }} />
                <Text style={styles.boldCardText}> {`Sıralamayı değiştir.`}</Text>
            </TouchableOpacity>}
            {!selectedPassenger && newOrder && newOrder.length > 0 && <FlatList
                style={[styles.flatShuttleContainer, { marginTop: 10 }]}
                data={newOrder}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={ShuttlePassengersView}
                keyExtractor={(item, index) => index.toString()}
                key={"shuttleNewListPassengers"}
            />}

            {
                selectedPassenger && <PassengerDetail passenger={selectedPassenger} setSelectedPassenger={setSelectedPassenger}></PassengerDetail>
            }
        </Card>
    }

    const ShuttleItemView = ({ item }: any) => {
        return <TouchableOpacity
            style={{ height: 40, flex: 2, padding: 4 }}
            onPress={() => { handleOnPressShuttleDetail(item) }}>
            <View style={{ flexDirection: "row" }}>
                <Ionicons
                    name="bus-sharp"
                    size={24}
                    color={props.shuttleActiveItems?.some((shuttleActiveItem: Shuttle) => shuttleActiveItem.Id === item.Id) ? "green" : "red"}
                    style={{ alignSelf: "center", flex: 1 }}
                />

                {/* <Text style={{ color: "black", flex: 2 }}>{`${item.ShuttleName}`}</Text> */}
                <Text style={{ color: "black", flex: 2 }}> {item.CarNumberPlate}</Text>
                <Text style={{ color: "black", flex: 2 }}>{`${item?.Direction === "Gidiş" ? "Sabah" : "Akşam"}`}</Text>
                <Text style={{ color: "black", flex: 2 }}> {item.ShuttleTime}</Text>
                <Text style={{ color: "black", flex: 2 }}> {props.driverItems.find((x: { Id: any; }) => x.Id.toString() === item?.DriverId.toString())?.Name}</Text>
            </View>
        </TouchableOpacity>
    }

    const handleOnPressShuttleDetail = (item: Shuttle) => {

        props.setSelectedShuttle(item);

        let promiseArray: any[] = [];

        item.Passengers.split(",").forEach(passengerId => {
            const p1 = getTableItemWithId<Passenger>("Passenger", passengerId);
            promiseArray.push(p1);

        });

        Promise.all(promiseArray).then((passengerResult: Passenger[]) => {
            if (passengerResult && passengerResult.length > 0) {
                props.setPassengersOfTheShuttle(passengerResult.filter((item) => !_.isNil(item)));
            } else {
                props.showMessage("Servise ait öğrenci bulunamadı!")
            }
        }).finally(() => {
            setShuttleDetail(item);
        });

    }

    const ShuttlePassengersView = ({ item }: any) => {
        return <TouchableOpacity style={{ flexDirection: "row", marginBottom: 5, marginTop: 5 }} onPress={() => { setSelectedPassenger(props.passengersOfTheShuttle.find((x: any) => x.Id === item)) }}>
            <Ionicons name={"person-circle"} size={25} style={{ marginRight: 10 }} />
            <Text style={styles.cardText} >{`${props.passengersOfTheShuttle.findIndex((x: any) => x.Id === item)} -`}</Text>
            <Text style={styles.cardText} >{`${props.passengersOfTheShuttle.find((x: any) => x.Id === item)?.PassengerName}`}</Text>
        </TouchableOpacity>
    }

    const ShuttleDetailContent = () => {
        return <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-evenly", marginTop: 10, marginLeft: 5, marginRight: 5 }}>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                    setShuttleDetail(undefined);
                    setSelectedPassenger(undefined);
                    setOrderCheckResult(0);
                    setNewOrder([]);
                }}>
                    <Ionicons name={"arrow-back-outline"} size={24} color={"#000"} style={{ alignSelf: "flex-start" }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                    props.setSelectedShuttle(shuttleDetail);
                    setShuttleDetail(undefined);
                    navigation.navigate("Map");
                    setSelectedPassenger(undefined);
                }}>
                    <Ionicons name={"ios-map-outline"} size={24} color={"#000"} style={{ alignSelf: "flex-end" }} />
                </TouchableOpacity>

            </View>

            <ShuttleCard></ShuttleCard>
        </View>
    }

    return (
        <View style={styles.homeContainer}>
            <View style={{ flex: 1, margin: 20 }}>
                <FlatList
                    style={styles.flatShuttleContainer}
                    data={props.shuttleItems}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ShuttleItemView}
                    keyExtractor={(item, indexList) => indexList.toString()}
                    key={"shuttleList"}
                />
                <FullScreenModal changeVisible={setShuttleDetailContentVisibility} visible={shuttleDetailContentVisibility} content={ShuttleDetailContent} ></FullScreenModal>
                <FullScreenModal changeVisible={setMessageModalVisibility} visible={messageModalVisibility} content={MessageInformationContent} ></FullScreenModal>
            </View>
        </View>
    );
}

const mapStateToProps = (state: any) => {
    const selectedShuttle = state.rootReducer.selectedShuttle;
    const selectedSchool = state.rootReducer.selectedSchool;
    const selectedDriver = state.rootReducer.selectedDriver;
    const passengersOfTheShuttle = state.rootReducer.passengersOfTheShuttle;
    const shuttleDetail = state.rootReducer.shuttleDetail;
    const selectedUser = state.rootReducer.selectedUser;
    const shuttleItems = state.rootReducer.shuttleItems;
    const driverItems = state.rootReducer.driverItems;
    const shuttleActiveItems = state.rootReducer.shuttleActiveItems as Shuttle[];
    return { driverItems, selectedShuttle, selectedSchool, selectedDriver, passengersOfTheShuttle, shuttleDetail, selectedUser, shuttleItems, shuttleActiveItems };
};

export default connect(mapStateToProps, {
    setSelectedShuttle,
    showMessage,
    setPassengersOfTheShuttle,
    addPassengerNotficationDistance,
    setShuttleItems,
})(ShuttleList);