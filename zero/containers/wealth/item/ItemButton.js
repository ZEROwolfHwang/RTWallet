/**
 * Created by zerowolf Date: 2018/5/20 Time: 下午11:31
 */
import {zdp, zsp} from "../../../utils/ScreenUtil";

/**
 * Created by zerowolf Date: 2018/5/16 Time: 下午2:57
 */
const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Platform, StyleSheet, TextInput,Text, Alert, View, TouchableOpacity, Image, Dimensions,ListView
} from 'react-native';
export default class ItemButton extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {

    };

    render() {
        var params  = this.props;
        return ( <View style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: zdp(8)
        }}>
            <TouchableOpacity
                activeOpacity={0.5}
                style={{
                    backgroundColor: '#938c92',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: zdp(20),
                    width: zdp(55),
                    borderRadius: zdp(10)
                }}>

                <Text style={{ width: width / 4,
                    alignSelf: 'center',
                    fontSize: zsp(12),
                    marginBottom: zdp(6),
                    textAlign: 'center',color: 'white'}}>{params.title}</Text>
            </TouchableOpacity>
        </View>)
    }
}
ItemButton.propTypes = {

}
