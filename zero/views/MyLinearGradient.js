/**
 * Created by zerowolf Date: 2018/5/12 Time: 下午2:20
 */
import LinearGradient from "react-native-linear-gradient";
import PropTypes from 'prop-types';
const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions,ListView
} from 'react-native';
import {cusColors} from "../value/cusColor/cusColors";
export default class MyLinearGradient extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        var params  = this.props;
        return (
            <LinearGradient
                style={{width: width,height: height,justifyContent: 'flex-start',alignItems: 'center'}}
                start={{x: 0.0, y: 0.0}}
                end={{x: 0.0, y: 1.0}}
                locations={[0, 1]}
                colors={[cusColors.linear_light, cusColors.linear_default]}>
                {params.view}
            </LinearGradient>
        )
    }
}
MyLinearGradient.propTypes={
    view:PropTypes.object.isRequired
}
