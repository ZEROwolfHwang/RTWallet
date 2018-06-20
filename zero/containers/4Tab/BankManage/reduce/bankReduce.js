/**
 * Created by zerowolf Date: 2018/5/19 Time: 下午9:52
 */
export const Types = {
    ACTION_BANK_NAV: 'ACTION_BANK_NAV',
    ACTION_DEBIT_CARD_LIST: 'ACTION_DEBIT_CARD_LIST',
    ACTION_BANK_EYE: 'ACTION_BANK_EYE',
}



export const bankNav = (state = {}, action) => {
    switch (action.type) {
        case Types.ACTION_BANK_NAV:
            console.log(action.nav);
            return Object.assign(
                {},
                state,
                {bank_nav: action.nav}
            );
  case Types.ACTION_DEBIT_CARD_LIST:
            console.log(action.data);
            return Object.assign(
                {},
                state,
                {debitCartList: action.data}
            );
 case Types.ACTION_BANK_EYE:
            console.log(action.isEye);
            return Object.assign(
                {},
                state,
                {isEye: action.isEye}
            );

        default:
            return state;
    }
};

export const actions_bank = {
    getBankNav: (nav) => ({type: Types.ACTION_BANK_NAV, nav}),
    getDebitCardList: (data) => ({type: Types.ACTION_BANK_NAV, data}),
}
