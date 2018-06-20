/**
 * Created by zerowolf Date: 2018/4/21 Time: 上午10:11
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions, ListView,
    BackHandler, AppState
} from 'react-native';
import {connect} from 'react-redux';
const {width, height} = Dimensions.get('window');
import BaseComponent from '../../../global/BaseComponent';
import MyProgressBar from "../../../../views/MyProgressBar";
import TabTwo1 from "./TabTwo1";
import {onAppStateChanged} from "../../../../utils/GoBackUtil";

     let navigation ;
     let lastBackPressed
class TabTwo extends BaseComponent {

    constructor(props) {
        super(props);
     navigation = this.props.navigation;

    }


     componentDidMount() {
         BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
         AppState.addEventListener('change', this._onAppStateChanged);
     }

     componentWillUnmount() {
         BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
         AppState.removeEventListener('change', this._onAppStateChanged);
     }


     _onAppStateChanged(nextState) {
         onAppStateChanged(nextState, lastBackPressed, navigation, () => {
             lastBackPressed = Date.now();
         });
     }


     onBackPress = () => {
         this.props.navigation.goBack();
         return true;
     };


    render() {
        let recordData = this.props.recordData;
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                {recordData?<TabTwo1/>:<MyProgressBar/>}
            </View>);
    }
}
const mapStateToProps = (state) => {
    return {
        nav:state.nav,
        recordData:state.bills.redData.record,
        navigation:state.bills.redPlanNav
    }

};

export default connect(mapStateToProps)(TabTwo);
