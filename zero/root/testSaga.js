/**
 * Created by zerowolf Date: 2018/5/11 Time: 下午4:41
 */
import {fork, take, put, call} from "redux-saga/effects";
import {request} from "./RequestUtil";
import {fetchStoryDone} from "./ActionStory";
import {getCardList} from "../storage/schema_card";
import {actions_card} from "../containers/reduce/CardReduce";


export function* requestStory(id) {
    try {
        // const story = yield call(request, "https://api.douban.com/v2/movie/" + 'top250');
        const story = yield call(getCardList,'13262975235');
        // for (let i = 0; i < 100; i++) {
        //     console.log(story);
        // }
        yield put(actions_card.getAllCardData(story));
        console.log(story);
        for (let storyKey in story) {
            console.log(story[storyKey]);
        }
        yield put(fetchStoryDone(id, story))
    } catch (error) {
        yield put(fetchStoryDone(id))
        console.log('网络故障');
    }
}

export function* watchRequestStory() {
    while (true) {
        const {
            id,
            begin
        } = yield take('FETCH_STORY_DETAIL');
        yield fork(requestStory, id, begin);
    }
}
