import {types} from "../containers/wealth/reduce";
import * as Types from "../containers/1Tab/reduce/Types";

/**
 * Created by zerowolf Date: 2018/5/3 Time: 下午8:57
 */
// const ACTION_GLOBAL = 'action_global';
const TYPES = {
    ACTION_GLOBAL: 'action_global',
    ACTION_PAYCARDLIST: 'action_paycardlist',
    ACTION_CARDLIST: 'action_cardlist',
}

export const globalInfo = (state = {}, action) => {
    switch (action.type) {
        case TYPES.ACTION_GLOBAL:
            console.log(action.data);
            return Object.assign(
                {},
                state,
                {data: action.data}
            );
        case TYPES.ACTION_CARDLIST:
            console.log(action.data);
            var payList = [];
            var debitList = [];
            var payDefault = '';
            var debitDefault = '';
            for (const dataItem of action.data) {
                console.log(dataItem);
                if (dataItem.cardType === 0) {
                    if (dataItem.cardDefault === 1) {
                        payDefault = dataItem
                    }
                    payList.push(dataItem);
                } else {
                    if (dataItem.cardDefault === 1) {
                        debitDefault = dataItem
                    }
                    debitList.push(dataItem);
                }
            }
            return Object.assign(
                {},
                state,
                {cardList:
                    {
                        _payList: payList,
                        _debitList: debitList,
                        _debitDefault: debitDefault,
                        _payDefault: payDefault
                    }
                }
            );
        default:
            return state;
    }
};

// export const getGlobalInfo = (data) => {
//     return {
//         type: ACTION_GLOBAL,
//         data
//     };
// }
export const actions = {
    getGlobalInfo: (data) => ({type: TYPES.ACTION_GLOBAL, data}),
    getPayCardList: (data) => ({type: TYPES.ACTION_PAYCARDLIST, data}),
    getCardList: (data) => ({type: TYPES.ACTION_CARDLIST, data})
}
