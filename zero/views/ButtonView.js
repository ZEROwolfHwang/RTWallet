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
export default class ButtonView extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        var params = this.props;
        return (
            <TouchableOpacity activeOpacity={0.5}
                              style={params.style ? params.style :
                                  {
                                      marginTop:10,
                                      width: SizeUtil.width - 20,
                                      height: 50,
                                      backgroundColor: '#4e73ff',
                                      borderRadius: 25,
                                      // borderColor: 'yellow',
                                      // borderWidth:2,
                                      justifyContent:'center',
                                      alignItems:'center'
                                  }}
                              onPress={()=>{
                                  params.onPress();
                              }}>
                <Text style={{fontSize:16,color:'white'}}>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        );
    }
}