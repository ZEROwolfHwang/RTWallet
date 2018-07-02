/**
 * Created by zerowolf Date: 2018/5/13 Time: 下午4:27
 */

import BaseComponent from "../../global/BaseComponent";

const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Platform,
    StyleSheet,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ListView,
    AppState,
    BackHandler, DeviceEventEmitter, Modal
} from 'react-native';
import MyTabView from "../../../views/MyTabView";
import ItemIconTextIconView from "../../../views/ItemIconTextIconView";
import {zdp, zModalHeight, zModalMarginTop, zsp, zWidth} from "../../../utils/ScreenUtil";
import {onAppStateChanged} from "../../../utils/GoBackUtil";
import {cusColors} from "../../../value/cusColor/cusColors";
import {fetchRequest} from "../../../utils/FetchUtil";
import {updateApp} from "../../global/AllModuleUtils";
import * as wechat from "react-native-wechat";
import ToastUtil from "../../../utils/ToastUtil";
import ZText from "../../../views/ZText";
import {AnimatedCircularProgress} from "react-native-circular-progress";
import {Api} from "../../../utils/Api";
let navigation;
let lastBackPressed;
let globalInfo;


class PageSetting extends BaseComponent {

    constructor(props) {
        super(props);
        navigation = this.props.navigation;
        globalInfo = this.props.globalInfo;

        this.state = {
            showModal: false,
            currentProcess: 0,
        };
    }

    componentDidMount() {
        DeviceEventEmitter.addListener('LOAD_PROGRESS', (msg) => {

            console.log(msg);
            this.setState({
                currentProcess: msg
            })
            if (msg === 100) {
                this.setState({
                    showModal: false,
                    currentProcess: 0
                })
            }
        });

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
        this.props.navigation.goBack();
        return true;
    };


    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView title={'设置'} navigation={this.props.navigation}/>


                <ItemIconTextIconView title={'完善用户信息'} iconName={'user-circle-o'}
                                      onPress={this.pressCompleteInfo}/>


                <ItemIconTextIconView title={'修改登录手机'} iconName={'mobile-phone'}
                                      onPress={this.pressChangePhone}/>

                <ItemIconTextIconView title={'修改登录密码'} iconName={'lock'}
                                      onPress={this.pressChangePsw}/>

            {/*    {Platform.OS === 'android' ?
                    <ItemIconTextIconView title={'微信分享'} iconName={'wechat'}
                                          onPress={this.pressShare2WX}/> : null
                }*/}

                {Platform.OS === 'android' ?
                    <ItemIconTextIconView title={'版本升级'} iconName={'arrow-circle-up'}
                                          onPress={this.pressUpdateApp}/> : null
                }


                <ItemIconTextIconView title={'手势密码'} iconName={'lock'}
                                      onPress={this.pressGesturePsw}/>


                {Platform.OS === 'android' ? this.viewUpdateModal() : null}
            </View>);
    }

    /**
     * 更新的进度条
     */
    viewUpdateModal() {
        return <Modal
            animationType='fade'
            transparent={true}
            visible={this.state.showModal}
            onRequestClose={() => {
            }}
        >
            <View style={{
                width,
                height: zModalHeight,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: zModalMarginTop,
                backgroundColor: cusColors.main_default_light
            }}>


                <AnimatedCircularProgress
                    size={120}
                    width={15}
                    fill={this.state.currentProcess}
                    tintColor={cusColors.progress_title}
                    onAnimationComplete={() => console.log('onAnimationComplete')}
                    backgroundColor={cusColors.RefreshBackground}/>



                <ZText parentStyle={{marginTop: zdp(20)}}
                       content={`当前下载进度: ${this.state.currentProcess}%`}
                       color={cusColors.progress_title} fontSize={zsp(18)}/>

            </View>

        </Modal>;
    }

    /**
     * 微信分享
     */
  /*  pressShare2WX = () => {
        console.log(globalInfo);
        console.log(`http://sjpay.githubshop.com/app/reg/${globalInfo.recommend}`);


        wechat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    //发送授权请求
                    wechat.shareToSession({
                        type: 'news',
                        title: '锐通钱包 快捷收款 完美还款',
                        webpageUrl: `http://sjpay.githubshop.com/app/reg/${globalInfo.recommend}`
                    }).then(res => {
                        console.log(res);
                    })
                        .catch(err => {
                            console.log("分享失败", err);
                        });
                } else {

                    Alert.alert('没有安装微信', '请先安装微信客户端在进行登录', [
                        {text: '确定'}
                    ])
                }
            }).catch(err=>{
            console.log(err);
        })

    }*/

    pressUpdateApp = () => {
        fetchRequest(Api.updateApp, 'GET')
            .then(res => {
                console.log(res);
                if (res.respCode === 200) {
                    let updateInfo = res.data;
                    let netVersion = parseFloat(updateInfo.version);

                    updateApp.getApkName()
                        .then(localVersion => {

                            if (parseFloat(localVersion) < netVersion) {

                                Alert.alert(
                                    `版本升级:${netVersion}`,
                                    `${updateInfo.content}`,
                                    [
                                        updateInfo.isupdate === 0 ? {
                                            text: '取消',
                                            onPress: () => console.log('Ask me later pressed')
                                        } : null,
                                        {
                                            text: '确定', onPress: () => {
                                                this.setState({
                                                    showModal: true
                                                })
                                                this.pressSureButton(updateInfo.fileUrl)
                                            }, style: 'cancel'
                                        },

                                    ],
                                    {cancelable: false}
                                );
                            } else {
                                ToastUtil.showShort('当前已是最新版本,无需更新');
                            }

                        })

                }
            }).catch(err => {
            console.log(err);
        })

    };

    pressSureButton = (url) => {
        updateApp.upgrade(url);
        console.log('Cancel Pressed')
    }

    /**
     * 手势密码
     */
    pressGesturePsw = () => {
        this.props.navigation.navigate('PageGesture');
    };

    /**
     * 完善用户信息
     */
    pressCompleteInfo = () => {
        this.props.navigation.navigate('MerchantInfo');
    }
    /**
     * 修改登录手机
     */
    pressChangePhone = () => {
        AppState.removeEventListener('change', this._onAppStateChanged);
        this.props.navigation.navigate('PageChangePhone');
    }
    /**
     * 修改登录密码
     */
    pressChangePsw = () => {
        this.props.navigation.navigate('PageChangePsw');
    }

}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo.data,

    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PageSetting);
