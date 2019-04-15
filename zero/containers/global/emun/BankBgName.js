/**
 * Created by zerowolf Date: 2018/7/4 Time: 上午1:37
 */

/*const BankBgName = {
    BLUE: 'bank_blue',
    GREEN: 'bank_green',
    ORANGE: 'bank_orange',
    RED: 'bank_red',
    PURPLE: 'bank_purple',
};*/
const BankBgName = ['bank_blue', 'bank_green', 'bank_orange', 'bank_red', 'bank_purple'];


const getRandomBank = (index) => {
    // var n = Math.floor(Math.random() * BankBgName.length + 1) - 1;
    return BankBgName[index % 5];
};

export {
    BankBgName,
    getRandomBank
};
