import ToastUtil from "./ToastUtil";

/**
 * Created by zerowolf Date: 2018/4/18 Time: 下午9:06
 */

const validateIdCard = (card) => {
    var str, result = 0;
    card = card.toUpperCase();
    if (card.length === 18) {
        var map1 = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
            map2 = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

        str = new String(card);
        for (var i = 0, len = str.length; i < (len - 1); i++) {
            result += str[i] * map1[i];
        }

        if (map2[(result % 11)] != str[len - 1]) {
            // return alert('请填写正确的身份证号码！');
            return false;
        }else {
            return true;

        }

    }else {
        return false;
    }
};


const isMobileNumber=(phone)=> {
    var flag = false;
    var message = "";
    var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
    if (phone == '') {
        // console.log("手机号码不能为空");
        message = "手机号码不能为空！";
    } else if (phone.length != 11) {
        //console.log("请输入11位手机号码！");
        message = "请输入11位手机号码！";
    } else if (!myreg.test(phone)) {
        //console.log("请输入有效的手机号码！");
        message = "请输入有效的手机号码！";
    } else {
        flag = true;
    }
    if (message != "") {
        // alert(message);
    }
    return flag;
}

const isEmpty=(condition)=> {
    if (condition === '') {
        return true
    }
    return false;
}

export {
    validateIdCard,
    isMobileNumber,
    isEmpty
}
