import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import styles from "../constants/style";
import { Driver } from "../model/Driver";

const MapShuttleInfo = (props: any) => {
    return (
        props.selectedDriver ? <TouchableOpacity
            style={{
                alignItems: "center",
                borderRadius: 4,
                height: 40,
                position: 'absolute',
                backgroundColor: "white",
                padding: 10,
                top: 40,
                left: 10,
                borderWidth: 0.2,
                maxWidth: 300
            }}>
            {<Text adjustsFontSizeToFit={false} numberOfLines={1} style={styles.mapShuttleInfoText}>{props.selectedDriver.Name + " - " + props.selectedShuttle?.ShuttleName + " - " + props.selectedShuttle?.Direction}</Text>}
        </TouchableOpacity> : <></>
    )
}

const mapStateToProps = (state: any) => {
    const selectedShuttle = state.rootReducer.selectedShuttle;
    const selectedDriver = state.rootReducer.selectedDriver as Driver;
    return { selectedShuttle, selectedDriver };
};

export default connect(mapStateToProps, {})(MapShuttleInfo)