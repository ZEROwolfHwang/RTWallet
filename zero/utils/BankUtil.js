/**
 * Created by zerowolf Date: 2018/5/18 Time: 上午12:32
 */
import bankMap from '../../resource/bankMap';
import selectBankList from '../../resource/selectBanks';

const getBankABC = (bankName) => {
    var ABC = null;
    for (let index in selectBankList) {
        if (selectBankList[index].bank === bankName) {
            ABC = selectBankList[index].value
        }
    }
    if (ABC) {
        return ABC;
    } else {
        return 'cardlogo'
    }
};
/**
 *
 * @param bankCard  通过保存的银行卡全名拿到卡片所属银行
 * @returns {*}
 */
const getBankName = (bankCard) => {
    if (bankCard) {
        let substrName = bankCard.substr(0, bankCard.length - 3);
        return substrName;
    }
};
/**
 *
 * @param bankCard 通过卡片全名拿到银行卡所属的类型  是储蓄卡还是信用卡
 * @returns {*}
 */
const getBankType = (bankCard) => {
    if (bankCard) {
        let substrType = bankCard.substr(bankCard.length - 3);
        return substrType;
    }

};

/**
 * 拿到分开的银行卡字符串
 */
const getBankDetach = (card) => {

    let size = card.length % 4;
    let number = parseInt(card.length / 4);
    let arrStr = '';
    for (let j = 0; j < number; j++) {
        arrStr = arrStr + card.substring(j * 4, (j + 1) * 4) + ' ';
    }
    if (size !== 0) {
        arrStr = arrStr + card.substring(number * 4);
    }

    return arrStr;
};
/**
 * 拿到分开的银行卡字符串密码格式
 */
const getBankDetachClose = (card) => {

    let size = card.length % 4;
    let number = parseInt(card.length / 4);
    let arrStr = '';

    if (size === 0) {

        for (let i = 0; i < number - 1; i++) {
            arrStr = arrStr + '**** ';
        }
        arrStr = arrStr + card.substring(card.length - 4);
    } else {
        for (let i = 0; i < number; i++) {
            arrStr = arrStr + '**** ';

        }
        arrStr = arrStr + card.substring(card.length - size);
    }

    return arrStr;
};

/**
 * 检查手动输入的银行名是否与 json  map中的一致对应
 */
const bankNameIsCorrect = (bankName) => {
    for (let key in bankMap) {
        if (bankName === bankMap[key]) {
            return true;
            break;
        }
    }
}
/**
 * 通过所属银行拿到银行标志(小写)
 * @param bankName
 * @returns {string}
 */
const getBankMarkByBankName = (bankName) => {
    for (let key in bankMap) {
        if (bankName === bankMap[key]) {
            return key;
            break;
        }
    }
};


/**
 *
 * @param bankMark
 * @param bankLimitList
 * @returns {*}
 */
const getLimitAmountByMark = (bankMark, bankLimitList) => {
    let limitAmount = null;
    for (let key in bankLimitList) {
        if (bankMark === bankLimitList[key].bankMark) {
            limitAmount = bankLimitList[key];
            break;
        }
    }
    return limitAmount;
}

export {
    getBankMarkByBankName,
    bankNameIsCorrect,
    getBankABC,
    getBankName,
    getBankType,
    getBankDetach,
    getBankDetachClose,
    getLimitAmountByMark

};
