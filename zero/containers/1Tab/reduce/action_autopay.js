/**
 * Created by zerowolf on 2017/11/15.
 */

import * as Types from './Types';
//Home
export const Page_AutoPay = (data) => {
    return {
        type: Types.ACTION_AUTOPAY,
        // data:(data===true) ? false : true
        data
    };
};
export const Item_PayManage = (bool) => {
    return {
        type: Types.ACTION_PAY_MANAGE,
        bool
    };
};
export const Pay_Navigator = (data) => {
    return {
        type: Types.ACTION_PAY_NAVIGATOR,
        data
    };
};


