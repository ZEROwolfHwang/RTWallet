/**
 * Created by zerowolf Date: 2018/5/3 Time: 上午10:11
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions,ListView,AsyncStorage
} from 'react-native';
import realm from "../zero/storage/realm";
const {width, height} = Dimensions.get('window');
export default class RealmTest extends Component {

    constructor(props) {
        super(props);

        realm.write(()=>{
            realm.create('User',{
                username:'1621',
                IDCard: '3408241994',
                phone:'13262975236',
                card:[{
                    phone:'13262975235'
                }]
            })
        })

        let userInfor = {token:'as1728321jasd72sjkad823',phone:'132****5235'};
        // const tableKey = 'XXX-XXXX_TableKey';
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfor), function(err){
            if (err) {
                //console.log('__storageUserItem:(error)'+err);
                console.log(err);
                return;
            }
            //console.log('__storage:(success)' + userInfor.email);
        });

        this.state={
            a : null
        }

    }

    async _loadStorage() {
        try {
            let useReadability = await AsyncStorage.getItem('userInfo');
            if (useReadability !== null) {
                const userInfo =  JSON.parse(useReadability) ;
                console.log(userInfo);
                return userInfo;
            }
            //TODO 进入登录页面
        } catch(e) {
            console.log('_loadStorage error'+e);
            //TODO 进入登录页面
        }
    }

    render() {
        this.obj = null;
        let objects = realm.objects('User');
        for (const object of objects) {
            console.log(object);
            this.obj = object;
        }
        console.log(this.obj.IDCard);

        // var a =null;
        // this._loadStorage().then((res) => {
        //     this.setState({
        //         a: res
        //     })
        //     // a = res
        //     // console.log(res);
        // });
        // console.log(this.state.a);

        // let realm = new Realm({
        //     schema: [{name: 'Dog', properties: {name: 'string'}}]
        // });

        // let schema1 = new UserSchema();
        // schema1.username('皇善人')
        // schema1.phone('13262975235')
        // schema1.IDCard('6228480038')
        //
        //
        // realm.write(() => {
        //     realm.create('User', schema1);
        // });

        // realm.write(()=>{
        //     let anies = realm.objects('User');
        //     let anies1 = realm.objects('Card');
        //     realm.delete(anies)
        //     realm.delete(anies1)
        // })

        /*realm.write(() => {
            realm.create('User', {
                username: 'aaaaaaa',                 //用户姓名
                IDCard: '340824199402261435',  // 身份证号
                // phone: {type: 'int', default: 0},   //预留手机号
                card:[{
                    phone:13262,   //预留手机号
                    bankCard: '6228480038',//银行卡号
                    cardType:0
                },{
                    phone:13262,   //预留手机号
                    bankCard: '6228480038',//银行卡号
                },{
                    phone:13262,   //预留手机号
                    bankCard: '6228480038',//银行卡号
                }]
            });
        });*/
        // realm.write(() => {
        //     realm.create('Card', {
        //         phone: 13262975235,   //预留手机号
        //         bankCard: '6228480038115651275',//银行卡号
        //         cardType: 1,//银行卡号
        //         carDefault: 1,//银行卡号
        //     });
        // });

        // deleteUser('phone = 13262975235');

        // let user = getUser();
        // for (let userKey in user) {
        //     console.log(user[userKey]);
        //     console.log(user[userKey].toString());
        // }
        //
        // let objects = realm.objects('User');
        // // // console.log(objects.length);
        // //
        // for (let i in objects) {
        //     console.log(objects[i]);
        // //     console.log(objects[i].username);
        // }
        //
        // let payCards = getPayCardList('13262975235');
        // for (let i in payCards) {
        //     console.log(payCards[i]);
        // }

        /*realm.write(()=>{
            let ts = realm.objects('User').filtered('phone == 13262975235');
            // ts.card = [{
            //     phone: 13262123,
            //     bankCard: '6228480038asda'
            // }];
            for (const t of ts) {
                console.log(t);
                // console.log(t.card);

                t.card.push({
                    phone: 13262123841,
                    bankCard: '6228480038asda'
                })
                // for (const cardElement of t.card) {
                //     console.log(cardElement);
                // }
            }
            console.log(ts[0].card);
        })*/

        //
        // realm.write(()=>{
        //     let ts = realm.objects('User').filtered('phone == 13262975235');
        //     for (const t of ts) {
        //         let ts1 = t.card.filtered('phone == 13262123');
        //         for (const t1 of ts1) {
        //             console.log(t1);
        //             realm.delete(t1)
        //         }
        //     }
        // })

        console.log('realm path:', realm.path)
        return (
            <View style={{flex:1}}>
                <Text style={{fontSize: zsp(20), color:'white'}}>
                    Count of Dogs in Realm: {realm.objects('User').length}
                </Text>
            </View>
        );
    }
}

