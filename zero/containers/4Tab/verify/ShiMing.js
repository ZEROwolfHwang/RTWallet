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
    TouchableOpacity, ListView, Dimensions
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
import {validateIdCard, isMobileNumber} from './Verification';
// export default storage;
import DropDown from '../../../views/DropDown';

import Icon from 'react-native-vector-icons/FontAwesome';

import dataList from '../../../../resource/bankList';
import {actions} from "../../../root/GlobalAction";
import {getCardList} from "../../../storage/schema_card";
import {fetchRequestToken} from "../../../utils/FetchUtilToken";

class ShiMing extends BaseComponent {


    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
        this.state = {
            showListView: false,
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
                style={{height: 30, width: width, justifyContent: 'center', alignItems: 'center'}}
                onPress={() => {
                    this.setState({
                        showListView: false,
                        register_bank: `${dataList[i]}储蓄卡`
                    });
                }}>
                <Text style={{backgroundColor: 'transparent', fontSize: 16, color: 'grey'}}>
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
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>

                <MyTabView titleColor={'black'} title={'实名认证'} rightView={true}
                           leftView={false}
                           rightIcon={'md-settings'} navigation={this.props.navigation}/>

                {/*<View style={{height:40, marginTop: 30,marginLeft:20,marginRight:20,justifyContent:'space-between', alignItems:'center',flexDirection:'row'}}>*/}
                {/*<Text style={{fontSize:16, color:'black', flex:1,justifyContent:'space-around'}}>*/}
                {/*姓  名 :*/}
                {/*</Text>*/}
                <MyTextInput
                    placeholder={'姓名'}
                    marginTop={10}
                    onChangeText={(text) => {
                        this.setState({
                            register_name: text
                        });
                    }}
                    value={this.state.register_name}
                />
                <MyTextInput
                    placeholder={'省份证号'}
                    onChangeText={(text) => {
                        this.setState({
                            register_ID: text
                        });
                    }}
                    value={this.state.register_ID}
                />
                <MyTextInput
                    keyboardType="numeric"
                    placeholder={'银行卡号'}
                    value={this.state.register_card}
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
                            this.setState({
                                // register_bank:responseData.bank,
                                register_bank: '',
                            })
                        }
                    }}
                />
                <View style={{
                    marginTop: 10,
                    borderRadius: 20,
                    width: SizeUtil.width - 20,
                    height: 44,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    marginBottom: 1,
                    flexDirection: 'row'
                }}>


                    <TextInput
                        editable={false}
                        ref={(bank) => this.bank = bank}
                        underlineColorAndroid={'transparent'}
                        style={{
                            width: SizeUtil.width - 20,
                            backgroundColor: 'transparent',
                            textAlign: 'center',
                            color: 'black'
                        }}
                        placeholder={'所属银行'}
                        value={this.state.register_bank}
                    />

                    <Icon size={20} name={'sort-desc'}
                          style={{
                              width: 40, height: 40, padding: 10,
                              color: 'grey', backgroundColor: 'transparent', position: 'absolute',
                              right: 10

                          }}
                          onPress={() => {
                              console.log('dianjii');
                              this.setState({
                                  showListView: true
                              })
                          }}/>
                </View>

                <MyTextInput
                    keyboardType="numeric"
                    placeholder={'银行卡预留手机号'}
                    onChangeText={(text) => {
                        this.setState({
                            register_phone: text
                        });
                    }}
                />

                <ButtonView title={'实名认证'}
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
                                fetchRequestToken('Register', 'POST', token, formData).then(res => {
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

                                        this.props.navigation.navigate('InvestBuy')

                                    }
                                    // NavigationUtil.reset(this.props.navigation, 'InvestBuy');

                                }).then(err => {
                                    console.log(err);
                                });

                            }}
                />

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
                        width: width - 20,
                        top: 270,
                        height: 300,
                        position: 'absolute',
                        borderRadius: 3
                    }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    keyboardDismissMode='on-drag'
                    keyboardShouldPersistTaps='always'/> : null}

            </View>
        );
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

        var cardList = [];

        cardList.push({
            loginPhone: phone,   //预留手机号
            bankPhone: this.state.register_phone,   //预留手机号
            bankCard: this.state.register_card,//银行卡号
            bank: this.state.register_bank,//银行卡号
            cardType: 1,//1  储蓄卡     0 支付卡
            cardDefault: 1

        });

        realm.write(() => {
            realm.create('User', {
                username: this.state.register_name,
                CardLen: 1,
                IDCard: this.state.register_ID,
                phone: this.state.register_phone,
                card: cardList
            })
        });

        this.props.initCardList(getCardList(phone));
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

