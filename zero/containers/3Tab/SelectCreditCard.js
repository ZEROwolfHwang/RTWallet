/**
 * Created by zerowolf Date: 2018/7/14 Time: 下午2:12
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Platform,
    StyleSheet,
    TextInput,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    ListView,
    RefreshControl, ScrollView, ImageBackground, AppState, BackHandler
} from 'react-native';
import MyTabView from "../../views/MyTabView";
import BaseComponent from "../global/BaseComponent";
import MyButtonView from "../../views/MyButtonView";
import {getBankABC, getBankDetach, getBankDetachClose} from "../../utils/BankUtil";
import {getRandomBank} from "../global/emun/BankBgName";
import {zdp, zsp, zWidth} from "../../utils/ScreenUtil";
import ZText from "../../views/ZText";
import {cusColors} from "../../value/cusColor/cusColors";
import {getCreditCardList} from "../../storage/schema_card";
import {toastAlert} from "../../utils/ToastUtil";
import {onAppStateChanged, onBackPress} from "../../utils/GoBackUtil";

let globalInfo;

class SelectCreditCard extends BaseComponent {

    constructor(props) {
        super(props);

        globalInfo = this.props.globalInfo;

        this.state = {
            cardList: [],
            isRefreshing: false,

        }

    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }



    onBackPress = () => {
        // if (this.params.onAddBack) {
        //     this.params.onAddBack();
        // }
        this.props.navigation.goBack();
        return true;
    };

    componentWillMount() {
        this.params = this.props.navigation.state.params;

        let creditCardList = getCreditCardList(globalInfo.merCode);
        this.setState({
            cardList: creditCardList
        })
    }


    viewAddCardPlan() {
        return <View
            key={10001}
            style={{
                marginTop: zdp(5),
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: zdp(20)
            }}>


            <TouchableOpacity
                activeOpacity={0.9}
                style={{
                    marginBottom: zdp(20),
                }}
                onPress={this.pressAddCardPlan}>

                <ImageBackground source={{uri: 'bg_add'}}
                                 resizeMode={'contain'}
                                 style={{
                                     width: zWidth - zdp(30),
                                     height: zdp(70),
                                     justifyContent: 'space-around',
                                     flexDirection: 'row',
                                     alignItems: 'center',
                                     alignSelf: 'center',
                                 }}>


                    <ZText parentStyle={{
                        marginLeft: zdp(40),
                        marginRight: zdp(20),
                        width: zdp(25),
                        height: zdp(25),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'black',
                        borderRadius: zdp(15)
                    }} content={'+'} fontWeight={'500'} fontSize={zsp(18)} color={'white'}/>

                    <ZText parentStyle={{flex: 1, alignItems: 'flex-start'}} content={'绑定新支付卡'}
                           color={cusColors.text_main} fontSize={zsp(18)}/>

                    <Image source={{uri: 'common_next'}}
                           resizeMode={'contain'}
                           style={{
                               marginRight: zdp(10),
                               width: zdp(20),
                               height: zdp(20),
                               backgroundColor: 'transparent'
                           }}/>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    }


    viewCardList = (cardList) => {

        var cardListRow = [];
        for(const index in cardList) {
            let cardItem = cardList[index];
            let bankCard = cardItem.bankCard;
            let bankName = cardItem.bank;
            let bankMark = cardItem.bankMark;
            let cardType = cardItem.cardType;
            let isComplete = cardItem.isComplete;
            console.log('isComplete: ', isComplete);

            let bankDetach = getBankDetach(bankCard);
            let bankDetachClose = getBankDetachClose(bankCard);

            // let bankCard_start = bankCard.substr(0, bankCard.length - 4);
            // let bankCard_Last = bankCard.substr(bankCard.length - 4);
            // let str_bankName = getBankName(cardItem.bank);
            let bankABC = getBankABC(bankName);
            if (!bankABC) {
                bankABC = 'cardlogo'
            }

            // getBankMarkByBankName()

            // let str_bankType = getBankType(cardItem.bank);


            cardListRow.push(<TouchableOpacity key={index} activeOpacity={0.9}
                                               style={{
                                                   width: zWidth - zdp(20),
                                                   height: zdp(130),
                                                   justifyContent: 'center',
                                                   alignItems: 'center'
                                               }}
                                               onPress={() => {
                                                   this.pressCardItemSelected(isComplete, cardItem);
                                               }}>


                    <ImageBackground
                        resizeMode={'contain'}
                        style={{
                            width: zWidth - zdp(20),
                            height: zdp(130),
                            // backgroundColor: bankColor[bankABC],
                            borderRadius: zdp(5),
                        }}
                        source={{uri: getRandomBank(index)}}>

                        <View style={{
                            borderWidth: zdp(1),
                            borderRadius: zdp(1),
                            borderColor: 'white',
                            padding: zdp(5),
                            paddingTop: zdp(2),
                            paddingBottom: zdp(2),
                            position: 'absolute',
                            flexDirection: 'row',
                            top: zdp(10),
                            right: zdp(20),
                        }}>

                            <ZText content={`${isComplete ? '已完善' : '待完善信息'}`}
                                   fontSize={zsp(15)} color={'white'}/>

                        </View>

                        <View style={{
                            flex: 1,
                            paddingTop: zdp(15),
                            paddingLeft: zdp(15),
                            width: zWidth - zdp(20),
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            flexDirection: 'row'
                        }}>

                            <View style={{
                                backgroundColor: 'white',
                                opacity: 0.8,
                                width: zdp(45),
                                height: zdp(45),
                                borderRadius: zdp(30),
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>

                                <Image source={{uri: bankABC}}
                                       resizeMode={'contain'}
                                       style={{width: zdp(45), height: zdp(45)}}/>
                            </View>

                            <View style={{
                                flex: 1,
                                marginLeft: zdp(5),
                                justifyContent: 'center',
                                alignItems: 'flex-start'
                            }}>

                                <ZText parentStyle={{}}
                                       content={bankName}
                                       fontSize={zsp(18)}
                                       color={'white'}/>

                                <ZText
                                    // content={cardType === 'DC' ? '储蓄卡' : '信用卡'}
                                    content={'信用卡'}
                                    fontSize={zsp(16)}
                                    color={'white'}/>

                            </View>


                        </View>

                        <ZText parentStyle={{
                            flex: 1,
                            width: zWidth - zdp(20),
                            backgroundColor: 'transparent',
                            // alignSelf: 'flex-start',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            paddingLeft: zdp(20)
                        }}
                               content={bankDetach}
                               fontSize={zsp(24)}
                               textAlign={'left'}
                               color={'white'}/>


                    </ImageBackground>
                </TouchableOpacity>
            );
        }

        cardListRow.push(this.viewAddCardPlan());

        return (<View>
            {cardListRow}
        </View>)
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView title={'选择信用卡'} navigation={this.props.navigation}/>
                <View style={{width: zWidth, height: zdp(15), backgroundColor: 'transparent'}}/>
                <ScrollView style={{}}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}
                            overScrollMode={'always'}
                            onRefresh={() => {
                                console.log('refresh');
                            }}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this.onRefresh}
                                    tintColor='#00f'
                                    title="正在刷新..."
                                    titleColor={cusColors.text_secondary}
                                    colors={[cusColors.RefreshColor_01, cusColors.RefreshColor_02, cusColors.RefreshColor_03]}
                                    progressBackgroundColor={cusColors.RefreshBackground}
                                />
                            }>


                    {/*<View style={{width: zWidth, height: zdp(15), backgroundColor: 'transparent'}}/>*/}
                    {this.viewCardList(this.state.cardList)}
                </ScrollView>


                {/*   <MyButtonView style={{marginBottom: zdp(40), marginTop: zdp(20),backgroundColor:'transparent'}} title={'下一步'}
                              onPress={this.pressNext}/>

*/}
            </View>);
    }


    /**
     * 下拉刷新
     */
    onRefresh = () => {
        let creditCardList = getCreditCardList(globalInfo.merCode);
        this.setState({
            cardList: creditCardList
        })
    }


    /**
     * 点击条目,判断卡片是否完善
     * @param isComplete
     * @param cardItem
     */
    pressCardItemSelected = (isComplete, cardItem) => {
        console.log('isComplete: ', isComplete);

        if (isComplete) {
            this.props.navigation.navigate('AddCardPlan', {bankCard: cardItem.bankCard});
        } else {
            toastAlert('该信用卡信息不完善,请完善卡信息后添加卡计划', () => {
                this.props.navigation.navigate('EditCardInfo', {bankCard: cardItem.bankCard});
            })
        }
    }


    /**
     * 绑定新的支付卡
     */
    pressAddCardPlan = () => {
        if (this.props.globalInfo.IDCard) {

        this.props.navigation.navigate('addPayCard', {cardType: 'CC'});
        } else {
            toastAlert('您尚未完善用户信息认证,请完成认证后再绑定银行卡', () => {
                this.props.navigation.navigate('MerchantInfo');
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
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectCreditCard);
