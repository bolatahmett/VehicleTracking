import React from 'react';
import styles from '../constants/style';
import { ActivityIndicator, Text, View, Image } from 'react-native';
import _ from 'lodash';

function Loading(props: any) {

    return (
        <View style={styles.container}>
            <Image
                style={{ width: 140, height: 140 }}
                source={require("./../assets/images/icon.png")}
            />
            <ActivityIndicator size="large" color="#00ff00" animating={true} />
            <Text style={styles.logo}>{props.text}</Text>
        </View>

    )
}

export default Loading;