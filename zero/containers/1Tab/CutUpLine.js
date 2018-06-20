/**
 *
 * Created by zerowolf on 2017/12/6.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text, Alert,
    View,
    Dimensions
} from 'react-native';
import {zdp} from "../../utils/ScreenUtil";
const {width, height} = Dimensions.get('window');
export default class Navigator extends Component {

    render() {
        return (
            <View style={{backgroundColor: '#e4e7e7', height: zdp(1), width: width - zdp(20), alignSelf: 'center'}}/>
        )
    }
}
