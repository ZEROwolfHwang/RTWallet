/**
 * Created by zerowolf Date: 2018/5/20 Time: 上午12:08
 */

import {fetchRequestToken} from "../../../../utils/FetchUtilToken";
import ToastUtil, {toastAlert} from "../../../../utils/ToastUtil";
import realm from "../../../../storage/realm";
import {getCreditCardList, getDebitCardList} from "../../../../storage/schema_card";
import NavigationUtil from "../../../../utils/NavigationUtil";

/**
 * 删除卡片
 */
const deleteCard = (currentCard, merCode, token, callBack1, callBack2) => {
    console.log(currentCard);

    try {
        fetchRequestToken(`cardDel?bankCard=${currentCard.bankCard}`, 'GET', token)
            .then(res => {
                console.log(res);
                if (res.respCode === 200) {
                    realm.write(() => {
                        if (currentCard.isDefault) {

                            let cardType = currentCard.cardType;

                            realm.delete(currentCard);

                            if (cardType === 'DC') {
                                //结算卡
                                let debitCardList = getDebitCardList(merCode);
                                if (debitCardList.length > 0) {
                                    debitCardList[0].isDefault = true;
                                }
                            } else {
                                //支付卡
                                let payCardList = getCreditCardList(merCode);
                                if (payCardList.length > 0) {
                                    payCardList[0].isDefault = true;
                                }
                            }
                        } else {
                            realm.delete(currentCard);
                        }
                    });

                    ToastUtil.showShort('银行卡删除成功')
                    callBack1();
                } else if (res.respCode === 203) {
                    toastAlert('登录超时,请重新登录',()=>{
                        NavigationUtil.backToLogin(this.props.navigation);
                    })
                } else {
                    ToastUtil.showShort(res.respMsg)
                    callBack2();
                }
            }).catch(err => {
            callBack2();
            console.log(err);
        });

    } catch (err) {
        console.log(err);
        callBack2();
        ToastUtil.showShort('卡片不存在,请下拉刷新')
    }

};
export {
    deleteCard
}
