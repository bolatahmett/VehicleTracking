import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Dimensions, FlatList, ImageBackground, Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Circle, LatLng, Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import { connect } from 'react-redux';
import styles from '../constants/style';
import { MarkerCoordinate } from '../model/MarkerCoordinate';
import { Passenger } from '../model/Passenger';
import { ShuttleRoute } from '../model/ShuttleRoute';
import { setActiveShuttle, setNextPassenger, setPassengerShuttleActions, setPassengersOfTheShuttle, setSelectedShuttle, setShuttleDetail, setShuttleStatus, showMessage } from '../redux/actions/actions';
import _ from 'lodash';
import { School } from '../model/School';
import { Shuttle } from '../model/Shuttle';
import SchoolMarker from '../components/SchoolMarker';
import { getTableItemsWithPath } from '../dto/ServerHelper';
import PassengerShuttleActionScreen from './PassengerShuttleActionScreen';
import ItemSeparatorView from '../components/ItemSeperatorView';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import stylesTab from '../constants/stylesTab';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

const busImg = require("./../assets/images/bus_stop_maps_location_placeholder_icon.png")
const studentImg = require("./../assets/images/studentMarker.png")
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;


const RouteMapScreen = (props: any) => {
    let map: any = useRef()

    const [zoom, setZoom] = useState({ latitudeDelta: 0.0722, longitudeDelta: 0.0421 });
    const DEFAULT_REGION = {
        latitude: 36.191689,
        longitude: 36.1444064
    };
    const [markerRegion, setMarkerRegion] = useState(undefined as any);
    const [targetRegion, setTargetRegion] = useState({
        latitude: 36.191689,
        longitude: 36.1444064,
        latitudeDelta: zoom.latitudeDelta,
        longitudeDelta: zoom.longitudeDelta,
    } as any);
    const [mapRegion, setmapRegion] = useState(undefined as any);
    const [shuttleRoute, setShuttleRoute] = useState([] as any);
    const [baseRouteCoordinates, setBaseRouteCoordinates] = useState([] as any);
    const [passengerCoordinates, setPassengerCoordinates] = useState([] as MarkerCoordinate[]);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(Platform.OS === 'ios');
    const dateFormat = 'YYYY/MM/DD';
    const dateTimeFormat = 'YYYY/MM/DD HH:mm';
    const [tempDate, setTempDate] = useState(new Date());

    useEffect(() => {
        if (!show) {
            setDate(tempDate)
        }
    }, [show])

    useEffect(() => {

        if (props.selectedShuttle === undefined || props.selectedShuttle === null) {
            return;
        }

        props.selectedSchool && setTargetRegion({
            latitude: parseFloat(props.selectedSchool.Latitude),
            longitude: parseFloat(props.selectedSchool.Longitude),
            latitudeDelta: zoom.latitudeDelta,
            longitudeDelta: zoom.longitudeDelta,
        })

        setShuttleRoute([])

        loadBaseRoute();

        if (props.passengersOfTheShuttle && props.passengersOfTheShuttle.length > 0) {

            const passengerCoordinates = props.passengersOfTheShuttle.map((val: Passenger) => {
                if (val) {
                    return {
                        Id: val.Id,
                        Info: val.PassengerName,
                        Latitude: parseFloat(val.Latitude.toString()),
                        Longitude: parseFloat(val.Longitude.toString())
                    } as MarkerCoordinate
                }
            });

            setPassengerCoordinates(passengerCoordinates.filter((item: undefined) => item !== undefined))
        } else {
            setPassengerCoordinates([]);
        }

    }, [props.selectedShuttle])

    const handleOnPressCalendar = () => {
        setShow(true);
    };

    const onChange = (event: any, selectedDate: any) => {
        if (selectedDate) {
            const currentDate = selectedDate || date;
            console.log(currentDate)
            loadRoute(moment(currentDate).format("YYYYMMDD"))
            setTempDate(currentDate);
            setShow(Platform.OS == "ios");
        }
    };

    const loadBaseRoute = () => {
        console.log("loadBaseRoute")
        getTableItemsWithPath(`/ShuttleBaseTrackRoute/${props.selectedShuttle.Id}`).then((response: any) => {

            if (response) {

                var keyOfObj = Object.keys(response);
                const result = [] as number[][];
                keyOfObj.forEach(element => {
                    var shuttleRoute = response[element] as ShuttleRoute;

                    const coordinates = [
                        shuttleRoute.Latitude,
                        shuttleRoute.Longitude,
                    ];

                    result.push(coordinates);
                });

                setBaseRouteCoordinates(result.map((coor) => {
                    return { latitude: coor[0], longitude: coor[1] };
                }));

            } else {
                setBaseRouteCoordinates([]);
            }

        });
    }

    const loadRoute = (date: string) => {
        getTableItemsWithPath(`/ShuttleRoute/${props.selectedShuttle.Id}/${date}/`).then((response: any) => {

            if (response) {

                var keyOfObj = Object.keys(response);
                const result = [] as number[][];
                keyOfObj.forEach(element => {
                    var shuttleRoute = response[element] as ShuttleRoute;

                    const coordinates = [
                        shuttleRoute.Latitude,
                        shuttleRoute.Longitude,
                    ];

                    result.push(coordinates);
                });

                setShuttleRoute(result.map((coor) => {
                    return { latitude: coor[0], longitude: coor[1] };
                }));

            } else {
                setShuttleRoute([]);
            }

        });
    }

    const onRegionChange = (region: { latitudeDelta: any; longitudeDelta: any; }) => {
        if (region.latitudeDelta !== zoom.latitudeDelta || region.longitudeDelta !== zoom.longitudeDelta) {
            setZoom({ latitudeDelta: region.latitudeDelta, longitudeDelta: region.latitudeDelta * ASPECT_RATIO });
        }
    }

    const handleOnPressShuttleDetail = (item: any) => {
        props.setSelectedShuttle(item);
        setModalVisibility(false)
    }

    const ShuttleItemView = ({ item }: any) => {
        return <TouchableOpacity
            style={{ height: 40, flex: 2, padding: 4 }}
            onPress={() => { handleOnPressShuttleDetail(item) }}>
            <View style={{ flexDirection: "row" }}>
                <Ionicons
                    name="bus-sharp"
                    size={24}
                    color={props.shuttleActiveItems?.some((shuttleActiveItem: Shuttle) => shuttleActiveItem.Id === item.Id) ? "green" : "red"}
                    style={{ alignSelf: "center", flex: 1 }}
                />
                <Text style={{ color: "black", flex: 2 }}> {item.CarNumberPlate}</Text>
                <Text style={{ color: "black", flex: 2 }}>{`${item?.Direction === "Gidiş" ? "Sabah" : "Akşam"}`}</Text>
                <Text style={{ color: "black", flex: 2 }}> {item.ShuttleTime}</Text>
                <Text style={{ color: "black", flex: 2 }}> {props.driverItems?.find((x: { Id: any; }) => x.Id.toString() === item?.DriverId.toString())?.Name}</Text>
            </View>
        </TouchableOpacity>
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }} >
            <View style={{
                position: "absolute",
                // height: 100,
                width: "100%",
                backgroundColor: "white",
                zIndex: 9999999,
                alignContent: "center",
                justifyContent: "center"
            }}>
                {props.selectedShuttle && <Text style={styles.formText}>{`${props.selectedShuttle.ShuttleName} - ${props.selectedShuttle.Direction} - ${props.selectedShuttle.CarNumberPlate} - ${props.selectedShuttle.ShuttleTime}`}</Text>}

                {Platform.OS !== 'ios' && <TouchableOpacity style={{
                    alignItems: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor: '#5a92a1',
                    justifyContent: "center",
                    alignContent: "center"
                }} onPress={handleOnPressCalendar}>
                    <Text  >{moment(date).format(dateFormat) + '  '}
                        <FontAwesome
                            name="calendar"
                            size={20}
                            style={styles.itemHeader}
                        >
                        </FontAwesome>
                    </Text>

                </TouchableOpacity>}

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={"date"}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        style={{ width: 150, marginTop: 20, marginRight: 60 }}
                        locale={'tr'}
                    />

                )}

                <TouchableOpacity style={{
                    width: 200,
                    backgroundColor: "#fb5b5a",
                    borderRadius: 10,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 10,
                    alignSelf: "center"
                }} onPress={() => { setModalVisibility(true) }}>
                    <Text style={{ color: "black", fontSize: 12 }}>{"Servis seç."}</Text>
                </TouchableOpacity>
            </View>
            <MapView
                key={"MapView"}
                ref={mapItem => { map = mapItem }}
                showsUserLocation={true}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={mapRegion ? {
                    latitude: parseFloat(mapRegion.latitude),
                    longitude: parseFloat(mapRegion.longitude),
                    latitudeDelta: zoom.latitudeDelta,
                    longitudeDelta: zoom.longitudeDelta,
                } : {
                    latitude: DEFAULT_REGION.latitude,
                    longitude: DEFAULT_REGION.longitude,
                    latitudeDelta: zoom.latitudeDelta,
                    longitudeDelta: zoom.longitudeDelta,
                }}
                onRegionChangeComplete={onRegionChange}
                showsCompass={true}
                liteMode={false}
                showsBuildings={true}
                showsTraffic={false}
                showsIndoors={true}
                showsMyLocationButton={false}
            >

                {
                    passengerCoordinates &&
                    passengerCoordinates.map((val: MarkerCoordinate) => {
                        // @ts-ignore
                        return <View key={`${val?.Id}view`}>
                            <Marker
                                key={val?.Id}
                                coordinate={{
                                    latitude: val.Latitude,
                                    longitude: val.Longitude
                                } as LatLng}
                                title={val.Info}
                                zIndex={props.nextPassenger && props.nextPassenger.PassengerName === val.Info ? 998 : 10}
                            >
                                <ImageBackground
                                    style={zoom.latitudeDelta > 0.0722 ? { width: 30, height: 30 } : { width: 40, height: 40 }}
                                    source={studentImg}
                                    key={`${val?.Id}Image`}
                                />
                            </Marker>

                        </View>
                    })
                }


                {
                    props.selectedShuttle && markerRegion &&
                    // @ts-ignore
                    <Marker
                        title={props.selectedShuttle.CarNumberPlate}
                        key={"busMarker"}
                        coordinate={markerRegion}
                        flat
                        anchor={{ x: 0.5, y: 0.5 }}>

                        <View key={"busImgView"}>
                            <ImageBackground
                                style={{ width: 50, height: 50 }}
                                source={busImg}
                                key={"busImg"}
                            />
                        </View>
                    </Marker>
                }

                <SchoolMarker targetRegion={targetRegion} zoom={zoom} />

                <Circle
                    key={"SchoolCircle"}
                    center={targetRegion}
                    radius={200}
                    strokeWidth={1}
                    strokeColor={'#1a66ff'}
                    fillColor={'rgba(230,238,255,0.5)'}
                />

                {shuttleRoute && shuttleRoute.length > 0 && <Polyline key={"route"}
                    coordinates={shuttleRoute}
                    strokeColor="#FF9E2C"
                    strokeColors={[
                        '#7F0000',
                        '#00000000',
                        '#B24112',
                        '#E5845C',
                        '#238C23',
                        '#7F0000'
                    ]}
                    strokeWidth={8}
                />}

                {baseRouteCoordinates && baseRouteCoordinates.length > 0 && <Polyline key={"baseRoute"}
                    coordinates={baseRouteCoordinates}
                    strokeColor="#000"
                    strokeColors={[
                        '#7F0000',
                        '#00000000',
                        '#B24112',
                        '#E5845C',
                        '#238C23',
                        '#7F0000'
                    ]}
                    strokeWidth={4}
                />}

            </MapView>

            <Modal
                key={"shuttleMapOptions"}
                animationType="slide"
                transparent={true}
                visible={modalVisibility}
                style={{ alignSelf: "center" }}
            >
                <View style={{
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 20,
                    marginTop: 200,
                    backgroundColor: "white",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                }}>
                    <FlatList
                        style={styles.flatShuttleContainer}
                        data={props.shuttleItems}
                        ItemSeparatorComponent={ItemSeparatorView}
                        renderItem={ShuttleItemView}
                        keyExtractor={(item, indexList) => indexList.toString()}
                        key={"shuttleList"}
                    />

                </View>
            </Modal>

        </View >
    );
}

const mapStateToProps = (state: any) => {
    const selectedShuttle = state.rootReducer.selectedShuttle as Shuttle;
    const shuttleItems = state.rootReducer.shuttleItems as Shuttle[];
    const shuttleActiveItems = state.rootReducer.shuttleActiveItems as Shuttle[];
    const selectedSchool = state.rootReducer.selectedSchool as School;
    const passengersOfTheShuttle = state.rootReducer.passengersOfTheShuttle as Passenger[];
    const driverItems = state.rootReducer.driverItems;
    return { selectedShuttle, shuttleItems, selectedSchool, passengersOfTheShuttle, shuttleActiveItems, driverItems };
};

export default connect(mapStateToProps, {
    setShuttleStatus,
    setPassengersOfTheShuttle,
    setShuttleDetail,
    setNextPassenger,
    setPassengerShuttleActions,
    showMessage,
    setSelectedShuttle,
    setActiveShuttle,
})(RouteMapScreen)