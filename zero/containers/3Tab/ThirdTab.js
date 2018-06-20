/**
 * Created by zerowolf on 2018/4/2.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    BackHandler,
    AppState
} from 'react-native';

const {width, height} = Dimensions.get('window');
import MyTabView from '../../views/MyTabView';
import {connect} from 'react-redux';
import BaseComponent from '../global/BaseComponent'
import {fetchRequest} from "../../utils/FetchUtil";
import {Types_replay} from "./reduces/reduceReplay";
import MyProgressBar from "../../views/MyProgressBar";
import PageReplay from "./PageReplay";
import ToastUtil from "../../utils/ToastUtil";
import PageNull from "../../views/PageNull";
import {onAppStateChanged, onBackPress} from "../../utils/GoBackUtil";

let lastBackPressed;
let navigation
class ThirdTab extends BaseComponent {

    constructor(props) {
        super(props);
        navigation = this.props.navigation;
        // http://sjpay.githubshop.com/app/repayments
        //     fetchRequest('repayments', 'GET')
        //         .then(res => {
        //             console.log(res);
        //         }).catch(err => {
        //
        //     })

        this.props.navigation.dispatch({type:Types_replay.ACTION_REPLAY_ENTER, url: 'repayments'})

    }

   /* componentDidMount() {
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

        return onBackPress(lastBackPressed,this.props.navigation,()=>{
            lastBackPressed = Date.now();
        })
    };*/


    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView titleColor={'black'} title={'完美还款'}
                           leftView={false}
                           navigation={this.props.navigation}/>


                {this.props.replay ?
                    <PageReplay navigation={this.props.navigation}/>
                    : <PageNull/>
                }

            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        replay: state.replay.data,
    }

};


export default connect(mapStateToProps)(ThirdTab);
