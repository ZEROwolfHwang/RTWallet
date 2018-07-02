/**
 * Created by zerowolf on 2018/1/7.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text, Alert,
    View,
    TouchableOpacity
} from 'react-native';
import SizeUtil from '../utils/SizeUtil';
import {zdp, zsp} from "../utils/ScreenUtil";
export default class ButtonView extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        var params = this.props;
        return (
            <TouchableOpacity activeOpacity={0.5}
                              style={[
                                  {
                                      marginTop: zdp(10),
                                      width: SizeUtil.width - zdp(20),
                                      height: zdp(50),
                                      backgroundColor: '#4e73ff',
                                      borderRadius: zdp(25),
                                      // borderColor: 'yellow',
                                      // borderWidth:2,
                                      justifyContent:'center',
                                      alignItems:'center'
                                  },params.style]}
                              onPress={()=>{
                                  params.onPress();
                              }}>
                <Text style={{fontSize: zsp(18),color:'white'}}>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        );
    }
}
