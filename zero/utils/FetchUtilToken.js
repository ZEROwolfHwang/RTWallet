// let common_url = 'http://192.168.1.1:8080/';  //服务器地址
// let common_url = 'https://api.douban.com/v2/movie/';  //服务器地址
// let common_url = 'http://localhost:8080/';  //服务器地址
import ToastUtil from "./ToastUtil";

// let common_url = 'http://sjpay.githubshop.com/app/';  //服务器地址
let common_url = 'http://39.104.64.38:81/app/';  //服务器地址
// let token = '';
// ?start=0&count=10
/**
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST，只能大写
 * @param {JSON} [params=''] body的请求参数，默认为空
 * @return 返回Promise
 */

export const fetchRequestToken = (url, method, token, params) => {

    console.log('token:'+token);
    console.log(params);
    // if (!params) {   //如果网络请求中没有参数
    return new Promise(function (resolve, reject) {
        let header = {
            "Content-Type": "multipart/form-data;charset=UTF-8",
            "token": token + ''  //用户登陆后返回的token，某些涉及用户数据的接口需要在header中加上token
            // "token":'c6a4b1d0e4a44e11c0e63f4348b29146'  //用户登陆后返回的token，某些涉及用户数据的接口需要在header中加上token
        };
        if (!params) {
            fetch(common_url + url, {
                method: method,
                headers: header,
            }).then((response) => response.json())
                .then((responseData) => {
                    console.log('res:', url, responseData + '++++');  //网络请求成功返回的数据
                    console.log(responseData);  //网络请求成功返回的数据
                    resolve(responseData);
                })
                .catch((err) => {
                    console.log('err:', url, err);     //网络请求失败返回的数据
                    reject(err);
                    ToastUtil.showShort(err)
                });

        } else {
            fetch(common_url + url, {
                method: method,
                headers: header,
                body: params //body参数，通常需要转换成字符串后服务器才能解析

            }).then((response) => response.json())
                .then((responseData) => {
                    console.log('res:', url, responseData);   //网络请求成功返回的数据
                    resolve(responseData);
                })
                .catch((err) => {
                    console.log('err:', url, err);   //网络请求失败返回的数据
                    reject('带参请求'+ err);
                    ToastUtil.showShort('带参请求'+ err)
                });
        }
    })
};
