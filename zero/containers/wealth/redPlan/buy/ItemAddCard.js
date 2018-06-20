/**
 * Created by zerowolf Date: 2018/5/5 Time: 下午3:32
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions,ListView
} from 'react-native';
import {zdp, zsp} from "../../../../utils/ScreenUtil";
const {width, height} = Dimensions.get('window');
export default class ItemAddCard extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        var params  = this.props;
        return  <View style={[{
            width,
            height: zdp(45),
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
        },params.style]}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                paddingLeft: zdp(15)
            }}>
                <Text style={{marginLeft: zdp(5),fontSize:zsp(16),width:zdp(140),textAlign:'left',}}
                      numberOfLines={1}>
                    {params.title}</Text>
                <Text style={{flex: 1, fontSize: zsp(16),textAlign:'left'}}>
                    {params.content}
                </Text>
            </View>
            <View style={{height: params.hasLine?0.5:0, backgroundColor: 'lightgrey', width: width - zdp(30)}}/>
        </View>
    }
}
