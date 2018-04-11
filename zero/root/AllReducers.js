/**
 * Created by zerowolf on 2017/12/6.
 */

import {combineReducers} from 'redux';
import {autopay,pay_manage,pay_navigator} from '../containers/1Tab/reduce/index';
import {nav} from './Navigators';
import {bills,bills1} from '../containers/wealth/reduce/index';

export default AllReducers = combineReducers({
    nav:nav,
    bills:bills,
    bills1:bills1,
    RS_AutoPay : autopay,
    RS_Pay_Manage : pay_manage,
    RS_Navigate: pay_navigator,
});