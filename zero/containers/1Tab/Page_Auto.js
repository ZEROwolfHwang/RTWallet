/**
 * Created by zerowolf on 2017/12/6.
 */
import React, {Component, PropTypes} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import TopScreen from './TopScreen'
import Item from './Item';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Item_PayManage} from './reduce/index';
import {Pay_Navigator} from './reduce/index'

import NavigationUtil from '../../utils/NavigationUtil';

class Page_Auto extends Component {

    constructor(props) {
        super(props);

        this.props.initPayManageAction();
        this.props.initNavigationAction(this.props.navigation);

        this.pay_plan = this._payPlan.bind(this);
        this.pay_query = this._payQuery.bind(this);
        this.pay_manager = this._payManager.bind(this);
        this.pay_upgrade = this._payUpgrade.bind(this);
        this.pay_step = this._payStep.bind(this);

    }

    //设置还款计划
    _payPlan = () => {
        this.props.navigation.dispatch({
            type: 'Pay_Plan', data: '123'
        });
    };
    //还款进度查询
    _payQuery = (data) => {
        this.props.navigation.dispatch({
            type: 'Pay_Query', bool: false
        });
    };
    //信用卡管理
    _payManager = (data) => {
        this.props.navigation.dispatch({
            type: 'Pay_Manage', bool: false
        });
    };
    //还款升级
    _payUpgrade = (data) => {
        this.props.navigation.dispatch({
            type: 'Pay_Upgrade', bool: false
        });
    };
    //操作步骤
    _payStep = () => {
        this.props.navigation.dispatch({
            type: 'Pay_Step', bool: false
        });
    };


    componentWillMount() {

    }


    render() {
        let {RS_AutoPay} = this.props;
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>

                <TopScreen style={{flex: 1}}/>

                <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>

                    <Item title={'设置还款计划'} onPress={this.pay_plan}/>
                    <Item title={'还款进度查询'} onPress={this.pay_query}/>
                    <Item title={'信用卡管理'} onPress={this.pay_manager}/>
                    <Item title={'还款升级'} onPress={this.pay_upgrade}/>
                    <Item title={'操作步骤'} onPress={this.pay_step}/>

                </View>


            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        RS_AutoPay: state.RS_AutoPay.data,
        // RS_Navigate: state.RS_Navigate.data
        RS_Pay_Manage: state.RS_Pay_Manage.data,
        navigation: state.RS_Navigate.data,
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initPayManageAction: Item_PayManage,
        initNavigationAction: Pay_Navigator,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Page_Auto);