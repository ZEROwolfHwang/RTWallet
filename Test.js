/**
 * Created by zerowolf Date: 2018/4/23 Time: 上午11:36
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions, ListView
} from 'react-native';
// import {getCardList} from "./zero/storage/schema_card";
import realm from "./zero/storage/realm";
import {getCardList} from "./zero/storage/schema_card";
import MyTabView from "./zero/views/MyTabView";
import {zdp, zsp} from "./zero/utils/ScreenUtil";
import {cusColors} from "./zero/value/cusColor/cusColors";

const {width, height} = Dimensions.get('window');
export default class Test extends Component {

    constructor(props) {
        super(props);

    }
    // 删除
    removeData() {
        realm.write(() => {
            // 获取Person对象
            let User = realm.objects('User');
            let Card = realm.objects('Card');
            // 删除
            realm.delete(User);
            realm.delete(Card);
        })
    }
    componentWillMount() {

    }

    render() {

        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                    <MyTabView titleColor={'black'} color1={'white'} color2={'white'} title={'新建标题'} leftView={true}/>
                  <TouchableOpacity activeOpacity={0.8} style={{width:width-zdp(20),height:zdp(60), backgroundColor:'lightcoral',justifyContent:'center',alignItems:'center', borderRadius:zdp(5),elevation:zdp(5), shadowOffset:{width:zdp(5),height:zdp(5)}, shadowColor: cusColors.shadowColor, shadowOpacity: 0.6, shadowRadius: 2,}}
                                                     onPress={()=>{
                                                         // this.removeData();
                                                         realm.write(() => {
                                                             for (let i = 0; i < 10; i++) {
                                                             realm.create('Card', {
                                                                     loginPhone: '13233331111',   //登录手机号
                                                                     bankPhone: '13262975235',   //预留手机号
                                                                     bankCard: '6228480038115651275',//银行卡号
                                                                     bank: '招商',//所属银行
                                                                     cardType: 0,//0  储蓄卡     1 支付卡
                                                                     cardDefault:1
                                                                 }
                                                             )
                                                             }
                                                         })


                                                         console.log('press');
                                                         let cardList = getCardList('13233331111');
                                                         console.log(cardList);
                                                         for (let cardItem in cardList) {
                                                             console.log(cardList[cardItem]);
                                                         }
                                                     }}>
                                       <Text style={{fontSize:zsp(16), color:'blue',textAlign:'center'}}>{`onPress`}</Text>
                                   </TouchableOpacity>

            </View>);
    }
}
