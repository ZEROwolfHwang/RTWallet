/**
 * Created by zerowolf Date: 2018/6/5 Time: 下午3:01
 */

import {zAppBarHeight, zdp, zHeight, zWidth} from "../utils/ScreenUtil";

/**
 * Created by zerowolf Date: 2018/5/16 Time: 下午2:57
 */
const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Platform, StyleSheet, TextInput,Text, Alert, View, TouchableOpacity, Image, Dimensions,ListView
} from 'react-native';
export default class PageNull extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {

    };

    render() {
        return (

                <View style={{width:zWidth, height: zHeight-zAppBarHeight,justifyContent:'center',
                    alignItems: 'center'}}>

                    <Image source={{uri: 'loading'}}
                           resizeMode={'contain'}
                           style={{
                               width: zdp(200),
                               height: zdp(200),
                               backgroundColor: 'transparent'
                           }}/>

                </View>)
    }
}
PageNull.propTypes = {

}
