/**
 * Created by zerowolf Date: 2018/7/27 Time: 下午4:35
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Platform,
    StyleSheet,
    TextInput,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    ListView,
    BackHandler, AppState, ScrollView, RefreshControl
} from 'react-native';
import MyTabView from "../../views/MyTabView";
import BaseComponent from "../global/BaseComponent";
import {fetchRequestToken} from "../../utils/FetchUtilToken";
import {Api} from "../../utils/Api";
import {toastAlert, toastShort} from "../../utils/ToastUtil";
import ToastUtil from "../../utils/ToastUtil";
import NavigationUtil from "../../utils/NavigationUtil";
import {zDispatch_replay, zDispatch_replayHistory} from "./reduces/reduceReplay";
import {onAppStateChanged, onBackPress} from "../../utils/GoBackUtil";
import {zdp, zHeight, zsp, zWidth} from "../../utils/ScreenUtil";
import {cusColors} from "../../value/cusColor/cusColors";
import PageReplay from "./PageReplay";
import BackgroundPage from "../../views/BackgroundPage";
import {PageBackground} from "../../views/PageBackground";
import {PlanMode} from "../global/emun/ReplayType";
import ZText from "../../views/ZText";

let globalInfo;

class RepayPlanRecord extends BaseComponent {

    constructor(props) {
        super(props);
        globalInfo = this.props.globalInfo;
        this.state = {
            isRefreshing: false
        }
    }

    componentWillMount() {
        zDispatch_replayHistory(this.props.navigation, globalInfo.token);
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


    refreshData = () => {
        this.setState({
            isRefreshing: true
        });


        zDispatch_replayHistory(this.props.navigation, globalInfo.token);

        this.timeout = setTimeout(() => {
            this.setState({
                isRefreshing: false
            });
            clearTimeout(this.timeout)
        }, 1000);
    }

    fetchData = () => {

    };


    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView title={'还款计划记录'} navigation={this.props.navigation}/>

                {
                    this.props.replayHistory && this.props.replayHistory.length > 0 ?
                        <PageReplay PlanMode={PlanMode.HISTORY}/>
                        :
                        <PageBackground content={''} onRefresh={this.refreshData}
                                        isRefreshing={this.state.isRefreshing}/>
                }

            </View>);
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo.data,
        replayHistory: state.replay.replayHistory,
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RepayPlanRecord);
