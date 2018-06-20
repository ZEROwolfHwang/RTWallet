/**
 * Created by zerowolf Date: 2018/5/27 Time: 下午11:53
 */

import MyTabView from "../../views/MyTabView";

const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Platform, StyleSheet, TextInput,Text, Alert, View, TouchableOpacity, Image, Dimensions,ListView,BackHandler
} from 'react-native';
import BaseComponent from "../global/BaseComponent";
class PageReplayDetail extends BaseComponent {

    constructor(props) {
        super(props);

    }

     componentDidMount() {
         BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
     }

     componentWillUnmount() {
         BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
     }



     onBackPress = () => {
         this.props.navigation.goBack();
         return true;
     };



    componentWillMount() {
        this.params = this.props.navigation.state.params;
        console.log(this.params);
    }



    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
               <MyTabView title={'完美还款的详情页'} navigation={this.props.navigation}/>


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

export default connect(mapStateToProps, mapDispatchToProps)(PageReplayDetail);
