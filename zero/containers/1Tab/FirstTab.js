/**
 * Created by zerowolf on 2018/4/2.
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window');
import MyTabView from '../../views/MyTabView';
import {fetchRequest} from '../../utils/FetchUtil';
import s from '../../styles/AllStyles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Page_Auto from './Page_Auto';
import {Page_AutoPay, Pay_Navigator} from './reduce/index'
import BaseComponent from '../global/BaseComponent';
import MyProgressBar from "../../views/MyProgressBar";
class FirstTab extends BaseComponent {

    constructor(props) {
        super(props);
        var url = "https://api.douban.com/v2/movie/top250?start=0&count=10";

        this.props.initAutoPayAction(false);
        this.props.initPayNavigatorAction(this.props.navigation);

    }



    render() {
        console.log(this.props.nav);
        return (
            this.props.RS_AutoPay ?
                <Page_Auto navigation={this.props.navigation} />
                :
                <MyProgressBar/>
        );


    }
}

const mapStateToProps = (state) => {
    return {
        RS_AutoPay: state.RS_AutoPay.data,
        nav:state.nav
        // RS_Navigate:state.RS_Navigate.data,
    }

};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initAutoPayAction: Page_AutoPay,
        initPayNavigatorAction: Pay_Navigator,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(FirstTab);
