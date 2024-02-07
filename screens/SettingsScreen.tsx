import React, { useRef, useState } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, Linking } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import styles from '../constants/style';
import ItemSeparatorView from '../components/ItemSeperatorView';
import EditPersonalInfo from '../components/EditPersonalInfo';
import { useNavigation } from '@react-navigation/native';
import { setDriver, showMessage, userLogout } from '../redux/actions/actions';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SettingsScreen(props: any) {

    const navigation = useNavigation();
    const [action, setAction] = useState(0);

    const logout = () => {

        if (props.isShuttleStarted) {
            props.showMessage("Aktif servis mevcut. Lütfen önce servisi tamamlayın!");
            return;
        }

        forgetUser();
        props.userLogout();
        navigation.navigate('Login');
    }

    const forgetUser = async () => {
        try {
            await AsyncStorage.clear();
        } catch (error) {
        }
    };

    return (
        <View style={styles.container}>
            {/* <ItemSeparatorView />
            <View style={{ backgroundColor: "#f8f7f7eb", flexDirection: "row", justifyContent: 'center', alignItems: 'stretch' }}>
                {
                    // @ts-ignore
                    <FontAwesome
                        name="user-circle"
                        size={25}
                        color={"black"}
                        style={{ margin: 5 }}
                    />
                }
                <TouchableOpacity onPress={() => setAction(1)} style={{
                    width: "80%",
                    backgroundColor: "#fb5b5a",
                    borderRadius: 10,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 5
                }}>
                    <Text style={styles.setttingsMenuText}>{"Kişisel bilgileri"}</Text>
                </TouchableOpacity>
            </View> */}
            <ItemSeparatorView />
            <View style={{ backgroundColor: "#f8f7f7eb", flexDirection: "row", justifyContent: 'center', alignItems: 'stretch' }}>
                {
                    // @ts-ignore
                    <FontAwesome
                        name="phone"
                        size={25}
                        color={"black"}
                        style={{ margin: 5 }}
                    />
                }

                <TouchableOpacity style={{
                    width: "80%",
                    backgroundColor: "#fb5b5a",
                    borderRadius: 10,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 5
                }} onPress={() => {
                    Linking.openURL(
                        'http://api.whatsapp.com/send?phone=+905397039090'
                    );
                }}>
                    <Text style={styles.setttingsMenuText}>{"Destek"}</Text>
                </TouchableOpacity>
            </View>
            <ItemSeparatorView />
            <View style={{ backgroundColor: "#f8f7f7eb", flexDirection: "row", justifyContent: 'center', alignItems: 'stretch' }}>
                {
                    // @ts-ignore
                    <FontAwesome
                        name="bell"
                        size={25}
                        color={"black"}
                        style={{ margin: 5 }}
                    />
                }
                <TouchableOpacity onPress={logout} style={{
                    width: "80%",
                    backgroundColor: "#fb5b5a",
                    borderRadius: 10,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 5
                }}>
                    <Text style={styles.setttingsMenuText}>{"Çıkış"}</Text>
                </TouchableOpacity>
            </View>
            <ItemSeparatorView />
            <View style={{ marginTop: 30, flexDirection: "row", justifyContent: 'center', alignItems: 'stretch', flex: 1 }}>
                <View style={{ backgroundColor: "#f8f7f7eb", height: "100%", width: "100%" }}>
                    {action === 1 && <EditPersonalInfo />}
                </View>
            </View>
        </View>
    );
}

const mapStateToProps = (state: any) => {
    const selectedDriver = state.rootReducer.selectedDriver;
    const isShuttleStarted = state.rootReducer.isShuttleStarted;
    return { selectedDriver, isShuttleStarted };
};

export default connect(mapStateToProps, {
    setDriver,
    showMessage,
    userLogout,
})(SettingsScreen);