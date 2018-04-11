/**
 * Created by zerowolf on 2018/4/4.
 */
import React, {Component} from 'react';
import {
    Platform,StyleSheet,Text,Alert,View,TouchableOpacity, Image,Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window');

export default class Navigator extends Component{
    constructor(props){
        super(props);

    }

    render(){
        let props = this.props;
       return (
           <View style={{marginTop:props.marginTop?props.marginTop:2,width:width,height:60,justifyContent:'center', alignItems:'flex-start',backgroundColor:'white'}}>
               <Text style={{fontSize: 14, color: 'black',paddingLeft:20}}>
                   {props.title}:  <Text style={{fontSize: 15, color: props.color?props.color:'grey'}}>{props.content}</Text>
               </Text>
           </View>
        )
    }
}