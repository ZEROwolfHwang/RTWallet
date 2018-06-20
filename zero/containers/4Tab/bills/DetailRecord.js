/**
 * Created by zerowolf Date: 2018/5/8 Time: 下午8:13
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions, ListView,BackHandler
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const {width, height} = Dimensions.get('window');
import MyTabView from '../../../views/MyTabView';
import BaseComponent from '../../global/BaseComponent';
import {NavigationActions} from "react-navigation";
import TransactionRecord from "./TransactionRecord";
import {fetchRequestToken} from "../../../utils/FetchUtilToken";
import ToastUtil from "../../../utils/ToastUtil";
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemDetail from "./ItemDetail";
import {zdp, zsp} from "../../../utils/ScreenUtil";
var detailData = null;
class DetailRecord extends BaseComponent {

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        detailData  = this.props.navigation.state.params.data;
        console.log(detailData );
    }
    //channelFee
    // :
    // "1.00"
    // debitCard
    // :
    // "6217001680009606023"
    // feeRate
    // :
    // "0.55"
    // orderNo
    // :
    // "1525780086220"
    // payCard
    // :
    // "6222531310622348"
    // settleAmt
    // :
    // "100.44"
    // status
    // :
    // 1
    // txnAmtm
    // :
    // "102.00"
    // txnTime
    // :
    // "2018-05-08 19:48:06"


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


    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView titleColor={'black'} title={'订单明细'} leftView={true}
                           navigation={this.props.navigation}/>

                <ItemDetail style={{marginTop: zdp(20), height: zdp(50)}} title={'交易金额'} content={detailData.txnAmt}
                            titleColor={'black'} contentColor={'red'}/>

                <ItemDetail style={{height: zdp(50)}} title={'结算金额'} content={detailData.settleAmt}
                            titleColor={'black'}
                            contentColor={'green'}/>

                <View style={{
                    width,
                    height: zdp(30),
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    backgroundColor: 'white',
                    padding: zdp(20)
                }}>

                    <Text style={{
                        fontSize: zsp(16),
                        color: 'grey',
                        textAlign: 'right'
                    }}>{`扣除手续费: ${detailData.channelFee}`}</Text>
                </View>


                <ItemDetail style={{marginTop: zdp(20)}} title={'交易类型'} content={'刷卡支付'}/>
                <ItemDetail title={'订单状态'} content={`${detailData.status===0?'交易失败':'交易成功'}`}/>
                <ItemDetail title={'交易费率'} content={detailData.feeRate}/>
                <ItemDetail title={'交易手续费'} content={detailData.channelFee}/>
                <ItemDetail title={'交易时间'} content={detailData.txnTime}/>
                <ItemDetail title={'订单号'} content={detailData.orderNo}/>
                <ItemDetail title={'支付卡号'} content={detailData.payCard}/>
                <ItemDetail title={'结算卡号'} content={detailData.debitCard}/>


            </View>);
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailRecord);

