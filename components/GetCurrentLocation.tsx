import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';

const GetCurrentLocation = (zoom: any, setMarkerRegion: any) => {
    try {
        Location.requestForegroundPermissionsAsync().then((granted) => {
            if (!granted) {
                return;
            }

            Location.getCurrentPositionAsync().then((currentLocation: Location.LocationObject) => {
                if (currentLocation !== null) {
                    const currentLocationLonLat = {
                        latitude: currentLocation.coords.latitude,
                        longitude: currentLocation.coords.longitude,
                        latitudeDelta: zoom.latitudeDelta,
                        longitudeDelta: zoom.longitudeDelta,
                    };
                    setMarkerRegion(currentLocationLonLat);
                } else {
                    Location.getLastKnownPositionAsync().then((currentLocation: LocationObject | null) => {
                        if (currentLocation !== null) {
                            const currentLocationLonLat = {
                                latitude: currentLocation.coords.latitude,
                                longitude: currentLocation.coords.longitude,
                                latitudeDelta: zoom.latitudeDelta,
                                longitudeDelta: zoom.longitudeDelta,
                            };
                            setMarkerRegion(currentLocationLonLat);
                        }
                    });
                }
            });
        });

    } catch (error) {
        //TODO
    }

    try {
        Location.getLastKnownPositionAsync().then((currentLocation: LocationObject | null) => {
            if (currentLocation !== null) {
                const currentLocationLonLat = {
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                    latitudeDelta: zoom.latitudeDelta,
                    longitudeDelta: zoom.longitudeDelta,
                };
                setMarkerRegion(currentLocationLonLat);
            }
        });
    } catch (error) {
        if (error !== undefined) {
            alert(error)
        }
    }
}

export default GetCurrentLocation;