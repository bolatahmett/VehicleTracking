import React, { useEffect } from 'react';
import { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import styles from '../constants/style';
import { connect } from 'react-redux';
import _ from 'lodash';
import SearchComponent from '../components/SearchComponent';
import { endAt, endBefore, equalTo, get, limitToFirst, orderByChild, query, ref, startAfter, startAt } from 'firebase/database';
import { database } from '../dto/FireBaseDB';
import { Passenger } from '../model/Passenger';
import { Ionicons } from '@expo/vector-icons';
import ItemSeparatorView from '../components/ItemSeperatorView';
import PassengerDetail from '../components/PassengerDetail';
import { SearchBar } from 'react-native-elements';

function PassengerScreen(props: any) {

    const [searchTerm, setSearchTerm] = useState("");
    const [passengerItems, setPassengerItems] = useState([] as Passenger[]);
    const [selectedPassenger, setSelectedPassenger] = useState(undefined as Passenger | undefined);

    const handleOnChange = (text: string) => {
        setSearchTerm(text);
    }

    const onSearchClear = () => setSearchTerm("");

    useEffect(() => {
        if (searchTerm && searchTerm.length > 1) {
            get(query(ref(database, 'Passenger'), orderByChild('PassengerName'), startAt(searchTerm.toLocaleUpperCase()), endAt(searchTerm.toLocaleUpperCase() + "\uf8ff")))
                .then((snapshot) => {

                    var result = snapshot.val();

                    if (result) {

                        var passengers = Object.keys(result).map(id => {
                            var passenger = result[id] as Passenger;
                            passenger.Id = id;
                            return passenger;
                        })

                        const items = passengers.filter((passenger: Passenger) => {
                            return props.selectedUser.Organization.toString() === passenger.Organisation.toString();
                        });

                        setPassengerItems(items);
                    } else {
                        setPassengerItems([]);
                    }

                });
        } else {
            setPassengerItems([]);
        }

    }, [searchTerm])

    const PassengersView = ({ item }: any) => {
        return <TouchableOpacity style={{ flexDirection: "row", marginBottom: 5, marginTop: 5 }}
            onPress={() => { setSelectedPassenger(item) }}>
            <Ionicons name={"person-circle"} size={25} style={{ marginRight: 10 }} />
            <Text style={styles.cardText}>{`${item?.PassengerName}`}</Text>
        </TouchableOpacity>
    }

    return (
        <View style={styles.homeContainer}>
            {!selectedPassenger && <View style={styles.homeContainer}>
                <SearchBar
                    placeholder="Öğrenci Adı..."
                    onChangeText={handleOnChange as any}
                    value={searchTerm} platform={'ios'}
                    onClear={onSearchClear}
                    autoCompleteType={undefined}
                    showLoading={false} cancelButtonTitle={''} showCancel={false} lightTheme={false} round={false}
                />
                <FlatList
                    style={styles.flatShuttleContainer}
                    data={passengerItems}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={PassengersView}
                    keyExtractor={(item, indexList) => indexList.toString()}
                    key={"searchedPassengerList"}
                />
            </View>}
            {
                selectedPassenger && <PassengerDetail passenger={selectedPassenger} setSelectedPassenger={setSelectedPassenger}></PassengerDetail>
            }
        </View>
    );
}

const mapStateToProps = (state: any) => {
    const selectedUser = state.rootReducer.selectedUser;
    return { selectedUser };
};

export default connect(mapStateToProps, {

})(PassengerScreen);