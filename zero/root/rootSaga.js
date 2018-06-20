import {fork,all} from "redux-saga/effects";
import {watchRequestStory} from "./testSaga";
import {takeEvery} from "redux-saga";
import {watchCardList} from "../containers/reduce/CardSaga";
import {watchReplayData} from "../containers/3Tab/reduces/sagaRepay";
// import {watchCardList, watchLoginStatus} from "./saga";

    //     yield fork(watchRequestStory)
        // yield fork(watchLoginStatus)
function* rootSaga() {
    yield [
        fork(watchCardList),
        fork(watchReplayData)

    ];
}

export default rootSaga
