/**
 * Created by zerowolf Date: 2018/5/23 Time: 下午9:12
 */
import {deleteGestureLogin, getGestureData, writeGesturePsw} from "../../storage/schema_gesture";

/**
 * Created by zerowolf Date: 2018/5/16 Time: 下午2:57
 */
const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Platform,
    StyleSheet,
    TextInput,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    Dimensions, Keyboard,
    ListView, BackHandler, AppState
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchRequest} from "../../utils/FetchUtil";
import BaseComponent from "../global/BaseComponent";
import {save2Realm} from "./SaveRealmUtil";
import {getCardLength} from "../../storage/schema_card";
import ToastUtil from "../../utils/ToastUtil";
import {actions} from "../../root/GlobalAction";
import NavigationUtil from "../../utils/NavigationUtil";
import {NavigationActions} from "react-navigation";
import {zdp, zsp, zWidth} from "../../utils/ScreenUtil";
import {onAppStateChanged} from "../../utils/GoBackUtil";
import {cusColors} from "../../value/cusColor/cusColors";
import GesturePassword from "../../utils/getstureUtil";
import ZText from "../../views/ZText";

var Password1;
var laveTime = 5;
let gestureData;

class VerifyByGesture extends BaseComponent {
    constructor(props) {
        super(props);


        gestureData = getGestureData();

        if (gestureData) {
            Password1 = gestureData.gesturePsw;
        }
        console.log(Password1);


        this.state = {
            message: '请输入手势密码',
            status: 'normal',
            timeOut: 100,
        }
    }


    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        AppState.addEventListener('change', this._onAppStateChanged);
    }

    componentWillUnmount() {
        // this.gesture.
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
        AppState.removeEventListener('change', this._onAppStateChanged);
    }

    _onAppStateChanged(nextState) {
        console.log('手势验证自己的进程管理');
    }

    onBackPress = () => {
        laveTime = 5;
        return true;
    };

    render() {
        return (
            <GesturePassword
                ref={refs => this.gesture = refs}
                status={this.state.status}
                message={this.state.message}
                onStart={() => this.onStart()}
                onEnd={(password) => this.onEnd(password)}
                innerCircle={true}
                outerCircle={true}
                normalColor={'white'}
                rightColor={'white'}
                wrongColor={'#ff737b'}
                interval={this.state.timeOut}
            >

                <TouchableOpacity activeOpacity={0.9}
                                  style={{
                                      position: 'absolute',
                                      width: zWidth,
                                      bottom: zdp(40),
                                      padding: zdp(10),
                                      justifyContent: 'center',
                                      alignItems: 'center'
                                  }}
                                  onPress={() => {
                                      deleteGestureLogin();
                                      NavigationUtil.reset(this.props.navigation, 'RegisterApp');
                                  }}>

                    <ZText parentStyle={{}}
                           content={`忘记手势密码?`}
                           fontSize={zsp(18)}
                           color={'white'}/>

                </TouchableOpacity>
            </GesturePassword>
        );

    }

    onEnd(password) {
        const {timeOut} = this.state;

        if (password === Password1) {
            clearTimeout(this.time);
            laveTime = 5;
            this.props.navigation.goBack();

        } else {
            laveTime = laveTime - 1;
            console.log(laveTime);
            if (laveTime === 0) {
                // deleteGestureLogin();
                laveTime = 5;
                ToastUtil.showShort('手势已连续多次输入错误,请密码登录');
                clearTimeout(this.time);
                NavigationUtil.reset(this.props.navigation, 'RegisterApp');
            } else {
                if (timeOut) {
                    this.time = setTimeout(() => {
                        this.setState({
                            status: 'wrong',
                            message: `输入错误,您还有${laveTime}次机会`
                        });
                        clearTimeout(this.time);
                    }, timeOut)
                }
            }
        }
    }

    onStart() {
        this.setState({
            status: 'normal',
            message: '请输入手势密码'
        });


        if (this.state.timeOut) {
            clearTimeout(this.time);
        }
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initGlobalInfo: actions.getGlobalInfo,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyByGesture);
