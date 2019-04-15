/**
 * Created by zerowolf Date: 2018/7/15 Time: 下午1:52
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
    ScrollView, BackHandler, ImageBackground
} from 'react-native';
import MyTabView from "../../views/MyTabView";
import BaseComponent from "../global/BaseComponent";
import {zdp, zsp, zWidth} from "../../utils/ScreenUtil";
import {cusColors} from "../../value/cusColor/cusColors";
import ZText from "../../views/ZText";
import {getRandomBank} from "../global/emun/BankBgName";
import {getBankABC, getBankDetach, getBankDetachClose} from "../../utils/BankUtil";
import MyButtonView from "../../views/MyButtonView";
import {fetchRequestToken} from "../../utils/FetchUtilToken";
import {Api} from "../../utils/Api";
import {toastAlert, toastShort} from "../../utils/ToastUtil";
import NavigationUtil from "../../utils/NavigationUtil";
import ToastUtil from "../../utils/ToastUtil";
import {Types_replay, zDispatch_replay} from "./reduces/reduceReplay";
import {PlanMode} from "../global/emun/ReplayType";

let globalInfo;
let planMode;
class PlanDetail extends BaseComponent {

    constructor(props) {
        super(props);

        globalInfo = this.props.globalInfo;

    }


    componentWillMount() {
        let params = this.props.navigation.state.params;
        planMode = params.PlanMode;
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }


    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    };



    viewTop() {
        let {
            bank,
            bankCard,
            bankMark,
            bankPhone,
            cardType,
            create_time,
            creditBillingDay,
            creditCvn2,
            creditRepayDay,
            creditValidDay,
        } = this.props.cardItem;

        let bankDetach = getBankDetach(bankCard);
        let bankDetachClose = getBankDetachClose(bankCard);

        // let bankCard_start = bankCard.substr(0, bankCard.length - 4);
        // let bankCard_Last = bankCard.substr(bankCard.length - 4);
        // let str_bankName = getBankName(this.props..bank);
        let bankABC = getBankABC(bank);
        return <View key={10002} style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: cusColors.main_dark
        }}>


            <ImageBackground
                resizeMode={'contain'}
                style={{
                    marginTop: zdp(10),
                    width: zWidth - zdp(20),
                    height: zdp(130),
                    // backgroundColor: bankColor[bankABC],
                    borderRadius: zdp(5),
                }}
                source={{uri: getRandomBank(0)}}>


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
                               content={bank}
                               fontSize={zsp(18)}
                               color={'white'}/>

                        <ZText
                            // content={cardType === 'DC' ? '储蓄卡' : '信用卡'}
                            content={'信用卡'}
                            fontSize={zsp(16)}
                            color={'white'}/>

                    </View>


                    <View
                        style={{
                            // backgroundColor: cusColors.main_default_light,
                            marginRight: zdp(20),
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            flexDirection: 'column'
                        }}>

                        <View style={{
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>


                            <ZText parentStyle={{
                                alignItems: 'flex-start', alignSelf: 'flex-start',
                                width: zdp(60)
                            }}
                                   content={'cvn2码:'}
                                   fontSize={zsp(15)}
                                   textAlign={'left'}
                                   color={'white'}/>

                            <ZText parentStyle={{
                                alignItems: 'flex-start', alignSelf: 'flex-start',
                                marginLeft: zdp(5)
                            }}
                                   content={creditCvn2}
                                   fontSize={zsp(15)}
                                   textAlign={'left'}
                                   color={'white'}/>

                        </View>

                        <View style={{
                            marginTop: zdp(10),
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>


                            <ZText parentStyle={{
                                alignItems: 'flex-start', alignSelf: 'flex-start',
                                width: zdp(60)
                            }}
                                   content={'有效期:'}
                                   fontSize={zsp(15)}
                                   textAlign={'left'}
                                   color={'white'}/>

                            <ZText parentStyle={{
                                alignItems: 'flex-start', alignSelf: 'flex-start',
                                marginLeft: zdp(5)
                            }}
                                   content={creditValidDay}
                                   fontSize={zsp(15)}
                                   textAlign={'left'}
                                   color={'white'}/>

                        </View>


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

            {this.viewCenter()}
        </View>
    }


    viewPlanList() {
        let {
            count,
        } = this.props.cardItem.planData;

        var rowList = [];

        let planList = this.props.cardItem.planData.task_info;

        rowList.push(this.viewTop())
        // rowList.push(this.viewDetail())
        rowList.push(
            <ZText
                key={10004}
                parentStyle={{
                    width: zWidth,
                    padding: zdp(10),
                    paddingLeft: zdp(15),
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start',
                    backgroundColor: 'white'
                }}
                textAlign={'left'}
                content={'还款计划列表'}
                fontSize={zsp(20)}
                color={cusColors.text_main}/>
        );

        rowList.push(<View
            key={10005}
            style={{
                width: zWidth - 20,
                height: 1,
                backgroundColor: 'grey',
                opacity: 0.1,
                alignSelf: 'flex-end'
            }}/>);

        for(let index in planList) {
            let planItem = planList[index];
            let {
                singleMoney,
                create_time,
                status,
            } = planItem;
            rowList.push(
                <View key={index}>

                    <View

                        style={{
                            width: zWidth,
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            padding: zdp(15),
                        }}>

                        <View style={{flex: 1}}>
                            <ZText parentStyle={{alignSelf: 'flex-start', alignItems: 'flex-start'}}
                                   content={`${parseInt(index) + 1}/${count}期`} fontSize={zsp(16)}
                                   color={cusColors.text_main}/>
                            <ZText parentStyle={{
                                marginTop: zdp(10),
                                alignSelf: 'flex-start',
                                alignItems: 'flex-start'
                            }} content={create_time} fontSize={zsp(16)}
                                   color={cusColors.text_secondary}/>
                        </View>

                        <View style={{marginTop: zdp(10)}}>

                            <ZText content={singleMoney} fontSize={zsp(18)}
                                   color={cusColors.text_main}/>
                            <ZText parentStyle={{marginTop: zdp(5)}}
                                   content={status === 0 ? '待完成' : status === 1 ? '已完成' : status === 2 ? '操作失败' : '已失效'}//0:待完成 1:已完成 2:操作失败 3:已失效
                                   fontSize={zsp(16)}
                                   color={cusColors.text_secondary}/>
                        </View>


                        {/*    <PlanDetailItem title={'创建日期'} content={create_time}/>
                    <PlanDetailItem title={'还款金额'} content={singleMoney}/>
                    <PlanDetailItem title={'是否还款'} content={}/>
                    */}

                    </View>

                    <View style={{
                        width: zWidth - 20,
                        height: (index == planList.length - 1) ? 0 : 1,
                        backgroundColor: 'grey',
                        opacity: 0.1,
                        alignSelf: 'flex-end'
                    }}/>

                </View>
            )
        }

        planMode === PlanMode.RUNNING ? rowList.push(this.viewPlanEdit()) : null;


        return <View>
            {rowList}
        </View>
    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: 'white'
            }}>
                <MyTabView title={PlanMode===PlanMode.RUNNING?'还款计划详情':'还款记录详情'} navigation={this.props.navigation}/>

                {/*   {this.viewTop()}
                {this.viewDetail()}
*/}

                <ScrollView keyboardShouldPersistTaps={'always'}
                            showsVerticalScrollIndicator={false}
                            style={{flex: 1, marginBottom: zdp(15)}}
                            bounces={false}
                            contentContainerStyle={{
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>

                    {this.viewPlanList()}

                </ScrollView>

            </View>);
    }

    viewPlanEdit() {
        //status : 1  正在执行     暂停 , 取消
        // status : 2  暂停  恢复 , 取消
        // status : 4 异常停止      恢复 , 取消?????
        let {
            status,
            bankCard,
        } = this.props.cardItem;
        return <View
            key={10006}
            style={{
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'row'
            }}>
            <MyButtonView style={{width: zdp(120), height: zdp(40),marginLeft: zdp(20), marginTop: 0}}
                          title={status === 1 ? '暂停' : status === 2 ? '恢复计划' : '恢复计划'}
                          onPress={status === 1 ? this.pressStopPlan : status === 2 ? this.pressRestartPlan : this.pressRestartPlan}/>
            <MyButtonView color1={'red'} color2={'red'}
                          style={{width: zdp(120), height: zdp(40),marginTop: 0, shadowColor: cusColors.main_red}}
                          title={'取消'}
                          onPress={this.pressCancelPlan}/>
        </View>;
    }

    /**
     * 暂停计划
     */
    pressStopPlan = () => {
        fetchRequestToken(`${Api.stopPlan}?actNo=${this.props.cardItem.bankCard}`, 'GET', globalInfo.token)
            .then(res => {
                if (res.respCode === 200) {
                    console.log(res);
                    toastShort('该还款计划已成功暂停');
                    this.refreshPlanList();
                    this.refreshCurPlan();
                } else if (res.respCode === 203) {
                    toastAlert('登录超时,请重新登录', () => {
                        NavigationUtil.backToLogin(this.props.navigation);
                    });
                } else {
                    ToastUtil.showShort(res.respMsg);
                }
            }).catch(err => {

        })
    };

    /**
     * 恢复计划
     */
    pressRestartPlan = () => {
        fetchRequestToken(`${Api.startPlan}?actNo=${this.props.cardItem.bankCard}`, 'GET', globalInfo.token)
            .then(res => {
                if (res.respCode === 200) {
                    console.log(res);
                    toastShort('该还款计划已成功恢复')
                    this.refreshPlanList();
                    this.refreshCurPlan();
                } else if (res.respCode === 203) {
                    toastAlert('登录超时,请重新登录', () => {
                        NavigationUtil.backToLogin(this.props.navigation);
                    });
                } else {
                    ToastUtil.showShort(res.respMsg);
                }
            }).catch(err => {
        })
    };

    /**
     * 取消计划
     */
    pressCancelPlan = () => {
        toastAlert('警告:还款计划被取消过后不可恢复,' +
            '是否确定取消该还款计划', () => {

            fetchRequestToken(`${Api.cancelPlan}?actNo=${this.props.cardItem.bankCard}`, 'GET', globalInfo.token)
                .then(res => {
                    if (res.respCode === 200) {
                        console.log(res);
                        toastShort('该还款计划已成功取消');
                        this.refreshPlanList();
                        this.props.navigation.goBack();
                    } else if (res.respCode === 203) {
                        toastAlert('登录超时,请重新登录', () => {
                            NavigationUtil.backToLogin(this.props.navigation);
                        });
                    } else {
                        ToastUtil.showShort(res.respMsg);
                    }
                }).catch(err => {
            })
        })
    };


    /**
     * 执行取消 恢复 暂停计划后刷新还款计划列表
     */
    refreshPlanList = () => {
        zDispatch_replay(this.props.navigation, globalInfo.token);
    };


    /**
     * 暂停,恢复计划任务后刷新当前的还款计划列表
     */
    refreshCurPlan = () => {
        fetchRequestToken(`${Api.planSingleInfo}?actNo=${this.props.cardItem.bankCard}`,'GET',globalInfo.token)
            .then(res=>{
                if (res.respCode === 200) {
                    //更新当前页面的数据
                    this.props.navigation.dispatch({
                        type:Types_replay.ACTION_REPLAY_DATA_ITEM,
                        planDataItem: res.data[0]
                    })

                } else if (res.respCode === 203) {
                    toastAlert('登录超时,请重新登录', () => {
                        NavigationUtil.backToLogin(this.props.navigation);
                    });
                } else {
                    ToastUtil.showShort(res.respMsg);
                }
            }).catch(err=>{

        })
    };


    viewCenter() {
        let {
            UserID,
            acctNo,
            totalMoney,
            singleMoney,
            count,
            create_time,
            id,
            status,
            taskID,
        } = this.props.cardItem.planData;

        let {
            creditBillingDay,
            creditRepayDay,
        } = this.props.cardItem;


        return <View style={{
            width: zWidth,
            // marginTop: zdp(20),
            height: zdp(260),
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: cusColors.linear_default
        }}>
            <View
                style={{
                    position: 'absolute',
                    bottom: -1,
                    backgroundColor: '#eeeeee',
                    width: zWidth,
                    height: zdp(140)
                }}/>


            <View
                style={{
                    width: zWidth - zdp(60),
                    height: zdp(100),
                    position: 'absolute',
                    borderRadius: zdp(3),
                    left: zdp(30),
                    top: zdp(10),
                    backgroundColor: '#ffffff44'
                }}>

            </View>
            <View
                style={{
                    width: zWidth - zdp(50),
                    height: zdp(100),
                    position: 'absolute',
                    borderRadius: zdp(3),
                    left: zdp(25),
                    top: zdp(15),
                    backgroundColor: '#ffffff66'
                }}>

            </View>


            <View
                style={{
                    width: zWidth - zdp(40),
                    height: zdp(220),
                    position: 'absolute',
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    left: zdp(20),
                    top: zdp(20),
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    elevation: zdp(5),
                    shadowOffset: {width: zdp(2), height: zdp(5)},
                    shadowColor: 'lightgrey',
                    shadowOpacity: 0.6,
                    shadowRadius: zdp(2),
                }}>


                <ZText parentStyle={{paddingTop: zdp(10)}}
                       content={'还款总金额'}
                       fontSize={zsp(16)}
                       color={cusColors.text_secondary}/>

                <ZText parentStyle={{padding: 5}}
                       content={totalMoney}
                       fontSize={zsp(36)}
                       color={cusColors.main_orange}/>


                <ZText parentStyle={{}}
                       content={`还款计划创建日期  ${create_time}`}
                       fontSize={zsp(15)}
                       color={cusColors.text_secondary}/>

                <View style={{
                    width: zWidth - zdp(80),
                    marginTop: zdp(10),
                    marginBottom: zdp(5),
                    height: 1,
                    backgroundColor: 'grey',
                    opacity: 0.3,
                    alignSelf: 'center'
                }}/>

                <View style={{
                    width: zWidth - zdp(30),
                    paddingLeft: zdp(20),
                    paddingRight: zdp(20),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    // backgroundColor: 'black',
                    height: zdp(80)
                }}>

                    <CenterItem title={'单笔最高金额'} content={singleMoney}/>
                    <CenterItem title={'还款笔数'} content={count}/>
                    <CenterItem title={'账单日'} content={creditBillingDay}/>
                    <CenterItem title={'还款日'} content={creditRepayDay}/>


                </View>

            </View>

        </View>
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo.data,
        cardItem: state.replay.planDataItem,

    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanDetail);


class PlanDetailItem extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {
        content: ''
    };

    render() {
        var params = this.props;
        return (
            <View style={{
                width: zWidth,
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
                paddingTop: zdp(5),
                paddingBottom: zdp(5),
                paddingLeft: zdp(15),
                paddingRight: zdp(5),
            }}>
                <ZText parentStyle={{
                    width: zdp(110), flex: 0,
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start'
                }}
                       content={params.title}
                       textAlign={'left'}
                       fontSize={zsp(17)}
                       color={cusColors.text_secondary}/>

                <ZText parentStyle={{
                    flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start',
                }}
                       textAlign={'left'}
                       content={params.content}
                       fontSize={zsp(18)}
                       color={cusColors.text_main}/>
            </View>)
    }
}

PlanDetailItem.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]).isRequired,
}


class CenterItem extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {
        title: '',
        content: ''
    };

    render() {
        var params = this.props;
        return (<View style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'column'
            }}>

                <ZText parentStyle={{}}
                       content={params.title}
                       fontSize={zsp(16)}
                       color={cusColors.text_secondary}/>

                <ZText parentStyle={{marginTop: zdp(10)}}
                       content={params.content}
                       fontSize={zsp(18)}
                       color={cusColors.text_main}/>


            </View>

        )
    }
}

CenterItem.propTypes = {
    title: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
