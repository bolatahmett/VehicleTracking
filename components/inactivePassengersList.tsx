import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import styles from "../constants/style";
import { setInactivePassengers, setSelectedShuttle } from "../redux/actions/actions";
import ItemSeparatorView from "./ItemSeperatorView";


const InactivePassengersList = (props: any) => {

    const PassengerItemView = ({ item }: any) => {
        return <Text style={{ color: "red", fontWeight: "bold", margin: 5, padding: 5 }}>
            <FontAwesome
                name="user-circle"
                size={18}
                color={"red"}
            />
            {`  ${item.PassengerName}`}</Text>
    }

    return (
        <View style={[styles.modalView, { minHeight: 400 }]}>
            <Text style={{ fontWeight: "bold", marginBottom: 20 }}>{"Servis Kullanmayacaklar"}</Text>
            <FlatList
                style={styles.flatShuttleContainer}
                data={props.inactivePassengers}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={PassengerItemView}
                keyExtractor={(item, index) => index.toString()}
                key={"inactivePassengerList"}
            />
            <TouchableOpacity
                onPress={() => props.setModalVisibility(false)}>
                <LinearGradient
                    colors={["#FF8A65", "#fb5b5a", "#FF8A65"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 0.9 }}
                    style={styles.appButtonContainer}
                >
                    <Text style={{ color: "white", fontSize: 12 }} >{"Tamam"}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )

}

const mapStateToProps = (state: any) => {
    const selectedShuttle = state.rootReducer.selectedShuttle;
    const inactivePassengers = state.rootReducer.inactivePassengers;
    return { selectedShuttle, inactivePassengers };
};

export default connect(mapStateToProps, {
    setSelectedShuttle,
    setInactivePassengers
})(InactivePassengersList);