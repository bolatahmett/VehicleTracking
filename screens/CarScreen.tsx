import React, { useEffect } from 'react';
import { useState } from 'react';
import { Text, FlatList, TouchableOpacity, View, Alert, Modal, Animated, useWindowDimensions } from 'react-native';
import styles from '../constants/style';
import { getTableItems } from '../dto/ServerHelper';
import ItemSeparatorView from '../components/ItemSeperatorView';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Car } from '../model/Car';
import { Card } from 'react-native-elements';

function CarScreen(props: any) {

    const [cardDetail, setCarDetail] = useState(undefined as unknown as Car | undefined);
    const navigation = useNavigation();
    const [carItems, setCarItems] = useState([] as Car[]);

    useEffect(() => {
        if (carItems.length === 0) {
            getTableItems("Car").then((result: any[]) => {

                const items = result.filter((item) => {
                    return item.Organisation === props.selectedUser.Organization.toString();
                });

                setCarItems(items);
            });
        }
    }, [])

    const CarItemView = ({ item }: any) => {
        return <TouchableOpacity
            style={{ height: 40, flex: 2 }}
            onPress={() => { setCarDetail(item); }}>
            <View style={{ flexDirection: "row" }}>
                <FontAwesome
                    name="bus"
                    size={18}
                    color={item.IsActive ? "green" : "red"}
                    style={{ alignSelf: "center", flex: 1 }}
                />

                <Text style={{ color: "black", flex: 2 }}>{`${item.CarNumberPlate}`}</Text>
            </View>
        </TouchableOpacity>
    }

    const CarDetailView = () => {
        return <TouchableOpacity style={{ flex: 1, flexDirection: "column", marginBottom: 5, marginTop: 5, justifyContent: "center", width: "100%" }}>
            <Card containerStyle={styles.shuttleCard}>
                <Card.Title style={styles.cardText}> {`${cardDetail?.CarNumberPlate}`}</Card.Title>
                <Card.Divider style={{ marginTop: 10 }} />
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.boldCardText}> {`Öğrenci Sayısı: `}</Text>
                    <Text style={styles.cardText}> {cardDetail?.PassengerCount}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.boldCardText}> {`KM: `}</Text>
                    <Text style={styles.cardText}> {cardDetail?.KM}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.boldCardText}> {`Sigorta Tarihi: `}</Text>
                    <Text style={styles.cardText}> {cardDetail?.InsuranceDate}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.boldCardText}> {`Muayne tarihi: `}</Text>
                    <Text style={styles.cardText}> {cardDetail?.VehicleInspectionDate}</Text>
                </View>
            </Card>
        </TouchableOpacity>
    }

    return (
        <View style={styles.homeContainer}>
            <View style={{ flex: 1, margin: 20 }}>
                <FlatList
                    style={styles.flatShuttleContainer}
                    data={carItems}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={CarItemView}
                    keyExtractor={(item, indexList) => indexList.toString()}
                    key={"carItems"}
                />
                <Modal
                    key={"CarDetailModal"}
                    animationType="slide"
                    transparent={true}
                    visible={cardDetail !== undefined}
                >
                    <View style={[styles.carModalView]}>
                        <View style={{ flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-evenly" }}>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => { setCarDetail(undefined) }}>
                                <Ionicons name={"arrow-back-outline"} size={24} color={"#000"} style={{ alignSelf: "flex-start" }} />
                            </TouchableOpacity>
                        </View>
                        <CarDetailView />
                    </View>
                </Modal>
            </View>
        </View>
    );
}

const mapStateToProps = (state: any) => {
    const selectedUser = state.rootReducer.selectedUser;
    return { selectedUser };
};

export default connect(mapStateToProps, {

})(CarScreen);