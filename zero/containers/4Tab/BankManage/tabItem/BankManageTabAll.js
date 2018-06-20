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
    Platform,
    StyleSheet,
    TextInput,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ListView, ScrollView, Modal, BackHandler, RefreshControl
} from 'react-native';
import realm from '../../../../storage/realm'
import {
    getAllCard, getCardList,
    getDebitCardDefault,
    getDebitCardList, getPayCardDefault,
    getPayCardList
} from "../../../../storage/schema_card";
import ItemCard from "./ItemCard";
import {bankColor, cusColors} from "../../../../value/cusColor/cusColors";

// let cardList;
import selectBankList from '../../../../../resource/selectBanks';
import {
    getBankABC,
    getBankDetach,
    getBankDetachClose,
    getBankName,
    getBankType
} from "../../../../utils/BankUtil";
import NavigationUtil from "../../../../utils/NavigationUtil";
import {fetchRequestToken} from "../../../../utils/FetchUtilToken";
import ToastUtil from "../../../../utils/ToastUtil";
import {deleteCard} from "./DeleteCardUtil";
import {actions_bank, Types} from "../reduce/bankReduce";
import {zdp, zModalHeight, zModalMarginTop, zsp} from "../../../../utils/ScreenUtil";
import ZText from "../../../../views/ZText";
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
