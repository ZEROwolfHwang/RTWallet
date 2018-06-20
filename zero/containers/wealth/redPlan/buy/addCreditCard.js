/*
/!**
 * Created by zerowolf Date: 2018/5/1 Time: 下午6:41
 *!/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Platform,
    StyleSheet,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ListView,
    TextInput, Modal, ScrollView, BackHandler, AppState
} from 'react-native';

const {width, height} = Dimensions.get('window');
import MyTabView from '../../../../views/MyTabView';
import BaseComponent from '../../../../containers/global/BaseComponent';
import Item from "./Item";
import ButtonView from "../../../../views/ButtonView";
import Icon from 'react-native-vector-icons/FontAwesome'
import {
    isMobileNumber,
    validateIdCard,
    isEmpty
} from "../../../../utils/Verification";
import ToastUtil from "../../../../utils/ToastUtil";
import realm from "../../../../storage/realm";
import {fetchRequestToken} from "../../../../utils/FetchUtilToken";
import {actions} from "../../../../root/GlobalAction";
import {debitCardIsNull, getCardList, payCardIsNull} from "../../../../storage/schema_card";
import MyProgressBar from "../../../../views/MyProgressBar";
import ItemAddCard from "./ItemAddCard";

import bankList from '../../../../../resource/bankList';
import bankMap from '../../../../../resource/bankMap';
import {actions_card} from "../../../reduce/CardReduce";
import {zdp, zsp} from "../../../../utils/ScreenUtil";
let bankNameType
let globalInfo;
let navigation;
let lastBackPressed = Date.now();
class addCreditCard extends BaseComponent {

    constructor(props) {
        super(props);

         navigation = this.props.navigation;

        //  globalInfo = this.props.globalInfo;
        // let userLast = globalInfo.username.substr(globalInfo.username.length - 1);
        // this.pswUsername = `**${userLast}`
        // let IDCardFirst = globalInfo.IDCard.substr(0, 6);
        // let IDCardLast = globalInfo.IDCard.substr(globalInfo.IDCard.length - 4);
        // this.pswIDCard = `${IDCardFirst}********${IDCardLast}`;

        this.pswUsername = `**${'成'}`
        this.pswIDCard = `${'340824'}********${'0226'}`;
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            bankCard: '',
            phone: '',
            bankName: '',
            dataSource: ds.cloneWithRows(this._renderList()),
        }
        this.renderRow = this._renderRow.bind(this);

    }


    /!*    //组件加载之后添加监听
      componentDidMount() {
          if(Platform.OS === 'android') BackHandler.addEventListener('hardwareBackPress', this._onBackPressed);
          AppState.addEventListener('change', this._onAppStateChanged);


    /!*  //组件卸载之前移除监听
      componentWillUnmount() {
          if(Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress', this._onBackPressed);
          AppState.removeEventListener('change', this._onAppStateChanged(hehe));
      }


      _onBackPressed() {
          console.log(lastBackPressed.toString());
          console.log((lastBackPressed+2000).toString());
          if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
              BackHandler.exitApp();
          }
          lastBackPressed = Date.now();
          console.log(lastBackPressed.toString());
          ToastUtil.showShort('再按一次退出应用');
          return true;
      }

      _onAppStateChanged(hehe) {
          console.log(hehe);
          // switch (AppState.currentState) {
          //     case "active":
          //         console.log("active");
          //         break;
          //     case "background":
          //         console.log("background");
          //         break;
          //     default:
          //
          // }

          if (hehe!= null && hehe === 'active') {

              //如果是true ，表示从后台进入了前台 ，请求数据，刷新页面。或者做其他的逻辑
              if (this.flage) {
                  //这里的逻辑表示 ，第一次进入前台的时候 ，不会进入这个判断语句中。
                  // 因为初始化的时候是false ，当进入后台的时候 ，flag才是true ，
                  // 当第二次进入前台的时候 ，这里就是true ，就走进来了。

                  //测试通过
                  // alert("从后台进入前台");
                  // 这个地方进行网络请求等其他逻辑。
                  navigation.navigate('RegisterApp');

              }
              this.flage = false ;
          }else if(hehe != null && hehe === 'background'){
              this.flage = true;
          }

      }*!/



/!*
    _renderList() {
        var row = [];
        for (let dataItem of bankList) {
            row.push(<TouchableOpacity activeOpacity={0.8}
                                       style={{
                                           flex: 1,
                                           height: zdp(30),
                                           backgroundColor: 'transparent'
                                       }}
                                       onPress={() => {
                                           console.log(dataItem);
                                           this.setState({
                                               // showBank: false,
                                               bankName: `${dataItem}${this.cardType === 0 ? '信用卡' : '储蓄卡'}`
                                           })
                                       }}>
                    <Text style={{fontSize: zsp(20), color: 'black'}}>
                        {`${dataItem}`}
                    </Text>
                </TouchableOpacity>
            )
        }
        return row
    }


    _renderRow(dataRow) {
        return (<View>
            {dataRow}
        </View>)
    }*!/

    render() {


        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView titleColor={'black'}
                           title={`添加新支付卡`}
                           navigation={this.props.navigation}/>

                <ScrollView style={{flex: 1}}
                            keyboardShouldPersistTaps={'always'}
                            contentContainerStyle={{
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}

                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}>


                    <ItemAddCard style={{marginTop: zdp(10)}}
                                 title={'持卡人姓名'}
                                 hasLine={true}
                                 content={this.pswUsername}/>
                    <ItemAddCard
                        title={'身份证号'}
                        content={this.pswIDCard}/>


                    <View style={{
                        height: zdp(40),
                        width,
                        alignItems: 'flex-start',
                        justifyContent: 'flex-end'
                    }}>

                        <Text style={{
                            backgroundColor: 'transparent',
                            color: 'grey',
                            fontSize: zsp(18),
                            marginLeft: zdp(20),
                            marginBottom: zdp(10)
                        }}>请填写银行卡信息</Text>
                    </View>


                    <Item title={'卡号'}
                          placeholder={'请输入您的信用卡号'}
                          isRequired = {'*'}
                          hasLine={true}
                          keyboardType={'numeric'}
                          onChangeText={(text) => {
                              this.changeTextCard(text);
                          }}/>


                    <Item title={'所属银行'}
                          isRequired = {'*'}
                          placeholder={'请确定银行卡所属银行'}
                          hasLine={true}
                          onChangeText={(text) => {
                              this.setState({
                                  bankName: text
                              })
                          }}
                          value={this.state.bankName}/>


                    <Item title={'手机号'}
                          isRequired = {'*'}
                          placeholder={'请输入银行预留手机号'}
                          keyboardType={'numeric'}
                          hasLine={true}
                          onChangeText={(text) => {
                              this.setState({
                                  phone: text
                              })
                          }}/>
                    {this.viewCreditCardElse()}

                    <ButtonView
                        style={{borderRadius: zdp(5), marginTop: zdp(10), backgroundColor: 'lightseagreen'}}
                        title={'提交'}
                        onPress={
                            this.pressSubmit
                        }/>
                </ScrollView>

            </View>
        );


    }

    viewCreditCardElse(){
        return <View>
            <Item title={'信用卡有效期'}
                  placeholder={'例如:2101'}
                  hasLine={true}
                  keyboardType={'numeric'}
                  onChangeText={(text) => {
                      this.setState({
                          phone: text
                      })
                  }}/>
            <Item title={'信用卡cvn2'}
                  placeholder={'例如:123'}
                  keyboardType={'numeric'}
                  hasLine={true}
                  onChangeText={(text) => {
                      this.setState({
                          phone: text
                      })
                  }}/>
            <Item title={'信用卡还款日'}
                  hasLine={true}
                  placeholder={'例如:01'}
                  keyboardType={'numeric'}
                  onChangeText={(text) => {
                      this.setState({
                          phone: text
                      })
                  }}/>
            <Item title={'信用卡账单日'}
                  placeholder={'例如:02'}
                  keyboardType={'numeric'}
                  onChangeText={(text) => {
                      this.setState({
                          phone: text
                      })
                  }}/>

            <Text style={{
                marginTop: zdp(10), marginLeft: zdp(20),
                alignSelf: 'flex-start', color: 'orange', fontSize: zsp(14)
            }}>备注:带*部分为必填项,若要使用完美还款功能,请填写所有项</Text>

        </View>
    }

    pressSubmit = () => {

        if (!(this.state.bankCard.length >= 16 && this.state.bankCard.length <= 19)) {
            ToastUtil.showShort('银行卡位数错误')
            return
        }

        console.log(this.cardType);
        console.log(bankNameType);

        if (this.cardType === 0) {
            if (bankNameType !== '信用卡') {
                ToastUtil.showShort(`该卡片为${bankNameType}  请添加类型为信用卡的卡片`);
                return;
            }
        } else if (this.cardType === 1) {
            if (bankNameType !== '储蓄卡') {
                ToastUtil.showShort('请添加类型为储蓄卡的卡片');
                return;
            }
        }


        if (!isMobileNumber(this.state.phone)) {
            ToastUtil.showShort('请输入正确手机号');
            return;
        }

        let bankNameAll = this.state.bankName + bankNameType;

        let formData = new FormData();
        formData.append('Card', this.state.bankCard);
        formData.append('phone', this.state.phone);
        formData.append('bankName', bankNameAll);
        formData.append('cardType', this.cardType);

        let globalInfo = this.props.globalInfo;
        console.log(globalInfo.token);
        fetchRequestToken(`PayCard`, 'POST', globalInfo.token, formData)
            .then(res => {
                console.log(res);
                if (res.respCode === 200) {
                    this._saveRealm(globalInfo.phone);
                    ToastUtil.showShort(`${bankNameType}添加成功`);
                    this.props.navigation.state.params.onGoBack();
                    this.props.navigation.goBack();
                } else {
                    ToastUtil.showShort(res.respMsg)
                }
            }).then(err => {
            console.log(err);

        });

    };

    _saveRealm(loginPhone) {
        if (this.cardType === 0) {
            let hasData = payCardIsNull(loginPhone);
            if (hasData) {
                this.saveCard(0, 0, loginPhone)
            } else {
                this.saveCard(0, 1, loginPhone)
            }
        } else {

            let hasData = debitCardIsNull(loginPhone);
            console.log(hasData);
            if (hasData) {
                this.saveCard(1, 0, loginPhone)
            } else {
                this.saveCard(1, 1, loginPhone)
            }
        }
    }

    saveCard(cardType, cardDefault, loginPhone) {
        realm.write(() => {
            realm.create('Card', {
                loginPhone: loginPhone,   //预留手机号
                bankPhone: this.state.phone,   //预留手机号
                bankCard: this.state.bankCard,//银行卡号
                bank: this.state.bankName+bankNameType,//所属银行
                cardType: cardType,//0  支付卡     1 储蓄卡
                cardDefault: cardDefault
            });
        });
    }

    changeTextCard(text) {
        this.setState({
            bankCard: text
        })
        if (text.length >= 16) {
            //https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=6221506020009066385&cardBinCheck=true
            var bankUrl = `https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=${text}&cardBinCheck=true`;
            fetch(bankUrl)
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);  //网络请求成功返回的数据
                        let bankNameFromJson = bankMap[responseData.bank];
                    if (responseData.cardType === 'DC') {
                        this.setBankNameFromNet(bankNameFromJson);

                        bankNameType = '储蓄卡';
                    } else if (responseData.cardType === 'CC') {

                        this.setBankNameFromNet(bankNameFromJson);
                        bankNameType = '信用卡';
                    } else if (responseData.cardType === 'SCC') {

                        this.setBankNameFromNet(bankNameFromJson);
                        bankNameType = '准贷记卡';
                    } else if (responseData.cardType === 'PC') {
                        this.setBankNameFromNet(bankNameFromJson);
                        bankNameType = '预付费卡';
                    } else {
                        this.setState({
                            // register_bank:responseData.bank,
                            bankName: '',
                        });
                    }
                })
                .catch((err) => {
                    this.setState({
                        bankName: '',
                    });
                    console.log(err);
                });
        } else {
            this.setState({
                bankName: '',
            })
        }
    }


    /!**
     * 解析网络请求拿到的银行卡信息
     * @param bankNameFromJson
     *!/
    setBankNameFromNet=(bankNameFromJson)=>{

        if (bankNameFromJson) {
            this.setState({
                // register_bank:responseData.bank,
                bankName: bankNameFromJson,
            });

        } else {
            this.setState({
                // register_bank:responseData.bank,
                bankName: '',
            });
        }
    }
}
const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo.data
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initCardList: actions_card.getCardList,
        initGlobalInfo: actions.getGlobalInfo
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(addCreditCard);
*/
