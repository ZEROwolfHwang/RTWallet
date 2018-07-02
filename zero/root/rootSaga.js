import {fork,all} from "redux-saga/effects";
import {takeEvery} from "redux-saga";
import {watchCardList} from "../containers/reduce/CardSaga";
function* rootSaga() {
    yield [
        fork(watchCardList),
    ];
}

export default rootSaga
