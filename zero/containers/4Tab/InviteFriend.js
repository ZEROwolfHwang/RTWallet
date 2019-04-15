/**
 * Created by zerowolf Date: 2018/7/5 Time: 下午3:59
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Platform, StyleSheet, TextInput, Text, Alert, View, TouchableOpacity, Image, ListView, Modal,BackHandler
} from 'react-native';
import MyTabView from "../../views/MyTabView";
import BaseComponent from "../global/BaseComponent";
import {zdp, zHeight, zModalHeight, zModalMarginTop, zsp, zWidth} from "../../utils/ScreenUtil";
import ZText from "../../views/ZText";
import {cusStrings} from "../../value/strings/cusStrings";
import MyButtonView from "../../views/MyButtonView";
import {cusColors} from "../../value/cusColor/cusColors";
import {toastShort} from "../../utils/ToastUtil";
import * as wechat from "react-native-wechat";
import {common_url} from "../../utils/FetchUtil";

// import {zdp, zWidth} from "../../utils/ScreenUtil";
let globalInfo;
     let navigation ;
class InviteFriend extends BaseComponent {

    constructor(props) {
        super(props);

        globalInfo = this.props.globalInfo;
     navigation = this.props.navigation;

        this.state = {
            showModalWX: false
        }
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


    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <Image source={{uri: 'invite_img'}}
                       resizeMode={'stretch'}
                       style={{
                           width: zWidth,
                           height: zdp(360),
                           backgroundColor: 'transparent'
                       }}/>
                <View style={{
                    flex: 1,
                    width: zWidth,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: '#495FC0'
                }}>

                    <View style={{
                        width: zWidth - zdp(20),
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        // opacity: 0.1,
                        // backgroundColor: '#495FC088',
                        padding: zdp(10),
                        paddingBottom: 0,
                        backgroundColor: '#5b6fc6',
                        borderRadius: zdp(5)
                    }}>

                        <ZText content={'成功邀请攻略'}
                               fontSize={zsp(18)}
                               color={'white'}
                               parentStyle={{}}
                        />

                        <View style={{
                            width: zWidth - zdp(20),
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                            paddingLeft: zdp(10),
                            opacity: 0.5,
                            paddingRight: zdp(10),
                            marginTop: zdp(10),
                            marginBottom: zdp(10),
                        }}>

                            <ZText content={cusStrings.invite_left}
                                   fontSize={zsp(16)}
                                   color={'white'}
                                   parentStyle={{alignSelf: 'center'}}/>
                            <Image source={{uri: 'invite_next'}}
                                   resizeMode={'contain'}
                                   style={{
                                       width: zdp(30),
                                       height: zdp(30),
                                       backgroundColor: 'transparent'
                                   }}/>
                            <ZText content={cusStrings.invite_center}
                                   fontSize={zsp(16)}
                                   color={'white'}
                                   parentStyle={{}}/>
                            <Image source={{uri: 'invite_next'}}
                                   resizeMode={'contain'}
                                   style={{
                                       width: zdp(30),
                                       height: zdp(30),
                                       backgroundColor: 'transparent'
                                   }}/>
                            <ZText content={cusStrings.invite_right}
                                   fontSize={zsp(16)}
                                   color={'white'}
                                   parentStyle={{}}/>
                        </View>

                        <ZText content={cusStrings.invite_success}
                               fontSize={zsp(16)}
                               color={'white'}
                               parentStyle={{
                                   opacity: 0.8,
                                   width: zWidth - zdp(20),
                                   backgroundColor: '#6b7dcb',
                                   paddingTop: zdp(10),
                                   paddingBottom: zdp(10),
                                   borderBottomLeftRadius: zdp(5)
                               }}
                        />

                    </View>

                    <ZText content={'邀请码'}
                           fontSize={zsp(16)}
                           color={'white'}
                           parentStyle={{opacity: 0.8, margin: zdp(10)}}/>

                    <ZText content={globalInfo.recommend}
                           fontSize={zsp(18)}
                           color={'white'}
                           parentStyle={{
                               padding: zdp(10), paddingLeft: zdp(80), paddingRight: zdp(80),
                               backgroundColor: '#5b6fc6',
                               borderRadius: zdp(5),
                               borderWidth: zdp(1),
                               borderColor: '#ffffff55'
                           }}/>
                    <TouchableOpacity activeOpacity={0.9}
                                      style={{
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          marginTop: zdp(20)
                                      }}
                                      onPress={() => {
                                          this.setState({
                                              showModalWX: true
                                          })
                                      }}>

                        <ZText content={'邀请好友'}
                               fontSize={zsp(20)}
                               color={'white'}
                               parentStyle={{
                                   width: zWidth - zdp(40), height: zdp(55), borderRadius: zdp(30),
                                   backgroundColor: '#E74937'
                               }}
                        />

                    </TouchableOpacity>
                </View>

                <MyTabView linear_style={{position: 'absolute', top: 0}} isTransparent={true}
                           title={''} navigation={this.props.navigation}/>
                {this.viewModalWXShare()}
            </View>);
    }

    /**
     * 微信分享
     */
    viewModalWXShare() {
        return <Modal
            animationType='fade'
            transparent={true}
            visible={this.state.showModalWX}
            onRequestClose={() => this.setState({showModalWX: false})}
        >
            <View
                style={{
                    width: zWidth,
                    height: zModalHeight,
                    marginTop: zModalMarginTop,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    paddingBottom: zdp(40),
                }}>

                <View style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                }}>
                    <ZText parentStyle={{
                        width: zWidth / 1.3,
                        padding: zdp(10), marginBottom: 0, backgroundColor: 'white',
                        borderRadius: zdp(0),
                        borderTopLeftRadius: zdp(10),
                        borderTopRightRadius: zdp(10),
                    }}
                           content={'分享到'}
                           fontSize={zsp(16)}
                           color={cusColors.text_secondary}/>

                    <View style={{
                        width: zWidth / 1.3,
                        backgroundColor: 'white',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        padding: zdp(30),
                        paddingTop: zdp(10),
                        borderRadius: zdp(0),
                        borderBottomLeftRadius: zdp(10),
                        borderBottomRightRadius: zdp(10),
                    }}>


                        <TouchableOpacity activeOpacity={0.9}
                                          style={{justifyContent: 'center', alignItems: 'center'}}
                                          onPress={() => {
                                              this.setState({
                                                  showModalWX: false
                                              })
                                              this.pressShare2WX()
                                          }}>

                            <Image source={{uri: 'wechat_wx'}}
                                   resizeMode={'contain'}
                                   style={{
                                       width: zdp(80),
                                       height: zdp(80),
                                       backgroundColor: 'transparent'
                                   }}/>
                            <ZText parentStyle={{padding: zdp(10)}} content={'微信好友'}
                                   fontSize={zsp(22)}
                                   color={cusColors.text_secondary}/>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.9}
                                          style={{justifyContent: 'center', alignItems: 'center'}}
                                          onPress={() => {
                                              this.setState({
                                                  showModalWX: false
                                              })
                                              this.pressShare2WXFriend()
                                          }}>

                            <Image source={{uri: 'wechat_pyq'}}
                                   resizeMode={'contain'}
                                   style={{
                                       width: zdp(80),
                                       height: zdp(80),
                                       backgroundColor: 'transparent'
                                   }}/>
                            <ZText parentStyle={{padding: zdp(10)}} content={'微信朋友圈'}
                                   fontSize={zsp(22)}
                                   color={cusColors.text_secondary}/>
                        </TouchableOpacity>


                    </View>

                    <TouchableOpacity activeOpacity={0.9} style={{
                        marginTop: zdp(15),
                        width: zWidth / 1.3,
                        padding: zdp(10),
                        borderRadius: zdp(10),
                        backgroundColor: 'white'
                    }}
                                      onPress={() => {
                                          console.log('asds');
                                          this.setState({
                                              showModalWX: false
                                          })
                                      }}>
                        <ZText content={'取 消'} fontSize={zsp(24)} color={cusColors.linear_light}/>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>;
    }


    /**
     * 微信好友分享
     */
    pressShare2WX = () => {
        console.log(globalInfo);
        wechat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    //发送授权请求
                    wechat.shareToSession({
                        type: 'news',
                        title: '锐通钱包 快捷收款 完美还款',
                        webpageUrl: `${common_url}reg/${globalInfo.recommend}`
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
            }).catch(err => {
            console.log(err);
        })

    }

    /**
     * 微信朋友圈分享
     */
    pressShare2WXFriend = () => {

        wechat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    wechat.shareToTimeline({
                        type: 'news',
                        title: '锐通钱包 快捷收款 完美还款',
                        description: '分享自:锐通信息技术有限公司',
                        // thumbImage: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
                        webpageUrl: `${common_url}reg/${globalInfo.recommend}`
                    })
                        .catch((error) => {
                            toastShort(error.message);
                        });
                } else {
                    toastShort('没有安装微信软件，请您安装微信之后再试');
                }
            });
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

export default connect(mapStateToProps, mapDispatchToProps)(InviteFriend);
