import { Dimensions, StyleSheet } from 'react-native';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeContainer: {
        backgroundColor: '#003f5c',
        justifyContent: 'center',
        alignSelf: 'stretch',
        height: '100%',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#fb5b5a",
        marginBottom: 40,
        textAlignVertical: "center", textAlign: "center",
    },
    inputView: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "white"
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
        marginTop: 40,
        marginBottom: 10
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
    trackEnableBtn: {
        width: "100%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10
    },
    trackDisableBtn: {
        width: "100%",
        backgroundColor: "grey",
        borderRadius: 25,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10
    },
    map: {
        alignSelf: 'stretch',
        height: '80%',
        marginLeft: 5,
        marginRight: 5,
    },
    flatContainer: {
        flex: 2,
        flexDirection: 'row',
        backgroundColor: '#003f5c',
        borderRadius: 100,
        maxHeight: 400,
    },
    flatShuttleContainer: {
        flex: 2,
        flexDirection: 'column',
        backgroundColor: '#003f5c',
        borderRadius: 100,
        maxHeight: 400
    },
    shuttleCard: {
        flex: 2,
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        backgroundColor: '#003f5c',
        borderRadius: 20,
        borderWidth: 0,
        marginBottom: 20
    },
    cardText: {
        color: "white",
        fontSize: 11
    },
    shuttleStartBtn: {
        width: "100%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
    },
    containerHeader: {
        backgroundColor: "#003f5c",
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
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
        textAlign: "center"
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
    }
});
export default styles;
