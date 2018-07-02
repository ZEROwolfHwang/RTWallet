/**
 * Created by zerowolf on 2017/12/6.
 */

import {combineReducers} from 'redux';
import {autopay,pay_manage,pay_navigator} from '../containers/1Tab/reduce/index';
import {nav} from './Navigators';
import {bills} from '../containers/wealth/reduce/index';
import {globalInfo} from "./GlobalAction";
import {recordNav} from "../containers/4Tab/bills/reduce";
import {cardList} from "../containers/reduce/CardReduce";
import {getDefaultIndex} from "../containers/4Tab/defaltCard/redux";
import {bankNav} from "../containers/4Tab/BankManage/reduce/bankReduce";
import {replay} from "../containers/3Tab/reduces/reduceReplay";
import {register} from "../containers/regist/reduces/register";
// import {globalInfo} from "./GlobalAction";

export default AllReducers = combineReducers({
    nav:nav,
    bankNav:bankNav,
    register:register,
    replay,
    getDefaultIndex: getDefaultIndex,
    cardList:cardList,
    globalInfo:globalInfo,
    recordNav:recordNav,
    bills:bills,
    // bills1:bills1,
    RS_AutoPay : autopay,
    RS_Pay_Manage : pay_manage,
    RS_Navigate: pay_navigator,
});
