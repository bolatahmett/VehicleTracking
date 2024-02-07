import React from "react";
import { Text, View } from "react-native";
import styles from "../constants/style";

const NotFoundShuttle = (props: any) => {
    return (
        <View style={{ backgroundColor: "#f8f7f7eb", flexDirection: "column", justifyContent: "center", alignItems: 'center' }}>
            <Text style={styles.notFoundShuttleText}>{"Size atanmış servis bulunamadı!"}</Text>
            <Text style={styles.notFoundShuttleText}>{"Lütfen sistem yöneticiniz ile iletişime geçiniz."}</Text>
        </View>
    )
}

export default (NotFoundShuttle)