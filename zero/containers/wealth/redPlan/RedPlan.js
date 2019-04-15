/**
 * Created by zerowolf Date: 2018/4/25 Time: 下午8:24
 */
import React, {Component} from 'react';
import {
    Text,
    Alert,
    View,
    TouchableOpacity,
    Dimensions, Modal, BackHandler, AppState
} from 'react-native';

const {width, height} = Dimensions.get('window');
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MyTabView from '../../../views/MyTabView'
import BaseComponent from '../../global/BaseComponent'
import RedPlanTop from "./RedPlanTop";
import RedPlanBottom from './RedPlanBottom';
import {fetchRequest} from "../../../utils/FetchUtil";

import {actions_wealth} from '../reduce/index';
import MyProgressBar from "../../../views/MyProgressBar";
import {fetchRequestToken} from "../../../utils/FetchUtilToken";
import MyButtonView from "../../../views/MyButtonView";
import {zdp, zModalHeight, zModalMarginTop, zsp, zWidth} from "../../../utils/ScreenUtil";
import {onAppStateChanged, onBackPress} from "../../../utils/GoBackUtil";
import {types} from "../reduce/index";
import {
    getCreditCardDefault,
    getDebitCardDefault,
} from "../../../storage/schema_card";
import ZText from "../../../views/ZText";
import {cusColors} from "../../../value/cusColor/cusColors";
import ToastUtil, {toastAlert} from "../../../utils/ToastUtil";
import NavigationUtil from "../../../utils/NavigationUtil";
import {Api} from "../../../utils/Api";

let navigation;
let lastBackPressed;
let globalInfo;

class RedPlan extends BaseComponent {

    constructor(props) {
        super(props);
        navigation = this.props.navigation;
        globalInfo = this.props.globalInfo;
        this.props.navigation.dispatch({
            type: types.Action_REDPLAN_NAV,
            data: this.props.navigation
        });

        this.requestId = null;
        this.state = {
            showBottom: false,
            showModal: false
        }

    }

    componentDidMount() {
        // this.joinNow();

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


    componentWillMount() {

        console.log(this.props.navigation.state);
        console.log(this.props.navigation);

        let entranceId = this.props.entranceId;

        console.log(this.props.redData);
        console.log(entranceId);
        if (entranceId) {

            fetchRequestToken(`${Api.detail}/${entranceId}`, 'GET', globalInfo.token)
                .then(res => {
                    if (res.respCode === 200) {
                        this.props.initRedData(res.data)
                        console.log(res);
                    } else {
                        ToastUtil.showShort(res.respMsg)
                        // this.props.initGetWebData(netData)
                    }
                }).catch(err => {
                if (err) {
                    console.log(err);
                }
            });

        }
    }


    render() {
        console.log(this.props.redData);

        const Tab = <RedPlanBottom/>;
// ${this.props.redData.pay_type}  D0这个
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <MyTabView
                    title={'快捷收款'}
                    leftView={true}
                    hasRight={true} rightView={
                    <TouchableOpacity activeOpacity={0.5}
                                      style={{
                                          width: width / 4,
                                          justifyContent: 'center',
                                          alignItems: 'flex-end',
                                          paddingRight: zdp(15)

                                      }}
                                      onPress={() => {
                                          // this.props.navigation.navigate('IssueHelp');
                                      }}><Text
                        style={{
                            fontSize: zsp(16),
                            color: 'white',
                            backgroundColor: 'transparent'
                        }}>帮助</Text>
                    </TouchableOpacity>}
                    navigation={this.props.navigation}/>

                {this.props.redData ?
                    this.state.showBottom ?
                        <View style={{flex: 1}}>
                            <TouchableOpacity activeOpacity={0.5}
                                              style={{
                                                  width,
                                                  height: zdp(40),
                                                  justifyContent: 'center',
                                                  alignItems: 'center'
                                              }}
                                              onPress={() => {
                                                  this.setState({
                                                      showBottom: false
                                                  })
                                              }}>

                                <ZText parentStyle={{}}
                                       content={'---------点击回返上一页---------'}
                                       fontSize={zsp(16)}
                                       color={cusColors.text_secondary}/>

                            </TouchableOpacity>

                            {Tab}
                            {/*<RedPlanBottom/>*/}
                        </View>
                        :
                        <RedPlanTop
                            onPress={() => {
                                this.setState({
                                    showBottom: true
                                })
                            }
                            }/> :
                    <MyProgressBar/>}

                <TouchableOpacity activeOpacity={0.9}
                                  style={{
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      position: 'absolute',
                                      bottom: zdp(10),
                                      width: zWidth,
                                  }}
                                  onPress={this.joinNow}>
                    <ZText parentStyle={{
                        width: zWidth - zdp(40),
                        padding: zdp(12),
                        alignItems: 'center',
                        backgroundColor: cusColors.linear_light,
                        borderRadius: zdp(30)
                    }}
                           content={'点击收款'}
                           fontSize={zsp(18)}
                           color={'white'}/>
                </TouchableOpacity>

                {this.viewModal()}
            </View>
        );

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
                    height: zModalHeight,
                    marginTop: zModalMarginTop,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}>
                <View style={{
                    width: width / 1.3,
                    backgroundColor: 'white',
                    borderRadius: zdp(5),
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    <View style={{
                        width: width / 1.3,
                        height: zdp(140),
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: zdp(20),
                    }}>
                        <Text style={{
                            fontSize: zsp(16),
                            textAlign: 'center',
                            color: 'black'
                        }}>您尚未完善用户信息认证,请完成认证后再进行收款</Text>
                    </View>

                    <View style={{
                        width: width / 1.3,
                        height: zdp(50),
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity style={{
                            flex: 1,
                            height: zdp(50),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: 'lightgrey',
                            borderTopWidth: 1,
                            borderRightWidth: 1
                        }}
                                          onPress={() => {
                                              this.setState({
                                                  showModal: false
                                              })
                                          }}>
                            <Text style={{fontSize: zsp(18), color: 'grey'}}>关闭</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            flex: 1,
                            height: zdp(50),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: 'lightgrey',
                            borderTopWidth: 1
                        }}
                                          onPress={() => {
                                              this.setState({
                                                  showModal: false,
                                              })
                                              this.props.navigation.navigate('MerchantInfo', {
                                                  enterType: 100,
                                              })
                                          }}>
                            <Text style={{fontSize: zsp(18), color: 'grey'}}>完善信息</Text>
                        </TouchableOpacity>


                    </View>

                </View>

            </View>
        </Modal>;
    }

    joinNow = () => {
        console.log('join');

        let token = this.props.globalInfo.token;
        console.log(this.props.globalInfo);
        console.log(token);
        // if (token) {
        fetchRequestToken('isRegister','GET',token)
            .then(res=>{
                console.log(res);
                if (res.respCode === 200) {
                    console.log(res);
                    if (res.data.status !== 1) {
                        this.setState({
                            showModal: true,
                        });
                        return;
                    }


                    if (!getDebitCardDefault(globalInfo.merCode)) {

                        Alert.alert('检测该用户尚未添加结算银行卡', '请添加默认结算卡', [
                            {
                                text: '取消', onPress: () => {
                                }
                            },
                            {
                                text: '确定', onPress: () => {
                                    this.props.navigation.navigate('addPayCard', {
                                        cardType: 'DC',
                                        enterType: 100,
                                    });
                                }
                            },
                        ]);

                    } else {
                        if (!getCreditCardDefault(globalInfo.merCode)) {
                            //双卡都没有
                            Alert.alert('检测该用户尚未添加支付银行卡', '请添加默认支付卡', [
                                {
                                    text: '取消', onPress: () => {
                                    }
                                },
                                {
                                    text: '确定', onPress: () => {
                                        this.props.navigation.navigate('addPayCard', {
                                            cardType: 'CC',
                                            enterType: 100,
                                        });
                                    }
                                },
                            ]);
                        } else {
                            this.props.navigation.navigate('InvestBuy')
                        }
                    }

                } else if (res.respCode === 203) {
                    toastAlert('登录超时,请重新登录',()=>{
                        NavigationUtil.backToLogin(this.props.navigation);
                    })
                } else {
                    ToastUtil.showShort(res.respMsg)
                    // this.setState({
                    //     showModal: true,
                    // });
                    console.log('有返回,但状态错误');
                    // this.props.initGetWebData(netData)
                }

            }).catch(err=>{
            console.log(err);
        })
           /* fetchRequestToken('isRegister ', 'GET', token)
                .then(res => {
                    if (res.respCode === 200) {
                        // this.props.initGetWebData(res.data)
                        console.log(res);
                        if (res.data.status !== 1) {
                            this.setState({
                                showModal: true,
                            });
                            return;
                        }

                        if (!getDebitCardDefault(globalInfo.merCode)) {

                            Alert.alert('检测该用户尚未添加结算银行卡', '请添加默认结算卡', [
                                {
                                    text: '取消', onPress: () => {
                                    }
                                },
                                {
                                    text: '确定', onPress: () => {
                                        this.props.navigation.navigate('addPayCard', {
                                            cardType: 'DC',
                                            enterType: 100,
                                        });
                                    }
                                },
                            ]);

                        } else {
                            if (!getCreditCardDefault(globalInfo.merCode)) {
                                //双卡都没有
                                Alert.alert('检测该用户尚未添加支付银行卡', '请添加默认支付卡', [
                                    {
                                        text: '取消', onPress: () => {
                                        }
                                    },
                                    {
                                        text: '确定', onPress: () => {
                                            this.props.navigation.navigate('addPayCard', {
                                                cardType: 'CC',
                                                enterType: 100,
                                            });
                                        }
                                    },
                                ]);
                            } else {
                                this.props.navigation.navigate('InvestBuy')
                            }
                        }

                    } else {
                        this.setState({
                            showModal: true,
                        });
                        console.log('有返回,但状态错误');
                        // this.props.initGetWebData(netData)
                    }
                })
                .catch(err => {
                    console.log(err);
                });*/
        }
    // };
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo.data,
        redData: state.bills.redData,
        entranceId: state.bills.entranceId
    }

};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initRedData: actions_wealth.fetchRedData
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RedPlan);




