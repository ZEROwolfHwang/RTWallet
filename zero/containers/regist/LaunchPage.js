/**
 * Created by zerowolf Date: 2018/5/23 Time: 下午11:39
 */
import BaseComponent from "../global/BaseComponent";

const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Platform, StyleSheet, TextInput,Text, Alert, View, TouchableOpacity, Image, Dimensions,ListView
} from 'react-native';
import MyProgressBar from "../../views/MyProgressBar";
import LoginByGesture from "./LoginByGesture";
import {isGestureLogin} from "../../storage/schema_gesture";
import {zdp, zsp} from "../../utils/ScreenUtil";

let enter;
class LaunchPage extends BaseComponent {

    constructor(props) {
        super(props);

        this.state={
            isWaitOver: false,
            appEntrance: ''
        }


    }

    componentWillMount() {
        let gestureStatus = isGestureLogin();
        let timer = setTimeout(() => {
            // this.setState({
            //     isWaitOver: true,
            //     appEntrance: gestureStatus ? 'LoginByGesture' : 'RegisterApp'
            // });
            if (gestureStatus) {

                this.props.navigation.navigate('LoginByGesture');
            } else {
                this.props.navigation.navigate('RegisterApp',{type:1});

            }

            clearTimeout(timer);
        }, 1000);
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                 <View style={{width,height:zdp(60), backgroundColor:'lightcoral',justifyContent:'center',alignItems:'center'}}>
                       <Text style={{fontSize:zsp(16), color:'blue',textAlign:'center'}}>{`引导页`}</Text>
                 </View>


                <MyProgressBar/>

            </View>)
    }
}
const mapStateToProps = (state) => {
    return {
        nav:state.nav
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LaunchPage);
