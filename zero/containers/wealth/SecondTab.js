/**
 * Created by zerowolf on 2018/4/2.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ProgressBarAndroid,
    BackHandler
} from 'react-native';

const {width, height} = Dimensions.get('window');
import MyTabView from '../../views/MyTabView';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions_wealth} from './reduce/index';
import Wealth from './Wealth';
import {fetchRequest} from '../../utils/FetchUtil';

import BaseComponent from '../global/BaseComponent';
import ToastUtil from "../../utils/ToastUtil";
import {Api} from "../../utils/Api";
import {fetchRequestToken} from "../../utils/FetchUtilToken";
import {PageBackground} from "../../views/PageBackground";

        let globalInfo;
class SecondTab extends BaseComponent {

    constructor(props) {
        super(props);
        globalInfo = this.props.globalInfo;
        this.state={
            isRefreshing:false
        }
    }

    componentWillMount() {
        // fetchRequest(Api.enchashment, "GET")
        fetchRequestToken(Api.enchashment,'GET',globalInfo.token)
            .then(res => {
                console.log(res);
                if (res.respCode === 200) {
                    this.props.initGetWebData(res.data)
                } else {
                    ToastUtil.showShort(res.respMsg)
                }
            }).catch(err => {
            console.log(err);
        });
    }



    refreshData=()=>{

        this.setState({isRefreshing: true});

        // fetchRequest('enchashment ', 'GET')
        fetchRequestToken(Api.enchashment,'GET',globalInfo.token)
            .then(res => {
                console.log(res);
                if (res.respCode === 200) {
                    this.props.initGetWebData(res.data)
                } else {
                    ToastUtil.showShort(res.respMsg)
                }
            })
            .catch(err => {

            });

        var timer = setTimeout(() => {
            // let cardList1 = getAllCard(this.globalInfo.phone);
            this.setState({
                isRefreshing: false,
            });
            clearTimeout(timer);
        }, 1500);
    }


    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView titleColor={'black'} leftView={false} title={'刷卡支付'}
                           navigation={this.props.navigation}/>
                {this.props.bills
                    ? <Wealth navigation={this.props.navigation}/>
                    :  <PageBackground content={''} onRefresh={this.refreshData}
                                       isRefreshing={this.state.isRefreshing}/>
                }

            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        bills: state.bills.data,
        nav: state.nav,
        globalInfo: state.globalInfo.data,
    }

};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initGetWebData: actions_wealth.fetchData,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(SecondTab);
