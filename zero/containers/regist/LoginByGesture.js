/**
 * Created by zerowolf Date: 2018/5/23 Time: 下午9:12
 */
import {deleteGestureLogin, getGestureData} from "../../storage/schema_gesture";

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
    Dimensions,
    ListView, BackHandler
} from 'react-native';
import PasswordGesture from 'react-native-gesture-password';
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
import {zdp, zsp} from "../../utils/ScreenUtil";

var Password1;
var laveTime = 5;
let gestureData;

class LoginByGesture extends BaseComponent {
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
            timeOut: 300,
        }
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        return true;
    };

    onEnd(password) {
        const {timeOut} = this.state;

        if (password === Password1) {
            if (timeOut) {
                this.time = setTimeout(() => {
                    this.setState({
                        status: 'right',
                        message: '手势密码输入正确'
                    });
                }, timeOut)
            }

            fetchRequest(`Login?merCode=${gestureData.merCode.toString()}`, 'GET')
                .then(res => {

                    if (res.respCode === 200) {

                        let cardLength = getCardLength(res.data.phone);
                        if (cardLength !== res.data.CardLen) {
                            //长度不同则刷新本地数据库
                            save2Realm(res.data);
                        }
                        this.save2Global(res.data)

                        console.log(this.props.globalInfo);

                        this.props.navigation.navigate('Tab');

                    } else {
                        ToastUtil.showShort(res.respMsg);
                    }
                }).catch(err => {

            });

        } else {
            laveTime = laveTime - 1;
            console.log(laveTime);
            if (laveTime === 0) {
                deleteGestureLogin();
                // ToastUtil.showShort('已删除手势密码,请密码登录');
                this.props.navigation.navigate('RegisterApp',{type: 0});
            } else {

                if (timeOut) {
                    this.time = setTimeout(() => {
                        this.setState({
                            status: 'wrong',
                            message: `输入错误,您还有${laveTime}次机会`
                        });
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


    render() {
        return (
            <View style={{flex: 1}}>
                <PasswordGesture
                    ref={refs => this.gesture = refs}
                    status={this.state.status}
                    message={this.state.message}
                    onStart={() => this.onStart()}
                    onEnd={(password) => this.onEnd(password)}
                    innerCircle={true}
                    outerCircle={true}
                    interval={this.state.timeOut}
                    style={{flex: 1, backgroundColor: 'white'}}
                    textStyle={{fontSize: zsp(16), marginTop: zdp(60), paddingTop: 0}}
                />
                <TouchableOpacity activeOpacity={0.9} style={{
                    width,
                    height: zdp(60),
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={() => {
                    // NavigationUtil.reset(this.props.navigation, 'RegisterApp');
                    // NavigationActions.reset({
                    //     index: 0,
                    //     actions: [NavigationActions.navigate({ routeName })]
                    // });
                    // this.props.navigation.dispatch(NavigationActions.reset());

                    const navigateAction = NavigationActions.navigate({

                        routeName: 'RegisterApp',

                        params: {type:0},

                        action: NavigationActions.reset({ routeName: 'RegisterApp'})
                    })

                    this.props.navigation.dispatch(navigateAction)
                    // this.props.navigation.navigate('RegisterApp',{type: 0});


                }}>
                    <Text style={{
                        fontSize: zsp(15),
                        color: 'lightblue',
                        textAlign: 'center'
                    }}>{`忘记手势密码?`}</Text>
                </TouchableOpacity>


            </View>
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
        nav: state.nav
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initGlobalInfo: actions.getGlobalInfo,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginByGesture);
