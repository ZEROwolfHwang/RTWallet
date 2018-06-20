/**
 * Created by zerowolf Date: 2018/5/27 Time: 下午10:45
 */

import ToastUtil from "../../../utils/ToastUtil";
import {actions_replay, Types_replay} from "./reduceReplay";
import {fork, take, put, call} from "redux-saga/effects";
import {fetchRequest} from "../../../utils/FetchUtil";

export function* dealWithReplayListData(url) {
    try {
        let result = yield call(fetchRequest, url, 'GET');
        if (result.respCode === 200) {
            let contentList = result.data.content;
            console.log(contentList);
            yield put(actions_replay.putReplayList(contentList));
        } else {
            yield put(actions_replay.putReplayList([]));
        }

    } catch (error) {
        console.log(error);
        ToastUtil.showShort('发生错误' + error);
    }
}

export function* watchReplayData() {
    while (true) {
        const {
            url
        } = yield take(Types_replay.ACTION_REPLAY_ENTER);
        yield fork(dealWithReplayListData,url);
    }
}

