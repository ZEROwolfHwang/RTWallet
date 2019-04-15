/**
 * Created by zerowolf Date: 2018/7/5 Time: 上午1:21
 */
import {zdp, zWidth} from "../utils/ScreenUtil";

/**
 * Created by zerowolf Date: 2018/5/16 Time: 下午2:57
 */
const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Platform,
    StyleSheet,
    TextInput,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ListView
} from 'react-native';

export default class MyCutLine extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {};

    render() {
        return (<View style={{width:zWidth,height:zdp(1),flexDirection:'row'}}>
                <View style={{flex: 1}}/>
                <View style={{
                    width: width - zdp(20),
                    height: zdp(1),
                    backgroundColor: 'grey',
                    opacity: 0.1,
                    alignSelf: 'flex-end'
                }}/>
            </View>
        )
    }
}
MyCutLine.propTypes = {}
