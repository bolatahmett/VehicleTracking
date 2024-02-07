import React, { useEffect, useState } from 'react';
import { Alert, TextInput, TouchableOpacity, Image, Text, View, Linking, ImageBackground, Platform } from 'react-native';
import styles from '../constants/style';
import { getTableItemsWithPath, getTableItemWithId, updateItemOnDbWithPath } from '../dto/ServerHelper';
import { Driver } from '../model/Driver';
import { connect } from 'react-redux';
import { setUser, setSchool, setSelectedShuttle, setDriverItems, setShuttleItems } from '../redux/actions/actions';
import { useNavigation } from '@react-navigation/native';
import { getRememberedUser, rememberUser } from '../helper/userRememberHelper';
import registerForPushNotificationsAsync from '../helper/registerForPushNotificationsAsync';
import { School } from '../model/School';
import * as Network from 'expo-network';
import Loading from '../components/Loading';
import Constants from 'expo-constants';
import { User } from '../model/User';
import { Shuttle } from '../model/Shuttle';

function LoginScreen(props: any) {

    const navigation = useNavigation();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [expoPushToken, setExpoPushToken] = useState('');
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', (e: any) => {
            setLoading(false);
        });
        return unsubscribe;
    }, [props.navigation]);

    useEffect(() => {
        setLoading(false)
        getRememberedUser(props.showMessage, setUserName, setPassword, loginByInfo);
    }, [])

    useEffect(() => {
        if (props.selectedUser) {
            setSchoolInformation(props.selectedUser);
            setDriverInformation(props.selectedUser);
            setShuttleInformation(props.selectedUser);
            saveExpoPushToken(props.selectedUser);
        }
    }, [props.selectedUser])

    useEffect(() => {

        if (props.selectedUser && props.selectedSchool) {
            navigation.navigate('Home');
        }

    }, [props.selectedUser, props.selectedSchool])

    const showAlert = (value: string) => {
        setLoading(false);
        Alert.alert("", value);
    }

    const saveExpoPushToken = (user: User) => {
        registerForPushNotificationsAsync().then((token: any) => {
            setExpoPushToken(token);
            updateItemOnDbWithPath(`/ManagerUserNotification/${user.Organization}/${user.Id}`, token);
        });
    }

    const setSchoolInformation = (user: User) => {
        getTableItemWithId<any>("School", user.Organization.toString() ? user.Organization.toString() : "1").then((result: any) => {
            props.setSchool(result);
        }).catch(() => {
            showAlert("Okul bilgileri alınırken hata oluştu!");
        });
    }

    const setDriverInformation = (user: User) => {
        getTableItemsWithPath("Driver").then((response: any) => {

            var driverItems = Object.keys(response).map(id => {
                var driver = response[id] as Driver;
                driver.Id = id;
                return driver;
            })

            props.setDriverItems(driverItems);

        }).catch((error) => {
            console.log(error)
            showAlert("Sürücü bilgileri alınırken hata oluştu!");
        });
    }

    const setShuttleInformation = (user: User) => {

        if (props.shuttleItems && props.shuttleItems.length > 0) {
            return;
        }

        getTableItemsWithPath("Shuttle").then((response: any) => {

            var shuttleResponseItems = Object.keys(response).map(id => {
                var shuttle = response[id] as Shuttle;
                shuttle.Id = id;
                return shuttle;
            })

            const items = shuttleResponseItems.filter((shuttleItem: Shuttle) => {
                return user.Organization.toString() === shuttleItem.Organisation.toString();
            });

            if (!(items && items.length > 0)) {
                return;
            }

            items.sort(
                function (a, b) {
                    if (a.Direction === b.Direction) {
                        return a.ShuttleTime > b.ShuttleTime ? 1 : -1;
                    }
                    return b.Direction > a.Direction ? 1 : -1;
                });

            props.setShuttleItems(items);

        }).catch((error) => {
            props.showMessage("Servis bilgileri alınırken hata oluştu tekrar deneyiniz!");
            return false;
        });
    }

    const login = () => {
        loginByInfo(userName, password);
    }

    const loginByInfo = (name: string, pass: string) => {

        setLoading(true);
        props.setSchool(null)
        props.setSelectedShuttle(null)
        props.setUser(null)

        if (!name) {
            showAlert("Lütfen geçerli bir kullanıcı adı girin!");
            return false;
        }

        if (!pass) {
            showAlert("Lütfen geçerli bir şifre girin!");
            return false;
        }

        Network.getNetworkStateAsync().then((networkResult: Network.NetworkState) => {
            if (!networkResult.isConnected || !networkResult.isInternetReachable) {
                showAlert("Lütfen internet bağlantınızı kontrol edin!");
                return false;
            }

            getTableItemWithId("AppVersion", "AndroidManagment").then((result) => {

                if (result !== Constants.manifest?.version) {


                    Alert.alert('', 'Uygulamanın güncel versiyonu mevcut!', [

                        {
                            text: 'Güncelle', onPress: () => {
                                setLoading(false);
                                if (Platform.OS === "android") {
                                    Linking.openURL("https://play.google.com/store/apps/details?id=com.basbus.driver");
                                }

                                // if(Platform.OS === "ios"){
                                //     Linking.openURL("https://apps.apple.com/tr/app/basbus-veli/id6443497043?l=tr");
                                // }
                            }
                        },
                        {
                            text: 'Daha sonra',
                            onPress: () => { getInfoAndLogin(name, pass) },
                            style: 'cancel',
                        },
                    ]);


                } else {
                    getInfoAndLogin(name, pass)
                }
            })
        }).catch(() => {
            showAlert("Lütfen internet bağlantınızı kontrol edin!");
        })

    }

    const getInfoAndLogin = (name: string, pass: string) => {
        getTableItemWithId<User>("User", name).then((userInfo: User) => {
            if (userInfo) {
                if (userInfo.Password.toString() === pass.toString()) {
                    userInfo.Id = name;

                    props.setUser(userInfo);

                    rememberUser(userInfo, props.showMessage);

                } else {
                    showAlert("Şifre hatalı lütfen tekrar deneyiniz!");
                    return false;
                }
            } else {
                showAlert("Kullanıcı bulunamadı!");
                return false;
            }
        }).catch((error: any) => {
            showAlert("Giriş yapılırken beklenmedik bir hata ile karşılaşıldı. Tekrar deneyiniz!");
            return false;
        });
    }

    return (
        isLoading ? <Loading text={"Giriş yapılıyor."}></Loading> : <View style={styles.container}>
            <Image
                style={{ width: 140, height: 140 }}
                source={require("./../assets/images/icon.png")}
            />
            <Text style={styles.logo}>Öğrenci Servisi Yönetim Uygulaması </Text>
            <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder="Kullanıcı adı..."
                    placeholderTextColor="#948f8fc9"
                    onChangeText={text => setUserName(text)} />
            </View>
            <View style={styles.inputView} >
                <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Şifre..."
                    placeholderTextColor="#948f8fc9"
                    onChangeText={text => setPassword(text)} />
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={login}>
                <Text style={styles.loginText}>{"Giriş"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.changeLoginType} onPress={() => { Alert.alert("Basbus", `"Destek" butonunu kullanarak sistem yöneticisi ile iletişime geçebilirsiniz!`) }}>
                <Text style={{ color: "black", fontSize: 12 }}>{"Şifremi Unuttum!"}</Text>
            </TouchableOpacity>
            <Text style={styles.locationUsage} onPress={() => { Linking.openURL('http://www.pamasoftware.com/') }}>PAMA Software Solutions</Text>
            <TouchableOpacity style={{
                alignSelf: 'flex-end',
                position: 'absolute',
                bottom: 15,
                left: 15,
                zIndex: 100
            }} onPress={() => {
                Linking.openURL(
                    'http://api.whatsapp.com/send?phone=+905397039090'
                );
            }}>
                <ImageBackground
                    style={{ width: 80, height: 20, backgroundColor: "#fb5b5a", borderRadius: 4 }}
                    resizeMode="stretch"
                    source={require("./../assets/images/basbus-destek-logo2.png")}
                >
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );
}

const mapStateToProps = (state: any) => {
    const selectedSchool = state.rootReducer.selectedSchool as School;
    const selectedUser = state.rootReducer.selectedUser as User;
    return { selectedSchool, selectedUser };
};

export default connect(mapStateToProps, {
    setSelectedShuttle,
    setSchool,
    setUser,
    setDriverItems,
    setShuttleItems,
})(LoginScreen);