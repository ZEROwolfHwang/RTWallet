import {getAllCard, getDebitCardList, getCreditCardList} from "../../storage/schema_card";
import realm from "../../storage/realm";
import {TYPES} from "../../root/GlobalAction";

/**
 * Created by zerowolf Date: 2018/5/21 Time: 下午9:34
 */
const save2Realm = (data) => {

    console.log(data.CardList);
    let resList = data.CardList;

    realm.write(() => {

        let allCard = getAllCard(data.merCode);
        realm.delete(allCard);

        realm.create('User', {
            merCode: data.merCode,
            username: data.name,
            CardLen: data.CardLen,
            IDCard: data.identity,
            phone: data.phone,
        });

        for(const index in resList) {
            let carItem = resList[index];
            realm.create('Card', {

                merCode: data.merCode,   //预留手机号
                bankCard: carItem.bankCard,//银行卡号
                bank: carItem.bank,
                bankPhone: carItem.bankPhone,   //预留手机号
                bankMark: carItem.bankMark,
                cardType: carItem.cardType,
                isDefault: false,

                isComplete: carItem.isComplete === 0 ? false : true,

                creditCvn2: carItem.creditCvn2,               //信用卡cvn2(cardType==CC时可以有值)
                creditValidDay: carItem.creditValidDay,               //信用卡有效期(cardType==CC时可以有值)
                creditRepayDay: carItem.creditRepayDay,          //信用卡还款日(cardType==CC时可以有值)
                creditBillingDay: carItem.creditBillingDay
            })
        }

        let debitCardList = getDebitCardList(data.merCode);
        if (debitCardList.length > 0) {
            debitCardList[0].isDefault = true;
        }
        let creditCardList = getCreditCardList(data.merCode);
        if (creditCardList.length > 0) {
            creditCardList[0].isDefault = true;
        }
    });

};


/**
 * 存储全局信息
 * @param navigation
 * @param resData
 */
const save2Global = (navigation, resData) => {
    navigation.dispatch({
        type: TYPES.ACTION_GLOBAL,
        data: {
            token: resData.token,
            phone: resData.phone,
            IDCard: resData.identity,
            username: resData.name,
            merCode: resData.merCode,
            appUser: resData.appUser,
            recommend: resData.recommend
        }
    });
}

export {
    save2Realm,
    save2Global
};
