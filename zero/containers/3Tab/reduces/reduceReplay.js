/**
 * Created by zerowolf Date: 2018/5/27 Time: 下午10:45
 */

import {toastAlert} from "../../../utils/ToastUtil";
import NavigationUtil from "../../../utils/NavigationUtil";
import {fetchRequestToken} from "../../../utils/FetchUtilToken";
import ToastUtil from "../../../utils/ToastUtil";
import {Api} from "../../../utils/Api";

/**
 * Created by zerowolf Date: 2018/5/3 Time: 下午8:57
 */
// const ACTION_GLOBAL = 'action_global';
export const Types_replay = {
    ACTION_REPLAY_ENTER: 'ACTION_REPLAY_ENTER',
    ACTION_REPLAY_DATA: 'ACTION_REPLAY_DATA',
    ACTION_REPLAY_DATA_ITEM: 'ACTION_REPLAY_DATA_ITEM',
    ACTION_REPLAY_DATA_HISTORY: 'ACTION_REPLAY_DATA_HISTORY',
}

export const replay = (state = {}, action) => {
    switch (action.type) {
        case Types_replay.ACTION_REPLAY_DATA:
            console.log(action.planCardList);
            return Object.assign(
                {},
                state,
                {planCardList: action.planCardList}
            );
        case Types_replay.ACTION_REPLAY_DATA_ITEM:
            console.log(action.planDataItem);
            return Object.assign(
                {},
                state,
                {planDataItem: action.planDataItem}
            );

     case Types_replay.ACTION_REPLAY_DATA_HISTORY:
            console.log(action.planDataItem);
            return Object.assign(
                {},
                state,
                {replayHistory: action.replayHistory}
            );


        default:
            return state;
    }
};

export const actions_replay = {
    putReplayList: (planCardList) => ({type: Types_replay.ACTION_REPLAY_DATA, planCardList}),
    putPlanItemData: (planDataItem) => ({type: Types_replay.ACTION_REPLAY_DATA_ITEM, planDataItem}),
    // putPlanItemHistory: (replayHistory) => ({type: Types_replay.ACTION_REPLAY_DATA_HISTORY, replayHistory}),
};

export const zDispatch_replay = (navigation, token: String) => {
    navigation.dispatch({
        type: Types_replay.ACTION_REPLAY_ENTER,
        token: token,
        onSagaBack: () => {
            toastAlert('登录超时,请重新登录', () => {
                NavigationUtil.backToLogin(navigation);
            })
        }
    });
}

export const zDispatch_replayHistory = (navigation, token) => {
    fetchRequestToken(Api.planHistory, 'GET', token)
        .then(res => {
            if (res.respCode === 200) {
                // actions_replay.putPlanItemHistory(res.data);
                navigation.dispatch({
                    type: Types_replay.ACTION_REPLAY_DATA_HISTORY,
                    replayHistory: res.data
                })
            } else if (res.respCode === 203) {
                toastAlert('登录超时,请重新登录', () => {
                    NavigationUtil.backToLogin(navigation);
                });
            } else {
                ToastUtil.showShort(res.respMsg);
            }
        }).catch(err => {

    })

}

