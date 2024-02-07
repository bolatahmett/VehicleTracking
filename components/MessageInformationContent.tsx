import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useState } from "react";
import { Alert, TextInput, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { sendSpecificSMSToParents } from "../helper/bulkSmsHelper";

const MessageInformationContent = (props: any) => {

    const [smsContent, setSmsContent] = useState("");

    return <View style={{ flex: 1 }}>
        <TextInput
            multiline={true}
            numberOfLines={8}
            style={{ borderWidth: 0.6, borderColor: "black", borderRadius: 4, marginTop: 30, margin: 10 }}
            placeholder={"Mesajınz.."}
            onChangeText={(text) => setSmsContent(text)}
            value={smsContent}
        />
        <TouchableOpacity
            style={{
                marginTop: 20,
                justifyContent: "flex-end",
                alignSelf: "flex-end",
            }}
            onPress={() => {
                if (smsContent && smsContent.length > 20) {

                    Alert.alert('', 'Mesaj gönderilecek emin misiniz?', [
                        {
                            text: 'Evet', onPress: () => {
                                sendSpecificSMSToParents(props.selectedShuttle.Id, smsContent)
                            }
                        },
                        {
                            text: 'Hayır',
                            onPress: () => { },
                            style: 'cancel',
                        },
                    ]);
                } else {
                    Alert.alert("", "Mesaj alanı boş veya 20 karakterden az olamaz!")
                }
            }}>
            <LinearGradient
                colors={["#FF8A65", "#fb5b5a", "#FF8A65"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.9 }}
                style={{
                    elevation: 8,
                    borderRadius: 10,
                    paddingVertical: 5,
                    paddingHorizontal: 6,
                    minWidth: 70,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text style={{ color: "white", fontSize: 12 }} >{"Mesaj Gönder"}</Text>
            </LinearGradient>
        </TouchableOpacity>
    </View>
}

const mapStateToProps = (state: any) => {
    const selectedShuttle = state.rootReducer.selectedShuttle;
    const shuttleDetail = state.rootReducer.shuttleDetail;
    return { selectedShuttle, shuttleDetail };
};

export default connect(mapStateToProps, {

})(MessageInformationContent);