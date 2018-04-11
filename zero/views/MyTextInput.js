/**
 * Created by zerowolf on 2018/1/3.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,Alert,
    View,
    TextInput
} from 'react-native';
import SizeUtil from '../utils/SizeUtil';
export default class MyTextInput extends Component{
    constructor(props){
        super(props);

    }

    render(){
        var param = this.props;
       return (
           <TextInput
               keyboardType={param.keyboardType?param.keyboardType:'default'}
               underlineColorAndroid={'transparent'}
               // style={param.styles?param.styles:
               //     param.marginTop?[styles.textInputStyle,{marginTop:param.marginTop}]:
               //         styles.textInputStyle}
               style={styles.textInputStyle}
                       // styles.textInputStyle}
               placeholder={param.placeholder}
               onChangeText = {(text)=>{param.onChangeText(text)}}
               value={param.value?param.value:null}/>
        )
    }
}


const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#dddddd',
            alignItems: 'center',
        },
        pic: {
            width: 80,
            height: 80,
            borderRadius: 40,
            borderWidth: 4,
            borderColor: 'white',
            marginTop: 50,
            marginBottom: 30,
        },
        username: {},
        password: {},
        textInputStyle: {
            marginTop:10,
            borderRadius:20,
            width:SizeUtil.width-20,
            height: 44,
            backgroundColor: 'white',
            marginBottom: 1,
            textAlign: 'center',
        },
        loginBtnStyle: {
            borderRadius:20,
            height: 44,
            width: SizeUtil.width - 40,
            backgroundColor: 'blue',
            marginTop: 30,
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
        }
        ,
        settingStyle: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: SizeUtil.width - 40,

        }
        ,
        otherLoginStyle: {
            // backgroundColor:'red',
            flexDirection: 'row',
            alignItems: 'center',

            //绝对定位
            position: 'absolute',
            bottom: 10,
            left: 20,

        }
        ,
        img: {
            width: 40,
            height: 30,
            marginLeft: 5,
        }
    })
;