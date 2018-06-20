/**
 * Created by zerowolf Date: 2018/5/3 Time: 下午8:57
 */
export const TYPES = {
    ACTION_CARD_LIST: 'ACTION_CARD_LIST',
    ACTION_ALL_CARD_DATA: 'ACTION_ALL_CARD_DATA',
}

export const cardList = (state = {}, action) => {
    switch (action.type) {
        case TYPES.ACTION_ALL_CARD_DATA:
            let data = action.data;
            console.log(data);
            return Object.assign(
                {},
                state,
                {
                    data:
                        {
                            _payList: data.payList,
                            _debitList: data.debitList,
                            _debitDefault: data.debitDefault,
                            _payDefault: data.payDefault
                        }
                }
            );
        default:
            return state;
    }
};

export const actions_card = {
    getCardList: (phone) => ({type: TYPES.ACTION_CARD_LIST, phone}),
    getAllCardData: (data) => ({type: TYPES.ACTION_ALL_CARD_DATA, data}),
}
