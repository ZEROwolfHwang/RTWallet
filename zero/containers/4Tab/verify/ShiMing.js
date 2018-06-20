/**
 * Created by zerowolf on 2018/1/7.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text, Alert,
    View,
    TextInput,
    TouchableOpacity, ListView, Dimensions, Modal
} from 'react-native';
import PropTypes from 'prop-types'
import SizeUtil from '../../../utils/SizeUtil';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const {width, height} = Dimensions.get('window');
import ToastUtil from '../../../utils/ToastUtil';
import {fetchRequest} from '../../../utils/FetchUtil';
import ButtonView from '../../../views/ButtonView';

import MyTabView from '../../../views/MyTabView';
import BackgroundPage from '../../../views/BackgroundPage';
import MyTextInput from '../../../views/MyTextInput';
import realm from '../../../storage/realm';
import BaseComponent from '../../global/BaseComponent';

let bankMap = require('../../../../resource/bankMap.json');
// import storage from '../../../storage/Storage';
import NavigationUtil from '../../../utils/NavigationUtil';
import {validateIdCard, isMobileNumber} from '../../../utils/Verification';
// export default storage;
import DropDown from '../../../views/DropDown';

import Icon from 'react-native-vector-icons/FontAwesome';

import dataList from '../../../../resource/bankList';
import {actions} from "../../../root/GlobalAction";
import {getCardList} from "../../../storage/schema_card";
import {fetchRequestToken} from "../../../utils/FetchUtilToken";
import MyTextInputWithIcon from "../../../views/MyTextInputWithIcon";
import MyLinearGradient from "../../../views/MyLinearGradient";
import MyButtonView from "../../../views/MyButtonView";
import MyIconTextWithTextInput from "../../../views/MyIconTextWithTextInput";
import {zdp, zsp} from "../../../utils/ScreenUtil";

class ShiMing extends BaseComponent {


    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
        this.state = {
            showModal: false,
            dataSource: ds.cloneWithRows(this._renderList(dataList)),
            register_name: '',
            register_ID: '',
            register_card: '',
            register_bank: '',
            register_phone: '',
        };

        this.renderRow = this._renderRow.bind(this);


        // console.log(bankMap);
        // console.log(bankMap['ABC']);

    }

    _renderList() {
        let row = [];

        for (let i in dataList) {

            row.push(<TouchableOpacity
                style={{height: zdp(30), width: width, justifyContent: 'center', alignItems: 'center'}}
                onPress={() => {
                    this.setState({
                        showListView: false,
                        register_bank: `${dataList[i]}储蓄卡`
                    });
                }}>
                <Text style={{backgroundColor: 'transparent', fontSize: zsp(16), color: 'grey'}}>
                    {dataList[i]}
                </Text>
            </TouchableOpacity>);
        }
        return row;
    }

    _renderRow(data) {
        // console.log(data);
        return (
            <View>
                {data}
            </View>
        );
    }

    render() {
        return (
            <MyLinearGradient
                view={<View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>


                    <MyTabView style={{backgroundColor: 'transparent'}}
                               barStyle={'light-content'}
                               globalTitleColor={'white'} title={'实名认证'}
                               leftView={true}
                               rightIcon={'md-settings'} navigation={this.props.navigation}/>


                    <MyIconTextWithTextInput title={'姓名:'}
                                         onChangeText={(text) => {
                                             this.setState({
                                                 register_name: text
                                             });
                                         }}
                                         value={this.state.register_name}
                                         iconName={'phone'}/>


                    <MyIconTextWithTextInput
                        title={'省份证号:'}
                        onChangeText={(text) => {
                            this.setState({
                                register_ID: text
                            });
                        }}
                        value={this.state.register_ID}
                        iconName={'phone'}/>


                    <MyIconTextWithTextInput title={'银行卡号:'}
                                         keyboardType="numeric"
                                         onChangeText={(text) => {
                                             this.setState({
                                                 register_card: text
                                             });
                                             if (text.length >= 16) {
                                                 //https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=6221506020009066385&cardBinCheck=true
                                                 var bankUrl = `https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=${text}&cardBinCheck=true`;
                                                 fetch(bankUrl)
                                                     .then((response) => response.json())
                                                     .then((responseData) => {
                                                         console.log(responseData);  //网络请求成功返回的数据
                                                         if (responseData.cardType === 'DC') {

                                                             this.setState({
                                                                 // register_bank:responseData.bank,
                                                                 register_bank: `${bankMap[responseData.bank]}储蓄卡`,
                                                             });
                                                         } else if (responseData.cardType === 'CC') {

                                                             this.setState({
                                                                 // register_bank:responseData.bank,
                                                                 register_bank: `${bankMap[responseData.bank]}信用卡`,
                                                             });
                                                         } else if (responseData.cardType === 'SCC') {

                                                             this.setState({
                                                                 // register_bank:responseData.bank,
                                                                 register_bank: `${bankMap[responseData.bank]}准贷记卡`,
                                                             });
                                                         } else if (responseData.cardType === 'PC') {
                                                             this.setState({
                                                                 // register_bank:responseData.bank,
                                                                 register_bank: `${bankMap[responseData.bank]}预付费卡`,
                                                             });
                                                         }
                                                     })
                                                     .catch((err) => {
                                                         console.log(err);
                                                     });
                                             } else {
                                                 this.msetState({
                                                     // register_bank:responseData.bank,
                                                     register_bank: '',
                                                 })
                                             }
                                         }}
                                         iconName={'phone'}/>


                    <View style={{
                        marginTop: zdp(10),
                        width: SizeUtil.width - zdp(20),
                        height: zdp(50),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        marginBottom: 1,
                        flexDirection: 'row',
                        borderColor: 'white',
                        borderWidth: 1,
                        borderRadius: zdp(5),
                    }}>


                        <MyIconTextWithTextInput
                            style={{marginTop:0}}
                            editable={false}
                            onChangeText={(text) => {
                                this.setState({
                                    register_ID: text
                                });
                            }}
                            title={'所属银行:'}
                            ref={(bank) => this.bank = bank}
                            value={this.state.register_bank}
                            iconName={'phone'}/>

                        <Icon size={zdp(20)} name={'sort-desc'}
                              style={{
                                  width: zdp(40),
                                  height: zdp(40),
                                  padding: zdp(10),
                                  color: 'white',
                                  backgroundColor: 'transparent',
                                  position: 'absolute',
                                  right: zdp(10)

                              }}
                              onPress={() => {
                                  console.log('dianjii');
                                  this.setState({
                                      showListView: true
                                  })
                              }}/>
                    </View>


                    <MyIconTextWithTextInput title={'预留手机号:'}
                                         maxLength={11}
                                         keyboardType="numeric"
                                         onChangeText={(text) => {
                                             this.setState({
                                                 register_phone: text
                                             });
                                         }}
                                         value={this.state.register_phone}
                                         iconName={'phone'}/>


                    <MyButtonView title={'实名认证'}
                                  style={{marginTop:zdp(20)}}
                                  onPress={() => {


                                      // this._saveRealm();

                                      if (!(this.state.register_name.length >= 2)) {
                                          ToastUtil.showShort('请输入正确的姓名')
                                          return
                                      }
                                      if (!validateIdCard(this.state.register_ID)) {
                                          ToastUtil.showShort('省份证信息错误');
                                          return

                                      }

                                      if (!(this.state.register_card.length >= 16 && this.state.register_card.length <= 19)) {
                                          ToastUtil.showShort('银行卡位数错误')
                                          return

                                      }

                                      if (this._judgeConditions(this.state.register_bank, '请输入所属银行')) {
                                          ToastUtil.showShort('请手动选择银行卡所属银行');
                                          return
                                      }

                                      if (this.state.register_bank.indexOf('储蓄卡') === -1) {
                                          ToastUtil.showShort('请使用储蓄卡作为结算卡');
                                          return
                                      }


                                      if (!isMobileNumber(this.state.register_phone)) {
                                          ToastUtil.showShort('请输入正确手机号');
                                          return;
                                      }

                                      /* if (this._judgeConditions(this.state.register_ID, '请输入身份证号')) {
                                           return
                                       }
                                       if (this._judgeConditions(this.state.register_card, '请输入银行卡号')) {
                                           return
                                       }
                                       if (this._judgeConditions(this.state.register_bank, '请输入所属银行')) {
                                           return
                                       }
                                       if (this._judgeConditions(this.state.register_phone, '请输入预留手机号')) {
                                           return
                                       }*/

                                      // this.props.navigation.goBack();
                                      // Alert.alert('name:' + this.state.register_name + 'ID:' + this.state.register_ID + 'card:' + this.state.register_card + 'phone:' + this.state.register_phone);

                                      let formData = new FormData();
                                      formData.append('register_name', this.state.register_name);
                                      formData.append('register_ID', this.state.register_ID);
                                      formData.append('register_card', this.state.register_card);
                                      formData.append('register_bank', this.state.register_bank);
                                      formData.append('register_phone', this.state.register_phone);
                                      let token = this.props.globalInfo.token;
                                      console.log(token);
                                      fetchRequestToken('Complete', 'POST', token, formData).then(res => {
                                          console.log(res);
                                          if (res.respCode === 200) {

                                              this._saveRealm();

                                              console.log(this.props.globalInfo);
                                              let globalInfo = this.props.globalInfo;

                                              this.props.initGlobalInfo({
                                                  token: globalInfo.token,
                                                  phone: globalInfo.phone,
                                                  IDCard: this.state.register_ID,
                                                  username: this.state.register_name
                                              });

                                              console.log(this.props.globalInfo);

                                              // this.props.navigation.navigate('InvestBuy')
                                              this.props.navigation.goBack();

                                          }
                                          // NavigationUtil.reset(this.props.navigation, 'InvestBuy');

                                      }).then(err => {
                                          console.log(err);
                                      });

                                  }}
                    />

                    {this.viewModal()}

                    {this.state.showListView ? <BackgroundPage
                        backgroundColor={this.state.showListView ? '#e4e1e177' : 'transparent'}
                        onPress={() => {
                            this.setState({
                                showListView: false
                            });
                        }}/> : null}


                    {this.state.showListView ? <ListView
                        style={{
                            backgroundColor: 'white',
                            alignSelf: 'center',
                            width: width - zdp(20),
                            top: zdp(270),
                            height: zdp(300),
                            position: 'absolute',
                            borderRadius: zdp(3)
                        }}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                        keyboardDismissMode='on-drag'
                        keyboardShouldPersistTaps='always'/> : null}

                </View>}/>
        );
    }
    /**
     * Modal弹出对话框的的视图
     */
    viewModal() {
        // let cardList = this.props.cardList;
        return <Modal
            animationType='fade'
            transparent={true}
            visible={this.state.showModal}
            onRequestClose={() => this.setState({showModal: false})}
        >
            <View
                style={{
                    width: width,
                    height: height,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}>
                <View style={{
                    width: width / 1.3,
                    backgroundColor: 'white',
                    borderRadius: zdp(5),
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    <View style={{
                        width: width / 1.3,
                        height: zdp(140),
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: zdp(20),
                    }}>
                        <Text style={{
                            fontSize: zsp(17),
                            textAlign: 'center',
                            color: 'black'
                        }}>您尚未完善用户信息认证,请完成认证后再进行收款</Text>
                    </View>

                    <View style={{
                        width: width / 1.3,
                        height: zdp(50),
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity style={{
                            flex: 1,
                            height: zdp(50),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: 'lightgrey',
                            borderTopWidth: 1,
                            borderRightWidth: 1
                        }}
                                          onPress={() => {
                                              this.setState({
                                                  showModal: false
                                              })
                                          }}>
                            <Text style={{fontSize: zsp(18), color: 'grey'}}>关闭</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            flex: 1,
                            height: zdp(50),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: 'lightgrey',
                            borderTopWidth: 1
                        }}
                                          onPress={() => {
                                              this.setState({
                                                  showModal: false,
                                              })
                                              this.props.navigation.navigate('ShiMing')
                                          }}>
                            <Text style={{fontSize: zsp(18), color: 'grey'}}>完善信息</Text>
                        </TouchableOpacity>


                    </View>

                </View>

            </View>
        </Modal>;
    }

    query = () => {
        let allData;

        // 获取Person对象
        let User = realm.objects('User');
        let tempData = '';
        // 遍历表中所有数据
        for (let i = 0; i < User.length; i++) {
            tempData = '第' + i + '个' + User[i].register_name + '---' +
                User[i].register_ID + '---' +
                User[i].register_card + '---' +
                User[i].register_bank + '---' +
                User[i].register_phone + '---' + '\n';
            allData += tempData
        }

        console.log(tempData);
        console.log(allData);

        // this.setState({
        //     data: allData
        // })
    };

    _judgeConditions(condition, description) {
        if (condition === '') {
            ToastUtil.showShort(description);
            console.log(description);
            return true
        }
        return false;
    }

    _saveRealm() {

        let phone = this.props.globalInfo.phone;
        console.log(phone);

        realm.write(() => {
            realm.create('User', {
                username: this.state.register_name,
                CardLen: 1,
                IDCard: this.state.register_ID,
                phone: this.state.register_phone,
            });

            realm.create('Card', {
                loginPhone: phone,   //预留手机号
                bankPhone: this.state.register_phone,   //预留手机号
                bankCard: this.state.register_card,//银行卡号
                bank: this.state.register_bank,//所属银行
                cardType: 1,//1  储蓄卡     0 支付卡
                cardDefault: 1
            })
        });

        // this.props.initCardList(getCardList(phone));
        // this.props.initCardList([{
        //     _loginPhone: '13262975235',
        // _bankPhone: '1126317631',
        // _bankCard: '217312371692312',
        // _bank: 'hjdgahsda',
        // _cardType: 0,
        // _cardDefault: 0,
        // }]);

        /*realm.write(() => {
            realm.create('schema_bankCard', {
                username: this.state.register_name,
                IDCard: this.state.register_ID,
                phone: parseInt(this.state.register_phone),
                bankCard: this.state.register_card,
                cardType: 0,//储蓄卡
                carDefault: 1,
            });
        });*/
    }

    // _saveRealm() {
    //     realm.write(() => {
    //         realm.create('User', {
    //             register_name: this.state.register_name,
    //             register_ID: this.state.register_ID,
    //             register_card: this.state.register_card,
    //             register_bank: this.state.register_bank,
    //             register_phone: this.state.register_phone,
    //         });
    //     });
    // }
}

ShiMing.propTypes = {
    register_name: PropTypes.string,
    register_ID: PropTypes.string,
    register_card: PropTypes.string,
    register_bank: PropTypes.string,
    register_phone: PropTypes.string
};
const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo.data
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initGlobalInfo: actions.getGlobalInfo,
        initCardList: actions.getCardList
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ShiMing);

