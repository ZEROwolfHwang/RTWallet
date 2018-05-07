/**
 * Created by zerowolf Date: 2018/4/21 Time: 上午10:11
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet,ScrollView, Text, Alert, View, TouchableOpacity, Image, Dimensions, ListView
} from 'react-native';

import {connect} from 'react-redux';
const {width, height} = Dimensions.get('window');
import BaseComponent from '../../../global/BaseComponent';
class TabOne extends BaseComponent {

    constructor(props) {
        super(props);

    }

    render() {
        var redData = this.props.redData;
        console.log(this.props.redData);
        return (
            <ScrollView style={{flex: 1}}
                        contentContainerStyle={{justifyContent: 'flex-start', alignItems: 'center'}}>
                {this.getTextView('产品名称',redData.title)}
                {this.getTextView('结算方式',`${redData.pay_time}(${redData.pay_type})`)}
                {this.getTextView('交易额度',redData.limit)}
                {this.getTextView(`${redData.pay_type}时间`,redData.time)}
                {this.getTextView(`${redData.other_name}时间`,redData.other_time)}
                <View style={{flexDirection:'row',width:width,margin:5,padding:5}}>
                    <Text style={{color: 'black', fontSize: 16, width: 80}}>收款方式</Text>
                    <Text style={{flex:1,flexWrap:'wrap'}}>{redData.pay_way}</Text>
                </View>
                <View style={{flexDirection:'row',width:width,margin:5,padding:5}}>
                    <Text style={{color: 'black', fontSize: 16, width: 80}}>交易流程</Text>
                    <Text style={{flex:1,flexWrap:'wrap'}}>{redData.process}</Text>
                </View>
                <View style={{flexDirection:'row',width:width,margin:5,padding:5}}>
                    <Text style={{color: 'black', fontSize: 16, width: 80}}>交易失败</Text>
                    <Text style={{flex:1,flexWrap:'wrap'}}>{redData.pay_fail}</Text>
                </View>
                <View style={{flexDirection:'row',width:width,margin:5,padding:5,marginBottom:60}}>
                    <Text style={{color: 'black', fontSize: 16, width: 80}}>协议文本</Text>
                    <Text style={{flex:1,flexWrap:'wrap', color:'red'}}>{`<<分红计划服务协议>>\n<<我的钱包"分红计划"借款协议>>`}</Text>
                </View>

            </ScrollView>)
    }

    getTextView(title,content) {
        return <View style={{
            width: width,
            height: 30,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            margin:5,
            padding:5
        }}>

            <Text style={{color: 'black', fontSize: 16, width: 80}}>{title}</Text>
            <Text style={{color: 'red', fontSize: 14, flex: 1}}>{content}</Text>
        </View>

    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        redData:state.bills.redData
    };

};

export default connect(mapStateToProps)(TabOne);
