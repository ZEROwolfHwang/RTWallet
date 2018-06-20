/**
 * Created by zerowolf Date: 2018/5/16 Time: 下午2:57
 */
import {zdp, zsp} from "../../../utils/ScreenUtil";

const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Platform, StyleSheet, TextInput,Text, Alert, View, TouchableOpacity, Image, Dimensions,ListView
} from 'react-native';
export default class ItemFixPhone extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {

    };

    render() {
        var params  = this.props;
        return (
            <View style={{
                width,
                height: zdp(50),
                backgroundColor: 'white',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row'
            }}>
                <Text style={{
                    width: zdp(100),
                    fontSize: zsp(17),
                    paddingLeft: zdp(20),
                    color: '#666',
                    textAlign: 'left'

                }}>固定电话</Text>
                <TextInput style={{
                    width:zdp(45), fontSize: zsp(18),
                    color: 'grey', backgroundColor: 'transparent',
                    textAlign:'right'
                }}
                           keyboardType={'numeric'}
                           underlineColorAndroid={'transparent'}
                           onChangeText={(text) => {
                               params.onChangeTextLeft(text)
                           }}
                           value={params.valueLeft}
                />

                <View style={{
                    width: zdp(12),
                    height:1.5,
                    backgroundColor:'grey'
                }}/>
                <TextInput style={{
                    flex: 1, fontSize: zsp(18),
                    color: 'grey', backgroundColor: 'transparent',
                    textAlign:'left'
                }}
                           keyboardType={'numeric'}
                           underlineColorAndroid={'transparent'}
                           onChangeText={(text) => {
                               params.onChangeTextRight(text);
                           }}
                           value={params.valueRight}
                />

            </View>)
    }
}
ItemFixPhone.propTypes = {
    onChangeTextLeft:PropTypes.func.isRequired,
    onChangeTextRight:PropTypes.func.isRequired,
    valueLeft:PropTypes.string.isRequired,
    valueRight:PropTypes.string.isRequired,
};
