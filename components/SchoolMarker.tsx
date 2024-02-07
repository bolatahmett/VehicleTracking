import React from "react";
import { useState } from "react";
import { Text, TouchableOpacity, Image, View, Switch, Platform, ImageBackground } from "react-native";
import { Circle, Marker } from "react-native-maps";
import { connect } from "react-redux";
import styles from "../constants/style";
import { Shuttle } from "../model/Shuttle";

const CIRCLE_RADIUS = 200;
const schoolImg = require("./../assets/images/school.png")

const SchoolMarker = (props: any) => {
    return (
        props.selectedSchool && <Marker
            key={"targetRegion"}
            coordinate={props.targetRegion}
            title={props.selectedSchool.Name}
        >
            <ImageBackground
                style={props.zoom.latitudeDelta > 0.0722 ? { width: 40, height: 40 } : { width: 50, height: 50 }}
                source={schoolImg}
                key={"targetRegionImage"}
            />
        </Marker>
    )
}

const mapStateToProps = (state: any) => {
    const selectedSchool = state.rootReducer.selectedSchool;
    return { selectedSchool };
};

export default connect(mapStateToProps, {})(SchoolMarker)