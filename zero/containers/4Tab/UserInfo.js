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
    Image,
    Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window');
import PropTypes from 'prop-types';
import ToastUtil from '../../utils/ToastUtil';
import {fetchRequest} from '../../utils/FetchUtil';
import ButtonView from '../../views/ButtonView';

import MyTabView from '../../views/MyTabView';
import MyTextInput from '../../views/MyTextInput';

import BaseComponent from '../global/BaseComponent';
import Item from './userItem/Item';

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
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView titleColor={'black'} title={'用户认证信息'} rightView={true}
                           leftView={true}
                           rightIcon={'md-settings'} navigation={this.props.navigation}/>

                <View style={{
                    width: width,
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: 'white'
                }}>
                    <Image style={{width: 30, height: 30}} source={require('../../../AImages/qianbao.png')}/>
                    <Text style={{fontSize: 16, color: 'black', marginLeft: 10}}>用户信息</Text>
                </View>

                <View style={{
                    width: width,
                    height: 120,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white'
                }}>
                    <View style={{flex: 1, height: 120, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 16, color: 'black'}}>手机:</Text>
                        <Text style={{fontSize: 14, color: 'grey', marginTop: 20}}>132****5235</Text>
                    </View>
                    <View style={{width: 0.5, height: 80, backgroundColor: '#999999'}}/>
                    <View style={{flex: 1, height: 120, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 16, color: 'black'}}>姓名:</Text>
                        <Text style={{fontSize: 14, color: 'grey', marginTop: 20}}>*花花</Text>
                    </View>

                </View>

                <Item title={'身份证号'} content={'3408241994*****'}/>
                <Item title={'银行卡号'} content={'622848003811565*****'}/>
                <Item title={'银行信息'} content={'招商银行'}/>
                <Item title={'审核状态'} content={'正常'} color='red'/>

                />
            </View>
        );
    }

    _judgeConditions(condition, description) {
        if (condition === '') {
            ToastUtil.showShort(description);
            console.log(description);
            return true
        }
        return false;
    }

}
ShiMing.propTypes = {
    register_name: PropTypes.string,
    register_ID: PropTypes.string,
    register_card: PropTypes.string,
    register_bank: PropTypes.string,
    register_phone: PropTypes.string
}
