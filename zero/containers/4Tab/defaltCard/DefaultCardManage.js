/**
 * Created by zerowolf Date: 2018/5/8 Time: 下午4:04
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions, ListView
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
const {width, height} = Dimensions.get('window');
import MyTabView from '../../../views/MyTabView';
import BaseComponent from '../../global/BaseComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import {zdp, zsp} from "../../../utils/ScreenUtil";

 class DefaultCardManage extends BaseComponent {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView titleColor={'black'} title={'默认卡管理'}
                           leftView={true}
                           navigation={this.props.navigation}/>

                <TouchableOpacity activeOpacity={0.8} style={{
                    marginTop: zdp(10),
                    width, height: zdp(60), backgroundColor: 'white', flexDirection: 'row',padding: zdp(20),
                    justifyContent: 'space-between', alignItems: 'center'
                }} onPress={()=>{
                    this.props.navigation.navigate('CardDefault',{cardType:1})
                }}>
                    <Text style={{fontSize: zsp(16), color: 'black'}}>默认结算卡</Text>
                    <Icon size={zdp(30)} name={'angle-right'}
                          style={{color: 'black', backgroundColor: 'transparent'}}/>
                </TouchableOpacity>
                <View style={{width:width- zdp(20),height:0.5,backgroundColor:'lightgrey',alignSelf:'flex-end'}}/>
                <TouchableOpacity activeOpacity={0.8} style={{
                    width, height: zdp(60), backgroundColor: 'white', flexDirection: 'row',padding: zdp(20),
                    justifyContent: 'space-between', alignItems: 'center'
                }} onPress={()=>{
                    this.props.navigation.navigate('CardDefault',{cardType:0})
                }}>
                    <Text style={{fontSize: zsp(16), color: 'black'}}>默认支付卡</Text>
                    <Icon size={zdp(30)} name={'angle-right'}
                          style={{color: 'black', backgroundColor: 'transparent'}}/>
                </TouchableOpacity>
            </View>)
    }
}
const mapStateToProps = (state) => {
    return {
        nav:state.nav
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultCardManage);


