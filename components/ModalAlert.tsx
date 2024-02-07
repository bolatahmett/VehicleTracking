import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Passenger } from "../model/Passenger";
import PlaySound from "./PlaySound";

interface ModalAlertProps {
    setModalContentVisible: any;
    content: any[];
}

const ModalAlert = (props: ModalAlertProps) => {

    const [nextPassengerContent, setNextPassengerContent] = useState(-1)

    // const allCOntent = props.content.map((item) => {

    //     const passengerIndex = props.passengersOfTheShuttle.findIndex(x => x.Id === item.Index);

    //     console.log(`indexof passenger 3 ${passengerIndex}`)

    //     return item &&
    //         <Modal
    //             key={item.Index}
    //             animationType="slide"
    //             transparent={true}
    //             visible={item.Visible}
    //             onRequestClose={() => {
    //                 props.setModalContentVisible(item.Index, !item.Visible);
    //             }}
    //             style={{ zIndex: (8000 - passengerIndex) }}
    //         >
    //             <View style={styles.centeredView}>
    //                 <View style={styles.modalView}>
    //                     {item.Value}
    //                     {/* <Pressable
    //                         style={[styles.button, styles.buttonClose]}
    //                         onPress={() => props.setModalContentVisible(item.Index, !item.Visible)}
    //                     >
    //                         <Text style={styles.textStyle}>X</Text>
    //                     </Pressable> */}
    //                 </View>
    //             </View>
    //         </Modal>
    // })

    useEffect(() => {
        if (props.content && props.content.length > 0 && nextPassengerContent != props.content[0].Index) {
            props.content.length > 0 && console.log(props.content[0].Index)
            setNextPassengerContent(props.content[0].Index)
            PlaySound(1)
        }
    })

    const allCOntent = props.content && props.content.length > 0 &&
        <Modal
            key={props.content[0].Index}
            animationType="slide"
            transparent={true}
            visible={props.content[0].Visible}
            onRequestClose={() => {
                props.setModalContentVisible(props.content[0].Index, !props.content[0].Visible);
            }}
            style={{ backgroundColor: "black" }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {props.content[0].Value}
                </View>
            </View>
        </Modal>


    return (
        <View>
            {allCOntent}
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        flexDirection: 'row',
        minHeight: 600,
    },
    modalView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        alignSelf: 'center'
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        position: "absolute",
        right: 0,
    },
    textStyle: {
        color: "red",
        textAlign: "center",
        width: 15,
        height: 15,
        fontSize: 11,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: "white"
    }
});

export default ModalAlert;