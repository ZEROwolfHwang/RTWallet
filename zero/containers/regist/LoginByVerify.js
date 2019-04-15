import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Platform,
    StyleSheet,
    Keyboard,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput,
    BackHandler
} from 'react-native';
const {width, height} = Dimensions.get('window');
import MyTabView from '../../views/MyTabView';
import BaseComponent from '../global/BaseComponent';
import {fetchRequest} from "../../utils/FetchUtil";
import ToastUtil from "../../utils/ToastUtil";
import realm from "../../storage/realm";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions} from "../../root/GlobalAction";
import MyButtonView from "../../views/MyButtonView";
import MyLinearGradient from "../../views/MyLinearGradient";
import MyTextInputWithIcon from "../../views/MyTextInputWithIcon";
import {pressVerify} from "../../utils/smsVerifyUtil";
import CountdownUtil from "../../utils/CountdownUtil";
import {checkMobile} from "../../utils/CheckUitls";
import {getCardLength} from "../../storage/schema_card";
import {save2Global, save2Realm} from "./SaveRealmUtil";
import {cusColors} from "../../value/cusColor/cusColors";
import {isIphoneX, zAppBarHeight, zdp, zsp} from "../../utils/ScreenUtil";
import ZText from "../../views/ZText";
import {SPSaveLoginInfo} from "../../storage/Storage";
import NavigationUtil from "../../utils/NavigationUtil";
// import storage from '../../storage/Storage'
class LoginByVerify extends BaseComponent {
    constructor(props) {
        super(props);


        this.state = {
            phone: '',
            verifyCode: '',
            isSentVerify: true,
            timerTitle: '获取验证码',
            isSuccess: false
        };

        // this.props.initGlobalInfo({
        //         //     phone: '1326297',
        //         //     token: 'ajsda3812323qwsdq42'
        //         // })
    }

    // 删除
    removeData() {
        realm.write(() => {
            // 获取Person对象
            let User = realm.objects('User');
            let Card = realm.objects('Card');
            // 删除
            realm.delete(User);
            realm.delete(Card);
        })
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
        CountdownUtil.stop();
    }


    onBackPress = () => {           // return true   拦截  不让退出
        this.props.navigation.goBack();
        return true;
    };

    render() {
        // this.removeData();

        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <Image source={{uri:  isIphoneX() ? 'login_bg_x' : 'login_bg'}}
                       resizeMode={'cover'}
                       style={{
                           width,
                           height,
                           position: 'absolute'
                       }}/>


                <MyTabView title={'验证码登录'} isTransparent={true} backgroundColor={'transparent'}
                           globalTitleColor={'white'} barStyle={'light-content'}
                           navigation={this.props.navigation}/>


                <View
                    style={{flex: 1, alignItems: 'center'}}>

                    <Image source={require('../../../resource/image/appname.png')}
                           style={{
                               width: zdp(140),
                               height: zdp(66),
                               marginTop: zdp(100) - zAppBarHeight
                           }}
                           resizeMode={'contain'}/>

                    <MyTextInputWithIcon
                        style={{marginTop: zdp(200)}}
                        placeholder={'请输入手机号'}
                        iconName={'login_phone'}
                        keyboardType={'numeric'}
                        onChangeText={(text) => {
                            this.setState({
                                phone: text
                            })
                        }}/>


                    <View style={{
                        width: width / 1.3,
                        height: zdp(50),
                        marginTop: zdp(20),
                        borderWidth: 1,
                        borderRadius: zdp(5),
                        borderColor: 'white',
                        backgroundColor: cusColors.inputBackgroundColor,
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
                            }} iconName={'login_verify'}/>


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
                                <ZText content={this.state.timerTitle}
                                       color={this.state.isSentVerify ? cusColors.verify_light : this.state.timerTitle.indexOf('s') > -1 ? cusColors.verify_dark : cusColors.verify_light}
                                       fontSize={zsp(16)}/>

                            </View>
                        </TouchableOpacity>
                    </View>
                    <MyButtonView
                        modal={1}
                        style={{width: width / 1.3, marginTop: zdp(30)}}
                        title={'登录'}
                        onPress={this.pressLogin}/>
                </View>
            </View>
        )
            ;

    }


    pressLogin = () => {

        if (!checkMobile(this.state.phone)) {
            return;
        }

        Keyboard.dismiss();
        // this.props.navigation.navigate('TransactionRecord');
        // dismissKeyboard();
        // fetchRequest('http://localhost:8080/ThirdServlet','POST',formData)
        if (this.state.verifyCode.length < 4) {
            ToastUtil.showShort('验证码长度错误')
        } else {
            let formData = new FormData();
            // formData.append('phone', this.state.phone);
            // formData.append('code', this.state.verifyCode);
            formData.append('phone', this.state.phone);
            formData.append('code', this.state.verifyCode);
            fetchRequest('Login', 'POST', formData)
                .then(res => {
                        console.log(res);
                        console.log(res.data);
                       /* if (res.respCode === 200) {
                            CountdownUtil.stop();

                            let cardLength = getCardLength(res.data.phone);
                            if (cardLength !== res.data.CardLen) {
                                //长度不同则刷新本地数据库
                                console.log('刷新本地数据库');
                                save2Realm(res.data);
                            }
                            this.save2Global(res.data);

                            console.log(this.props.globalInfo);

                            this.props.navigation.navigate('Tab');

                        } else {
                            ToastUtil.showShort(res.respMsg);
                        }
*/

                    if (res.respCode === 200) {

                        CountdownUtil.stop();

                        let cardLength = getCardLength(res.data.phone);
                        if (cardLength !== res.data.CardLen) {
                            //长度不同则刷新本地数据库
                            save2Realm(res.data);
                        }
                        save2Global(this.props.navigation,res.data);

                        SPSaveLoginInfo(this.state.phone, undefined);

                        NavigationUtil.reset(this.props.navigation, 'Tab');


                    } else {

                        ToastUtil.showShort(res.respCode)
                    }

                    }
                ).then(err => {

                console.log(err);
            });
        }
    }


    _save2Realm(data) {
        console.log(data.CardList);
        let resList = data.CardList;

        realm.write(() => {
            realm.create('User', {
                username: data.name,
                CardLen: data.CardLen,
                IDCard: data.identity,
                phone: data.phone,
            });

            for (const carItem of resList) {
                realm.create('Card', {
                    loginPhone: data.phone,   //预留手机号
                    bankPhone: carItem.phone,   //预留手机号
                    bankCard: carItem.Card,//银行卡号
                    bank: carItem.bankname,//银行卡号
                    cardType: carItem.type,//1  储蓄卡     0 支付卡
                    cardDefault: carItem.defaultType
                })
            }
        });

    }
}

LoginByVerify.propTypes = {
    phone: PropTypes.string
};
const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo,
        // cardList:state.globalInfo
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        // initGlobalInfo: actions.getGlobalInfo,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginByVerify);


