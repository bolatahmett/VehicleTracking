import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../constants/style";

const CardTableItem = (props: any) => {
    return <View style={{ flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-evenly" }}>
        <Text style={styles.leftCardText}> {props.leftItem}</Text>
        <Text style={styles.rightCardText}> {`${props.rightItem}`}</Text>
    </View>;
}

export default CardTableItem;