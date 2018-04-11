import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions, TextInput
} from 'react-native';
const {width, height} = Dimensions.get('window');
import MyTabView from '../../views/MyTabView';
import BaseComponent from '../global/BaseComponent';
import MyTextInput from "../../views/MyTextInput";
import ButtonView from "../../views/ButtonView";
import {fetchRequest}from "../../utils/FetchUtil";
import TimerButton from "./item/TimerButton";
import TextInputRightButton from "./item/TextInputRightButton";
import CountdownUtil from "./item/CountdownUtil";
import ToastUtil from "../../utils/ToastUtil";
import dismissKeyboard from 'dismissKeyboard';
import NavigationUtil from '../../utils/NavigationUtil';
import {
    Madoka,
} from 'react-native-textinput-effects';
import storage from '../../storage/Storage'
export default class RegisterApp extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            phone: '',
            verifyCode: '',
            isSentVerify: true,
            timerTitle: '获取验证码'
        };


    }

    componentWillMount() {
        global.storage = storage;
    }

    render() {




        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                {/*<Madoka*/}
                    {/*onChangeText={(text) => {*/}
                        {/*console.log(text);*/}
                    {/*}}*/}
                    {/*style={{marginTop: 4, width: width - 20}}*/}
                    {/*label={'手机号'}*/}
                    {/*borderColor={'blue'}*/}
                    {/*labelStyle={{color: 'blue'}}*/}
                    {/*inputStyle={{color: 'grey'}}*/}
                {/*/>*/}
                {/*<Madoka*/}
                    {/*style={{width: width - 100}}*/}
                    {/*label={'验证码'}*/}
                    {/*borderColor={'#aee2c9'}*/}
                    {/*labelStyle={{color: '#008445'}}*/}
                    {/*inputStyle={{color: '#f4a197'}}*/}

                {/*/>*/}





                <TextInputRightButton
                    keyboardType={'numeric'}

                    width={width}
                    maxLength={11}
                    title={"手机号"}
                    placeholder={"请输入您的手机号"}
                    // ref={(c) => this.email = c}
                    onChangeText={(text) => {
                        console.log(text);
                        this.setState({
                            phone: text
                        })
                    }}
                    onBackClear={() => {
                        this.setState({
                            phone: ''
                        });
                    }}
                />

                <View style={{width: width, height: 0.5, backgroundColor: '#999999'}}/>


                <View style={{width: width, height: 50, flexDirection: 'row', backgroundColor: 'white'}}>

                    <TextInputRightButton
                        maxLength={11}
                        width={width - 120}
                        title={"验证码"}
                        placeholder={"请输入手机验证码"}
                        onChangeText={(text) => {
                            console.log(text);
                            this.setState({
                                verifyCode: text
                            })
                        }}
                        onBackClear={() => {
                            this.setState({
                                verifyCode: ''
                            });
                        }}
                    />

                    <TouchableOpacity activeOpacity={this.state.isSentVerify ? 0.5 : 1}
                                      onPress={() => {
                                          if (this.state.phone.length === 11) {
                                              dismissKeyboard();
                                              if (this.state.isSentVerify === true) {
                                                  // 倒计时时间
                                                  let countdownDate = new Date(new Date().getTime() + 5 * 1000);
                                                  // 点击之后验证码不能发送网络请求
                                                  this.setState({
                                                      isSentVerify: false
                                                  });

                                                  let formData = new FormData();
                                                  formData.append('phone', this.state.phone);
                                                  fetchRequest('sms', 'POST', formData)
                                                      .then(res => {
                                                          console.log(res);
                                                          CountdownUtil.setTimer(countdownDate, (time) => {
                                                              console.log(time.sec);
                                                              this.setState({
                                                                  timerTitle: time.sec > 0 ? time.sec + 's' : '重新获取'
                                                              }, () => {
                                                                  if (this.state.timerTitle == "重新获取") {
                                                                      this.setState({
                                                                          isSentVerify: true
                                                                      })
                                                                  }
                                                              })
                                                          });
                                                      }).then(err => {
                                                      console.log(err);
                                                  });

                                              }
                                          } else {
                                              ToastUtil.showShort('请输入正确的手机号');
                                          }
                                      }}>
                        <View style={{
                            width: 120,
                            height: 50,
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: this.state.isSentVerify ? 'grey' : this.state.timerTitle.endsWith('s') ? 'red' : '#999999'
                                }}>{this.state.timerTitle}</Text>

                        </View>
                    </TouchableOpacity>
                </View>
                <ButtonView title={'登录'}
                            onPress={() => {
                                // NavigationUtil.reset(this.props.navigation, 'ShiMing');
                                dismissKeyboard();
                                // fetchRequest('http://localhost:8080/ThirdServlet','POST',formData)
                                if (this.state.verifyCode.length < 4) {
                                    ToastUtil.showShort('验证码长度错误')
                                } else {
                                    let formData = new FormData();
                                    formData.append('phone', this.state.phone);
                                    formData.append('code', this.state.verifyCode);
                                    fetchRequest('Login', 'POST', formData)
                                        .then(res => {
                                            console.log(res);
                                            console.log(res.data);
                                            if (res.respCode === 200) {

                                                global.storage.save({
                                                    key:'token',
                                                    data: res.data.token,
                                                    expires: null
                                                });

                                                console.log(res.data.status);
                                                if (res.data.status === 1) {   //已注册
                                                    console.log('已经注册');
                                                    NavigationUtil.reset(this.props.navigation, 'Tab');
                                                } else {
                                                    console.log('未注册');
                                                    NavigationUtil.reset(this.props.navigation, 'ShiMing');
                                                    // this.props.navigation.dispatch({
                                                    //     type: 'Tab'
                                                    // })
                                                }

                                            } else {

                                            }
                                        }).then(err => {

                                        console.log(err);
                                    });
                                }
                            }}/>
            </View>
        );

    }


    componentWillUnmount() {
        CountdownUtil.stop()
    }
}
RegisterApp.propTypes = {
    phone: PropTypes.string
};
