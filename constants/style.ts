import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'react-native-elements';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f7f7eb',
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeContainer: {
        backgroundColor: '#f8f7f7eb',
        justifyContent: 'center',
        alignSelf: 'stretch',
        height: '100%',
    },
    shuttleListContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 40,
        width: "90%",
        backgroundColor: "white",
        borderRadius: 4,
        borderWidth: 0.1,
        alignSelf: "center",
        height: "auto",
    },
    logo: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#fb5b5a",
        marginBottom: 40,
        textAlignVertical: "center", textAlign: "center",
    },
    locationUsage: {
        fontSize: 10,
        color: "#948f8fc9",
        textAlignVertical: "center",
        textAlign: "center",
        marginTop: 20,
    },
    inputView: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 25,
        borderColor: "black",
        borderWidth: 0.3,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "black"
    },
    forgot: {
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10
    },
    changeLoginType: {
        width: "30%",
        backgroundColor: "white",
        borderRadius: 20,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    loginText: {
        color: "white"
    },
    item: {
        padding: 5,
        fontSize: 14,
        height: 32,
    },
    headerItem: {
        padding: 5,
        fontSize: 20,
        height: 40,
        color: "white",
    },
    trackBtn: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        height: 50,
        position: 'absolute',
        bottom: 20,
        padding: 10,
        right: 20,
        borderWidth: 0.2,
        width: 150
    },
    shuttleListButton: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        height: 50,
        position: 'absolute',
        bottom: 20,
        padding: 10,
        right: 20,
        borderWidth: 0.2,
        width: 150,
        zIndex: 50000
    },
    mapRecenterButton: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        height: 40,
        position: 'absolute',
        bottom: 80,
        backgroundColor: "#89b8a21a",
        padding: 10,
        right: 20,
        borderWidth: 0.2,
    },
    mapSpeedInfo: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        height: 40,
        position: 'absolute',
        bottom: 140,
        backgroundColor: "#89b8a21a",
        padding: 10,
        right: 20,
        borderWidth: 0.2
    },
    driverAnswerButtonAccept: {
        width: "80%",
        backgroundColor: "green",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
        fontSize: 20
    },
    driverAnswerButtonReject: {
        width: "80%",
        backgroundColor: "red",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
        fontSize: 20
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    flatContainer: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        maxHeight: 80,
    },
    flatShuttleContainer: {
        flexDirection: 'column',
        height: "auto",
        borderRadius: 10,
    },
    shuttleCard: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 0,
        marginBottom: 2,
        width: "80%"
    },
    listItemContentTitle: {
        fontWeight: 'bold'
    },
    cardText: {
        color: "black",
        fontSize: 11,
    },
    boldCardText: {
        color: "black",
        fontSize: 11,
        fontWeight: "bold",
    },
    leftCardText: {
        color: "black",
        fontSize: 11,
        fontWeight: "bold",
        alignSelf: "flex-start",
        width: "40%"
    },
    rightCardText: {
        color: "black",
        fontSize: 11,
        alignSelf: "flex-start",
        width: "60%"
    },
    rollCallFlatItemText: {
        color: "black",
        fontSize: 11,
        fontWeight: 'bold',
        alignContent: 'center',
        justifyContent: 'center',
    },
    rollCallMainText: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#fb5b5a",
        marginBottom: 20,
        marginTop: 20,
        textAlignVertical: "center",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    notFoundShuttleText: {
        color: "black",
        fontSize: 16,
        fontWeight: 'bold'
    },
    mapShuttleInfoText: {
        color: "black",
        fontSize: 12,
        fontWeight: 'bold'
    },
    nextPassengerTextName: {
        color: "black",
        fontSize: 14,
        fontWeight: 'bold',
        maxWidth: 300,
    },
    nextPassengerText: {
        color: "black",
        fontSize: 11,
        maxWidth: 80,
    },
    shuttleStartBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    sendSpecialMessage: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    containerHeader: {
        backgroundColor: "#003f5c",
        flex: 1,
        alignItems: 'flex-end', // ignore this - we'll come back to it
        justifyContent: 'flex-end', // ignore this - we'll come back to it
        flexDirection: "row",
        marginTop: 100
    },
    itemHeader: {
        justifyContent: 'center',
        height: 40,
        margin: 10,
    },
    itemHeaderTxt: {
        justifyContent: 'center',
        fontWeight: "bold",
        fontSize: 18,
        color: "#fb5b5a",
        textAlignVertical: "center",
        textAlign: "center",
    },
    shuttleListHeaderText: {
        justifyContent: 'center',
        fontWeight: "bold",
        fontSize: 18,
        color: "#fb5b5a",
        textAlignVertical: "center",
        textAlign: "center",
        backgroundColor: "white",
    },
    shuttleListItemHeader: {
        justifyContent: 'center',
        fontSize: 16,
        color: "#fb5b5a",
        textAlignVertical: "center",
        textAlign: "center"
    },
    shuttleListItem: {
        justifyContent: 'center',
        fontSize: 11,
        color: 'white',
        textAlignVertical: "center",
        textAlign: "center"
    },
    setttingsMenuText: {
        color: "white",
        fontSize: 14,
    },
    formText: {
        justifyContent: 'center',
        fontWeight: "bold",
        fontSize: 14,
        color: "black",
        textAlignVertical: "center",
        textAlign: "center",
        backgroundColor: 'white',
        width: '80%',
        alignSelf: 'center',
        borderRadius: 20,
        margin: 2
    },
    messageReceiver: {
        alignItems: 'center',
        padding: 16,
        borderColor: 'black',
        borderRadius: 20,
        backgroundColor: '#f8f7f7eb',
    },
    locationUpdate: {
        width: "30%",
        backgroundColor: "#fb5b5a",
        borderRadius: 10,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginRight: 10,
        alignSelf: 'flex-end'
    },
    messageIcon: {
        padding: 16,
        borderColor: 'black',
        borderRadius: 20,
        right: 20,
        position: 'absolute'
    },
    messageExit: {
        padding: 16,
        borderColor: 'black',
        borderRadius: 20,
        left: 20,
        position: 'absolute'
    },
    messageReceiverTabBar: {
        flexDirection: 'row',
        borderColor: 'black',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: '#f8f7f7eb',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    screenContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 16
    },
    appButtonContainer: {
        elevation: 8,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: 150,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        width: 100
    },
    permissionText: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#fb5b5a",
        marginBottom: 20,
    },
    permissionLButton: {
        elevation: 8,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: 200,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    permissionImage: { width: 100, height: 100, marginBottom: 20, alignSelf: "flex-end" },
    permissionView: { flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "baseline", alignContent: "center", margin: 20 },
    modalView: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 50,
        marginBottom: 50,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    carModalView: {
        height: 300,
        marginTop: 200,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    drawerItemStyle: {
        width: 240,
    },
    shuttleShowOptionsText: {
        color: "black",
        fontSize: 11,
        fontWeight: 'bold',
        alignContent: 'center',
        justifyContent: 'center',
        minWidth: 100
    },
    collapsedPassengerDetailOnMap: {
        borderRadius: 4,
        position: 'absolute',
        backgroundColor: "aliceblue",
        padding: 10,
        bottom: 10,
        borderWidth: 0.2,
        flexDirection: "column",
        height: 70,
        width: "90%",
        flex: 1
    },
    expandedPassengerDetailOnMap: {
        borderRadius: 4,
        position: 'absolute',
        backgroundColor: "aliceblue",
        padding: 10,
        bottom: 10,
        borderWidth: 0.2,
        flexDirection: "column",
        height: "40%",
        width: "90%",
        minHeight: 200,
        flex: 1
    }
});

export default styles;
