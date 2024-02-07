import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Text, Dimensions, ImageBackground, View } from 'react-native';
import MapView, { Circle, LatLng, Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import { connect } from 'react-redux';
import styles from '../constants/style';
import { MarkerCoordinate } from '../model/MarkerCoordinate';
import { Passenger } from '../model/Passenger';
import { ShuttleRoute } from '../model/ShuttleRoute';
import moment from 'moment';
import { setActiveShuttle, setNextPassenger, setPassengerShuttleActions, setPassengersOfTheShuttle, setSelectedShuttle, setShuttleDetail, setShuttleStatus, showMessage } from '../redux/actions/actions';
import _ from 'lodash';
import { School } from '../model/School';
import { Shuttle } from '../model/Shuttle';
import { limitToLast, onChildAdded, onChildChanged, query, ref } from 'firebase/database';
import { database } from '../dto/FireBaseDB';
import { ActiveShuttle } from '../model/ActiveShuttle';
import ShuttleViewProperties from '../components/ShuttleViewProperties'
import SchoolMarker from '../components/SchoolMarker';
import { getTableItemsWithPath } from '../dto/ServerHelper';
import schedulePushNotification from '../helper/schedulePushNotification';
import PassengerShuttleActionScreen from './PassengerShuttleActionScreen';

const busImg = require("./../assets/images/bus_stop_maps_location_placeholder_icon.png")
const studentImg = require("./../assets/images/studentMarker.png")
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;


const MapScreen = (props: any) => {
    let map: any = useRef()

    const [zoom, setZoom] = useState({ latitudeDelta: 0.0722, longitudeDelta: 0.0421 });
    const DEFAULT_REGION = {
        latitude: 36.191689,
        longitude: 36.1444064
    };
    const [markerRegion, setMarkerRegion] = useState(undefined as any);
    const [activeShuttle, setActiveShuttle] = useState([] as Shuttle[]);
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
    const [activeShuttleVisibility, setActiveShuttleVisibility] = useState(false);
    const [activeShuttlePassengerVisibility, setActiveShuttlePassengerVisibility] = useState(false);
    const [shuttleRouteVisibility, setShuttleRouteVisibility] = useState(false);
    const [baseShuttleRouteVisibility, setBaseShuttleRouteVisibility] = useState(false);
    const refonChildChangedActiveShuttle = useRef(null as any);

    useEffect(() => {

        props.selectedSchool && setTargetRegion({
            latitude: parseFloat(props.selectedSchool.Latitude),
            longitude: parseFloat(props.selectedSchool.Longitude),
            latitudeDelta: zoom.latitudeDelta,
            longitudeDelta: zoom.longitudeDelta,
        })

    }, [])

    useEffect(() => {

        props.setActiveShuttle(activeShuttle);

    }, [activeShuttle])

    useEffect(() => {
        if (props.shuttleItems) {
            const currentDate = moment(new Date()).format('YYYYMMDD');
            const path = `/ActiveShuttle/${currentDate}`;

            setActiveShuttle([])

            onChildAdded(ref(database, path), (snapshot: any) => {
                const response = snapshot.val();


                let activeShuttleResult: Shuttle[] = [];
                if (response) {
                    Object.keys(response).forEach((element: any) => {
                        const activeShuttleInfo = response[element] as ActiveShuttle;
                        if (activeShuttleInfo && activeShuttleInfo.IsActive) {
                            const activeShuttle = props.shuttleItems.find((item: Shuttle) => item.Id === activeShuttleInfo.ShuttleId);
                            activeShuttle && activeShuttleResult.push(activeShuttle);
                        }
                    });
                }

                setActiveShuttle((oldArray: any) => [...oldArray, ...activeShuttleResult]);
            });

            onChildChanged(ref(database, path), (snapshot) => {
                const response = snapshot.val();

                if (response) {
                    Object.keys(response).forEach((element: any) => {
                        const activeShuttleInfo = response[element] as ActiveShuttle;
                        if (activeShuttleInfo && !activeShuttleInfo.IsActive) {
                            const passiveShuttle = props.shuttleItems.find((item: Shuttle) => item.Id === activeShuttleInfo.ShuttleId);
                            passiveShuttle && setActiveShuttle((oldArray: any) => [...oldArray.filter((x: Shuttle) => x.Id !== passiveShuttle.Id)]);
                        }

                        if (activeShuttleInfo && activeShuttleInfo.IsActive) {
                            const activeShuttleResult = props.shuttleItems.find((item: Shuttle) => item.Id === activeShuttleInfo.ShuttleId);
                            activeShuttleResult && setActiveShuttle((oldArray: any) => [...oldArray, activeShuttleResult]);
                        }
                    });
                }

            });
        }

    }, [props.shuttleItems])

    useEffect(() => {
        setActiveShuttleVisibility(false);
        setShuttleRouteVisibility(false);
        setBaseRouteCoordinates(false);
        setActiveShuttlePassengerVisibility(false);
        setBaseShuttleRouteVisibility(false);
    }, [props.selectedShuttle])

    useEffect(() => {

        if (activeShuttleVisibility) {
            const currentDate = moment().format('YYYYMMDD')
            const unsubs = onChildAdded(query(ref(database, `/ShuttleRoute/${props.selectedShuttle.Id}/${currentDate}`), limitToLast(1)), (snapshot) => {
                const data = snapshot.val() as ShuttleRoute;
                const routeItem = { latitude: data.Latitude, longitude: data.Longitude } as any;
                setMarkerRegion({
                    latitude: routeItem.latitude,
                    longitude: routeItem.longitude,
                    latitudeDelta: zoom.latitudeDelta,
                    longitudeDelta: zoom.longitudeDelta,
                })

                if (shuttleRouteVisibility) {
                    setShuttleRoute((oldArray: any) => [...oldArray, routeItem])
                }
            });

            refonChildChangedActiveShuttle.current = unsubs;

        } else {
            setMarkerRegion(undefined)
            setShuttleRoute([])
            refonChildChangedActiveShuttle.current && refonChildChangedActiveShuttle.current();
        }

    }, [activeShuttleVisibility])

    useEffect(() => {
        if (props.selectedShuttle === undefined) {
            return;
        }

        if (activeShuttlePassengerVisibility) {

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
            }

        } else {
            setPassengerCoordinates([]);
        }

    }, [activeShuttlePassengerVisibility]);

    useEffect(() => {
        if (baseShuttleRouteVisibility) {
            loadBaseRoute()
        } else {
            setBaseRouteCoordinates([]);
        }

    }, [baseShuttleRouteVisibility])

    const loadBaseRoute = () => {
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

    const onRegionChange = (region: { latitudeDelta: any; longitudeDelta: any; }) => {
        if (region.latitudeDelta !== zoom.latitudeDelta || region.longitudeDelta !== zoom.longitudeDelta) {
            setZoom({ latitudeDelta: region.latitudeDelta, longitudeDelta: region.latitudeDelta * ASPECT_RATIO });
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }} >
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
                    activeShuttlePassengerVisibility && passengerCoordinates &&
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
                {/* {
                        !props.selectedShuttle && shuttleCoordinates &&
                        shuttleCoordinates.map((val: MarkerCoordinate) => {
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
                                    source={busImg}
                                        key={`${val?.Id}Image`}
                                    />
                                </Marker>
                                </View>
                        }
                        )
                    } */}

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
                    strokeWidth={6}
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
                    strokeWidth={6}
                />}

            </MapView>

            <ShuttleViewProperties
                setActiveShuttleVisibility={setActiveShuttleVisibility}
                activeShuttleVisibility={activeShuttleVisibility}
                setActiveShuttlePassengerVisibility={setActiveShuttlePassengerVisibility}
                activeShuttlePassengerVisibility={activeShuttlePassengerVisibility}
                setShuttleRouteVisibility={setShuttleRouteVisibility}
                shuttleRouteVisibility={shuttleRouteVisibility}
                setBaseShuttleRouteVisibility={setBaseShuttleRouteVisibility}
                baseShuttleRouteVisibility={baseShuttleRouteVisibility}
            ></ShuttleViewProperties>


            <PassengerShuttleActionScreen></PassengerShuttleActionScreen>

        </View >
    );
}

const mapStateToProps = (state: any) => {
    const selectedShuttle = state.rootReducer.selectedShuttle as Shuttle;
    const shuttleItems = state.rootReducer.shuttleItems as Shuttle[];
    const shuttleActiveItems = state.rootReducer.shuttleActiveItems as Shuttle[];
    const selectedSchool = state.rootReducer.selectedSchool as School;
    const passengersOfTheShuttle = state.rootReducer.passengersOfTheShuttle as Passenger[];
    return { selectedShuttle, shuttleItems, selectedSchool, passengersOfTheShuttle, shuttleActiveItems };
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
})(MapScreen)