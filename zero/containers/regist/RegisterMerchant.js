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
    AppState,
    BackHandler, SafeAreaView, Keyboard
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MyTabView from "../../views/MyTabView";
import MyButtonView from "../../views/MyButtonView";
import BaseComponent from "../global/BaseComponent";
import MyTextInputWithIcon from "../../views/MyTextInputWithIcon";
import RegisterMerchantNext from "./RegisterMerchantNext";
import ToastUtil, {toastShort} from "../../utils/ToastUtil";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {isIphoneX, zAppBarHeight, zdp, zHeight, zStatusBarHeight} from "../../utils/ScreenUtil";
import {fetchRequest} from "../../utils/FetchUtil";
import {Api} from "../../utils/Api";

const {width, height} = Dimensions.get('window');

class RegisterMerchant extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: 'qqqqqq',
            passwordSure: 'qqqqqq',
            recommend: ''
        }
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


    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white', justifyContent: 'flex-start', alignItems: 'center'
            }}>

                <KeyboardAwareScrollView
                    style={{
                        flex: 1, backgroundColor: 'white',
                        marginTop: Platform.OS === 'ios' ? -zStatusBarHeight : 0
                    }}
                    resetScrollToCoords={{x: 0, y: 0}}
                    contentContainerStyle={{
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    keyboardShouldPersistTaps={'always'}>

                    <Image source={{uri: isIphoneX() ? 'login_bg_x' : 'login_bg'}}
                           resizeMode={'cover'}
                           style={{
                               width,
                               height: height,
                               position: 'absolute',
                           }}/>


                    <Image source={require('../../../resource/image/appname.png')}
                           style={{
                               width: zdp(140),
                               height: zdp(66),
                               marginTop: zAppBarHeight + zdp(40)
                           }}
                           resizeMode={'contain'}/>


                    <MyTextInputWithIcon
                        style={{marginTop: zdp(200)}}
                        autoCapitalize={'characters'}
                        placeholder={'邀请码,可不填'}
                        iconName={'login_invite'}
                        onChangeText={(text) => {
                            this.setState({
                                recommend: text
                            })
                        }}
                    />
                    <MyTextInputWithIcon
                        placeholder={'用户名'}
                        iconName={'login_user'}
                        onChangeText={(text) => {
                            this.setState({
                                username: text
                            })
                        }}
                    />
                    <MyTextInputWithIcon
                        secureTextEntry={true}
                        placeholder={'密码'}
                        iconName={'login_psw'}
                        onChangeText={(text) => {
                            this.setState({
                                password: text
                            })
                        }}
                    />

                    <MyTextInputWithIcon
                        secureTextEntry={true}
                        placeholder={'确认密码'}
                        iconName={'login_psw'}
                        onChangeText={(text) => {
                            this.setState({
                                passwordSure: text
                            })
                        }}
                    />
                    <View style={{
                        width,
                        height: zdp(100),
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>

                        <MyButtonView modal={1} style={{width: width / 1.3, marginTop: zdp(30)}}
                                      title={'下一步'}
                                      onPress={this.pressNext}/>
                    </View>

                </KeyboardAwareScrollView>

                <MyTabView linear_style={{position: 'absolute'}} title={'注册用户'}
                           isTransparent={true} barStyle={'light-content'}
                           backgroundColor={'transparent'}
                           globalTitleColor={'white'} navigation={this.props.navigation}/>


            </View>

        );


    }

    pressNext = () => {
        Keyboard.dismiss();

        if (this.state.username.length === 0) {
            ToastUtil.showShort('用户名不能为空');
            return;
        }


        if (this.state.password.length < 6) {
            ToastUtil.showShort('密码至少为六位数');
            return;
        } else {
            if (this.state.password !== this.state.passwordSure) {
                ToastUtil.showShort('两次输入密码不统一');
                return;
            }
        }

        if (this.state.recommend.length > 0) {
            if (this.state.recommend.length < 6 || this.state.recommend.length > 8) {
                toastShort('邀请码格式由6到8位的数字和字母组成,如没有邀请码可不填');
                return;
            } else {
                fetchRequest(`${Api.checkRecommend}?recommend=${this.state.recommend}`, 'GET')
                    .then(res => {
                        if (res.respCode === 200) {

                            this.props.navigation.navigate('RegisterMerchantNext', {
                                registerInfo: {
                                    recommend: this.state.recommend,
                                    username: this.state.username,
                                    password: this.state.password
                                }
                            });
                        } else {
                            toastShort(res.respMsg);
                        }
                    }).catch(err => {

                });
            }
        } else {
            this.props.navigation.navigate('RegisterMerchantNext', {
                registerInfo: {
                    recommend: this.state.recommend,
                    username: this.state.username,
                    password: this.state.password
                }
            });
        }



    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        registerNav: state.register.registerNav

    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterMerchant);

