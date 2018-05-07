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
import {fetchRequest} from "../../utils/FetchUtil";
import TimerButton from "./item/TimerButton";
import TextInputRightButton from "./item/TextInputRightButton";
import CountdownUtil from "./item/CountdownUtil";
import ToastUtil from "../../utils/ToastUtil";
import dismissKeyboard from 'dismissKeyboard';
import NavigationUtil from '../../utils/NavigationUtil';
import addPayCard from "../wealth/redPlan/buy/addPayCard";
import realm from "../../storage/realm";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCardList, getDebitCardList, getPayCardList} from "../../storage/schema_card";
import {actions} from "../../root/GlobalAction";
import {getUserList} from "../../storage/schema_user";

// import storage from '../../storage/Storage'
class RegisterApp extends BaseComponent {
    constructor(props) {
        super(props);


        this.state = {
            phone: '',
            verifyCode: '',
            isSentVerify: true,
            timerTitle: '获取验证码'
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

    componentWillMount() {
        // global.storage = storage;
    }

    render() {
        // this.removeData();

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

                <View style={{width: width, height: 0.5, backgroundColor: 'lightgrey'}}/>


                <View style={{
                    width: width,
                    height: 50,
                    flexDirection: 'row',
                    backgroundColor: 'white'
                }}>

                    <TextInputRightButton
                        maxLength={11}
                        width={width - 120}
                        title={"验证码"}
                        placeholder={"请输入手机验证码"}
                        onChangeText={(text) => {
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
                                                          if (res.respCode === 200) {

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
                                                          } else {
                                                              ToastUtil.showShort(res.respMsg);
                                                          }
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
                            onPress={this.pressLogin}/>
            </View>
        )
            ;

    }


    componentWillUnmount() {
        CountdownUtil.stop()
    }

    pressLogin = () => {
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

                            // global.storage.save({
                            //     key:'token',
                            //     data: res.data.token,
                            //     expires: null
                            // });

                            // storage.save({
                            //     key: 'token',
                            //     data: {
                            //         token: res.data.token,
                            //         phone: this.state.phone
                            //     },
                            //     expires: null
                            // });


                            /*   storage.load({
                                   key: 'token',
                                   autoSync: true,
                                   syncInBackground: true
                               }).then(ret => {
                                   console.log(ret)
                               }).catch(err => {
                                   console.log(err);
                               })*/


                            // let cardList = getCardList(res.data.phone);
                            // if (cardList) {
                            //     ToastUtil.showShort('有数据')
                            // } else {
                            //     ToastUtil.showShort('无数据')
                            // }

                            // realm.write(()=>{
                            //     realm.create('User',{
                            //         username:'1621',
                            //         CardLen:7,
                            //         IDCard: '3408241994',
                            //         phone:'13262975235',
                            //         card:[{
                            //             phone:'13262975235'
                            //         }]
                            //     })
                            // })

                            /*   let UserList = realm.objects('User');
                               // console.log(UserList.find(0));
                               console.log(this.state.phone);
                               console.log(typeof this.state.phone);
                               let phone = this.state.phone;
                               let ts = UserList.filtered(`phone == '${phone}'`);
                               if (ts) {
                                   for (const i in ts) {

                                       console.log(ts[i]);
                                   }
                                       console.log(ts[0]);
                                   ToastUtil.showShort('有数据')
                               } else {
                                   ToastUtil.showShort('无数据')

                               }*/

                            let userList = getUserList(res.data.phone);

                            console.log(userList);
                            if (userList) {
                                console.log('不存储网络中返回的银行卡列表');
                                this.props.initGlobalInfo({
                                    token: res.data.token,
                                    phone: res.data.phone,
                                    IDCard: res.data.identity,
                                    username: res.data.name
                                });

                                this.props.initCardList(getCardList(res.data.phone));
                            } else {
                                console.log('读取网络中银行卡列表');
                                if (res.data.CardLen !== 0) {
                                    console.log('银行卡列表' + res.data.CardLen);
                                    this._save2Realm(res.data);

                                    this.props.initGlobalInfo({
                                        token: res.data.token,
                                        phone: res.data.phone,
                                        IDCard: res.data.identity,
                                        username: res.data.name
                                    });

                                } else {
                                    console.log('银行卡列表' + res.data.CardLen);
                                    this.props.initGlobalInfo({
                                        token: res.data.token,
                                        phone: res.data.phone,
                                        IDCard: '',
                                        username: ''
                                    });
                                }

                            }

                            console.log(this.props.globalInfo);

                            this.props.navigation.navigate('Tab');

                        } else{
                            ToastUtil.showShort(res.respMsg);
                        }
                    }
                ).then(err => {

                console.log(err);
            });
        }
    }

    _save2Realm(data) {
        var cardList = [];
        console.log(data.CardList);
        let resList = data.CardList;

        for (const carItem of resList) {
            cardList.push({
                loginPhone: data.phone,   //预留手机号
                bankPhone: carItem.phone,   //预留手机号
                bankCard: carItem.Card,//银行卡号
                bank: carItem.bankname,//银行卡号
                cardType: carItem.type,//1  储蓄卡     0 支付卡
                cardDefault: carItem.defaultType
            })
        }

        realm.write(() => {
            realm.create('User', {
                username: data.name,
                CardLen: data.CardLen,
                IDCard: data.identity,
                phone: data.phone,
                card: cardList
            })
        });

        this.props.initCardList(getCardList(data.phone));
    }
}

RegisterApp.propTypes = {
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
        initGlobalInfo: actions.getGlobalInfo,
        initCardList: actions.getCardList
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterApp);


