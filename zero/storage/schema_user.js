/**
 *
 * Created by zerowolf on 2017/11/14.
 */
import Realm from 'realm';
import realm from './realm';
import ToastUtil from "../utils/ToastUtil";

export class UserSchema extends Realm.Object {

    // _username;
    // _IDCard;
    // _phone;
    //
    //
    // constructor(username, IDCard, phone) {
    //     super();
    //     this._username = username;
    //     this._IDCard = IDCard;
    //     this._phone = phone;
    // }
    // toString(){
    //     return '卡号'+this._IDCard +'用户名'+ this._username +'手机号'+ this._phone
    // }
}

UserSchema.schema = {
    name: 'User',
    properties: {
        username: 'string',                 //用户姓名
        CardLen: 'int',                 //用户姓名
        IDCard: 'string',  // 身份证号
        phone: 'string',   //预留手机号
        card:{type:'list',objectType:'Card'}
    }
};

// const getCardList = (phone) => {
//     let UserList = realm.objects('User');
//     let UserItem = UserList.filtered(`phone == '${phone}'`);
//     if (UserItem.length>0) {
//         ToastUtil.showShort('有UserItem');
//         console.log(UserItem[0].card);
//         let cardList = UserItem[0].card;
//         // let card = UserItem[0].card;
//         for (let i in cardList) {
//             console.log(cardList[i]);
//         }
//         return cardList;
//         // console.log(UserItem[0].card);
//         // return card;
//     } else {
//         ToastUtil.showShort('无UserItem')
//         return null;
//     }
// };


const getUserList = (phone) => {
    // var dataList = [];
    let UserList = realm.objects('User');
    let ts = UserList.filtered(`phone == '${phone}'`);
    if (ts.length>0) {
        return ts[0];
    } else {
        return null;
    }
};


//
// const deleteUser = (conditions) => {
//     realm.write(() => {
//
//         let objects = realm.objects('User');
//         let obj = objects.filtered(conditions);
//         console.log(obj);
//         realm.delete(obj);
//     });
// };




export {
    getUserList,
    // getCardList
    // deleteUser
};

