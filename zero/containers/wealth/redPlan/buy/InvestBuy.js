/**
 * Created by zerowolf Date: 2018/5/2 Time: 上午12:30
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ListView, KeyboardAvoidingView, BackHandler, AppState,Keyboard,
    TextInput, Modal, StatusBar, FlatList
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const {width, height} = Dimensions.get('window');
import MyTabView from '../../../../views/MyTabView';
import BaseComponent from '../../../../containers/global/BaseComponent';
import Item from "./Item";
import ButtonView from "../../../../views/ButtonView";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import realm from "../../../../storage/realm";
import {fetchRequestHeader} from "../../../../utils/FetchUtilHeader";
import {
    getCreditCardDefault,
    getCreditCardList,
    getDebitCardDefault, getDebitCardList,
} from "../../../../storage/schema_card";
import {fetchRequestToken} from "../../../../utils/FetchUtilToken";
import ToastUtil, {toastAlert} from "../../../../utils/ToastUtil";
import {actions_card} from "../../../reduce/CardReduce";
import {actions} from "../../../../root/GlobalAction";
import {checkIsNull} from "../../../../utils/CheckUitls";
import {cusColors} from "../../../../value/cusColor/cusColors";
import MyButtonView from "../../../../views/MyButtonView";
import {zdp, zModalHeight, zModalMarginTop, zsp} from "../../../../utils/ScreenUtil";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {onAppStateChanged} from "../../../../utils/GoBackUtil";
import ZText from "../../../../views/ZText";
import MyTextInput from "../../../../views/MyTextInput";
import {getBankABC, getBankName, getLimitAmountByMark} from "../../../../utils/BankUtil";
import NavigationUtil from "../../../../utils/NavigationUtil";

var cardList = null;
var debitCardList = null;
var creditCardList = null;
let globalInfo;
let navigation;
let lastBackPressed
let bankLimitList;

class InvestBuy extends BaseComponent {

    constructor(props) {
        super(props);
        navigation = this.props.navigation;


        globalInfo = this.props.globalInfo;


        creditCardList = getCreditCardList(globalInfo.merCode);
        debitCardList = getDebitCardList(globalInfo.merCode);

        let debitCardDefault = getDebitCardDefault(globalInfo.merCode);
        let creditCardDefault = getCreditCardDefault(globalInfo.merCode);


        let redData = this.props.redData;

        bankLimitList = redData.detail;

        console.log(bankLimitList);

        console.log(redData);

        console.log(debitCardDefault);
        console.log(creditCardDefault);

        this.state = {
            debitCard: debitCardDefault,
            bankCard: creditCardDefault,
            buyMoney: '',
            showModal: false,
            modalType: 'CC',
            dataSource_pay: creditCardList,
            dataSource_debit: debitCardList,
        };
        this.renderRow = this._renderRow.bind(this);
    }


    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        AppState.addEventListener('change', this._onAppStateChanged);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
        AppState.removeEventListener('change', this._onAppStateChanged);
    }


    _onAppStateChanged(nextState) {
        onAppStateChanged(nextState, lastBackPressed, navigation, () => {
            lastBackPressed = Date.now();
        });
    }


    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    };


    viewBank(cardType, bankCard, onPress) {

        console.log(bankCard);
        console.log(bankLimitList);
        let bankABC = getBankABC(bankCard.bank);

        var bankCard_last = '';
        console.log(bankCard);
        if (bankCard) {
            bankCard_last = bankCard.bankCard.substr(bankCard.bankCard.length - 4);
        }

        return <TouchableOpacity activeOpacity={1}
                                 style={{
                                     height: zdp(70),
                                     flexDirection: 'row',
                                     justifyContent: 'flex-start',
                                     backgroundColor: 'white',
                                     alignItems: 'center'
                                 }}

                                 onPress={onPress}>

            <Image source={{uri: bankABC}}
                   resizeMode={'contain'}
                   style={{
                       marginLeft: zdp(20),
                       marginRight: zdp(15),
                       width: zdp(45),
                       height: zdp(45),
                       backgroundColor: 'transparent'
                   }}/>

            <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'flex-start'}}>
                <ZText content={bankCard.bank}
                       fontSize={zsp(18)} color={cusColors.text_main}/>
                <ZText content={`尾号${bankCard_last}${cardType === 1 ? '储蓄卡' : '信用卡'}`}
                       fontSize={zsp(17)} color={cusColors.text_secondary}/>
            </View>
            {/* {bankCard ?
                : <ZText parentStyle={{
                    flex: 1,
                    justifyContent: 'space-around',
                    alignItems: 'flex-start'
                }}
                         content={`请添加${cardType === 1 ? '结算' : '支付'}银行卡`} fontSize={zsp(18)}
                         color={cusColors.text_secondary}/>
            }*/}
            <Icon size={zdp(30)} name={'angle-right'}
                  style={{
                      color: 'grey',
                      backgroundColor: 'transparent',
                      marginRight: zdp(20)
                  }}/>

        </TouchableOpacity>
    }


    viewMoney() {
        let bankCard = this.state.bankCard;
        console.log(bankCard);
        console.log(bankLimitList);

        let limit = this.props.redData.limit;
        // limit.splice('')


        let bankMark = bankCard.bankMark;

        let limitAmount = getLimitAmountByMark(bankMark, bankLimitList);


        return <View style={{
            width,
            marginTop: zdp(20),
            marginBottom: zdp(5),
            height: zdp(140),
            backgroundColor: 'white',
            paddingLeft: zdp(20),
            justifyContent: 'space-around',
            alignItems: 'flex-start'
        }}>
            <ZText parentStyle={{paddingTop: zdp(10), paddingBottom: zdp(10)}} content={'收款金额'}
                   fontSize={zsp(15)} color={cusColors.text_secondary}/>

            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-end'
            }}>
                <ZText parentStyle={{marginBottom: zdp(5)}} content={'¥'}
                       color={cusColors.text_main} fontSize={zsp(45)}/>

                <MyTextInput keyboardType={'numeric'} style={{
                    fontSize: zsp(32), alignSelf: 'flex-end',
                    backgroundColor: 'transparent',
                    textAlign: 'justify',
                }} placeholder={''} onChangeText={(text) => {
                    this.setState({
                        buyMoney: text
                    })
                }}/>
            </View>

            <View style={{
                width: width - zdp(40),
                height: zdp(1),
                backgroundColor: 'grey',
                opacity: 0.1
            }}/>


            {
                limitAmount ?
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        paddingTop: zdp(10),
                        paddingBottom: zdp(10)
                    }}>
                        <ZText content={`单笔限额¥ [${limit[0]} , ${limitAmount.limit}]`}
                               fontSize={zsp(15)}
                               color={cusColors.text_secondary}
                               parentStyle={{marginRight: zdp(15)}}/>
                        <ZText content={`当日最大额度¥ ${limitAmount.upper}`} fontSize={zsp(15)}
                               color={cusColors.text_secondary}/>
                    </View> :
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        paddingTop: zdp(10),
                        paddingBottom: zdp(10)
                    }}>
                       <ZText content={`通道单笔限额¥ [${limit[0]} , ${limit[1]}]`} fontSize={zsp(15)}
                               color={cusColors.text_secondary}/>

                     {/*   <ZText content={`暂无${bankCard.bank}信用卡的限额额度,通道单笔限额¥ [${limit[0]} , ${limit[1]}]`} fontSize={zsp(15)}
                               color={cusColors.text_secondary}/>

*/}
                    </View>
            }
        </View>;
    }


    render() {
        return (
            <KeyboardAvoidingView
                style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>


                <MyTabView titleColor={'black'} title={'确认支付'}
                           leftView={true}
                           navigation={this.props.navigation}/>

                <View style={{
                    width,
                    height: zsp(45),
                    backgroundColor: 'lightyellow',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: zsp(13),
                        fontFamily: Platform.OS === 'ios' ? 'PingFang TC' : 'PingFang TC',
                        color: 'orange', textAlign: 'center'
                    }}>提示:
                        支付前请确认信息填写及支付金额无误</Text>
                </View>


                {/*     <View style={{
                    width,
                    height: zdp(60),
                    backgroundColor: 'white',
                    marginTop: 1,
                    paddingLeft: zsp(15),
                    paddingRight: zsp(15),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <Text style={{fontSize: 16, color: 'black'}}>分红计划0502-0301期</Text>
                    <Text style={{fontSize: 16, color: 'black'}}>10.50%</Text>
                </View>

*/}


                <View style={{height: zdp(20)}}/>

                {this.viewBank(0, this.state.bankCard, () => {
                    this.setState({
                        showModal: true,
                        modalType: 'CC',
                        // dataSource: this.state.dataSource.cloneWithRows(this._renderList(cardList._payList))
                        dataSource: creditCardList
                    })
                })}

                {this.viewMoney()}


                {this.viewBank(1, this.state.debitCard, () => {
                    console.log('ajsd');
                    this.setState({
                        showModal: true,
                        modalType: 'DC',
                        dataSource: debitCardList
                    })
                })}

                <MyButtonView style={{width: width / 1.1, marginTop: zdp(30)}} title={'确认支付'}
                              onPress={this.pressInvestSure}/>

                <View style={{flex: 1, height: zdp(150)}}/>

                <View style={{
                    height: zdp(40),
                    width: width - zdp(40),
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginBottom: zdp(20)
                }}>

                    <MaterialIcons size={zdp(20)} name={'security'}
                                   style={{
                                       color: cusColors.linear_light,
                                       backgroundColor: 'transparent'
                                   }}/>

                    <Text style={{
                        fontFamily: Platform.OS === 'ios' ? 'PingFang TC' : 'PingFang TC',
                        fontSize: zsp(13),
                        color: '#837d82',
                        marginLeft: zdp(10)
                    }}>用户信息多重机密,防止用户信息泄露</Text>
                </View>


                {this.viewModal()}

            </KeyboardAvoidingView>

        );
    }

    /**
     * 确认支付,此处网络请求
     */
    pressInvestSure = () => {
        console.log('确认支付');

        let bankCard = this.state.bankCard;

        let limit = this.props.redData.limit;

        let bankMark = bankCard.bankMark;
        let limitAmount = getLimitAmountByMark(bankMark, bankLimitList);


        let limitAll = parseInt(limit[1].replace(/,/g, ""));

        console.log(limitAmount);


        if (limitAmount) {
            let limitDetail = limitAmount.limit.replace(/,/g, "");
            let minLimit = Math.min(limitAll, limitDetail);
            if (parseInt(this.state.buyMoney) < limit[0]) {
                toastAlert(`当前收款金额小于单笔最小额度${limit[0]}元,请调整收款金额后继续`, () => {

                });
            } else if (parseInt(this.state.buyMoney) > minLimit) {
                toastAlert(`当前收款金额大于单笔最大额度${minLimit}元,请调整收款金额后继续`, () => {

                });
            } else {
                this.sureBuy();
            }
        } else {
           /* toastAlert(`当前支付卡所属银行不在支持银行列表中,可能导致支付失败,是否确定继续支付?`, () => {
                this.sureBuy();
            });*/
            if (parseInt(this.state.buyMoney) < limit[0]) {
                toastAlert(`当前收款金额小于该通道单笔最小额度${limit[0]}元,请调整收款金额后继续`, () => {

                });
            } else if (this.state.buyMoney > parseInt(limitAll)) {
                toastAlert(`当前收款金额大于该通道单笔最大额度${parseInt(limitAll)}元,请调整收款金额后继续`, () => {

                });
            } else {
                toastAlert(`当前支付卡所属银行不在支持银行列表中,可能导致支付失败,是否确定继续支付?`, () => {
                    Keyboard.dismiss();
                    this.sureBuy();
                });
            }
        }


    };


    sureBuy = () => {

        var timestamp3 = new Date().getTime();
        // Alert.alert('银行卡号' + this.state.bankCard + '\n买入金额' + this.state.buyMoney)
        let formData = new FormData();
        formData.append('payCard', this.state.bankCard.bankCard);
        formData.append('debitCard', this.state.debitCard.bankCard);
        formData.append('total_fee', this.state.buyMoney);
        formData.append('orderNo', timestamp3);
        let token = this.props.globalInfo.token;
        let entranceId = this.props.entranceId;
        console.log(token);
        console.log(entranceId);


        if (!checkIsNull('买入金额', this.state.buyMoney)) {
            return;
        }

        fetchRequestToken(`pay/${entranceId}`, 'POST', token, formData)
            .then(res => {
                console.log(res);
                if (res.respCode === 200) {
                    this.props.navigation.navigate('Web', {payUrl: res.respMsg})
                } else if (res.respCode === 203) {
                    toastAlert('登录超时,请重新登录', () => {
                        NavigationUtil.backToLogin(this.props.navigation);
                    })
                } else {
                    ToastUtil.showShort(res.respMsg);
                }
            }).then(err => {
            console.log(err);
        });
    }

    /**
     * 点击打开对话框的条目,这里要填充默认值,可以进行修改
     * @returns {*}
     */
    viewBankCard(title, lineHeight, bankCard, onPress) {
        // console.log(bankCard);
        // console.log(bankCard[1]);
        var bankCard_last = '';
        var showItemText = '';
        console.log(bankCard);
        if (bankCard) {
            bankCard_last = bankCard.bankCard.substr(bankCard.bankCard.length - 4);
            showItemText = `${bankCard.bank}(${bankCard_last})`
        } else {
            showItemText = '请添加支付银行卡'
        }

        return <View style={{
            marginTop: zdp(5),
            width,
            height: zdp(60),
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
            }}>
                <Text style={{
                    paddingLeft: zdp(15),
                    fontFamily: Platform.OS === 'ios' ? 'PingFang TC' : 'PingFang TC',
                    width: zdp(120), fontSize: zsp(15)
                }}
                      numberOfLines={1}>{title}</Text>

                <TouchableOpacity activeOpacity={0.9} style={{
                    flex: 1,
                    height: zdp(59),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}
                                  onPress={onPress}
                >

                    <Text style={{
                        flex: 1,
                        fontFamily: Platform.OS === 'ios' ? 'PingFang TC' : 'PingFang TC',
                        fontSize: zsp(16),
                        color: 'black'
                    }} numberOfLines={1}>{showItemText}</Text>
                    <Icon size={zdp(30)} name={'angle-right'}
                          style={{
                              color: 'grey',
                              backgroundColor: 'transparent',
                              marginRight: zdp(20)
                          }}/>
                </TouchableOpacity>
            </View>
            <View
                style={{height: lineHeight, backgroundColor: 'lightgrey', width: width - zdp(30)}}/>

        </View>;


    }


    /**
     * Modal弹出对话框的的视图
     */
    viewModal() {
        return <Modal
            animationType='none'
            transparent={true}
            visible={this.state.showModal}
            onRequestClose={() => this.setState({showModal: false})}
        >
            <View
                style={{
                    width: width,
                    height: zModalHeight,
                    justifyContent: 'center',
                    marginTop: zModalMarginTop,
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}>
                <View style={{
                    width: width / 1.2,
                    backgroundColor: 'white'
                }}>

                    <View style={{
                        height: zdp(60),
                        backgroundColor: cusColors.linear_default,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        elevation: zdp(5),
                        shadowColor: 'grey',
                        shadowOffset: {width: 0, height: zdp(5)}
                    }}>

                        <View style={{
                            height: zdp(60),
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                        }}>

                            <Text style={{
                                fontFamily: Platform.OS === 'ios' ? 'PingFang TC' : 'PingFang TC',
                                marginLeft: zdp(10),
                                fontSize: zsp(18),
                                color: 'white',
                                textAlign: 'left'
                            }}>{`${this.state.modalType === 'CC' ? '选择支付银行卡' : '选择结算银行卡'}`}</Text>
                        </View>

                        <TouchableOpacity activeOpacity={0.5}
                                          style={{
                                              width: zdp(60),
                                              height: zdp(60),
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              backgroundColor: '#2e81ff'
                                          }}
                                          onPress={() => {
                                              this.setState({showModal: false})
                                          }}>
                            <Ionicons size={zdp(30)} name={'md-close'}
                                      style={{color: 'lightgrey', backgroundColor: 'transparent'}}/>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        style={{
                            height: this.state.modalType === 'CC' ? creditCardList.length > 5 ? zdp(250) : zdp(60) * creditCardList.length :
                                debitCardList.length > 5 ? zdp(300) : zdp(60) * debitCardList.length
                        }}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this.renderRow}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        data={this.state.modalType === 'CC' ? this.state.dataSource_pay : this.state.dataSource_debit}
                    />

                    <TouchableOpacity activeOpacity={0.8} style={{
                        height: zdp(60),
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}
                                      onPress={this.pressAddCard}>
                        <Text style={{
                            fontFamily: Platform.OS === 'ios' ? 'PingFang TC' : 'PingFang TC',
                            fontSize: zsp(16),
                            color: cusColors.linear_default,
                            marginLeft: zdp(10)
                        }}>
                            {this.state.modalType === 'CC' ? '+ 添加新信用卡支付' : '+ 添加新结算卡'}</Text>
                    </TouchableOpacity>
                    <View style={{
                        height: 0.5,
                        backgroundColor: 'lightgrey',
                        marginLeft: zdp(10),
                        marginRight: zdp(10)
                    }}/>
                    {/*  <TouchableOpacity activeOpacity={0.8} style={{
                        height: zdp(60),
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}
                                      onPress={this.pressCardManage}>
                        <Text style={{fontSize: zsp(16), color: 'lightsteelblue', marginLeft: zdp(10)}}>-
                            卡号管理</Text>
                    </TouchableOpacity>*/}

                </View>

            </View>
        </Modal>;

    }

    _renderRow = (dataRow) => {
        console.log(dataRow);
        let dataItem = dataRow.item;
        // var substr = '';
        // for (let dataItem of cardTypeList) {
        // }
        var substr = dataItem.bankCard.substr(dataItem.bankCard.length - 4);
        return (<TouchableOpacity activeOpacity={0.9} style={{
                height: zdp(60),
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                paddingRight: zdp(10)
            }}
                                  onPress={() => {
                                      this.setState({
                                          showModal: false,
                                      })
                                      if (this.state.modalType === 'CC') {
                                          this.setState({
                                              bankCard: dataItem
                                          });
                                      } else {
                                          this.setState({
                                              debitCard: dataItem
                                          });
                                      }
                                  }}
            >

                <Text style={{
                    flex: 1,
                    fontFamily: Platform.OS === 'ios' ? 'PingFang TC' : 'PingFang TC',
                    fontSize: zsp(18),
                    marginLeft: zdp(10),
                    color: 'black'
                }}>{`${dataItem.bank}${this.state.modalType === 'DC' ? '储蓄卡' : '信用卡'}(${substr})`}</Text>
            </TouchableOpacity>
        );
    }

    // _renderItem = (item) => {
    //     <ItemRecord/>
    // }
    //
    _separator = () => {
        return <View style={{
            width: width - zdp(10),
            height: 0.5,
            backgroundColor: 'lightgrey',
            alignSelf: 'flex-end'
        }}/>

    };

    /**
     * 添加卡片
     */
    pressAddCard = () => {
        this.setState({
            showModal: false
        });
        this.props.navigation.navigate('addPayCard', {
            cardType: this.state.modalType
            , onGoBack: () => this.refreshCardList()
        })
    };

    /**
     * 添加卡片回退刷新界面
     */
    refreshCardList = () => {
        console.log('asdas');
        let payCardDefault = getCreditCardDefault(globalInfo.merCode);
        let debitCardDefault = getDebitCardDefault(globalInfo.merCode);
        this.setState({
            debitCard: debitCardDefault,
            bankCard: payCardDefault,
        })
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo.data,
        cardList: state.cardList.data,
        entranceId: state.bills.entranceId,
        redData: state.bills.redData,
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initCardList: actions_card.getCardList,
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(InvestBuy);

{/*   {this.viewBankCard('支付银行卡', zdp(1), this.state.bankCard, () => {
                        this.setState({
                            showModal: true,
                            modalType: 0,
                            // dataSource: this.state.dataSource.cloneWithRows(this._renderList(cardList._payList))
                            dataSource: creditCardList
                        })
                    })}*/
}

{/*
                    <View style={{
                        width,
                        height: zdp(60),
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center', marginBottom: zdp(10)
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}>

                            <Text style={[{
                                paddingLeft: zdp(15),
                                fontSize: zsp(15),
                                width: zdp(120),
                                textAlign: 'left'
                            }]}>{'收款金额(元)'}</Text>
                            <TextInput underlineColorAndroid={'transparent'}
                                       keyboardType={'numeric'}
                                       style={{
                                           flex: 1,
                                           backgroundColor: 'transparent',
                                           fontSize: zsp(15)
                                       }}
                                       onChangeText={(text) => {
                                           this.setState({
                                               buyMoney: text
                                           })
                                       }}
                            />
                        </View>

                    </View>*/
}

{/*    {this.viewBankCard('结算银行卡', 0, this.state.debitCard, () => {
                        console.log('ajsd');
                        this.setState({
                            showModal: true,
                            modalType: 1,
                            dataSource: debitCardList
                        })
                    })}*/
}

{/*  <View style={{
                        width,
                        height: zdp(60),
                        backgroundColor: 'white',
                        marginTop: zdp(5),
                        paddingLeft: zdp(20),
                        paddingRight: zdp(20),
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        <Text style={{fontSize: 16, color: 'grey'}}>优惠券</Text>
                        <Text style={{fontSize: 16, color: 'grey'}}>无优惠券可用</Text>
                    </View>
*/
}

{/*  <Text style={{
                    color: 'grey',
                    fontSize: zsp(14),
                    marginTop: zdp(40),
                    textAlign: 'center'
                }}>当前余额¥10000.00</Text>
*/
}
