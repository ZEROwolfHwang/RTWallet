/**
 * Created by zerowolf Date: 2018/5/13 Time: 下午4:40
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
    BackHandler,
    AppState
} from 'react-native';
import PageChangePhoneNext from "./PageChangePhoneNext";
import BaseComponent from "../../global/BaseComponent";
import MyTextInput from "../../../views/MyTextInput";
import {pressVerify} from "../../../utils/smsVerifyUtil";
import MyButtonView from "../../../views/MyButtonView";
import CountdownUtil from "../../../utils/CountdownUtil";
import ToastUtil from "../../../utils/ToastUtil";
import {fetchRequestToken} from "../../../utils/FetchUtilToken";
import {zdp, zsp} from "../../../utils/ScreenUtil";
import {cusColors} from "../../../value/cusColor/cusColors";

var globalInfo = null;

class PageChangePhone extends BaseComponent {

    constructor(props) {
        super(props);

        globalInfo = this.props.globalInfo;


        this.state = {
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
        let phone = globalInfo.phone;
        let phoneFirst = phone.substr(0, 4);
        let phoneLast = phone.substr(phone.length - 4);
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView style={{
                    elevation: zdp(5),
                    shadowOffset: {width: zdp(5), height: zdp(5)},
                    shadowColor: cusColors.shadowColor,
                    shadowOpacity: 0.6,
                    shadowRadius: zdp(2),
                }} title={'修改手机号码'} navigation={this.props.navigation}/>

                <View style={{
                    width,
                    height: zdp(120),
                    marginTop: zdp(20),
                    padding: zdp(20),
                    backgroundColor: 'white',
                    elevation: zdp(5),
                    shadowOffset: {width: zdp(5), height: zdp(5)},
                    shadowColor: cusColors.shadowColor,
                    shadowOpacity: 0.6,
                    shadowRadius: zdp(2),
                }}>
                    <Text style={{
                        fontSize: zsp(16),
                        color: 'grey'
                    }}>{`验证码(发送至(${phoneFirst + '****' + phoneLast})`}</Text>

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
                            <Text
                                style={{
                                    marginLeft: zdp(20),
                                    alignSelf: 'center',
                                    fontSize: zsp(15),
                                    textAlign: 'center',
                                    color: this.state.isSentVerify ? 'lightblue' : this.state.timerTitle.endsWith('s') ? 'lightgrey' : '#999999'
                                }}>{this.state.timerTitle}</Text>

                        </TouchableOpacity>
                    </View>


                </View>
                <MyButtonView style={{width: width / 1.3, marginTop: zdp(80)}} title={'下一步'}
                              onPress={this.pressNext}/>
            </View>)
    }


    /**
     * 下一步
     */
    pressNext = () => {

        console.log(globalInfo.token);

        let formData = new FormData();
        formData.append('phone', globalInfo.phone);
        formData.append('msgCode', this.state.verifyCode);


        fetchRequestToken('phoneFetch', 'POST', globalInfo.token, formData)
            .then(res => {
                console.log(res);
                if (res.respCode === 200) {
                    console.log('旧手机验证通过');
                    CountdownUtil.stop();
                    this.props.navigation.navigate('PageChangePhoneNext');
                } else {
                    console.log(res.respMsg);
                    ToastUtil.showShort(res.respMsg)
                }
            })
            .catch(err => {
                console.log(err);
                ToastUtil.showShort(err)
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

export default connect(mapStateToProps, mapDispatchToProps)(PageChangePhone);
