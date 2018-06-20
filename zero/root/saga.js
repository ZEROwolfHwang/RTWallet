/**
 * Created by zerowolf Date: 2018/5/11 Time: 下午6:09
 */

import {fork, take, put, call} from "redux-saga/effects";
import {request} from "./RequestUtil";
import {fetchStoryDone} from "./ActionStory";
import {TYPES} from "./GlobalAction";
import {actions} from "./GlobalAction";
import {getCardList} from "../storage/schema_card";
import {fetchRequest} from "../utils/FetchUtil";
import {getUserList} from "../storage/schema_user";


export function* requestCardList(phone) {
    try {
        let cardList = getCardList(phone);
        console.log(cardList);
        console.log(cardList.length);
        yield put(actions.getAllCardData(cardList))


        // const story1 = yield call(getCardList,phone);
        // yield put(getCardList(phone))
        // console.log(story1);
        // yield put(fetchStoryDone(id, story))
    } catch (error) {
        // yield put(fetchStoryDone(phone))
        console.log('网络故障');
    }
}
export function* requestLoginData(payload) {
    console.log(payload);
    try {
        let formData = new FormData();
        formData.append('phone', '13262975235');
        formData.append('code', '5555');
        const res = yield call(fetchRequest, "Login", 'POST',formData);
        console.log(res);
        if (res.respCode === 200) {
            // yield put(actions_wealth.isRequestSuccess());
            let userList = getUserList(res.data.phone);

            console.log(userList);
            if (userList) {
                console.log('不存储网络中返回的银行卡列表');
                this.props.initGlobalInfo({
                    token: res.data.token,
                    phone: res.data.phone,
                    IDCard: res.data.identity,
                    username: res.data.name
                });

                this.props.initCardList(getCardList(res.data.phone));
            } else {
                console.log('读取网络中银行卡列表');
                if (res.data.CardLen !== 0) {
                    console.log('银行卡列表' + res.data.CardLen);
                    this._save2Realm(res.data);

                    this.props.initGlobalInfo({
                        token: res.data.token,
                        phone: res.data.phone,
                        IDCard: res.data.identity,
                        username: res.data.name
                    });

                } else {
                    console.log('银行卡列表' + res.data.CardLen);
                    this.props.initGlobalInfo({
                        token: res.data.token,
                        phone: res.data.phone,
                        IDCard: '',
                        username: ''
                    });
                }

            }


        }

        // yield put(StoryAction.fetchStoryDone(id, story))
        // getCardList(phone).then(data=>{
        //     console.log(data);
        // }).then(err=>{
        //     console.log(err);
        // })

        // const story1 = yield call(getCardList,phone);
        // yield put(getCardList(phone))
        // console.log(story1);
        // yield put(fetchStoryDone(id, story))
    } catch (error) {
        // yield put(fetchStoryDone(phone))
        console.log('网络故障');
    }
}

export function* watchCardList() {
    while (true) {
        const {
            phone,
        } = yield take(TYPES.ACTION_CARDLIST);
        yield fork(requestCardList, phone);
    }
}
export function* watchLoginStatus() {
    while (true) {
        const {
            payload
        } = yield take(TYPES.ACTION_FETCH_LOGIN_DATA);
        yield fork(requestLoginData, payload);
    }
}
