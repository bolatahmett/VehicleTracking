import React from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
var ModalAlert = function (props) {
    return (React.createElement(Modal, { animationType: "slide", transparent: true, visible: props.modalVisible, onRequestClose: function () {
            props.setModalVisible(!props.modalVisible);
        } },
        React.createElement(View, { style: styles.centeredView },
            React.createElement(View, { style: styles.modalView },
                props.content,
                React.createElement(Pressable, { style: [styles.button, styles.buttonClose], onPress: function () { return props.setModalVisible(!props.modalVisible); } },
                    React.createElement(Text, { style: styles.textStyle }, "X"))))));
};
var styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: '#003f5c',
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        position: "absolute",
        right: 0,
    },
    textStyle: {
        color: "white",
        textAlign: "center",
        width: 15,
        height: 15,
        fontSize: 11
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
export default ModalAlert;
