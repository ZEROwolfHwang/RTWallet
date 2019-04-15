/**
 * Created by zerowolf Date: 2018/7/15 Time: 上午1:10
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Platform,
    StyleSheet,
    TextInput,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    ListView,
    BackHandler, Keyboard
} from 'react-native';
import MyTabView from "../../views/MyTabView";
import BaseComponent from "../global/BaseComponent";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {zdp, zsp, zWidth} from "../../utils/ScreenUtil";
import {getBankMarkByBankName} from "../../utils/BankUtil";
import {cusColors} from "../../value/cusColor/cusColors";
import MyButtonView from "../../views/MyButtonView";
import Item from "../wealth/redPlan/buy/Item";
import ZText from "../../views/ZText";
import ItemAddCard from "../wealth/redPlan/buy/ItemAddCard";
import {editCardInfoById, getCardInfoById} from "../../storage/schema_card";
import {fetchRequestToken} from "../../utils/FetchUtilToken";
import {Api} from "../../utils/Api";
import {toastAlert, toastShort} from "../../utils/ToastUtil";
import ToastUtil from "../../utils/ToastUtil";
import NavigationUtil from "../../utils/NavigationUtil";

let navigation;
let globalInfo;
let cardInfo;

class EditCardInfo extends BaseComponent {

    constructor(props) {
        super(props);
        navigation = this.props.navigation;
        globalInfo = this.props.globalInfo;
        let userLast = globalInfo.username.substr(globalInfo.username.length - 1);
        this.pswUsername = `**${userLast}`
        let IDCardFirst = globalInfo.IDCard.substr(0, 6);
        let IDCardLast = globalInfo.IDCard.substr(globalInfo.IDCard.length - 4);
        this.pswIDCard = `${IDCardFirst}********${IDCardLast}`;


        this.state = {
            creditCvn2: '',               //信用卡cvn2(cardType==CC时可以有值)
            creditValidDay: '',               //信用卡有效期(cardType==CC时可以有值)
            creditRepayDay: '',          //信用卡还款日(cardType==CC时可以有值)
            creditBillingDay: ''
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

    componentWillMount() {
         this.params = this.props.navigation.state.params;
        let bankCard = this.params.bankCard;
        cardInfo = getCardInfoById(globalInfo.merCode, bankCard);
        console.log('cardInfo: ', cardInfo);

        this.setState({
            creditCvn2: cardInfo.creditCvn2,
            creditValidDay: cardInfo.creditValidDay,
            creditRepayDay: cardInfo.creditRepayDay,
            creditBillingDay: cardInfo.creditBillingDay
        })
    }

    viewCreditCardElse() {
        return <View>
            <Item title={'信用卡有效期'}
                  isRequired={'*'}
                  placeholder={'示例:05/23,输入0523'}
                  hasLine={true}
                  maxLength={4}
                  defaultValue={cardInfo.creditValidDay}
                  keyboardType={'numeric'}
                  onChangeText={(text) => {
                      this.setState({
                          creditValidDay: text,               //信用卡有效期(cardType==CC时可以有值)
                      })
                  }}/>
            <Item title={'信用卡cvn2'}
                  isRequired={'*'}
                  maxLength={3}
                  defaultValue={cardInfo.creditCvn2}
                  placeholder={'示例:123'}
                  keyboardType={'numeric'}
                  hasLine={true}
                  onChangeText={(text) => {
                      this.setState({
                          creditCvn2: text,               //信用卡cvn2(cardType==CC时可以有值)
                      })
                  }}/>
            <Item title={'信用卡还款日'}
                  defaultValue={cardInfo.creditRepayDay}
                  isRequired={'*'}
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
                  defaultValue={cardInfo.creditBillingDay}
                  isRequired={'*'}
                  maxLength={2}
                  placeholder={'示例:02'}
                  keyboardType={'numeric'}
                  onChangeText={(text) => {
                      this.setState({
                          creditBillingDay: text
                      })
                      if (text.length === 2) {
                          Keyboard.dismiss();
                      }
                  }}/>

            {/*   <Text style={{
                marginTop: zdp(10), marginLeft: zdp(20),
                alignSelf: 'flex-start', color: 'orange', fontSize: zsp(14)
            }}>备注:带*部分为必填项,若要使用完美还款功能,请填写所有项</Text>
*/}
        </View>;
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView title={'完善卡信息'} navigation={this.props.navigation}/>


                <KeyboardAwareScrollView
                    style={{flex: 1, width: zWidth}}
                    behavior="padding"
                    resetScrollToCoords={{x: 0, y: 0}}
                    contentContainerStyle={{justifyContent: 'flex-start', alignItems: 'center'}}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'always'}>


                    <ItemAddCard style={{marginTop: zdp(20)}}
                                 title={'持卡人姓名'}
                                 hasLine={true}
                                 content={this.pswUsername}/>
                    <ItemAddCard
                        title={'身份证号'}
                        content={this.pswIDCard}/>


                    <View style={{
                        height: zdp(50),
                        width: zWidth,
                        alignItems: 'flex-start',
                        justifyContent: 'flex-end'
                    }}>


                        <ZText parentStyle={{paddingLeft: zdp(20), paddingBottom: zdp(10)}}
                               content={'请完善银行卡信息'}
                               fontSize={zsp(16)}
                               color={cusColors.text_secondary}/>
                    </View>

                    <Item title={'卡号'}
                          editable={false}
                        // isRequired={'*'}
                          placeholder={'请输入您的信用卡号'}
                          hasLine={true}
                          keyboardType={'numeric'}
                          onChangeText={(text) => {
                              this.changeTextCard(text);
                          }}
                          value={cardInfo.bankCard}/>


                    <Item title={'所属银行'}
                          maxLength={15}
                          editable={false}
                        // isRequired={'*'}
                          placeholder={'请确定银行卡所属银行'}
                          hasLine={true}
                          onChangeText={(text) => {
                              this.setState({
                                  bankName: text,
                                  bankMark: getBankMarkByBankName(text)
                              })
                          }}
                          value={cardInfo.bank}/>


                    <Item title={'预留手机号'}
                          maxLength={11}
                          editable={false}
                        // isRequired={'*'}
                          placeholder={'请输入银行预留手机号'}
                          hasLine={true}
                          keyboardType={'numeric'}
                          onChangeText={(text) => {
                              this.setState({
                                  bankPhone: text
                              })
                          }}
                          value={cardInfo.bankPhone}/>

                    {this.viewCreditCardElse()}
                    <MyButtonView style={{marginTop: zdp(30), width: zWidth - zdp(40)}}
                                  title={'确认修改'} onPress={this.pressSubmit}/>


                </KeyboardAwareScrollView>

            </View>);
    }

    /**
     * 提交完善后的卡信息
     */
    pressSubmit = () => {
        Keyboard.dismiss();

        var regular = /^\d+$/;
        if (this.state.creditValidDay.length !== 0) {

            if (this.state.creditValidDay.length !== 4 || !regular.test(this.state.creditValidDay)) {
                toastShort('信用卡有效期格式错误(前两位月份,后两位年限)');
                return;
            } else {
                let month = this.state.creditValidDay.substring(0, 2);
                if (parseInt(month) <= 0 || parseInt(month) > 12) {
                    toastShort('信用卡有效期格式错误');
                    return;
                }
            }
        } else {
            toastShort('请填写信用卡有效期');

            return;
        }


        if (this.state.creditCvn2.length !== 0) {

            if (this.state.creditCvn2.length !== 3 || !regular.test(this.state.creditCvn2)) {
                toastShort('信用卡cvn2码格式错误');
                return;
            }

        } else {
            toastShort('请填写信用卡cvn2码');

            return;
        }


        if (this.state.creditRepayDay.length !== 0) {

            if (this.state.creditRepayDay.length === 2 && regular.test(this.state.creditRepayDay)) {
                if (parseInt(this.state.creditRepayDay) <= 0 || parseInt(this.state.creditRepayDay) > 31) {
                    toastShort('信用卡还款日格式错误');
                    return;
                }
            } else {
                toastShort('信用卡还款日格式错误');
                return;
            }
        } else {
            toastShort('请填写信用卡还款日');

            return;
        }


        if (this.state.creditBillingDay.length !== 0) {

            if (this.state.creditBillingDay.length === 2 && regular.test(this.state.creditBillingDay)) {
                if (parseInt(this.state.creditBillingDay) <= 0 || parseInt(this.state.creditBillingDay) > 31) {
                    toastShort('信用卡账单日格式错误');
                    return;
                }
            } else {
                toastShort('信用卡账单日格式错误');
                return;
            }
        } else {
            toastShort('请填写信用卡账单日');
            return;
        }


        let formData = new FormData();

        formData.append('bankCard', cardInfo.bankCard);
        // formData.append('bankPhone', this.state.bankPhone);
        // formData.append('bank', this.state.bankName);
        // formData.append('bankMark', this.state.bankMark);
        // formData.append('cardType', this.cardType);
        // formData.append('isDefault', 0);


        formData.append('creditValidDay', this.state.creditValidDay);
        formData.append('creditCvn2', this.state.creditCvn2);
        formData.append('creditRepayDay', this.state.creditRepayDay);
        formData.append('creditBillingDay', this.state.creditBillingDay);
        formData.append('isComplete', 1);


        fetchRequestToken(Api.editCard, 'POST', globalInfo.token, formData)
            .then(res => {
                if (res.respCode === 200) {
                    editCardInfoById(globalInfo.merCode, cardInfo.bankCard, this.state.creditValidDay, this.state.creditCvn2, this.state.creditRepayDay, this.state.creditBillingDay);
                    ToastUtil.showShort(`信用卡${cardInfo.bankCard}已经完善,可以开始添加完美计划`);

                    if (this.params.onGoBack) {
                        this.params.onGoBack();
                    }

                    this.props.navigation.goBack();

                }  else if (res.respCode === 203) {
                    toastAlert('登录超时,请重新登录',()=>{
                        NavigationUtil.backToLogin(this.props.navigation);
                    })
                }else {
                    ToastUtil.showShort(res.respMsg)
                }
            }).catch(err => {

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

export default connect(mapStateToProps, mapDispatchToProps)(EditCardInfo);
