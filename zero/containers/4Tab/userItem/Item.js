/**
 * Created by zerowolf on 2018/4/4.
 */
import React, {Component} from 'react';
import {
    Platform,StyleSheet,Text,Alert,View,TouchableOpacity, Image,Dimensions
} from 'react-native';
import {zdp, zsp} from "../../../utils/ScreenUtil";
const {width, height} = Dimensions.get('window');

export default class Navigator extends Component{
    constructor(props){
        super(props);

    }

    render(){
        let props = this.props;
       return (
           <View style={{marginTop:props.marginTop?props.marginTop:2,width:width,height:zdp(60),justifyContent:'center', alignItems:'flex-start',backgroundColor:'white'}}>
               <Text style={{fontSize: zsp(14), color: 'black',paddingLeft: zdp(20)}}>
                   {props.title}:  <Text style={{fontSize: zsp(15), color: props.color?props.color:'grey'}}>{props.content}</Text>
               </Text>
           </View>
        )
    }
}
