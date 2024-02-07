import { Dimensions, StyleSheet } from 'react-native';

const stylesTab = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        borderColor: 'black',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: '#f8f7f7eb',
        borderRadius: 20,
    },
    tabItem: {
        alignItems: 'center',
        padding: 16,
        borderColor: 'black',
        borderRadius: 20,
        backgroundColor: '#f8f7f7eb',
    },
    bodyContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f8f7f7eb'
    },
    tinyLogo: {
        width: 180,
        height: 150,
    },
    dateButton: {
        width: "100%",
        backgroundColor: "black",
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        marginTop: 5
    },
    historyOfShuttleContainer: {
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
        flex: 1,
    },
    calendarText: {
        color: "black",
        padding: 5,
        paddingLeft: 50,
        paddingRight: 50,
    },
    calendarContainer: {
        width: '80%',
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#5a92a1'
    }
});

export default stylesTab;