import React, { useEffect, useState } from "react";
import { Modal, View } from "react-native";
import getRandomKey from "../helper/randomKey";

const FullScreenModal = (props: any) => {

    return <Modal
        key={getRandomKey()}
        animationType="slide"
        transparent={false}
        visible={props.visible}
        onRequestClose={() => { props.changeVisible(false) }}
    >
        <View style={{
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: "white",
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            flex: 1,
        }}>

            <props.content></props.content>

        </View>
    </Modal>;
}

export default FullScreenModal;