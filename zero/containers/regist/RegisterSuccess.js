/**
 * Created by zerowolf Date: 2018/5/11 Time: 下午3:07
 */
import BaseComponent from "../global/BaseComponent";

const {width, height} = Dimensions.get('window');
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
    StatusBar,BackHandler
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MyButtonView from "../../views/MyButtonView";
import {fetchRequest} from "../../utils/FetchUtil";
import ToastUtil from "../../utils/ToastUtil";
import {actions} from "../../root/GlobalAction";
import {getCardLength} from "../../storage/schema_card";
import {NavigationActions} from "react-navigation";
import {zdp, zsp} from "../../utils/ScreenUtil";
import NavigationUtil from "../../utils/NavigationUtil";
import {save2Realm} from "./SaveRealmUtil";
import {isGestureLogin} from "../../storage/schema_gesture";
import {updateAppByLogin} from "../../utils/updateAppUtil";

class RegisterSuccess extends BaseComponent {

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        //type:0 //忘记密码  1 // 注册成功
        this.params = this.props.navigation.state.params;
        console.log(this.params.type);

    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        return true;
    };




    render() {
        return (

            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
    <Image source={require('../../../resource/image/successbg.png')}
        style={{width, height, position: 'absolute'}}/>

        <StatusBar
            hidden={false}
            translucent={true}
            barStyle={'light-content'}//'default', 'light-content', 'dark-content'
            backgroundColor={'#fff6fd00'}
            networkActivityIndicatorVisible={false}
        />


        <View style={{
            width: width,
                marginTop:zdp(100),
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center'
        }}>
    <Text style={{
            fontSize: zsp(30),
                color: 'white',
                textAlign: 'center',
                marginBottom: zdp(40)
        }}>{`${this.params.type === 0 ? '密码修改成功' : '注册成功'}`}</Text>
    </View>

        <View style={{flex:1}}/>

        <MyButtonView modal={1} style={{marginBottom:zdp(70)}} title={'完成'} onPress={this.pressSuccess}/>

    </View>


        )
    }

    pressSuccess = () => {
        if (this.params.type === 0) {
            this.props.navigation.navigate('RegisterApp');
        } else {
            let formData = new FormData();
            formData.append('phone', this.params.phone);
            formData.append('password', this.params.password);
            fetchRequest('Login', 'POST', formData)
                .then(res => {


                    if (res.respCode === 200) {

                        let cardLength = getCardLength(res.data.phone);
                        if (cardLength !== res.data.CardLen) {
                            //长度不同则刷新本地数据库
                            save2Realm(res.data);
                        }
                        this.save2Global(res.data);


                        NavigationUtil.reset(this.props.navigation, 'Tab');


                    } else {

                        ToastUtil.showShort(res.respCode)
                    }

                }).catch(err => {

                ToastUtil.showShort(err);
            })

        }
    }
    /**
     * 存储全局信息
     * @param resData
     */
    save2Global = (resData) => {
        this.props.initGlobalInfo({
            token: resData.token,
            phone: resData.phone,
            IDCard: resData.identity,
            username: resData.name,
            merCode: resData.merCode,
            appUser: resData.appUser,
            recommend: resData.recommend
        });
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initGlobalInfo: actions.getGlobalInfo,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterSuccess);

