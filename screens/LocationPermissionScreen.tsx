import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import styles from '../constants/style';
import * as Location from 'expo-location';
import { showMessage } from '../redux/actions/actions';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import requestPermissions from '../helper/requestPermissions';

const LocationPermissionScreen = (props: any) => {

    const [granted, setGranted] = useState(false);
    const navigation = useNavigation();

    return (
        <View style={styles.permissionView}>
            <Image
                style={styles.permissionImage}
                source={require("./../assets/images/icon.png")}
            />
            <Text style={styles.permissionText}>Konum erişimi</Text>
            <Text style={styles.permissionText}>{"Basbus sürücü, uygulama kapalıyken veya kullanımda değilken bile servis takibini etkinleştirmek için konum verilerini toplar."}</Text>
            <Text style={styles.permissionText}>{"Konum servislerini açmak, aşağıdaki gibi özellikleri sağlamamıza olanak tanır:"}</Text>
            <Text style={styles.permissionText}>{"* Servis aracının, öğrenci konumuna yaklaştığında, veliye bildirim gönderilmesi,"}</Text>
            <Text style={styles.permissionText}>{"* Servis aracının konumunun, veliler ile harita aracılığıyla paylaşılması,"}</Text>
            <TouchableOpacity
                style={{ alignSelf: "flex-end", marginTop: 20 }}
                onPress={() => { requestPermissions(setGranted, null); navigation.navigate("Home"); }}
            >
                <LinearGradient
                    colors={["#FF8A65", "#fb5b5a", "#FF8A65"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 0.9 }}
                    style={styles.permissionLButton}
                >
                    <Text style={styles.loginText} >{"Devam Et"}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = (state: any) => {
    return {};
};

export default connect(mapStateToProps, {
    showMessage,
})(LocationPermissionScreen);