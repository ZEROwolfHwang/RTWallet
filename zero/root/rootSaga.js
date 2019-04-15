import {fork,all} from "redux-saga/effects";
import {takeEvery} from "redux-saga";
import {watchCardList} from "../containers/reduce/CardSaga";
import {watchReplayData} from "../containers/3Tab/reduces/sagaRepay";
function* rootSaga() {
    yield [
        fork(watchCardList),
        fork(watchReplayData),
    ];
}

export default rootSaga
