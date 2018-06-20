/**
 * Created by zerowolf on 2017/12/25.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,Alert,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import {zdp, zsp} from "../../utils/ScreenUtil";

export default class Navigator extends Component{
    constructor(props){
        super(props);

    }

    render(){
        var params = this.props;
        return (
            <TouchableOpacity
                onPress={ params.onPress?
                    ()=>{params.onPress()}
                    :()=>{console.log('123')}}

                activeOpacity={0.5}
                style={{flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
                <Image style={{width: zdp(30), height: zdp(30)}} source={this.props.image}/>
                <Text style={{fontSize: zsp(13), color: '#4b4d4d', marginTop: zdp(5)}}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}
