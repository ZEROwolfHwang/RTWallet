import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Keyboard, Alert, View, TouchableOpacity, Image, Dimensions, ListView,BackHandler
} from 'react-native';
import MyTabView from "../../views/MyTabView";
import MyTextInput from "../../views/MyTextInput";
import LinearGradient from "react-native-linear-gradient";
import MyButtonView from "../../views/MyButtonView";
import RegisterSuccess from "./RegisterSuccess";
import BaseComponent from "../global/BaseComponent";
import MyTextInputWithIcon from "../../views/MyTextInputWithIcon";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ToastUtil from "../../utils/ToastUtil";
import {fetchRequest} from "../../utils/FetchUtil";
import {actions} from "../../root/GlobalAction";
import {pressVerify} from "../../utils/smsVerifyUtil";
import CountdownUtil from "../../utils/CountdownUtil";
import {checkMobile} from "../../utils/CheckUitls";
import MyLinearGradient from "../../views/MyLinearGradient";
import {cusColors} from "../../value/cusColor/cusColors";
import {zdp, zsp} from "../../utils/ScreenUtil";

const {width, height} = Dimensions.get('window');

class RegisterMerchantNext extends BaseComponent {

    constructor(props) {
        super(props);

        this.registerInfo = null;

        this.state = {
            phone: '',
            verifyCode: '',
            isSentVerify: true,
            timerTitle: '获取验证码'
        }
    }

    componentWillMount() {
        this.registerInfo = this.props.navigation.state.params.registerInfo;
        console.log(this.registerInfo);
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

                <MyTabView title={'注册商户'} isTransparent={true} barStyle={'light-content'} globalTitleColor={'white'} backgroundColor={'transparent'} navigation={this.props.navigation}/>

                    <MyTextInputWithIcon
                        style={{marginTop:zdp(150)}}
                        keyboardType={'numeric'}
                        placeholder={'绑定手机号'}
                        iconName={'phone'}
                        onChangeText={(text) => {
                            this.setState({
                                phone: text
                            })
                        }}
                    />


                    <View style={{
                        width: width / 1.3, height: zdp(50), marginTop: zdp(20),
                        borderWidth: 1, borderRadius: zdp(5), borderColor: 'white',
                        backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'
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
                                          onPress={()=>{
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

                    <MyButtonView modal={1} style={{width: width / 1.3, marginTop:zdp(30)}} title={'注册'}
                                  onPress={this.pressRegister}/>
            </View>
        )
    }





    pressRegister = () => {
        Keyboard.dismiss();

        if (!checkMobile(this.state.phone)) {
            return;
        }

        let formData = new FormData();
        // formData.append('phone', this.state.phone);
        formData.append('phone', this.state.phone);
        formData.append('code', this.state.verifyCode);
        formData.append('username', this.registerInfo.username);
        formData.append('password', this.registerInfo.password);

        fetchRequest('Register', 'POST', formData)
            .then(res => {
                console.log(res);
                if (res.respCode === 200) {
                    CountdownUtil.stop();

                    this.props.initGlobalInfo({
                        token: res.data.token,
                        phone: this.state.phone,
                        IDCard: '',
                        username: ''
                    });

                    this.props.navigation.navigate('RegisterSuccess',{type:1,phone:this.state.phone,password:this.registerInfo.password});
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
    return bindActionCreators({
        initGlobalInfo: actions.getGlobalInfo,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterMerchantNext);

