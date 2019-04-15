/**
 * Created by zerowolf Date: 2018/5/27 Time: 下午10:45
 */

import ToastUtil from "../../../utils/ToastUtil";
import {actions_replay, Types_replay} from "./reduceReplay";
import {fork, take, put, call} from "redux-saga/effects";
import {fetchRequest} from "../../../utils/FetchUtil";
import {Api} from "../../../utils/Api";
import {fetchRequestToken} from "../../../utils/FetchUtilToken";


export function* dealWithReplayListData(token,onSagaBack) {
    try {
        let result = yield call(fetchRequestToken, Api.repayments, 'GET',token);
        // result.respCode = 203;
        if (result.respCode === 200) {
            let planCardList = result.data;
            console.log(planCardList);
            yield put(actions_replay.putReplayList(planCardList));
        } else if (result.respCode === 203){
            onSagaBack();
        } else {
            ToastUtil.showShort(result.respMsg);
            yield put(actions_replay.putReplayList([]));
        }

    } catch (error) {
        console.log(error);
        yield put(actions_replay.putReplayList([]));
        // ToastUtil.showShort('请求还款计划列表发生错误' + error);
    }
}


export function* watchReplayData() {
    while (true) {
        const {
            token,onSagaBack
        } = yield take(Types_replay.ACTION_REPLAY_ENTER);
        yield fork(dealWithReplayListData,token,onSagaBack);
    }
}

