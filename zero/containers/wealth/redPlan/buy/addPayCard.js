/**
 * Created by zerowolf Date: 2018/5/1 Time: 下午6:41
 */
import React, {Component} from 'react';
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
    TextInput, Modal, AppState, BackHandler, KeyboardAvoidingView, ScrollView
} from 'react-native';

const {width, height} = Dimensions.get('window');
import MyTabView from '../../../../views/MyTabView';
import BaseComponent from '../../../../containers/global/BaseComponent';
import MyTextInput from "../../../../views/MyTextInput";
import Item from "./Item";
import ButtonView from "../../../../views/ButtonView";
import Icon from 'react-native-vector-icons/FontAwesome'
import {
    isMobileNumber,
    validateIdCard,
    isEmpty
} from "../../../../utils/Verification";
import ToastUtil, {toastShort} from "../../../../utils/ToastUtil";
import {fetchRequestHeader} from "../../../../utils/FetchUtilHeader";
import InvestBuy from "./InvestBuy";
import realm from "../../../../storage/realm";
import {fetchRequestToken} from "../../../../utils/FetchUtilToken";
import {actions} from "../../../../root/GlobalAction";
import MyProgressBar from "../../../../views/MyProgressBar";
import ItemAddCard from "./ItemAddCard";
import {showModal} from "../../../../utils/ModalUtil";

import bankList from '../../../../../resource/bankList';
import bankMap from '../../../../../resource/bankMap';
import {actions_card} from "../../../reduce/CardReduce";
import MyButtonView from "../../../../views/MyButtonView";
import {zdp, zsp} from "../../../../utils/ScreenUtil";
import {onAppStateChanged} from "../../../../utils/GoBackUtil";
import {bankNameIsCorrect, getBankMarkByBankName} from "../../../../utils/BankUtil";
import {
    addSingleBankCard,
    getCreditCardDefault,
    getDebitCardDefault
} from "../../../../storage/schema_card";
import {NavigationActions} from "react-navigation";
//  "ABC": "中国农业银行",
// let bankMap = require('../../../../../resource/bankMap.json');
let globalInfo;
let navigation;
let lastBackPressed

class addPayCard extends BaseComponent {

    constructor(props) {
        super(props);
        navigation = this.props.navigation;


        globalInfo = this.props.globalInfo;
        let userLast = globalInfo.username.substr(globalInfo.username.length - 1);
        this.pswUsername = `**${userLast}`
        let IDCardFirst = globalInfo.IDCard.substr(0, 6);
        let IDCardLast = globalInfo.IDCard.substr(globalInfo.IDCard.length - 4);
        this.pswIDCard = `${IDCardFirst}********${IDCardLast}`;


        for (let key in bankMap) {
            console.log(key);
            console.log(bankMap[key]);
        }

        this.state = {
            bankCard: '',
            bankName: '',
            bankMark: '',
            cardType: 'DC',
            bankPhone: '',                                            //银行卡预留手机号(根据卡片,可以不同)

            creditCvn2: '',               //信用卡cvn2(cardType==CC时可以有值)
            creditValidDay: '',               //信用卡有效期(cardType==CC时可以有值)
            creditRepayDay: '',          //信用卡还款日(cardType==CC时可以有值)
            creditBillingDay: ''
        }
    }


    componentDidMount() {

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


    componentWillMount() {
        this.params = this.props.navigation.state.params;
        console.log(this.params);
        this.cardType = this.params.cardType;
        this.setState({
            cardType: this.cardType
        })

    }


    render() {

        return (

            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView titleColor={'black'}
                           title={`添加新${this.cardType === 'CC' ? '支付' : '结算'}卡`}
                           navigation={this.props.navigation}/>


                <ScrollView style={{flex: 1}}
                            contentContainerStyle={{
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps={'always'}
                >

                    <ItemAddCard style={{marginTop: zdp(20)}}
                                 title={'持卡人姓名'}
                                 hasLine={true}
                                 content={this.pswUsername}/>
                    <ItemAddCard
                        title={'身份证号'}
                        content={this.pswIDCard}/>


                    <View style={{
                        height: zdp(50),
                        width,
                        alignItems: 'flex-start',
                        justifyContent: 'flex-end'
                    }}>

                        <Text style={{
                            backgroundColor: 'transparent',
                            color: 'grey',
                            fontSize: zsp(16),
                            marginLeft: zdp(20),
                            marginBottom: zdp(10)
                        }}>请填写银行卡信息</Text>
                    </View>

                    <Item title={'卡号'}
                          isRequired={'*'}
                          placeholder={'请输入您的信用卡号'}
                          hasLine={true}
                          keyboardType={'numeric'}
                          onChangeText={(text) => {
                              this.changeTextCard(text);
                          }}/>


                    <Item title={'所属银行'}
                          maxLength={15}
                          isRequired={'*'}
                          placeholder={'请确定银行卡所属银行'}
                          hasLine={true}
                          onChangeText={(text) => {
                              this.setState({
                                  bankName: text,
                                  bankMark: getBankMarkByBankName(text)
                              })
                          }}
                          value={this.state.bankName}/>


                    <Item title={'预留手机号'}
                          maxLength={11}
                          isRequired={'*'}
                          placeholder={'请输入银行预留手机号'}
                          hasLine={true}
                          keyboardType={'numeric'}
                          onChangeText={(text) => {
                              this.setState({
                                  bankPhone: text
                              })
                          }}/>

                    {this.cardType === 'CC' ? this.viewCreditCardElse() : null}
                    <MyButtonView style={{marginTop: zdp(30), width: width - zdp(40)}}
                                  title={'确认添加'} onPress={this.pressSubmit}/>


                </ScrollView>
            </View>
        );

    }

    viewCreditCardElse() {
        return <View>
            <Item title={'信用卡有效期'}
                  placeholder={'示例:05/23,输入0523'}
                  hasLine={true}
                  maxLength={4}
                  keyboardType={'numeric'}
                  onChangeText={(text) => {
                      this.setState({
                          creditValidDay: text,               //信用卡有效期(cardType==CC时可以有值)
                      })
                  }}/>
            <Item title={'信用卡cvn2'}
                  maxLength={3}
                  placeholder={'示例:123'}
                  keyboardType={'numeric'}
                  hasLine={true}
                  onChangeText={(text) => {
                      this.setState({
                          creditCvn2: text,               //信用卡cvn2(cardType==CC时可以有值)
                      })
                  }}/>
            <Item title={'信用卡还款日'}
                  hasLine={true}
                  maxLength={2}
                  placeholder={'示例:01'}
                  keyboardType={'numeric'}
                  onChangeText={(text) => {
                      this.setState({
                          creditRepayDay: text,          //信用卡还款日(cardType==CC时可以有值)
                      })
                  }}/>
            <Item title={'信用卡账单日'}
                  maxLength={2}
                  placeholder={'示例:02'}
                  keyboardType={'numeric'}
                  onChangeText={(text) => {
                      this.setState({
                          creditBillingDay: text
                      })
                  }}/>

            <Text style={{
                marginTop: zdp(10), marginLeft: zdp(20),
                alignSelf: 'flex-start', color: 'orange', fontSize: zsp(14)
            }}>备注:带*部分为必填项,若要使用完美还款功能,请填写所有项</Text>

        </View>;
    }

    pressSubmit = () => {


        if (!(this.state.bankCard.length >= 16 && this.state.bankCard.length <= 19)) {
            ToastUtil.showShort('银行卡位数错误')
            return
        }

        //只有在手动输入所属银行时没有银行标识才会判断银行名
        if (!bankNameIsCorrect(this.state.bankName) && !this.state.bankMark) {
            ToastUtil.showShort('请输入正确的所属银行名');
            return;
        }


        if (this.cardType !== this.state.cardType) {
            ToastUtil.showShort(`请添加类型为${this.cardType === 'DC' ? '储蓄卡' : '信用卡'}的卡片`);
            return;
        }

        if (!isMobileNumber(this.state.bankPhone)) {
            ToastUtil.showShort('请输入正确手机号');
            return;
        }


        if (this.cardType === 'CC') {
            var regular = /^\d+$/;
            if (this.state.creditValidDay.length !== 0) {

                if (this.state.creditValidDay.length !== 4 || !regular.test(this.state.creditValidDay)) {
                    toastShort('信用卡有效期格式错误(前两位月份,后两位年限,可不填)');
                    return;
                } else {
                    let month = this.state.creditValidDay.substring(0, 2);
                    if (parseInt(month) <= 0 || parseInt(month) > 12) {
                        toastShort('信用卡有效期格式错误(可不填)');
                        return;
                    }
                }
            }


            if (this.state.creditCvn2.length !== 0) {

                if (this.state.creditCvn2.length !== 3 || !regular.test(this.state.creditCvn2)) {
                    toastShort('信用卡cvn2码格式错误(可不填)');
                    return;
                }
            }


            if (this.state.creditRepayDay.length !== 0) {

                if (this.state.creditRepayDay.length === 2 && regular.test(this.state.creditRepayDay)) {
                    if (parseInt(this.state.creditRepayDay) <= 0 || parseInt(this.state.creditRepayDay) > 31) {
                        toastShort('信用卡还款日格式错误(可不填)');
                        return;
                    }
                } else {
                    toastShort('信用卡还款日格式错误(可不填)');
                    return;
                }
            }

            if (this.state.creditBillingDay.length !== 0) {

                if (this.state.creditBillingDay.length === 2 && regular.test(this.state.creditBillingDay)) {
                    if (parseInt(this.state.creditBillingDay) <= 0 || parseInt(this.state.creditBillingDay) > 31) {
                        toastShort('信用卡账单日格式错误(可不填)');
                        return;
                    }
                } else {
                    toastShort('信用卡账单日格式错误(可不填)');
                    return;
                }
            }
        }


        let formData = new FormData();

        formData.append('bankCard', this.state.bankCard);
        formData.append('bankPhone', this.state.bankPhone);
        formData.append('bank', this.state.bankName);
        formData.append('bankMark', this.state.bankMark);
        formData.append('cardType', this.cardType);
        formData.append('isDefault', 0);


        formData.append('creditValidDay', this.state.creditValidDay);
        formData.append('creditCvn2', this.state.creditCvn2);
        formData.append('creditRepayDay', this.state.creditRepayDay);
        formData.append('creditBillingDay', this.state.creditBillingDay);


        let globalInfo = this.props.globalInfo;
        console.log(globalInfo.token);
        fetchRequestToken(`addCard`, 'POST', globalInfo.token, formData)
            .then(res => {
                    console.log(res);
                    if (res.respCode === 200) {
                        this._saveRealm(globalInfo.merCode);
                        ToastUtil.showShort(`${this.state.cardType === 'DC' ? '储蓄卡' : '信用卡'}${this.state.bankCard}添加成功`);


                        if (this.params.enterType && this.params.enterType === 100) {
                            if (this.cardType === 'DC') {
                                if (!getCreditCardDefault(globalInfo.merCode)) {
                                    //支付卡没有
                                    Alert.alert('检测该用户尚未添加支付银行卡', '请添加默认支付卡', [
                                        {
                                            text: '取消', onPress: () => {
                                            }
                                        },
                                        {
                                            text: '确定', onPress: () => {
                                                this.props.navigation.push('addPayCard', {
                                                    cardType: 'CC',
                                                    enterType: 100,
                                                    // enterId: this.params.enterId
                                                });
                                            }
                                        },
                                    ]);
                                } else {

                                    //添加结算卡, 但又支付卡
                                    const resetAction = NavigationActions.reset({
                                        index: 1,
                                        actions: [
                                            NavigationActions.navigate({routeName: 'Tab'}),
                                            NavigationActions.navigate({routeName: 'RedPlan'})
                                        ]
                                    });
                                    navigation.dispatch(resetAction);
                                }
                                //再次进入
                            } else {
                                //添加支付卡
                                const resetAction = NavigationActions.reset({
                                    index: 1,
                                    actions: [
                                        NavigationActions.navigate({routeName: 'Tab'}),
                                        NavigationActions.navigate({routeName: 'RedPlan'})
                                    ]
                                });
                                navigation.dispatch(resetAction);
                            }

                        } else {

                            if (this.params.onGoBack) {
                                this.params.onGoBack();
                            }

                            this.props.navigation.goBack();
                        }
                    }
                    else {
                        ToastUtil.showShort(res.respMsg)
                    }
                }
            ).then(err => {
                console.log(err);
            }
        );
    };

    changeTextCard(text) {
        this.setState({
            bankCard: text
        })
        if (text.length >= 16) {
            //https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=6221506020009066385&cardBinCheck=true
            var bankUrl = `https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=${text}&cardBinCheck=true`;
            fetch(bankUrl)
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);  //网络请求成功返回的数据
                    // let bankNameFromJson = bankMap[responseData.bank];
                    let bankNameFromJson = bankMap[responseData.bank];
                    if (responseData.validated) {
                        this.setState({
                            bankMark: responseData.bank,
                            cardType: responseData.cardType,
                            bankName: bankNameFromJson
                        })
                    } else {
                        this.setState({
                            bankMark: '',
                            cardType: this.cardType,
                            bankName: '',
                        });
                    }
                })
                .catch((err) => {
                    this.setState({
                        bankMark: '',
                        cardType: this.cardType,
                        bankName: '',
                    });
                    console.log(err);
                });
        } else {
            this.setState({
                bankMark: '',
                cardType: this.cardType,
                bankName: '',
            })
        }
    }


    /**
     * 解析网络请求拿到的银行卡信息
     * @param bankNameFromJson
     */
    setBankNameFromNet = (bankNameFromJson) => {

        if (bankNameFromJson) {
            this.setState({
                // register_bank:responseData.bank,
                bankName: bankNameFromJson,
            });

        } else {
            this.setState({
                // register_bank:responseData.bank,
                bankName: '',
            });
        }
    }


    /**
     *
     * @param merCode
     * @private
     */
    _saveRealm(merCode) {
        if (this.cardType === 'DC') {
            let hasData = getDebitCardDefault(merCode);
            if (hasData) {
                this.saveCard('DC', false, merCode)
            } else {
                this.saveCard('DC', true, merCode)
            }
        } else {

            let hasData = getCreditCardDefault(merCode);
            if (hasData) {
                this.saveCard('CC', false, merCode)
            } else {
                this.saveCard('CC', true, merCode)
            }
        }
    }

    saveCard(cardType, isDefault, merCode) {
        addSingleBankCard(merCode, this.state.bankCard, this.state.bankName, this.state.bankPhone, this.state.bankMark, cardType,
            isDefault, this.state.creditCvn2, this.state.creditValidDay, this.state.creditRepayDay, this.state.creditBillingDay)
    }

    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    };

}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo.data
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initCardList: actions_card.getCardList,
        initGlobalInfo: actions.getGlobalInfo
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(addPayCard);
