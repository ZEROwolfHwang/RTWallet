/**
 * Created by zerowolf Date: 2018/7/11 Time: 下午11:33
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
    ListView, Keyboard,
    BackHandler, ImageBackground
} from 'react-native';
import MyTabView from "../../views/MyTabView";
import BaseComponent from "../global/BaseComponent";
import {fetchRequestToken} from "../../utils/FetchUtilToken";
import {Api} from "../../utils/Api";
import {zdp, zsp, zWidth} from "../../utils/ScreenUtil";
import {cusColors} from "../../value/cusColor/cusColors";
import ZText from "../../views/ZText";
import SingleTextInput from "../../views/SingleTextInput";
import MyButtonView from "../../views/MyButtonView";
import {getRandomBank} from "../global/emun/BankBgName";
import {getCardInfoById} from "../../storage/schema_card";
import {getBankABC, getBankDetach} from "../../utils/BankUtil";
import ToastUtil, {toastAlert} from "../../utils/ToastUtil";
import NavigationUtil from "../../utils/NavigationUtil";
import {NavigationActions} from "react-navigation";
import {AllImages} from "../../../XImages/AllImages";
import {getDateTimeDiff, remindRepayDay} from "../../utils/DateUtil";
import {zDispatch_replay} from "./reduces/reduceReplay";

let navigation;
let globalInfo;
let cardInfo;

class AddCardPlan extends BaseComponent {
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

    constructor(props) {
        super(props);
        globalInfo = this.props.globalInfo;
        navigation = this.props.navigation;

        this.state = {
            totalMoney: '',
            singleMoney: '',
            count: '',
            actNo: '',

            isAgree: false

        }
    }


    componentWillMount() {
        this.params = this.props.navigation.state.params;
        let bankCard = this.params.bankCard;
        cardInfo = getCardInfoById(globalInfo.merCode, bankCard);
        console.log('cardInfo: ', cardInfo);


    }


    viewBankCardImage() {
        let {bank, bankCard,creditRepayDay,creditBillingDay} = cardInfo;
        let bankABC = getBankABC(bank);
        let bankDetach = getBankDetach(bankCard);


        return <View activeOpacity={0.9}
                     style={{
                         paddingTop: zdp(20),
                         width: zWidth,
                         paddingBottom: zdp(20),
                         justifyContent: 'center',
                         alignItems: 'center',
                         backgroundColor: cusColors.main_dark
                     }}
                     onPress={() => {

                     }}>


            <ImageBackground
                resizeMode={'contain'}
                style={{
                    width: zWidth - zdp(20),
                    height: zdp(130),
                    borderRadius: zdp(5)
                }}
                source={{uri: 'bank_blue'}}>

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

                        <Image
                            source={{uri: bankABC}}
                            resizeMode={'contain'}
                            style={{width: zdp(45), height: zdp(45)}}/>
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
                                   content={bank}
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
                            marginLeft: zdp(40),
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}>

                            <ZText parentStyle={{}}
                                   content={'还款日'}
                                   fontSize={zsp(16)}
                                   color={'white'}
                                   textStyle={{opacity: 0.5}}/>

                            <ZText
                                parentStyle={{marginTop: zdp(5)}}
                                content={creditRepayDay}
                                fontSize={zsp(17)}
                                color={'white'}
                                textStyle={{opacity: 0.8}}/>

                        </View>
                        <View style={{
                            marginRight: zdp(25),
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}>

                            <ZText parentStyle={{}}
                                   content={'账单日'}
                                   fontSize={zsp(16)}
                                   color={'white'}
                                   textStyle={{opacity: 0.5}}/>

                            <ZText
                                parentStyle={{marginTop: zdp(5)}}
                                // content={cardType === 'DC' ? '储蓄卡' : '信用卡'}
                                content={creditBillingDay}
                                fontSize={zsp(17)}
                                color={'white'}
                                textStyle={{opacity: 0.8}}/>

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
                        // content={this.props.isEye ? bankDetach : bankDetachClose}
                           content={bankDetach}
                           fontSize={zsp(24)}
                           textAlign={'left'}
                           color={'white'}/>


            </ImageBackground>
        </View>
    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: '#f5f5f5'
            }}>

                <MyTabView title={'添加卡计划'} navigation={this.props.navigation}/>


                {this.viewBankCardImage()}


                <ItemAddPlan
                    title={'还款总金额:'}
                    keyboardType={'numeric'}
                    placeholder={'请输入还款总金额'}
                    onChangeText={(text) => {
                        this.setState({
                            totalMoney: text
                        })
                    }}/>

                <ItemAddPlan title={'单笔最高金额:'}
                             keyboardType={'numeric'}
                             placeholder={'请输入单笔最高金额'}
                             onChangeText={(text) => {
                                 this.setState({
                                     singleMoney: text
                                 })
                             }}/>

                <ItemAddPlan title={'还款笔数:'}
                             keyboardType={'numeric'}
                             placeholder={'请输入还款笔数'}
                             onChangeText={(text) => {
                                 this.setState({
                                     count: text
                                 })
                             }}/>

                {/*  <ItemAddPlan title={'还款卡号:'} placeholder={'例如:02'}
                             hasLine={false}
                             onChangeText={(text) => {

                             }}/>*/}

                <View style={{
                    marginTop: zdp(10),
                    width: zWidth,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    padding: zdp(15)
                }}>

                    <TouchableOpacity activeOpacity={0.9}
                                      style={{justifyContent: 'center', alignItems: 'center'}}
                                      onPress={() => {
                                          Keyboard.dismiss();
                                          this.setState({
                                              isAgree: !this.state.isAgree
                                          })
                                      }}>


                        <Image source={this.state.isAgree ? AllImages.isCheck : AllImages.unCheck}
                               style={{
                                   width: 30,
                                   height: 30,
                                   marginRight: zdp(10),
                                   backgroundColor: 'transparent'
                               }}/>


                    </TouchableOpacity>

                    <ZText parentStyle={{}}
                           content={'同意'}
                           fontSize={zsp(18)}
                           color={cusColors.text_main}/>
                    <ZText parentStyle={{}}
                           content={'<<完美还款计划>>'}
                           fontSize={zsp(18)}
                           color={cusColors.linear_light}/>


                </View>


                <MyButtonView style={{marginTop: zdp(20)}} title={'保存计划'}
                              color1={this.state.isAgree ? undefined : '#739ce6'}
                              color2={this.state.isAgree ? undefined : '#739ce6'}
                              onPress={this.pressSaveCardPlan}/>
            </View>);
    }

    /**
     * 保存卡计划
     */
    pressSaveCardPlan = () => {

        if (this.state.isAgree) {
            let formData = new FormData();
            formData.append('totalMoney', this.state.totalMoney);
            formData.append('singleMoney', this.state.singleMoney);
            formData.append('count', this.state.count);
            formData.append('actNo', cardInfo.bankCard);

            fetchRequestToken(`${Api.createPlan}`, 'POST', globalInfo.token, formData)
                .then(res => {
                    console.log(res);
                    if (res.respCode === 200) {
                        ToastUtil.showShort('卡计划保存成功');
                        this.props.navigation.goBack();

                        zDispatch_replay(this.props.navigation, globalInfo.token);

                        // NavigationUtil.reset(this.props.navigation, 'ThirdTab');
                        /* const resetAction = NavigationActions.reset({
                             index: 0,
                             actions: [NavigationActions.navigate({routeName: 'Tab'}),
                                 NavigationActions.navigate({routeName: 'ThirdTab1'})

                             ]
                         });
                         this.props.navigation.dispatch(resetAction);*/

                    } else if (res.respCode === 203) {
                        toastAlert('登录超时,请重新登录', () => {
                            NavigationUtil.backToLogin(this.props.navigation);
                        })
                    } else {
                        ToastUtil.showShort(res.respMsg);
                    }
                }).catch(err => {
                console.log(err);
            });
        } else {
            ToastUtil.showShort('请同意<<完美还款计划>>协议后再提交保存还款计划');
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

export default connect(mapStateToProps, mapDispatchToProps)(AddCardPlan);

class ItemAddPlan extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {
        title: '',
        placeholder: '',
        hasLine: true,
        style: {},
        keyboardType: 'default',
    };

    render() {
        var params = this.props;
        return (
            <View style={[{
                width: zWidth,
                backgroundColor: 'white',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                flexDirection: 'row',
                // paddingLeft: zdp(15),
                // paddingRight: zdp(15),
                height: zdp(50),
                // padding: zdp(15),
                // paddingBottom: zdp(10),
                marginTop: zdp(1),
                paddingLeft: zdp(15)
            }, params.style]}>

                <ZText parentStyle={{
                    width: zdp(140), justifyContent: 'center',
                    alignItems: 'flex-start', alignSelf: 'center'
                }}
                       content={params.title}
                       fontSize={zsp(18)}
                       textAlign={'left'}
                       color={cusColors.text_main}/>

                <SingleTextInput
                    style={{
                        width: zWidth - zdp(170),
                        height: zdp(50),
                        backgroundColor: 'transparent',
                        fontSize: zsp(17),
                        color: cusColors.text_secondary,
                        alignSelf: 'flex-end',
                        alignItems: 'flex-end',
                        // paddingTop: 20
                    }}
                    keyboardType={params.keyboardType}
                    placeholder={params.placeholder} onChangeText={(text) => {
                    params.onChangeText(text)
                }}/>

            </View>)
    }
}

ItemAddPlan.propTypes = {
    title: PropTypes.string,
    placeholder: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
    hasLine: PropTypes.bool,
    style: PropTypes.object,
    keyboardType: PropTypes.string,
}
