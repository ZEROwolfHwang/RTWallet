import {TYPES} from "../../../root/GlobalAction";

/**
 * Created by zerowolf Date: 2018/5/13 Time: 下午11:37
 */
const Types = {
    ACTION_DEFAULT_INDEX: 'ACTION_DEFAULT_INDEX'
};

export const getDefaultIndex = (state = {}, action) => {
    switch (action.type) {
        case Types.ACTION_DEFAULT_INDEX:
            console.log(action.data);
            return Object.assign(
                {},
                state,
                {data: action.data}
            );

        default:
            return state;
    }
};

export const actions_defaultIndex = {
    getDefaultIndex: (data) => ({type: Types.ACTION_DEFAULT_INDEX, data}),
}
