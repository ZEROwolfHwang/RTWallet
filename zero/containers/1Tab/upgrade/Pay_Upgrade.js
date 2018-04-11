/**
 * Created by zerowolf on 2017/12/11.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import BaseComponent from '../../global/BaseComponent';
export default class Pay_Upgrade extends BaseComponent{
    constructor(props){
        super(props);

    }

    render(){
       return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'blue', fontSize: 18}}>
                    还款升级 !
                </Text>
            </View>
        )
    }
}