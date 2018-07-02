/**
 * Created by zerowolf Date: 2018/5/16 Time: 下午10:37
 */

import BaseComponent from "../../../global/BaseComponent";

const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Dimensions,
    BackHandler
} from 'react-native';
import {
    getAllCard,
} from "../../../../storage/schema_card";

import {actions_bank, Types} from "../reduce/bankReduce";
import BankCardItem from "./BankCardItem";

let cardList;

class BankManageTabAll extends BaseComponent {

// {
//     "value": "abc",
//     "bank": "中国农业银行"
// },

    constructor(props) {
        super(props);

        this.globalInfo = this.props.globalInfo;

        cardList = getAllCard(this.globalInfo.merCode);

        this.state = {
            cardList: cardList,
            isRefreshing: false
        }
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        // NavigationUtil.reset(this.props.navigation, 'Tab')
        this.props.navigation.goBack();
        return true
    };

    render() {
        console.log(this.props.navigation);
        return (
            <BankCardItem cardList={this.state.cardList}
                          isRefreshing={this.state.isRefreshing}
                          onRefresh={this._onRefresh}
            />
        );
    }


    /**
     * 下拉刷新
     * @private
     */
    _onRefresh = () => {
        this.setState({isRefreshing: true});
        var timer = setTimeout(() => {
            let cardList1 = getAllCard(this.globalInfo.merCode);
            this.setState({
                isRefreshing: false,
                cardList: cardList1
            });
            clearTimeout(timer);
        }, 1000);
    }

}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo.data,
        navigation: state.bankNav.bank_nav,
        isEye: state.bankNav.isEye,

    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initDebitCardList: actions_bank.getDebitCardList
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BankManageTabAll);
