import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, Linking, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { userLogout } from '../redux/actions/actions';
import ItemSeparatorView from './ItemSeperatorView';

function CustomDrawerContent(props: any) {
    const navigation = useNavigation();

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
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, justifyContent: "space-around" }}>
            <View style={{ flex: 1 }}>
                <DrawerItemList {...props} />
            </View>
            <View>
                <ItemSeparatorView></ItemSeparatorView>
                <DrawerItem
                    label="Destek"
                    onPress={() => Linking.openURL(
                        'http://api.whatsapp.com/send?phone=+905397039090'
                    )}
                    icon={() => {
                        return <Ionicons
                            name="md-help"
                            size={24}
                            color={'#ccc'}
                        />
                    }}
                />
                <DrawerItem
                    label="Çıkış"
                    onPress={logout}
                    icon={() => {
                        return <Ionicons
                            name="md-exit"
                            size={24}
                            color={'#ccc'}
                        />
                    }}
                />
            </View>
        </DrawerContentScrollView>
    );
}

const mapStateToProps = (state: any) => {
    return {};
};

export default connect(mapStateToProps, {
    userLogout,
})(CustomDrawerContent);