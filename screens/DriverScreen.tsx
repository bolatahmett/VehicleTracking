import React, { useEffect } from 'react';
import { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import styles from '../constants/style';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Ionicons } from '@expo/vector-icons';
import ItemSeparatorView from '../components/ItemSeperatorView';
import { getTableItems } from '../dto/ServerHelper';
import { Driver } from '../model/Driver';
import DriverDetail from '../components/DriverDetail';

function DriverScreen(props: any) {

    const [driverItems, setDriverItems] = useState([] as Driver[]);
    const [selectedDriver, setSelectedDriver] = useState(undefined as Driver | undefined);

    useEffect(() => {

        getTableItems("Driver").then((result: Driver[]) => {

            const items = result.filter((driverItem: Driver) => {
                return props.selectedUser.Organization.toString() === driverItem.Organisation.toString();
            });
            if (!(items && items.length > 0)) {
                return;
            }

            setDriverItems(items);

        }).catch((error) => {
            props.showMessage("Sürücü bilgileri alınırken hata oluştu tekrar deneyiniz!");
            return false;
        });

    }, [])

    const DriverView = ({ item }: any) => {
        return <TouchableOpacity style={{ flexDirection: "row", marginBottom: 5, marginTop: 5 }}
            onPress={() => { setSelectedDriver(item) }}>
            <Ionicons name={"person-circle"} size={25} style={{ marginRight: 10 }} />
            <Text style={styles.cardText}>{`${item?.Name}`}</Text>
        </TouchableOpacity>
    }

    return (
        <View style={styles.homeContainer}>
            {!selectedDriver && <View style={styles.homeContainer}>

                <FlatList
                    style={styles.flatShuttleContainer}
                    data={driverItems}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={DriverView}
                    keyExtractor={(item, indexList) => indexList.toString()}
                    key={"searchedDriverList"}
                />
            </View>}
            {
                selectedDriver && <DriverDetail passenger={selectedDriver} setSelectedDriver={setSelectedDriver}></DriverDetail>
            }
        </View>
    );
}

const mapStateToProps = (state: any) => {
    const selectedUser = state.rootReducer.selectedUser;
    const shuttleItems = state.rootReducer.shuttleItems;
    return { selectedUser, shuttleItems };
};

export default connect(mapStateToProps, {
})(DriverScreen);
