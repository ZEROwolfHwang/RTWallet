/**
 * Created by zerowolf Date: 2018/5/13 Time: 下午4:42
 */

import MyTabView from "../../../views/MyTabView";

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
    BackHandler
} from 'react-native';
import Item from "./Item";
import BaseComponent from "../../global/BaseComponent";
import MyTextInput from "../../../views/MyTextInput";
import {pressVerify} from "../../../utils/smsVerifyUtil";
import MyButtonView from "../../../views/MyButtonView";
import {checkPassword} from "../../../utils/JudgeUtil";
import {fetchRequest} from "../../../utils/FetchUtil";
import CountdownUtil from "../../../utils/CountdownUtil";
import NavigationUtil from "../../../utils/NavigationUtil";
import ToastUtil from "../../../utils/ToastUtil";
import {zdp, zsp} from "../../../utils/ScreenUtil";
import {cusColors} from "../../../value/cusColor/cusColors";
import ZText from "../../../views/ZText";

var globalInfo = null;


class PageChangePsw extends BaseComponent {

    constructor(props) {
        super(props);

        globalInfo = this.props.globalInfo;

        let phone = globalInfo.phone;


        this.phoneFirst = phone.substr(0, 4);
        this.phoneLast = phone.substr(phone.length - 4);
        this.state = {
            phone: '',
            verifyCode: '',
            isSentVerify: true,
            timerTitle: '发送验证码',
            passwordNew: '',
            passwordSure: ''
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
                <MyTabView title={'修改登录密码'} navigation={this.props.navigation}/>


                <View style={{
                    width,
                    marginTop: zdp(20),
                    backgroundColor: 'white',
                    padding: zdp(20),
                    elevation: zdp(5),
                    shadowOffset: {width: zdp(5), height: 5},
                    shadowColor: cusColors.shadowColor,
                    shadowOpacity: 0.6,
                    shadowRadius: 2
                }}>

                    <Text style={{
                        fontSize: zsp(16),
                        color: 'grey'
                    }}>{`验证码(发送至(${this.phoneFirst + '****' + this.phoneLast})`}</Text>

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
                                          onPress={() => {
                                              pressVerify(globalInfo.phone, this.state.isSentVerify,
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

                            <ZText parentStyle={{marginLeft:zdp(20)}}
                                   content={this.state.timerTitle}
                                   color={this.state.isSentVerify ? cusColors.verify_light : this.state.timerTitle.indexOf('s') > -1 ? cusColors.verify_dark : cusColors.verify_light}
                                   fontSize={zsp(16)}/>


                        </TouchableOpacity>
                    </View>

                    <Item title={'设置新密码'} placeholder={'请输入不小于6位数的新密码'}
                          onChangeText={(text) => {
                              this.setState({
                                  passwordNew: text
                              })
                          }}/>
                    <Item title={'确认密码'} placeholder={'请再次确认密码'}
                          onChangeText={(text) => {
                        this.setState({
                            passwordSure: text
                        })
                    }}/>


                </View>
                <MyButtonView style={{width: width / 1.3, marginTop: zdp(80)}} title={'确定'}
                              onPress={this.pressSure}/>
            </View>);
    }



    /**
     * 确认修改密码
     */
    pressSure = () => {
        checkPassword(this.state.passwordNew, this.state.passwordSure)
            .then(res => {
                let formData = new FormData();
                formData.append('phone', globalInfo.phone);
                formData.append('password', this.state.passwordNew);
                formData.append('code', this.state.verifyCode);
                fetchRequest('Reset', 'POST', formData)
                    .then(res => {
                        console.log(res);
                        if (res.respCode === 200) {
                            CountdownUtil.stop();
                            NavigationUtil.reset(this.props.navigation, 'RegisterApp')
                        } else {
                            ToastUtil.showShort(res.respMsg)
                        }
                    }).then(err => {
                    console.log(err);
                    ToastUtil.showShort(err)

                });


            }).catch(err => {
            console.log(err);
        })
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

export default connect(mapStateToProps, mapDispatchToProps)(PageChangePsw);
