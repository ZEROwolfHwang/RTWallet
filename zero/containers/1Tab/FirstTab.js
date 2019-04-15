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
    AppState,
    BackHandler
} from 'react-native';
const {width, height} = Dimensions.get('window');
import MyTabView from '../../views/MyTabView';
import {fetchRequest} from '../../utils/FetchUtil';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Page_Auto from './Page_Auto';
import {Page_AutoPay, Pay_Navigator} from './reduce/index'
import BaseComponent from '../global/BaseComponent';
import MyProgressBar from "../../views/MyProgressBar";
import ToastUtil from "../../utils/ToastUtil";
import PageNull from "../../views/PageNull";
import NavigationUtil from "../../utils/NavigationUtil";
import {TYPES} from "../../root/GlobalAction";
import realm from "../../storage/realm";
import {onAppStateChanged, onBackPress} from "../../utils/GoBackUtil";
import {updateAppByLogin} from "../../utils/updateAppUtil";
import MyButtonView from "../../views/MyButtonView";
import {zAppBarHeight, zdp, zHeight} from "../../utils/ScreenUtil";
import {PageBackground} from "../../views/PageBackground";


let lastBackPressed;
let navigation;
class FirstTab extends BaseComponent {

    constructor(props) {
        super(props);
        navigation = this.props.navigation;
        var url = "https://api.douban.com/v2/movie/top250?start=0&count=10";

        this.props.initAutoPayAction(false);
        this.props.initPayNavigatorAction(this.props.navigation);

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

        return onBackPress(lastBackPressed,this.props.navigation,()=>{
            lastBackPressed = Date.now();
        })
    };


    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView title={'首页'} leftView={false} navigation={this.props.navigation}/>

                <PageBackground content={'页面功能正在积极开发中'} height={zHeight-zAppBarHeight-zdp(60)}/>

                {/*{PageBackground('页面功能正在积极开发中...')}*/}

            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        RS_AutoPay: state.RS_AutoPay.data,
        nav:state.nav
    }

};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initAutoPayAction: Page_AutoPay,
        initPayNavigatorAction: Pay_Navigator,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(FirstTab);
