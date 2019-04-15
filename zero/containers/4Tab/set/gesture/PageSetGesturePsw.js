/**
 * Created by zerowolf Date: 2018/5/23 Time: 下午9:21
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View, Alert, Platform,
    Dimensions, BackHandler, TouchableOpacity
} from 'react-native';

const {width, height} = Dimensions.get('window')
// import PasswordGesture from 'react-native-gesture-password';
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
import {zdp, zsp} from "../../../../utils/ScreenUtil";
import LinearGradient from "react-native-linear-gradient";
import GesturePassword from "../../../../utils/getstureUtil";
import ZText from "../../../../views/ZText";

var Password1 = '';

class PageSetGesturePsw extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            message: '请绘制新的解锁密码',
            status: 'normal',
            timeOut: 100,
        }
    }

    componentWillMount() {
        this.params = this.props.navigation.state.params;
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        // this.gesture.
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        Password1 = '';
        if (this.params.type === 0) {
            this.props.navigation.navigate('Tab');
        } else {
            this.props.navigation.state.params.onGoBack();
            this.props.navigation.goBack();
            return true;
        }
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
                {this.params.type === 0 ?
                    <TouchableOpacity activeOpacity={0.8}
                                      style={{
                                          position: 'absolute',
                                          top: zdp(40),
                                          right: zdp(40)
                                      }}
                                      onPress={() => {
                                          deleteGestureLogin();
                                          this.props.navigation.navigate('Tab');
                                      }}>

                        <ZText parentStyle={{
                            backgroundColor: 'transparent',
                            borderWidth: zdp(1.5),
                            borderColor: 'white',
                            opacity: 0.8,
                            elevation: zdp(2),
                            shadowOffset: {height: zdp(2)},
                            shadowColor: 'lightgrey',
                            shadowOpacity: 0.6,
                            shadowRadius: zdp(2),
                            borderRadius: zdp(20),
                            padding: zdp(20),
                            paddingTop: zdp(5),
                            paddingBottom: zdp(5),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                               content={'跳过'}
                               fontSize={zsp(14)}
                               color={'white'}/>

                    </TouchableOpacity>

                    : null
                }

            </GesturePassword>
        );
    }

    onEnd(password) {
        const {timeOut} = this.state;

        if (Password1 === '') {

            if (password.length < 4) {

                this.setState({
                    status: 'wrong',
                    message: '密码长度至少为4位'
                });
            } else {

                Password1 = password;
                if (timeOut) {
                    this.time = setTimeout(() => {
                        this.setState({
                            status: 'normal',
                            message: '重绘手势以确认',
                        });
                    }, timeOut)
                }
            }
        } else {
            // The second password
            if (password === Password1) {
                console.log('hehee');
                this.setState({
                    status: 'right',
                    message: '设置手势密码成功'
                });

                Password1 = '';

                writeGesturePsw(this.props.globalInfo.merCode.toString(), password);

                getGestureData();
                if (this.params.type === 0) {
                    this.props.navigation.navigate('Tab');
                } else {

                    setTimeout(() => {
                        this.props.navigation.state.params.onGoBack();
                        this.props.navigation.goBack();
                    }, 100);
                }


                ToastUtil.showShort('设置手势密码成功');
                // your codes to close this view
            } else {
                console.log('hahaha');
                this.setState({
                    status: 'wrong',
                    message: '两次图案不一致,请重新绘制'
                });
                Password1 = '';

            }
        }
    }

    onStart() {
        if (Password1 === '') {
            this.setState({
                status: 'normal',
                message: '请绘制新的解锁密码'
            });
        } else {
            this.setState({
                message: '重绘手势以确认'
            });
        }


        if (this.state.timeOut) {
            clearTimeout(this.time);
        }
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo.data
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PageSetGesturePsw);

