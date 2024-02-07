/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */
import * as Linking from 'expo-linking';
var linking = {
    prefixes: [Linking.makeUrl('/')],
    config: {
        screens: {
            Root: {
                screens: {
                    Login: {
                        screens: {
                            LoginScreen: 'login',
                        },
                    },
                    Home: {
                        screens: {
                            Home: 'home',
                        },
                    },
                    PassengerDetail: {
                        screens: {
                            PassengerDetail: 'assengerDetail',
                        },
                    },
                    Map: {
                        screens: {
                            MapScreen: 'map',
                        },
                    }
                },
            },
            Modal: 'modal',
            NotFound: '*',
        },
    },
};
export default linking;
