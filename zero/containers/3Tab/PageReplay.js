/**
 * Created by zerowolf Date: 2018/7/15 Time: 下午5:30
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
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
    AppState,
    BackHandler, ScrollView, RefreshControl, ImageBackground, FlatList
} from 'react-native';
import BaseComponent from "../global/BaseComponent";
import {fetchRequestToken} from "../../utils/FetchUtilToken";
import {Api} from "../../utils/Api";
import {onAppStateChanged, onBackPress} from "../../utils/GoBackUtil";
import {getBankABC, getBankDetach, getBankDetachClose} from "../../utils/BankUtil";
import {zAppBarHeight, zdp, zHeight, zModalHeight, zsp, zWidth} from "../../utils/ScreenUtil";
import {getRandomBank} from "../global/emun/BankBgName";
import {cusColors} from "../../value/cusColor/cusColors";
import ZText from "../../views/ZText";
import ToastUtil, {toastAlert} from "../../utils/ToastUtil";
import {getDateTimeDiff, remindRepayDay} from "../../utils/DateUtil";
import NavigationUtil from "../../utils/NavigationUtil";
import LinearGradient from "react-native-linear-gradient";
import {AllImages} from "../../../XImages/AllImages";
import {fetchRequest} from "../../utils/FetchUtil";
import {
    actions_replay,
    Types_replay,
    zDispatch_replay,
    zDispatch_replayHistory
} from "./reduces/reduceReplay";
import {PlanMode} from "../global/emun/ReplayType";

let lastBackPressed;
let globalInfo;
let navigation

class PageReplay extends BaseComponent {

    constructor(props) {
        super(props);

        navigation = this.props.navigation;
        globalInfo = this.props.globalInfo;

        this.state = {
            planCardList: [],
            isRefreshing: false
        }

    }


    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        this.props.PlanMode === PlanMode.RUNNING ?  AppState.addEventListener('change', this._onAppStateChanged):null;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
        this.props.PlanMode === PlanMode.RUNNING ?  AppState.removeEventListener('change', this._onAppStateChanged):null;
    }


    _onAppStateChanged(nextState) {
        onAppStateChanged(nextState, lastBackPressed, navigation, () => {
            lastBackPressed = Date.now();
        });
    }


    onBackPress = () => {

        if (this.props.PlanMode === PlanMode.RUNNING) {

            return onBackPress(lastBackPressed, this.props.navigation, () => {
                lastBackPressed = Date.now();
            });
        } else {
            this.props.navigation.goBack();
            return true;
        }
    };


    fetchData = () => {
        this.setState({
            isRefreshing: true
        });

        this.props.PlanMode === PlanMode.RUNNING ? zDispatch_replay(this.props.navigation, globalInfo.token)
            : zDispatch_replayHistory(this.props.navigation, globalInfo.token);

        this.timeout = setTimeout(() => {
            this.setState({
                isRefreshing: false
            });
            clearTimeout(this.timeout)
        }, 1500);
    };


    viewPlanList(planList) {

        console.log('planList: ', planList);

        let rowList = [];

        for(let index in planList) {
            let cardItem = planList[index];
            let bankCard = cardItem.bankCard;
            let bankName = cardItem.bank;
            let bankMark = cardItem.bankMark;
            let cardType = cardItem.cardType;
            let isComplete = cardItem.isComplete;
            let status = cardItem.status;

            let creditRepayDay = cardItem.creditRepayDay;


            let bankDetach = getBankDetach(bankCard);
            let bankDetachClose = getBankDetachClose(bankCard);

            // let bankCard_start = bankCard.substr(0, bankCard.length - 4);
            // let bankCard_Last = bankCard.substr(bankCard.length - 4);
            // let str_bankName = getBankName(cardItem.bank);
            let bankABC = getBankABC(bankName);


            rowList.push(<TouchableOpacity key={index} activeOpacity={0.9}
                                           style={{
                                               width: zWidth - zdp(20),
                                               justifyContent: 'center',
                                               alignItems: 'center'
                                           }}
                                           onPress={() => {
                                               this.pressSeeCardPlan(cardItem);
                                           }}>


                    <LinearGradient
                        style={{
                            width: zWidth - zdp(30),
                            height: zdp(120),
                            backgroundColor: '#00f',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            borderRadius: zdp(8)
                        }}
                        start={{x: 0.0, y: 0.0}}
                        end={{x: 1.0, y: 0.0}}
                        locations={[0, 1]}
                        colors={this.props.PlanMode === PlanMode.RUNNING ?['#78A7F4', '#4675E3']
                            :['#c6c6c7', '#a2a2a3']}>


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
                                       style={{width: zdp(45), height: zdp(45),
                                           opacity: this.props.PlanMode === PlanMode.RUNNING ? 1 : 0.5}}/>
                            </View>

                            <View style={{
                                flex: 1,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}>

                                <View style={{
                                    marginLeft: zdp(5),
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    flexDirection: 'column'
                                }}>

                                    <ZText parentStyle={{}}
                                           content={bankName}
                                           fontSize={zsp(18)}
                                           color={'white'}/>

                                    <ZText
                                        parentStyle={{marginTop: zdp(3)}}
                                        content={'信用卡'}
                                        fontSize={zsp(16)}
                                        color={'white'}
                                        textStyle={{opacity: 0.8}}/>

                                </View>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column'
                                }}>

                                    <ZText parentStyle={{}}
                                           content={'还款提醒日'}
                                           fontSize={zsp(16)}
                                           color={'white'}
                                           textStyle={{opacity: 0.5}}/>

                                    <ZText
                                        parentStyle={{marginTop: zdp(5)}}
                                        content={remindRepayDay(creditRepayDay)}
                                        fontSize={zsp(17)}
                                        color={'white'}
                                        textStyle={{opacity: 0.8}}/>

                                </View>
                                <View style={{
                                    marginRight: zdp(15),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column'
                                }}>

                                    <ZText parentStyle={{}}
                                           content={'到期天数'}
                                           fontSize={zsp(16)}
                                           color={'white'}
                                           textStyle={{opacity: 0.5}}/>

                                    <ZText
                                        parentStyle={{marginTop: zdp(5)}}
                                        // content={cardType === 'DC' ? '储蓄卡' : '信用卡'}
                                        content={getDateTimeDiff(creditRepayDay) !== 0 ? getDateTimeDiff(creditRepayDay) : '今天到期'}
                                        fontSize={getDateTimeDiff(creditRepayDay) !== 0 ? zsp(17) : zsp(15)}
                                        color={getDateTimeDiff(creditRepayDay) !== 0 ? 'white' : cusColors.main_red}
                                        textStyle={{opacity: 0.8}}/>

                                </View>


                            </View>

                        </View>

                        <View style={{
                            flex: 1,
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            flexDirection: 'row',
                            width: zWidth - zdp(30),
                            marginTop: zdp(10),
                        }}>


                            <ZText parentStyle={{
                                // flex: 1,
                                // alignSelf: 'flex-start',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                paddingLeft: zdp(20),
                                // backgroundColor: 'yellow',
                            }}
                                   content={bankDetachClose}
                                   fontSize={zsp(24)}
                                   textAlign={'left'}
                                   color={'white'}/>

                            <ZText parentStyle={{
                                padding: zdp(1.5), paddingLeft: zdp(10), justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                marginTop: zdp(5),
                                paddingRight: zdp(10), borderWidth: zdp(1), borderColor: 'white',
                                borderRadius: zdp(3), opacity: 0.8, marginRight: zdp(10)
                            }}
                                   content={status === 1 ? '正在执行' : status === 2 ? '暂停' : status === 3 ? '取消' : status === 4 ? '异常停止' : '任务完成'}//1:进行中 2:暂停 3:取消 4:异常停止 5:任务完成
                                   fontSize={zsp(15)}
                                   color={'white'}/>

                        </View>
                    </LinearGradient>

                    <Image source={AllImages.shadow_repay}
                           resizeMode={'cover'}
                           style={{
                               width: zWidth - zdp(30),
                               height: zdp(10),
                               backgroundColor: 'transparent'
                           }}/>

                </TouchableOpacity>
            );
        }

        this.props.PlanMode === PlanMode.RUNNING ? rowList.push(this.viewAddCardPlan()) : null;


        {
            planList&&Platform.OS === 'ios'?
        rowList.push(<View key={10008} style={{height:zModalHeight-planList.length*130-zdp(180), backgroundColor:'transparent'}}/>):null
        }

        return <View>
            {rowList}
        </View>
    }


            // {/*<ScrollView style={{}}*/}
    render() {
        return (
            <ScrollView style={{width: zWidth, height:zHeight, marginTop: zdp(20)}}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}
                            scrollEnabled={true}
                            bounces={true}
                            // overScrollMode={'always'}
                            onRefresh={() => {
                                console.log('refresh');
                            }}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this.fetchData}
                                    tintColor='#00f'
                                    title="正在刷新..."
                                    titleColor={cusColors.text_secondary}
                                    colors={[cusColors.RefreshColor_01, cusColors.RefreshColor_02, cusColors.RefreshColor_03]}
                                    progressBackgroundColor={cusColors.RefreshBackground}
                                />
                            }>

                {this.viewPlanList(this.props.PlanMode ===PlanMode.RUNNING?this.props.planCardList:this.props.replayHistory)}
            </ScrollView>
        )
    }



    viewAddCardPlan() {
        return <View
            key={10009}
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

                    <ZText parentStyle={{flex: 1, alignItems: 'flex-start'}} content={'添加卡计划'}
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


    /**
     * 添加还款计划  , 监听返回,刷新列表
     */
    pressAddCardPlan = () => {
        this.props.navigation.navigate('SelectCreditCard');

    };

    /**
     * 查看卡计划详情
     */
    pressSeeCardPlan = (cardItem) => {

        this.props.initPlanItemData(cardItem);

        this.props.navigation.navigate('PlanDetail',{PlanMode:this.props.PlanMode});
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        planCardList: state.replay.planCardList,
        globalInfo: state.globalInfo.data,
        replayHistory: state.replay.replayHistory,
    };

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initPlanItemData:actions_replay.putPlanItemData
    }, dispatch);
};
let newVar = connect(mapStateToProps, mapDispatchToProps)(PageReplay);
export default withNavigation(newVar);
