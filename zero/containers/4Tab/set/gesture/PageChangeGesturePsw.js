/**
 * Created by zerowolf Date: 2018/5/23 Time: 下午9:21
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View, Alert,
    Dimensions, BackHandler, Platform
} from 'react-native';

const {width, height} = Dimensions.get('window')
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BaseComponent from "../../../global/BaseComponent";
import ToastUtil from "../../../../utils/ToastUtil";
import MyButtonView from "../../../../views/MyButtonView";
import {
    deleteGestureLogin,
    getGestureData,
    writeGesturePsw
} from "../../../../storage/schema_gesture";
import {actions} from "../../../../root/GlobalAction";
import {fetchRequest} from "../../../../utils/FetchUtil";
import {save2Realm} from "../../../regist/SaveRealmUtil";
import NavigationUtil from "../../../../utils/NavigationUtil";
import {zdp, zsp, zWidth} from "../../../../utils/ScreenUtil";
import LinearGradient from "react-native-linear-gradient";
import GesturePassword from "../../../../utils/getstureUtil";


class PageChangeGesturePsw extends BaseComponent {
    constructor(props) {
        super(props);


        console.log('hehe');

        this.laveTime = 5;
        this.currentStatus = 0;

        this.gestureData = getGestureData();

        if (this.gestureData) {
            this.Password1 = this.gestureData.gesturePsw;
        }
        console.log(this.Password1);


        this.state = {
            message: '请输入手势密码',
            status: 'normal',
            timeOut: 100,
        }
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
        clearTimeout(this.time);
    }

    onBackPress = () => {
        clearTimeout(this.time);
        this.Password1 = '';

        this.props.navigation.state.params.onGoBack();
        this.props.navigation.goBack();
        return true;
    };

    onEnd(password) {
        const {timeOut} = this.state;
        if (this.currentStatus === 0) {

            if (password === this.Password1) {
                if (timeOut) {
                    this.time = setTimeout(() => {
                        this.setState({
                            status: 'right',
                            message: '请绘制新的解锁密码'
                        });
                        clearTimeout(this.time);
                    }, timeOut)
                }
                // deleteGestureLogin();
                this.currentStatus = 1;
                this.Password1 = '';

            } else {
                this.laveTime = this.laveTime - 1;
                console.log(this.laveTime);
                if (this.laveTime === 0) {
                    // deleteGestureLogin();
                    clearTimeout(this.time);
                    ToastUtil.showShort('手势已连续多次输入错误,请密码登录');
                    NavigationUtil.reset(this.props.navigation, 'RegisterApp');
                } else {

                    if (timeOut) {
                        this.time = setTimeout(() => {
                            this.setState({
                                status: 'wrong',
                                message: `输入错误,您还有${this.laveTime}次机会`
                            });
                            clearTimeout(this.time)
                        }, timeOut)
                    }
                }
            }
        } else {
            if (this.Password1 === '') {

                if (password.length < 4) {
                    this.setState({
                        status: 'wrong',
                        message: '密码长度至少为4位'
                    });
                } else {

                    this.Password1 = password;
                    if (timeOut) {
                        this.time = setTimeout(() => {
                            this.setState({
                                status: 'normal',
                                message: '重绘手势以确认',
                            });
                            clearTimeout(this.time);
                        }, timeOut)
                    }
                }
            } else {
                // The second password
                if (password === this.Password1) {
                    console.log('hehee');
                    this.setState({
                        status: 'right',
                        message: '设置手势密码成功'
                    });

                    this.Password1 = '';
                    this.currentStatus = 0;
                    writeGesturePsw(this.props.globalInfo.merCode.toString(), password);

                    getGestureData();
                    setTimeout(() => {
                        this.props.navigation.state.params.onGoBack();
                        this.props.navigation.goBack();
                    }, 100);

                    ToastUtil.showShort('设置手势密码成功');
                    // your codes to close this view
                } else {
                    console.log('hahaha');
                    this.setState({
                        status: 'wrong',
                        message: '两次图案不一致,请重新绘制'
                    });
                    this.Password1 = '';

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
                />
        );
    }

    /**
     * 存储全局信息
     * @param resData
     */
    save2Global = (resData) => {
        this.props.initGlobalInfo({
            token: resData.token,
            phone: resData.phone,
            IDCard: resData.identity,
            username: resData.name,
            merCode: resData.merCode,
            appUser: resData.appUser
        });
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo.data
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initGlobalInfo: actions.getGlobalInfo,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PageChangeGesturePsw);

