/**
 * Created by zerowolf Date: 2018/5/13 Time: 下午4:40
 */

import BaseComponent from "../../global/BaseComponent";

const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions, ListView,BackHandler
} from 'react-native';
import Item from "./Item";
import MyTabView from "../../../views/MyTabView";
import MyTextInput from "../../../views/MyTextInput";
import {pressVerify} from "../../../utils/smsVerifyUtil";
import MyButtonView from "../../../views/MyButtonView";
import {fetchRequestToken} from "../../../utils/FetchUtilToken";
import CountdownUtil from "../../../utils/CountdownUtil";
import NavigationUtil from "../../../utils/NavigationUtil";
import ToastUtil, {toastAlert} from "../../../utils/ToastUtil";
import {checkMobile} from "../../../utils/CheckUitls";
import {zdp, zsp} from "../../../utils/ScreenUtil";
import {cusColors} from "../../../value/cusColor/cusColors";

var globalInfo = null;

class PageChangePhoneNext extends BaseComponent {

    constructor(props) {
        super(props);

        globalInfo = this.props.globalInfo;

        this.state = {
            phoneNew: '',
            verifyCode: '',
            isSentVerify: true,
            timerTitle: '发送验证码'
        }
    }
componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
}

componentWillUnmount() {
    CountdownUtil.stop();
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
}

onBackPress = () => {
    this.props.navigation.goBack();
    return true;
};



    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView style={{
                    elevation: zdp(5),
                    shadowOffset: {width: zdp(5), height: 5},
                    shadowColor: cusColors.shadowColor,
                    shadowOpacity: 0.6,
                    shadowRadius: 2,
                }} title={'修改手机号码'} navigation={this.props.navigation}/>


                <View style={{
                    width,
                    marginTop: zdp(20),
                    backgroundColor: 'white',
                    padding: zdp(20),
                    paddingTop: zdp(10),
                    elevation: zdp(5),
                    shadowOffset: {width: zdp(5), height: 5},
                    shadowColor: cusColors.shadowColor,
                    shadowOpacity: 0.6,
                    shadowRadius: zdp(2)
                }}>

                    <Item title={'新手机号'} placeholder={'请输入新手机号码'}
                          keyboardType={'numeric'}
                          onChangeText={(text) => {
                              this.setState({
                                  phoneNew: text
                              })
                          }}/>


                    <Text style={{
                        fontSize: zsp(15),
                        marginTop: zdp(10),
                        color: 'grey',
                        textAlign: 'left'
                    }}>{`新手机验证码`}</Text>


                    <View style={{
                        width: width, height: zdp(50), marginTop: 0, flexDirection: 'row'
                    }}>

                        <MyTextInput
                            style={{width: zdp(120), height: zdp(50), borderWidth: 0, marginTop: 0,
                                borderBottomWidth:1, borderColor:'lightgrey'}}
                            keyboardType={'numeric'} placeholder={'请输入验证码'}
                            onChangeText={(text) => {
                                this.setState({
                                    verifyCode: text
                                })
                            }}/>
                        <TouchableOpacity style={{
                            flex: 1, height: zdp(50),
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingRight: zdp(20),
                        }}
                                          activeOpacity={this.state.isSentVerify ? 0.5 : 1}
                                          onPress={()=>{
                                              pressVerify(this.state.phoneNew, this.state.isSentVerify,
                                                  () => {
                                                      console.log('回调1');
                                                      this.setState({
                                                          isSentVerify: false,
                                                      });
                                                  }
                                                  , (time) => {
                                                      console.log(time.sec);
                                                      this.setState({
                                                          timerTitle: time.sec > 0 ? `重新获取(${time.sec}s)` : '重新获取'
                                                      }, () => {
                                                          if (this.state.timerTitle === '重新获取') {
                                                              console.log('回调2');
                                                              this.setState({
                                                                  isSentVerify: true
                                                              })
                                                          }
                                                      })
                                                  }, () => {
                                                      console.log('回调3');
                                                      this.setState({
                                                          isSentVerify: true,
                                                          timerTitle: '重新获取'
                                                      });
                                                  })
                                          }}>
                            <View style={{
                                flex: 1,
                                height: zdp(50),
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingRight: zdp(20),
                            }}>
                                <Text
                                    style={{
                                        marginLeft: zdp(20),
                                        alignSelf: 'center',
                                        fontSize: zsp(15),
                                        textAlign: 'center',
                                        color: this.state.isSentVerify ? 'lightblue' : this.state.timerTitle.endsWith('s') ? 'lightgrey' : '#999999'
                                    }}>{this.state.timerTitle}</Text>

                            </View>
                        </TouchableOpacity>
                    </View>
                </View>


                <MyButtonView style={{width: width / 1.3, marginTop: zdp(80)}} title={'确定修改'}
                              onPress={this.pressSure}/>
            </View>)
    }


    /**
     * 确定修改手机号码
     */
    pressSure = () => {
        if (!checkMobile(this.state.phoneNew)) {
            return;
        }


        let formData = new FormData();
        formData.append('phone', this.state.phoneNew);
        formData.append('msgCode', this.state.verifyCode);

        fetchRequestToken('phoneSubmit', 'POST', globalInfo.token,formData)
            .then(res => {
                console.log(res);
                if (res.respCode === 200) {
                    console.log('新手机验证通过');
                    // this.props.navigation.navigate('PageChangePhoneNext');
                    CountdownUtil.stop();
                    NavigationUtil.reset(this.props.navigation, 'RegisterApp');
                }  else if (res.respCode === 203) {
                    toastAlert('登录超时,请重新登录',()=>{
                        NavigationUtil.backToLogin(this.props.navigation);
                    })
                }else {
                    console.log(res.respMsg);
                    ToastUtil.showShort(res.respMsg)
                }
            })
            .catch(err => {
                console.log(err);
                // ToastUtil.showShort(err)
            })

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

export default connect(mapStateToProps, mapDispatchToProps)(PageChangePhoneNext);
