/**
 * Created by zerowolf on 2018/4/2.
 */
import React, {Component} from 'react';
import {
    ScrollView, Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window');
import MyTabView from '../../views/MyTabView';
import BaseComponent from '../global/BaseComponent';
import  TopView from './Mine_TopView';
import  Item from './Item';
import Icon from 'react-native-vector-icons/Ionicons'


import NavigationUtil from '../../utils/NavigationUtil';

export default class FourthTab extends BaseComponent {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView titleColor={'black'} title={'第四页'}
                           navigation={this.props.navigation}/>

                <ScrollView
                    contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                    style={{backgroundColor: '#e7e9e9'}}>

                    <View style={{
                        marginTop: 70, width: width - 20, borderRadius: 5, top: -70
                    }}>

                        <View style={styles.topView}>
                            <TopView image={require('../../../XImages/qianbao.png')} title={'认证信息'} onPress={() => {
                                // Alert.alert('444')
                                this.props.navigation.dispatch({
                                    type: 'UserInfo'
                                });
                                // NavigationUtil.reset(this.props.navigation, 'ShiMing')
                            }}/>
                            <TopView image={require('../../../XImages/renzheng.png')} title={'订单明细'} onPress={() => {
                                this.props.navigation.dispatch({
                                    type: 'DingDan'
                                });
                            }}/>
                            <TopView image={require('../../../XImages/ziliao.png')} title={'卡号管理'} onPress={()=>{

                            }}/>
                        </View>

                        <View style={styles.centerView}>
                            <Item onPress={() => {
                                // Alert.alert('点击条目')
                                this.props.navigation.navigate('Pay_Plan')
                            }}
                                  title={'邀请好友'}
                                  image={require('../../../XImages/setting/Slice7x1.png')}
                            />
                            <Item onPress={() => {
                                Alert.alert('点击条目')
                            }}
                                  title={'参加活动'}
                                  image={require('../../../XImages/setting/Slicex1.png')}/>
                            <Item onPress={() => {
                                Alert.alert('点击条目')
                            }}
                                  title={'优惠券'}
                                  image={require('../../../XImages/setting/Slice2x1.png')}/>
                            <Item onPress={() => {
                                Alert.alert('点击条目')
                            }}
                                  title={'贝米商城'}
                                  image={require('../../../XImages/setting/Slice3x1.png')}/>
                            <Item onPress={() => {
                                Alert.alert('点击条目')
                            }}
                                  title={'贝米实验室'}
                                  image={require('../../../XImages/setting/Slice4x1.png')}/>
                            <Item onPress={() => {
                                Alert.alert('点击条目')
                            }}
                                  title={'贝米黑卡'}
                                  image={require('../../../XImages/setting/Slice5x1.png')}/>

                        </View>
                        <View style={styles.centerView}>
                            <Item onPress={() => {
                                // Alert.alert('点击条目')

                                NavigationUtil.reset(this.props.navigation, 'Set_account');
                                // this.props.navigation.dispatch({
                                //     type: 'Set_account'
                                // });
                            }}
                                  title={'账户设置'}
                                  image={require('../../../XImages/setting/Slice6x1.png')}
                            />
                            <Item onPress={() => {
                                Alert.alert('点击条目')
                            }}
                                  title={'交易记录'}
                                  image={require('../../../XImages/setting/Slicex2.png')}/>
                            <Item onPress={() => {
                                Alert.alert('点击条目')
                            }}
                                  title={'银行卡管理'}
                                  image={require('../../../XImages/setting/Slice2x2.png')}/>

                        </View>

                        <View style={styles.centerView}>
                            <Item onPress={() => {
                                Alert.alert('点击条目')
                            }}
                                  title={'在线客服'}
                                  image={require('../../../XImages/setting/Slice3x2.png')}
                            />
                            <Item onPress={() => {
                                Alert.alert('点击条目')
                            }}
                                  title={'帮助与反馈'}
                                  image={require('../../../XImages/setting/Slice4x2.png')}/>
                            <Item onPress={() => {
                                Alert.alert('点击条目')
                            }}
                                  title={'公告'}
                                  image={require('../../../XImages/setting/Slice5x2.png')}/>
                            <Item onPress={() => {
                                Alert.alert('点击条目')
                            }}
                                  title={'关于贝米'}
                                  image={require('../../../XImages/setting/Slice6x2.png')}/>

                        </View>

                    </View>

                </ScrollView>
            </View>
        );


    }
}

const styles = {
    container: {
        height: 200,
        backgroundColor: '#CCCCCC',
        marginBottom: 10,
    },
    topView: {
        paddingBottom: 15,
        paddingTop: 10,
        width: width - 20,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: '#d7d9d9',
        shadowOffset: {height: 5},
        shadowOpacity: 0.6,
        shadowRadius: 2,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 10
    },
    centerView: {
        paddingBottom: 5,
        paddingTop: 5,
        width: width - 20,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: '#d7d9d9',
        shadowOffset: {height: 5},
        shadowOpacity: 0.6,
        shadowRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 10
    },
};
