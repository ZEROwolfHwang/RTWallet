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
    BackHandler
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MyTabView from "../../views/MyTabView";
import LinearGradient from "react-native-linear-gradient";
import MyButtonView from "../../views/MyButtonView";
import BaseComponent from "../global/BaseComponent";
import MyTextInputWithIcon from "../../views/MyTextInputWithIcon";
import RegisterMerchantNext from "./RegisterMerchantNext";
import ToastUtil from "../../utils/ToastUtil";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import MyLinearGradient from "../../views/MyLinearGradient";
import {zdp} from "../../utils/ScreenUtil";

const {width, height} = Dimensions.get('window');

class RegisterMerchant extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            passwordSure: '',
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
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <Image source={require('../../../resource/image/loginbg.png')}
                       style={{width, height, position: 'absolute'}}/>

                <MyTabView title={'注册用户'} isTransparent={true} barStyle={'light-content'} backgroundColor={'transparent'}
                           globalTitleColor={'white'} navigation={this.props.navigation}/>

                <KeyboardAwareScrollView
                    style={{flex: 1, backgroundColor: 'transparent'}}
                    resetScrollToCoords={{x: 0, y: 0}}
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    keyboardShouldPersistTaps={'always'}>


                    <MyTextInputWithIcon
                        style={{marginTop:zdp(100)}}
                        placeholder={'用户名'}
                        iconName={'phone'}
                        onChangeText={(text) => {
                            this.setState({
                                username: text
                            })
                        }}
                    />
                    <MyTextInputWithIcon
                        secureTextEntry={true}
                        placeholder={'密码'}
                        iconName={'lock'}
                        onChangeText={(text) => {
                            this.setState({
                                password: text
                            })
                        }}
                    />

                    <MyTextInputWithIcon
                        secureTextEntry={true}
                        placeholder={'确认密码'}
                        iconName={'lock'}
                        onChangeText={(text) => {
                            this.setState({
                                passwordSure: text
                            })
                        }}
                    />
                    <View style={{width,height:zdp(100),justifyContent:'flex-start',alignItems:'center'}}>

                    <MyButtonView modal={1} style={{width: width / 1.3, marginTop:zdp(30)}} title={'下一步'}
                                  onPress={this.pressNext}/>
                    </View>
                </KeyboardAwareScrollView>
            </View>

        );


    }

    pressNext = () => {
        if (this.state.password.length >= 6) {

            if (this.state.password === this.state.passwordSure) {

                this.props.navigation.navigate('RegisterMerchantNext', {
                    registerInfo: {
                        username: this.state.username,
                        password: this.state.password
                    }
                });
            } else {
                ToastUtil.showShort('两次输入密码不统一');
            }
        } else {
                ToastUtil.showShort('密码至少为六位数');
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

