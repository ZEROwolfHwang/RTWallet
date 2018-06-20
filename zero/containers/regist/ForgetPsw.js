/**
 * Created by zerowolf Date: 2018/5/11 Time: 下午2:14
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
    ListView,
    KeyboardAvoidingView, BackHandler
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MyTabView from "../../views/MyTabView";
import MyTextInput from "../../views/MyTextInput";
import LinearGradient from "react-native-linear-gradient";
import BaseComponent from "../global/BaseComponent";
import MyButtonView from "../../views/MyButtonView";
import MyTextInputWithIcon from "../../views/MyTextInputWithIcon";
import {pressVerify} from "../../utils/smsVerifyUtil";
import {fetchRequest} from "../../utils/FetchUtil";
import CountdownUtil from "../../utils/CountdownUtil";
import ToastUtil from "../../utils/ToastUtil";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {checkMobile} from "../../utils/CheckUitls";
import MyLinearGradient from "../../views/MyLinearGradient";
import {zdp, zsp} from "../../utils/ScreenUtil";
import {cusColors} from "../../value/cusColor/cusColors";

const {width, height} = Dimensions.get('window');

class ForgetPsw extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            phone: '',
            verifyCode: '',
            passwordNew: '',
            passwordSure: '',
            isSentVerify: true,
            timerTitle: '获取验证码',
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
                <Image source={require('../../../resource/image/loginbg.png')}
                       style={{width, height, position: 'absolute'}}/>

                <View>
                    <MyTabView isTransparent={true} title={'忘记密码'} barStyle={'light-content'}
                               backgroundColor={'transparent'}
                               globalTitleColor={'white'} navigation={this.props.navigation}/>
                    <KeyboardAwareScrollView
                        style={{flex: 1, backgroundColor: 'transparent'}}
                        resetScrollToCoords={{x: 0, y: 0}}
                        contentContainerStyle={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                        keyboardShouldPersistTaps={'always'}
                    >
                        <MyTextInputWithIcon
                            style={{marginTop: zdp(60)}}

                            placeholder={'请输入手机号'}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                this.setState({
                                    phone: text
                                })
                            }} iconName={'phone'}/>


                        <View style={{
                            width: width / 1.3,
                            height: zdp(50),
                            marginTop: zdp(20),
                            borderWidth: 1,
                            borderRadius: zdp(5),
                            borderColor: 'white',
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <MyTextInputWithIcon
                                style={{flex: 1, height: zdp(50), borderWidth: 0, marginTop: 0}}
                                placeholder={'请输入验证码'}
                                keyboardType={'numeric'}
                                maxLength={6}
                                onChangeText={(text) => {
                                    this.setState({
                                        verifyCode: text
                                    })
                                }} iconName={'lock'}/>

                            <TouchableOpacity activeOpacity={this.state.isSentVerify ? 0.5 : 1}
                                              onPress={() => {
                                                  pressVerify(this.state.phone, this.state.isSentVerify,
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
                                    height: zdp(50),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingRight: zdp(20),
                                }}>
                                    <Text
                                        style={{
                                            fontSize: zsp(14),
                                            color: this.state.isSentVerify ? cusColors.verify_light : this.state.timerTitle.indexOf('s')>-1 ? cusColors.verify_dark : cusColors.verify_light
                                        }}>{this.state.timerTitle}</Text>

                                </View>
                            </TouchableOpacity>
                        </View>


                        <MyTextInputWithIcon
                            placeholder={'请输入新密码'}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                this.setState({
                                    passwordNew: text
                                })
                            }} iconName={'phone'}/>

                        <MyTextInputWithIcon
                            placeholder={'确认密码'}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                this.setState({
                                    passwordSure: text
                                })
                            }} iconName={'phone'}/>


                        <View style={{
                            flex: 1,
                            width: width,
                            height: zdp(100),
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            <MyButtonView
                                modal={1}
                                style={{width: width / 1.3, marginTop: zdp(30)}}
                                title={'确认修改'}
                                onPress={this.pressSureChange}/>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </View>
        );
    }

    /**
     * 确认修改
     */
    pressSureChange = () => {

        if (!checkMobile(this.state.phone)) {
            return;
        }

        console.log('确认修改');
        let formData = new FormData();
        formData.append('phone', this.state.phone);
        formData.append('password', this.state.passwordNew);
        formData.append('code', this.state.verifyCode);

        fetchRequest('Reset', 'POST', formData)
            .then(res => {
                console.log(res);
                if (res.respCode === 200) {
                    CountdownUtil.stop();
                    this.props.navigation.navigate('RegisterSuccess', {type: 0});
                } else {
                    ToastUtil.showShort(res.respMsg)
                }
            }).then(err => {
            console.log(err);
            ToastUtil.showShort(err)

        });

    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPsw);

