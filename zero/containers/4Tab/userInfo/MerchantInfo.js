/**
 * Created by zerowolf Date: 2018/5/13 Time: 下午4:05
 */
import Item from "./Item";

const {width, height} = Dimensions.get('window');
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import {
    Platform,
    StyleSheet,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    Keyboard,
    ListView,
    TextInput, FlatList, ScrollView, BackHandler
} from 'react-native';
import MyTabView from "../../../views/MyTabView";
import MyButtonView from "../../../views/MyButtonView";
import ToastUtil from "../../../utils/ToastUtil";
import {fetchRequestToken} from "../../../utils/FetchUtilToken";
import Region from "./region";
import BaseComponent from "../../global/BaseComponent";
import {checkFixPhone, checkIsNull, checkMobile} from "../../../utils/CheckUitls";

let globalInfo;
import {isMobileNumber, validateIdCard} from "../../../utils/Verification";
import {actions} from "../../../root/GlobalAction";
import {zAppBarHeight, zdp, zModalHeight, zsp} from "../../../utils/ScreenUtil";

import Picker from 'react-native-picker';

import * as CitySelectUtil from "../../../utils/CitySelectUtil";
import {getCreditCardDefault, getDebitCardDefault} from "../../../storage/schema_card";

class MerchantInfo extends BaseComponent {

    constructor(props) {
        super(props);

        globalInfo = this.props.globalInfo;


        this.state = {

            visible: false,
            editable: false,
            showModal: false,
            phone: '',

            register_name: "",
            register_ID: "",
            appUser: '',


            province: '广东',
            city: '深圳',
            district: '宝安区',

        }
        console.log(this.props.navigation.state);
    }

    componentDidMount() {
        console.log(this.props.navigation.state);
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        Picker.hide();
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }


    onBackPress = () => {
        Picker.hide();
        this.props.navigation.goBack();
        return true;
    };


    componentWillMount() {

        this.params = this.props.navigation.state;
        console.log(this.props.navigation);
        console.log(this.props);

        console.log(this.params);


        fetchRequestToken(`merchantFetch`, "GET", globalInfo.token)
            .then(res => {
                console.log(res);
                if (res.respCode === 200) {
                    let data = res.data;

                    if (data.register_ID) {

                        this.setState({
                            appUser: data.appUser,
                            register_name: data.register_name,
                            province: data.province,
                            city: data.city,
                            district: data.district,
                            register_ID: data.register_ID,
                        });

                    } else {
                        this.setState({
                            appUser: data.appUser,
                            editable: true,
                            province: '广东',
                            city: '深圳',
                            district: '宝安区',
                        });
                    }
                } else {
                    console.log(res.respMsg);
                    ToastUtil.showShort(res.respMsg);
                }
            })
            .catch(err => {
                console.log(err);
                ToastUtil.showShort(err);
            })

    }


    chooseRegion() {
        Keyboard.dismiss();
        this._showAreaPicker();
    }


    render() {
        let registerName = this.state.register_name;
        let register_ID = this.state.register_ID;

        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView title={'账户信息'} navigation={this.props.navigation} hasRight={true}
                           rightView={
                               <TouchableOpacity activeOpacity={0.5}
                                                 style={{
                                                     width: width / 4,
                                                     justifyContent: 'center',
                                                     alignItems: 'flex-end',
                                                     paddingRight: zdp(15)
                                                 }}
                                                 onPress={() => {
                                                     this.setState({
                                                         editable: true
                                                     })
                                                 }}>
                                   <Icon size={zdp(20)} name={'edit'}
                                         style={{
                                             color: 'white',
                                             backgroundColor: 'transparent'
                                         }}/>

                               </TouchableOpacity>
                           }/>
                <ScrollView style={{flex: 1,}}
                            keyboardShouldPersistTaps={'always'}
                            contentContainerStyle={{
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>

                    <Item style={{backgroundColor: '#cecbd755', marginTop: zdp(10)}}
                          title={'注册手机号:'}
                          editable={false} onChangeText={(text) => {
                    }}
                          value={globalInfo.phone}/>

                    <Item style={{marginTop: zdp(20)}} title={'用户名:'}
                          onFocus={() => Picker.hide()}
                          onChangeText={(text) => {
                              this.setState({
                                  appUser: text
                              })
                          }}
                          value={this.state.appUser}/>

                    <Item title={'真实姓名:'}
                          onFocus={() => Picker.hide()}
                          onChangeText={(text) => {
                              this.setState({
                                  register_name: text
                              })
                          }}
                          value={registerName.length > 0 ?
                              this.state.editable ? registerName
                                  : `**${registerName.substr(registerName.length - 1)}`
                              : ''}/>

                    <Item title={'省份证号:'}
                          onFocus={() => Picker.hide()}
                          onChangeText={(text) => {
                              this.setState({
                                  register_ID: text
                              })
                          }}
                          value={register_ID.length > 0 ?
                              this.state.editable ? register_ID
                                  : `${register_ID.substr(0, 6)}********${register_ID.substr(register_ID.length - 4)}`
                              : ''}/>


                    <View style={[{
                        width,
                        height: zdp(50),
                        backgroundColor: 'white',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }]}>
                        <Text style={{
                            fontFamily: Platform.OS === 'ios' ? 'PingFang TC' : 'PingFang TC',
                            width: zdp(130),
                            fontSize: zsp(16),
                            paddingLeft: zdp(20),
                            color: '#666',
                            textAlign: 'left'

                        }}>所在地区:</Text>
                        <TouchableOpacity activeOpacity={0.9}
                                          style={{
                                              flex: 1,
                                              backgroundColor: 'transparent',
                                              flexDirection: 'row',
                                              justifyContent: 'space-between',
                                              alignItems: 'center'
                                          }}
                                          onPress={this.chooseRegion.bind(this)}
                        >

                            <Text style={{
                                fontFamily: Platform.OS === 'ios' ? 'PingFang TC' : 'PingFang TC',
                                flex: 1, fontSize: zsp(18),
                                color: 'grey', backgroundColor: 'transparent', textAlign: 'left'
                            }}>
                                {this.state.province + this.state.city + this.state.district}

                            </Text>

                            <Icon size={zdp(20)} name={'angle-right'}
                                  style={{
                                      color: 'grey',
                                      marginRight: zdp(20),
                                      backgroundColor: 'transparent'
                                  }}/>
                        </TouchableOpacity>

                    </View>
                    <View style={{
                        width: width - zdp(20),
                        height: zdp(1),
                        backgroundColor: 'grey',
                        opacity: 0.1,
                        alignSelf: 'flex-end'
                    }}/>


                    {this.state.editable ?
                        <MyButtonView style={{width: width / 1.3, marginBottom: zdp(20)}}
                                      title={'保 存'}
                                      onPress={this.pressSaveInfo}/> : null}
                </ScrollView>


                {/* <Region visible={this.state.visible} setChoosed={this.setChoosed.bind(this)}
                        cancled={this.cancled.bind(this)}/>
*/}

                {this.state.editable ?
                    null
                    : <View style={{
                        width,
                        height: zModalHeight,
                        backgroundColor: '#b2aebd99',
                        top: zAppBarHeight,
                        position: 'absolute'
                    }}/>
                }
            </View>
        );

    }


    _showAreaPicker = () => {
        Picker.init({
            pickerData: CitySelectUtil.getAreaData(),
            pickerTitleText: '选择地址',
            pickerTextEllipsisLen: 8,
            pickerFontFamily: Platform.OS === 'ios' ? 'PingFang TC' : 'PingFang TC',
            pickerTitleColor: [255, 255, 255, 1],       //[55,164,255,1],
            pickerCancelBtnColor: [255, 255, 255, 1],       //[55,164,255,1],
            pickerConfirmBtnColor: [255, 255, 255, 1],      //[55,164,255,1],
            pickerToolBarFontSize: zsp(20),
            pickerFontSize: zsp(17),
            pickerFontColor: [20, 20, 20, 1],
            pickerCancelBtnText: '取消',
            pickerConfirmBtnText: '确认',
            pickerToolBarBg: [55, 60, 246, 1],       //[55, 60, 246, 0.8],
            pickerBg: [255, 255, 255, 1],
            pickerRowHeight: zdp(30),
            selectedValue: [this.state.province, this.state.city, this.state.district],
            onPickerConfirm: pickedValue => {
                this.setState({
                    province: pickedValue[0],
                    city: pickedValue[1],
                    district: pickedValue[2],
                })
                console.log('area', pickedValue);
            },
            onPickerCancel: pickedValue => {
                console.log('area', pickedValue);
            },
            onPickerSelect: pickedValue => {
                //Picker.select(['山东', '青岛', '黄岛区'])
                console.log('area', pickedValue);
            }
        });
        Picker.show();
    }


    /**
     * 点击保存,提交修改后的商户信息
     */
    pressSaveInfo = () => {
        Picker.hide();
        console.log(this.state);

        if (!checkIsNull('用户名', this.state.appUser)) {
            return;
        }

        if (!(this.state.register_name.length >= 2)) {
            ToastUtil.showShort('请输入正确的姓名')
            return
        }
        if (!validateIdCard(this.state.register_ID)) {
            ToastUtil.showShort('省份证信息错误');
            return

        }


        if (!checkIsNull('所在地区', this.state.district)) {
            return
        }


        let formData = new FormData();
        formData.append('province', this.state.province);
        formData.append('city', this.state.city);
        formData.append('district', this.state.district);
        formData.append('register_name', this.state.register_name);
        formData.append('register_ID', this.state.register_ID);
        formData.append('appUser', this.state.appUser);
        let token = this.props.globalInfo.token;
        console.log(token);
        fetchRequestToken('merchantFetch', 'POST', token, formData).then(res => {
            console.log(res);
            if (res.respCode === 200) {
                ToastUtil.showShort('保存成功');

                console.log(this.props.globalInfo);
                let globalInfo = this.props.globalInfo;

                this.setState({
                    editable: false
                });
                this.props.initGlobalInfo({
                    merCode: globalInfo.merCode,
                    token: globalInfo.token,
                    phone: globalInfo.phone,
                    IDCard: this.state.register_ID,
                    username: this.state.register_name,
                    appUser: this.state.appUser
                });

                console.log(this.params);
                console.log(this.params.enterType);
                 if (this.params.enterType && this.params.enterType === 100) {

                     if (!getDebitCardDefault(globalInfo.merCode)) {
                         //结算卡没有
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
                                         // enterId: params.enterId
                                     });
                                 }
                             },
                         ]);

                     } else {
                         if (!getCreditCardDefault(globalInfo.merCode)) {
                             //支付卡没有
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
                                             // enterId: params.enterId
                                         });
                                     }
                                 },
                             ]);
                         } else {
                             this.props.navigation.navigate('InvestBuy')
                         }
                     }
                 }

                console.log(this.props.globalInfo);
            } else {
                ToastUtil.showShort(res.respMsg);
            }

        }).then(err => {
            ToastUtil.showShort(err);
            console.log(err);
        });
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
        initGlobalInfo: actions.getGlobalInfo,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MerchantInfo);
