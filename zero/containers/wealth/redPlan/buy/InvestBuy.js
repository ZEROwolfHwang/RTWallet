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
    ListView,
    TextInput, Modal, StatusBar
} from 'react-native';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');
import MyTabView from '../../../../views/MyTabView';
import BaseComponent from '../../../../containers/global/BaseComponent';
import Item from "./Item";
import ButtonView from "../../../../views/ButtonView";
import Icon from 'react-native-vector-icons/FontAwesome';
import realm from "../../../../storage/realm";
import {fetchRequestHeader} from "../../../../utils/FetchUtilHeader";
import {getCardList} from "../../../../storage/schema_user";
import {
    getDebitCardDefault,
    getPayCardDefault,
    getPayCardList
} from "../../../../storage/schema_card";
import {fetchRequestToken} from "../../../../utils/FetchUtilToken";
import ToastUtil from "../../../../utils/ToastUtil";

var cardList = null;

class InvestBuy extends BaseComponent {

    constructor(props) {
        super(props);

        cardList = this.props.cardList;

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            debitCard: [cardList._debitDefault.bank, cardList._debitDefault.bankCard],
            bankCard: [cardList._payDefault.bank, cardList._payDefault.bankCard],
            buyMoney: '',
            showModal: false,
            modalType: 0,
            dataSource: ds.cloneWithRows(this._renderList(cardList._payList)),
        };
        this.renderRow = this._renderRow.bind(this);
    }

    componentWillMount() {
        // let globalInfo = this.props.globalInfo;

        // let payCardDefault = getPayCardDefault(globalInfo.phone);
        // let debitCardDefault = getDebitCardDefault(globalInfo.phone);

        // this.setState({
        //     debitCard:cardList._debitDefault,
        //     bankCard: cardList._bankCard
        // })

        // storage.load({
        //     key: 'shiming',
        //     autoSync: true,
        //     syncInBackground: true
        // }).then(ret => {
        //     console.log(ret);
        //     this.setState({
        //         debitCard: ret.register_card
        //     })
        // }).catch(err => {
        //     console.log(err);
        // })
    }


    // 查询
    inquireData() {
        let allData = [];
        let globalInfo = this.props.globalInfo;

        // let cardList = getCardList(globalInfo.phone);
        let cardList = getPayCardList(globalInfo.phone);
        for (const cardItem of cardList) {
            // console.log(cardItem);
            allData.push({
                phone: cardItem.phone,   //预留手机号
                bankCard: cardItem.bankCard,//银行卡号
                cardType: cardItem.cardType,//0  储蓄卡     1 支付卡
                cardDefault: cardItem.cardDefault,//0  其他卡     1 默认卡
            });
        }


        // // 获取Person对象
        // let Card = realm.objects('Card');
        //
        // // 遍历表中所有数据
        // for (let i in Card) {
        //     console.log(Card[i]);
        //     allData.push({
        //         username: Card[i].username,                 //用户姓名
        //         IDCard: Card[i].IDCard,  // 身份证号
        //         phone: Card[i].phone,   //预留手机号
        //         bankCard: Card[i].bankCard,//银行卡号
        //         cardType: Card[i].cardType,//0  储蓄卡     1 支付卡
        //         carDefault: Card[i].carDefault,//0  其他卡     1 默认卡
        //     });
        // }

        return allData;
    }

    _renderList(cardTypeList) {

        // let dataList = this.inquireData();
        // let globalInfo = this.props.globalInfo;
        // let dataList = getPayCardList(globalInfo.phone);
        // for (let i in dataList) {
        //     console.log(dataList[i]);
        // }
        // console.log(dataList);

        // var dataList = ['1', '2', '3'];
        // this.dataList = dataList;
        console.log(cardTypeList);
        var row = [];
        for (let dataItem of cardTypeList) {
            let substr = dataItem.bankCard.substr(dataItem.bankCard.length - 4);
            row.push(<View>
                    <TouchableOpacity activeOpacity={0.9} style={{
                        height: 60,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingRight: 10
                    }}
                                      onPress={() => {
                                          this.setState({
                                              showModal: false,
                                              bankCard: [dataItem.bank, dataItem.bankCard]
                                          })
                                      }}
                    >

                        <Text style={{
                            flex: 1,
                            fontSize: 17,
                            marginLeft: 10,
                            color: 'black'
                        }}>{`**** **** **** ${substr}`}</Text>
                        <Text style={{
                            fontSize: 17,
                            color: 'black',
                            marginRight: 10
                        }}>{dataItem.bank}</Text>
                    </TouchableOpacity>

                    <View style={{
                        height: 0.5,
                        backgroundColor: 'lightgrey',
                        marginLeft: 10,
                        marginRight: 10
                    }}/>
                </View>
            )
        }
        return row
    }


    _renderRow(dataRow) {
        return (<View>
            {dataRow}
        </View>)
    }

    render() {
        // let dataList = this.inquireData();
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>


                <MyTabView titleColor={'black'} title={'开始投资'}
                           leftView={true}
                           navigation={this.props.navigation}/>

                <View style={{
                    width,
                    height: 60,
                    backgroundColor: 'white',
                    marginTop: 1,
                    paddingLeft: 15,
                    paddingRight: 15,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <Text style={{fontSize: 16, color: 'black'}}>分红计划0502-0301期</Text>
                    <Text style={{fontSize: 16, color: 'black'}}>10.50%</Text>
                </View>

                <View style={{marginTop: 10}}>


                    {this.viewBankCard('支付银行卡', 0.5, this.state.bankCard, () => {
                        this.setState({
                            showModal: true,
                            modalType: 0,
                            dataSource: this.state.dataSource.cloneWithRows(this._renderList(cardList._payList))
                        })
                    })}

                    <Item
                        keyboardType={'numeric'}
                        textStyle={{paddingRight: 30}}
                        title={'买入金额(元)'} onChangeText={(text) => {
                        this.setState({
                            buyMoney: text
                        })
                    }}/>

                    {this.viewBankCard('结算银行卡', 0, this.state.debitCard, () => {
                        console.log('ajsd');
                        this.setState({
                            showModal: true,
                            modalType: 1,
                            dataSource: this.state.dataSource.cloneWithRows(this._renderList(cardList._debitList))
                        })
                    })}

                    <View style={{
                        width,
                        height: 60,
                        backgroundColor: 'white',
                        marginTop: 5,
                        paddingLeft: 20,
                        paddingRight: 20,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        <Text style={{fontSize: 16, color: 'grey'}}>优惠券</Text>
                        <Text style={{fontSize: 16, color: 'grey'}}>无优惠券可用</Text>
                    </View>

                </View>

                <View/>

                <Text style={{
                    color: 'grey',
                    fontSize: 14,
                    marginTop: 40,
                    textAlign: 'center'
                }}>当前余额¥100.00</Text>

                <ButtonView title={'确认投资'} style={{marginTop: 10, backgroundColor: 'lightpink'}}
                            onPress={
                                this.pressInvestSure
                            }/>

                <View style={{
                    flex: 1,
                    width: width - 40,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    flexDirection: 'row',
                    bottom: 20
                }}>
                    <Image style={{width: 20, height: 20, backgroundColor: 'transparent'}}
                           source={require('../../../../../AImages/red/redPlan5x2.png')}/>
                    <Text style={{
                        fontSize: 13,
                        color: '#837d82',
                        marginLeft: 20
                    }}>用户信息多重机密,防止用户信息泄露</Text>
                </View>


                {this.viewModal()}

            </View>

        );
    }

    /**
     * 确认投资,此处网络请求
     */
    pressInvestSure = () => {
        console.log('确认投资');
        var timestamp3 = new Date().getTime();
        // Alert.alert('银行卡号' + this.state.bankCard + '\n买入金额' + this.state.buyMoney)
        let formData = new FormData();
        formData.append('payCard', this.state.bankCard)
        formData.append('debitCard', this.state.debitCard)
        formData.append('total_fee', this.state.buyMoney)
        formData.append('orderNo', timestamp3);
        let token = this.props.globalInfo.token;
        console.log(token);
        fetchRequestToken('pay/20', 'POST', token, formData)
            .then(res => {
                console.log(res);
                if (res.respCode === 200) {
                    this.props.navigation.navigate('Web', {payUrl: res.respMsg})
                } else {
                    ToastUtil.showShort(res.respMsg);
                }
            }).then(err => {
            console.log(err);
        })

        // fetchRequestHeader('pay/20', 'POST',formData)
        //     .then(res => {
        //         console.log(res);
        //     }).then(err => {
        //     console.log(err);
        // })
    };


    /**
     * 点击打开对话框的条目,这里要填充默认值,可以进行修改
     * @returns {*}
     */
    viewBankCard(title, lineHeight, bankCard, onPress) {
        // console.log(bankCard);
        // console.log(bankCard[1]);
        var bankCard_last = '';
        if (bankCard[1]) {
            bankCard_last = bankCard[1].substr(bankCard[1].length - 4);
        }
        return <View style={{
            marginTop: 5,
            width,
            height: 60,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
            }}>
                <Text style={{padding: 20, paddingRight: 30}}>{title}</Text>

                <TouchableOpacity activeOpacity={0} style={{
                    flex: 1,
                    height: 60,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingRight: 20
                }}
                                  onPress={onPress}
                >

                    <Text style={{
                        flex: 1,
                        fontSize: 16,
                        color: 'black'
                    }}>{`${bankCard[0]}(${bankCard_last})`}</Text>
                    <Icon size={30} name={'angle-right'}
                          style={{color: 'grey', backgroundColor: 'transparent'}}/>
                </TouchableOpacity>
            </View>
            <View
                style={{height: lineHeight, backgroundColor: 'lightgrey', width: width - 30}}/>
        </View>;
    }


    /**
     * Modal弹出对话框的的视图
     */
    viewModal() {
        // let cardList = this.props.cardList;
        return <Modal
            animationType='fade'
            transparent={true}
            visible={this.state.showModal}
            onRequestClose={() => this.setState({showModal: false})}
        >
            <View
                style={{
                    width: width,
                    height: height,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}>
                <View style={{
                    width: width / 1.1,
                    backgroundColor: 'white'
                }}>

                    <View style={{
                        height: 60,
                        backgroundColor: 'lightsteelblue',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        elevation: 5,
                        shadowColor: 'grey',
                        shadowOffset: {width: 0, height: 10}
                    }}>

                        <View style={{
                            height: 60,
                            justifyContent: 'flex-end',
                            alignItems: 'flex-start'
                        }}>

                            <Text style={{
                                margin: 10,
                                fontSize: 18,
                                color: 'white',
                                textAlign: 'left'
                            }}>{`${this.state.modalType === 0 ? '选择银行卡支付' : '选择结算银行卡'}`}</Text>
                        </View>

                        <TouchableOpacity activeOpacity={0.5}
                                          style={{
                                              width: 60,
                                              height: 60,
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              backgroundColor: 'steelblue'
                                          }}
                                          onPress={() => {
                                              this.setState({showModal: false})
                                          }}>
                            <Icon size={30} name={'close'}
                                  style={{color: 'black', backgroundColor: 'transparent'}}/>
                        </TouchableOpacity>
                    </View>

                    <ListView
                        style={{
                            height: this.state.modalType === 0 ? cardList._payList.length > 5 ? 300 : 60 * cardList._payList.length :
                                cardList._debitList.length > 5 ? 300 : 60 * cardList._debitList.length
                        }}
                        showsVerticalScrollIndicator={false}
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                        keyboardShouldPersistTaps={'handled'}
                    />

                    <TouchableOpacity activeOpacity={0.8} style={{
                        height: 60,
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}
                                      onPress={this.pressAddCard}>
                        <Text style={{fontSize: 16, color: 'lightsteelblue', marginLeft: 10}}>
                            {this.state.modalType === 0 ? '+ 添加新信用卡支付' : '+ 添加新结算卡'}</Text>
                    </TouchableOpacity>
                    <View style={{
                        height: 0.5,
                        backgroundColor: 'lightgrey',
                        marginLeft: 10,
                        marginRight: 10
                    }}/>
                    <TouchableOpacity activeOpacity={0.8} style={{
                        height: 60,
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}
                                      onPress={this.pressCardManage}>
                        <Text style={{fontSize: 16, color: 'lightsteelblue', marginLeft: 10}}>-
                            卡号管理</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </Modal>
    }


    /**
     * 卡片管理
     */
    pressCardManage = () => {
        this.setState({
            showModal: false
        })
    };
    /**
     * 添加卡片
     */
    pressAddCard = () => {
        this.setState({
            showModal: false
        });
        this.props.navigation.navigate('addPayCard', {cardType: this.state.modalType})
    }


}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo.data,
        cardList: state.globalInfo.cardList
    }

};

export default connect(mapStateToProps)(InvestBuy);
