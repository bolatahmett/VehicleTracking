import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "../constants/style";
import { Card } from "react-native-elements";
import CardTableItem from "./CarTableItem";

const DriverDetail = (props: any) => {
    return (
        <View style={[styles.modalView, { flex: 1 }]}>
            <View style={{ flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-evenly" }}>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => { props.setSelectedDriver(undefined) }}>
                    <Ionicons name={"arrow-back-outline"} size={24} color={"#000"} style={{ alignSelf: "flex-start" }} />
                </TouchableOpacity>
            </View>

            <Card containerStyle={styles.shuttleCard}>
                <Card.Title>{`${props.passenger.Name}`}</Card.Title>
                <Card.FeaturedSubtitle h4></Card.FeaturedSubtitle>
                <CardTableItem leftItem={`Cep No:`} rightItem={props.passenger.PhoneNumber} />
                <Card.Divider />
                <CardTableItem leftItem={`Plaka No:`} rightItem={props.passenger.CarId} />
                <Card.Divider />
                <CardTableItem leftItem={`Servis:`} rightItem={props.passenger.ShuttleId} />
                <Card.Divider />
            </Card>
        </View>
    )
}

export default DriverDetail;