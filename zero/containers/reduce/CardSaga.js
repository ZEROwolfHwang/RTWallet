/**
 * Created by zerowolf Date: 2018/5/11 Time: 下午6:09
 */

import {fork, take, put, call} from "redux-saga/effects";
import {TYPES, actions_card} from "./CardReduce";
import ToastUtil from "../../utils/ToastUtil";


export function* requestCardList(phone) {
    try {
        console.log(phone);
       /* const story = yield call(getCardList, phone);
        var payList = [];
        var debitList = [];
        var payDefault = '';
        var debitDefault = '';
        for (const dataItem of story) {
            console.log(dataItem);
            if (dataItem.cardType === 0) {
                if (dataItem.cardDefault === 1) {
                    payDefault = dataItem
                }
                payList.push(dataItem);
            } else {
                if (dataItem.cardDefault === 1) {
                    debitDefault = dataItem
                }
                debitList.push(dataItem);
            }
        }
        yield put(actions_card.getAllCardData({
            payList,
            debitList,
            payDefault,
            debitDefault
        }));
        console.log(story);
        for (let storyKey in story) {
            console.log(story[storyKey]);
        }*/

    } catch (error) {
        console.log('网络故障');
        // ToastUtil.showShort('网络故障');
    }
}

export function* watchCardList() {
    while (true) {
        const {
            phone,
        } = yield take(TYPES.ACTION_CARD_LIST);
        yield fork(requestCardList, phone);
    }
}

