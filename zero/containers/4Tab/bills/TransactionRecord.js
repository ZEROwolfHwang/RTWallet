/**
 * Created by zerowolf Date: 2018/5/7 Time: 下午6:02
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions,ListView
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
const {width, height} = Dimensions.get('window');
import MyTabView from '../../../views/MyTabView';
import BaseComponent from '../../global/BaseComponent';
import RecordTabs from "./RecordTabs";
import {fetchRequestToken} from "../../../utils/FetchUtilToken";
import ToastUtil from "../../../utils/ToastUtil";
import {actions} from "./reduce";
 class TransactionRecord extends BaseComponent {

    constructor(props) {
        super(props);
        this.props.initRecordNav(this.props.navigation);

        this.globalInfo = this.props.globalInfo;
        fetchRequestToken('payRecord','POST',this.globalInfo.token)
            .then(res=>{
                console.log(res);
                if (res.respCode === 200) {
                    this.props.initRecordData(res.data)
                } else {
                    ToastUtil.showShort(res.respMsg)
                }
            }).then(err=>{
            console.log(err);
        })
    }

    render() {
        const Tabs = <RecordTabs/>;
        console.log(this.props.recordNav);
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView titleColor={'black'} title={'交易记录'}
                           leftView={true}
                           navigation={this.props.navigation}/>

                <View style={{flex:1,width:width,height}}>

                    {Tabs}
                </View>
            </View>);
    }
                // <RecordTabs/>
}
const mapStateToProps = (state) => {
    return {
        nav:state.nav,
        globalInfo:state.globalInfo.data,
        recordNav:state.recordNav.data
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initRecordNav:actions.getRecordNav,
        initRecordData:actions.recordDetail
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionRecord);

