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


      /*  console.log(nextState);

        if (nextState != null && nextState === 'active') {

            if (this.flage) {

                if (lastBackPressed && lastBackPressed + 3000 <= Date.now()) {

                    let objects = realm.objects('Gesture');

                    if (objects.length > 0) {
                        navigation.navigate('VerifyByGesture');
                    } else {
                        NavigationUtil.reset(navigation, 'RegisterApp');
                    }
                }

                lastBackPressed = Date.now();
            }
            this.flage = false;
        } else if (nextState != null && nextState === 'background') {
            this.flage = true;
        }*/
    }


    onBackPress = () => {

        return onBackPress(lastBackPressed,this.props.navigation,()=>{
            lastBackPressed = Date.now();
        })

       /* if (!lastBackPressed) {
            lastBackPressed = Date.now();
            ToastUtil.showShort('再按一次退出应用');
            console.log(lastBackPressed);
            return true;
        }
        console.log(lastBackPressed);

        let cutTime = Date.now() - lastBackPressed;
        console.log(cutTime);
        if (cutTime < 1500) {

            this.props.navigation.dispatch({type:TYPES.ACTION_GLOBAL, data: null})

            NavigationUtil.reset(this.props.navigation, 'RegisterApp')
            BackHandler.exitApp();
            return false;
        } else {
            ToastUtil.showShort('再按一次退出应用');
            lastBackPressed = Date.now();
            return true;
        }

        return true;
*/
    };


    render() {
        console.log(this.props.nav);
                {/*<PageNull/>*/}
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView title={'首页'} leftView={false} navigation={this.props.navigation}/>
{/*
                <MyButtonView title={'跳转'} onPress={()=>{
                    this.props.navigation.navigate('Test1');
                }}/>*/}
            </View>
        );
            // this.props.RS_AutoPay ?
            //     <Page_Auto navigation={this.props.navigation} />
            //     :
            //     <MyProgressBar/>


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
