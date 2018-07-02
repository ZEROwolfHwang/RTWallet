/**
 * Created by zerowolf Date: 2018/5/13 Time: 上午9:49
 */

//修改密码点击保存事件
const checkPassword = (newPassword, passwordSure) => {

    var reg = /^[\w]{6,12}$/

    return new Promise((resolve, reject) => {

        var responseData;
        if (newPassword.match(reg)) {
            if (newPassword === passwordSure) {
                responseData = {code: 200, msg: 'OK'}
                resolve(responseData)
            } else {
                responseData = {code: 201, msg: '两次输入密码不统一'}
                reject(responseData)
            }
        } else {
            responseData = {code: 202, msg: '密码格式错误,密码由字母,数字和下划线_组成且不小于6位数'};
            reject(responseData)
        }
    });
};

export {
    checkPassword
}
