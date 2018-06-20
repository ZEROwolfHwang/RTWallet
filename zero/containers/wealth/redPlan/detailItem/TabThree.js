/**
 * Created by zerowolf Date: 2018/4/21 Time: 上午10:11
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet,WebView, Text, Alert, View, TouchableOpacity, Image, Dimensions,ListView,
    AppState,BackHandler
} from 'react-native';
import {connect} from 'react-redux';
const {width, height} = Dimensions.get('window');
import BaseComponent from '../../../global/BaseComponent';
import {onAppStateChanged} from "../../../../utils/GoBackUtil";
     let navigation ;
     let lastBackPressed
class TabThree extends BaseComponent {

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
        var url = this.props.redDataUrl;
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <WebView bounces={false}
                         scalesPageToFit={true}
                         source={{uri:url,method: 'GET'}}
                         style={{width:width, height:height}}
                         onLoad={(e) => console.log('onLoad')}
                         onLoadEnd={(e) => console.log('onLoadEnd')}
                         onLoadStart={(e) => console.log('onLoadStart')}
                         renderError={() => {
                             console.log('renderError')
                             return <View><Text>renderError回调了，出现错误</Text></View>
                         }}
                         renderLoading={() => {
                             return <View><Text>这是自定义Loading...</Text></View>
                         }}>
                </WebView>
            </View>)
    }
}
const mapStateToProps = (state) => {
    return {
        nav:state.nav,
        redDataUrl:state.bills.redData.problem_url,
        navigation:state.bills.redPlanNav

    }

};

export default connect(mapStateToProps)(TabThree);

