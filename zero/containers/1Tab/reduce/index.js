/**
 * Created by zerowolf on 2018/3/30.
 */
//智能还款
export const types = {
    ACTION_ONE: 'action_one',

    ACTION_AUTOPAY: "action_autopay",
    ACTION_PAY_MANAGE: "action_pay_manage",
    ACTION_PAY_NAVIGATOR: "action_pay_navigator"
};

export const inquiry_data = (state = {}, action) => {
    switch (action.type) {
        case types.ACTION_ONE:
            return Object.assign(
                {},
                state,
                {payload: action.payload}
            );

        default:
            return state
    }
}

export const actions = {
    inputCurrentText: (text) => ({type: types.ACTION_ONE, payload: {text: text}})

};

export const Page_AutoPay = (data) => {
    return {
        type: types.ACTION_AUTOPAY,
        // data:(data===true) ? false : true
        data
    };
};
export const Item_PayManage = (bool) => {
    return {
        type: types.ACTION_PAY_MANAGE,
        bool
    };
};
export const Pay_Navigator = (data) => {
    return {
        type: types.ACTION_PAY_NAVIGATOR,
        data
    };
};

// import * as types from '../../actions/Types';

export const autopay = (state = {}, action) => {
    switch (action.type) {
        case types.ACTION_AUTOPAY:
            return Object.assign(
                {},
                state,
                {data: !action.data}
            );
        default:
            return state;
    }
};
export const pay_manage = (state = {}, action) => {
    switch (action.type) {
        case types.ACTION_PAY_MANAGE:
            return Object.assign(
                {},
                state,
                {data: !action.bool}
            );
        default:
            return state;
    }
};
export const pay_navigator = (state = {}, action) => {
    switch (action.type) {
        case types.ACTION_PAY_NAVIGATOR:
            return Object.assign(
                {},
                state,
                {data: action.data}
            );
        default:
            return state;
    }
};