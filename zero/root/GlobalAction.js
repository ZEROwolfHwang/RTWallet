import {types} from "../containers/wealth/reduce";
import * as Types from "../containers/1Tab/reduce/Types";

/**
 * Created by zerowolf Date: 2018/5/3 Time: 下午8:57
 */
// const ACTION_GLOBAL = 'action_global';
export const TYPES = {
    ACTION_GLOBAL: 'action_global',
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

        default:
            return state;
    }
};

export const actions = {
    getGlobalInfo: (data) => ({type: TYPES.ACTION_GLOBAL, data}),
}
