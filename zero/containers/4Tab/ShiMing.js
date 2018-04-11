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
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types'
import SizeUtil from '../../utils/SizeUtil';
import ToastUtil from '../../utils/ToastUtil';
import {fetchRequest} from '../../utils/FetchUtil';
import ButtonView from '../../views/ButtonView';

import MyTabView from '../../views/MyTabView';
import MyTextInput from '../../views/MyTextInput';
import realm from '../../storage/realm';
import BaseComponent from '../global/BaseComponent';
let bankMap = require('../../../resource/bankMap.json');
import storage from '../../storage/Storage';
import NavigationUtil from '../../utils/NavigationUtil';
//
// export default storage;
export default class ShiMing extends BaseComponent {


    constructor(props) {
        super(props);

        this.state = {
            register_name: '',
            register_ID: '',
            register_card: '',
            register_bank: '',
            register_phone: '',
        };


        console.log(bankMap);
        console.log(bankMap['ABC']);

    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView titleColor={'black'} title={'实名认证'} rightView={true}
                           leftView={true}

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
                />
                <MyTextInput
                    placeholder={'省份证号'}
                    onChangeText={(text) => {
                        this.setState({
                            register_ID: text
                        });
                    }}
                />
                <MyTextInput
                    keyboardType="numeric"
                    placeholder={'银行卡号'}
                    onChangeText={(text) => {
                        this.setState({
                            register_card: text
                        });
                        if (text.length === 19) {
                            //https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=6221506020009066385&cardBinCheck=true
                            var bankUrl = `https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=${text}&cardBinCheck=true`;
                            fetch(bankUrl)
                                .then((response) => response.json())
                                .then((responseData) => {
                                    console.log(responseData);  //网络请求成功返回的数据
                                    this.setState({
                                        // register_bank:responseData.bank,
                                        register_bank: bankMap[responseData.bank],
                                    })
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        }
                    }}
                />
                <MyTextInput
                    placeholder={'所属银行'}
                    value={this.state.register_bank}
                    onChangeText={(text) => {
                        this.setState({
                            register_bank: text
                        });
                    }}
                />

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


                                /* if (this._judgeConditions(this.state.register_name, '请输入姓名')) {
                                 return
                                 }
                                 if (this._judgeConditions(this.state.register_ID, '请输入身份证号')) {
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

                                this.props.navigation.goBack();
                                Alert.alert('name:' + this.state.register_name + 'ID:' + this.state.register_ID + 'card:' + this.state.register_card + 'phone:' + this.state.register_phone);

                                let formData = new FormData();
                                formData.append('register_name', this.state.register_name);
                                formData.append('register_ID', this.state.register_ID);
                                formData.append('register_card', this.state.register_card);
                                formData.append('register_bank', this.state.register_bank);
                                formData.append('register_phone', this.state.register_phone);
                                fetchRequest('Register', 'POST', formData).then(res => {
                                    console.log(res);
                                    storage.save({
                                        key: 'shiming',   // Note: Do not use underscore("_") in key!
                                        data: {
                                            register_name: this.state.register_name,
                                            register_ID: this.state.register_ID,
                                            register_card: this.state.register_card,
                                            register_bank: this.state.register_bank,
                                            register_phone: this.state.register_phone
                                        },

                                        // if not specified, the defaultExpires will be applied instead.
                                        // if set to null, then it will never expire.
                                        expires: 1000 * 3600
                                    });

                                }).then(err => {
                                    console.log(err);
                                });

                            }}
                />
                <ButtonView title={'实名认证'}
                            onPress={() => {
                                NavigationUtil.reset(this.props.navigation, 'Tab');
                                // this.query();
                                storage.load({
                                    key: 'shiming',
                                    autoSync: true,
                                    syncInBackground: true,
                                    syncParams: {
                                        extraFetchOptions: {
                                        },
                                        someFlag: true,
                                    },
                                }).then(ret => {
                                    console.log(ret);
                                }).catch(err => {
                                    // any exception including data not found
                                    // goes to catch()
                                    console.warn(err.message);
                                    switch (err.name) {
                                        case 'NotFoundError':
                                            // TODO;
                                            break;
                                        case 'ExpiredError':
                                            // TODO
                                            break;
                                    }
                                })

                            }}/>
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
        realm.write(() => {
            realm.create('User', {
                register_name: this.state.register_name,
                register_ID: this.state.register_ID,
                register_card: this.state.register_card,
                register_bank: this.state.register_bank,
                register_phone: this.state.register_phone,
            });
        });
    }
}
ShiMing.propTypes = {
    register_name: PropTypes.string,
    register_ID: PropTypes.string,
    register_card: PropTypes.string,
    register_bank: PropTypes.string,
    register_phone: PropTypes.string
}
