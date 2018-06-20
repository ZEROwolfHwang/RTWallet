/**
 * Created by zerowolf Date: 2018/5/9 Time: 上午9:23
 */
/**
 * Created by zerowolf on 2018/4/8.
 */
export const types = {
    ACTION_RECORD_NAV: 'action_record_nav',
    ACTION_RECORD_DETAIL: 'action_record_detail',
};

export const recordNav = (state = {}, action) => {
    switch (action.type) {
        case types.ACTION_RECORD_NAV:
            console.log(action.data);
            return Object.assign(
                {},
                state,
                {data: action.data}
            );
        case types.ACTION_RECORD_DETAIL:
            let recordAllList = action.data;
            console.log(recordAllList);
            var takeCashList = [];
            var takeQuotaList = [];
            for (const recordItem of recordAllList) {
                if (recordItem.businessType === 0) {
                    takeCashList.push(recordItem);
                } else {
                    takeQuotaList.push(recordItem)
                }
            }
            console.log(takeCashList);
            console.log(takeQuotaList);
            return Object.assign(
                {},
                state,
                {detail:
                        {
                            _recordAllList: recordAllList,
                            _takeCashList: takeCashList,
                            _takeQuotaList: takeQuotaList
                        }
                }
            );

        default:
            return state;
    }
};


export const actions = {
    getRecordNav: (data) => ({type: types.ACTION_RECORD_NAV, data: data}),
    recordDetail: (data) => ({type: types.ACTION_RECORD_DETAIL, data: data}),
};

