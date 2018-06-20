/**
 * Created by zerowolf on 2018/4/2.
 */
import React, {Component} from 'react';
import {
    ScrollView,
    Platform,
    StyleSheet,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    Modal,
    BackHandler, AppState
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import MyTabView from '../../views/MyTabView';
import BaseComponent from '../global/BaseComponent';
import  TopView from './Mine_TopView';
import  Item from './Item';
import {zdp, zModalHeight, zModalMarginTop, zsp} from "../../utils/ScreenUtil";
import {onAppStateChanged, onBackPress} from "../../utils/GoBackUtil";
import * as wechat from "react-native-wechat";

// import Realm from 'realm';
// import * as hh from "../../storage/schema_gesture";

let lastBackPressed;
let navigation;
let globalInfo;
class FourthTab extends BaseComponent {

    constructor(props) {
        super(props);
        navigation = this.props.navigation;
        globalInfo = this.props.globalInfo;
        this.state={
            showModal: false
        }
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

        return onBackPress(lastBackPressed,this.props.navigation,()=>{
            lastBackPressed = Date.now();
        })
    };



    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView titleColor={'black'} title={'我的'}
                           leftView={false}
                           navigation={this.props.navigation}/>

                <ScrollView
                    contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                    style={{backgroundColor: '#e7e9e9'}}>

                    <View style={{
                        marginTop: zdp(70), width: width - zdp(20), borderRadius: zdp(5), top: -zdp(70)
                    }}>

                        {/*   <View style={styles.topView}>
                            <TopView image={require('../../../XImages/qianbao.png')} title={'认证信息'}
                                     onPress={() => {
                                         // Alert.alert('444')
                                         this.props.navigation.dispatch({
                                             type: 'UserInfo'
                                         });
                                     }}/>
                            <TopView image={require('../../../XImages/renzheng.png')} title={'订单明细'}
                                     onPress={() => {
                                         this.props.navigation.navigate('TransactionRecord');
                                     }}/>
                            <TopView image={require('../../../XImages/ziliao.png')} title={'卡号管理'}
                                     onPress={() => {
                                         this.props.navigation.navigate('CardManage')
                                     }}/>
                        </View>*/}

                        <View style={styles.centerView}>
                            <Item onPress={() => {
                                this.props.navigation.navigate('MerchantInfo');
                            }}
                                  title={'账户信息'}
                                  image={'user-circle-o'}/>
                            <Item onPress={() => {
                                this.props.navigation.navigate('TransactionRecord');
                            }}
                                  title={'订单明细'}
                                  image={'th-list'}
                            />
                            <Item onPress={() => {
                                if (this.props.globalInfo.IDCard) {

                                    this.props.navigation.navigate('BankCardManage');
                                } else {
                                    this.setState({
                                        showModal: true
                                    })
                                }
                            }}
                                  title={'卡号管理'}
                                  image={'credit-card-alt'}/>
                        </View>



                        {Platform.OS === 'android' ?
                            <View style={styles.centerView}>
                                <Item onPress={this.pressShare2WX}
                                      title={'微信分享'}
                                      image={'wechat'}/>

                            </View> : null
                        }


                        <View style={styles.centerView}>
                            <Item onPress={() => {
                                AppState.removeEventListener('change', this._onAppStateChanged);
                                this.props.navigation.navigate('PageSetting')
                            }}
                                  title={'设置'}
                                  image={'gear'}/>

                        </View>

                        <View style={styles.centerView}>
                            <Item onPress={() => {
                                // NavigationUtil.reset(this.props.navigation, 'RegisterApp')
                                // deleteGestureLogin();
                                this.props.navigation.navigate('RegisterApp',{type:0});
                            }}
                                  title={'退出登录'}
                                  image={'backward'}/>

                        </View>
                        {/*   <View style={styles.centerView}>
                            <Item onPress={() => {
                                // Alert.alert('点击条目')
                                this.props.navigation.navigate('Pay_Plan')
                            }}
                                  title={'邀请好友'}
                                  image={require('../../../XImages/setting/Slice7x1.png')}
                            />
                            <Item onPress={() => {
                                Alert.alert('点击条目')
                            }}
                                  title={'参加活动'}
                                  image={require('../../../XImages/setting/Slicex1.png')}/>
                            <Item onPress={() => {
                                Alert.alert('点击条目')
                            }}
                                  title={'优惠券'}
                                  image={require('../../../XImages/setting/Slice2x1.png')}/>
                            <Item onPress={() => {
                                Alert.alert('点击条目')
                            }}
                                  title={'贝米商城'}
                                  image={require('../../../XImages/setting/Slice3x1.png')}/>
                            <Item onPress={() => {
                                Alert.alert('点击条目')
                            }}
                                  title={'贝米实验室'}
                                  image={require('../../../XImages/setting/Slice4x1.png')}/>
                            <Item onPress={() => {
                                Alert.alert('点击条目')
                            }}
                                  title={'贝米黑卡'}
                                  image={require('../../../XImages/setting/Slice5x1.png')}/>

                        </View>*/}
                        {/*    <View style={styles.centerView}>
                            <Item onPress={() => {
                                // Alert.alert('点击条目')

                                NavigationUtil.reset(this.props.navigation, 'Set_account');
                                // this.props.navigation.dispatch({
                                //     type: 'Set_account'
                                // });
                            }}
                                  title={'账户设置'}
                                  image={require('../../../XImages/setting/Slice6x1.png')}
                            />


                            <Item onPress={() => {
                                Alert.alert('点击条目')
                            }}
                                  title={'交易记录'}
                                  image={require('../../../XImages/setting/Slicex2.png')}/>
                            <Item onPress={() => {
                                // Alert.alert('点击条目')
                                this.props.navigation.navigate('DefaultCardManage');
                            }}
                                  title={'银行卡管理'}
                                  image={require('../../../XImages/setting/Slice2x2.png')}/>

                        </View>*/}
                        {/*
                        <View style={styles.centerView}>
                            <Item onPress={() => {
                                Alert.alert('点击条目')
                            }}
                                  title={'在线客服'}
                                  image={require('../../../XImages/setting/Slice3x2.png')}
                            />
                            <Item onPress={() => {
                                Alert.alert('点击条目')
                            }}
                                  title={'帮助与反馈'}
                                  image={require('../../../XImages/setting/Slice4x2.png')}/>
                            <Item onPress={() => {
                                Alert.alert('点击条目')
                            }}
                                  title={'公告'}
                                  image={require('../../../XImages/setting/Slice5x2.png')}/>
                            <Item onPress={() => {
                                Alert.alert('点击条目')
                            }}
                                  title={'关于贝米'}
                                  image={require('../../../XImages/setting/Slice6x2.png')}/>

                        </View>*/}

                    </View>

                </ScrollView>
                {this.viewModal()}
            </View>
        );

    }

    /**
     * 微信分享
     */
    pressShare2WX = () => {
        console.log(globalInfo);
        console.log(`http://sjpay.githubshop.com/app/reg/${globalInfo.recommend}`);


        wechat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    //发送授权请求
                    wechat.shareToSession({
                        type: 'news',
                        title: '锐通钱包 快捷收款 完美还款',
                        webpageUrl: `http://sjpay.githubshop.com/app/reg/${globalInfo.recommend}`
                    }).then(res => {
                        console.log(res);
                    })
                        .catch(err => {
                            console.log("分享失败", err);
                        });
                } else {

                    Alert.alert('没有安装微信', '请先安装微信客户端在进行登录', [
                        {text: '确定'}
                    ])
                }
            }).catch(err=>{
            console.log(err);
        })

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
                                          this.props.navigation.navigate('MerchantInfo')
                                      }}>
                        <Text style={{fontSize: zsp(18), color: 'grey'}}>完善信息</Text>
                    </TouchableOpacity>


                </View>

            </View>

        </View>
    </Modal>;
}
}



const styles = {
    container: {
        height: zdp(200),
        backgroundColor: '#CCCCCC',
        marginBottom: zdp(10),
    },
    topView: {
        paddingBottom: zdp(15),
        paddingTop: zdp(10),
        width: width - zdp(20),
        backgroundColor: 'white',
        borderRadius: zdp(5),
        shadowColor: '#d7d9d9',
        shadowOffset: {height: zdp(5)},
        shadowOpacity: 0.6,
        shadowRadius: zdp(2),
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: zdp(10)
    },
    centerView: {
        paddingBottom: zdp(5),
        paddingTop: zdp(5),
        width: width - zdp(20),
        backgroundColor: 'white',
        borderRadius: zdp(5),
        shadowColor: '#d7d9d9',
        shadowOffset: {height: zdp(5)},
        shadowOpacity: 0.6,
        shadowRadius: zdp(2),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: zdp(10)
    },
};
const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo:state.globalInfo.data
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FourthTab);
