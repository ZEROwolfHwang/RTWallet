/**
 * Created by zerowolf Date: 2018/4/21 Time: 上午10:11
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    ScrollView,
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

const {width, height} = Dimensions.get('window');
import BaseComponent from '../../../global/BaseComponent';
import {cusColors} from "../../../../value/cusColor/cusColors";

let navigation;
let lastBackPressed
import {zdp, zsp, zWidth} from "../../../../utils/ScreenUtil";
import {onAppStateChanged} from "../../../../utils/GoBackUtil";
import ZText from "../../../../views/ZText";

class TabOne extends BaseComponent {

    constructor(props) {
        super(props);
        navigation = this.props.navigation;
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
        this.props.navigation.goBack();
        return true;
    };


    render() {
        var redData = this.props.redData;
        console.log(this.props.redData);
        return (
            <View style={{flex: 1, justifyContent: 'flex-start',
                alignItems: 'center'}}>

           {/*     <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 3}}>


                        {this.getTextView('产品名称', '快捷收款')}
                        {this.getTextView('结算方式', `${redData.pay_time}(${redData.pay_type})`)}
                        {this.getTextView('交易额度', redData.limit)}
                        {this.getTextView(`${redData.pay_type}时间`, redData.time)}
                        {this.getTextView(`${redData.other_name}时间`, redData.other_time)}
                    </View>*/}
                   {/* <View style={{
                        flex: 2,
                        paddingRight: zdp(20),
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Image style={{
                            width: zdp(160),
                            height: zdp(160),
                            marginTop: zdp(10),
                            alignSelf: 'center'
                        }}
                               source={require('../../../../../resource/image/guildimage.png')}/>
                    </View>
*/}
               {/* </View>*/}
                <ZText parentStyle={{alignSelf: 'flex-start', padding: zdp(10), paddingLeft: zdp(20)}}
                       content={'安全保障'}
                       fontWeight={'500'}
                       fontSize={zsp(20)}
                       color={cusColors.text_main}/>
                <View style={{
                    width: zWidth,
                    height: 1,
                    backgroundColor: 'grey',
                    opacity: 0.1,
                    alignSelf: 'flex-end'
                }}/>
               <Image source={{uri: 'zhifu_anquan'}}
                      resizeMode={'contain'}
                      style={{
                          marginBottom: zdp(20),
                          width: zWidth - zdp(20),
                          height: zdp(80),
                          backgroundColor: 'transparent'
                      }}/>

                {this.viewCommend('收款方式',redData.pay_way)}
                {this.viewCommend('交易流程',redData.process)}
                {this.viewCommend('交易失败',redData.pay_fail)}


            </View>
    );

    }

    viewCommend(title ,content){
        return <View style={{
            flexDirection: 'row',
            width: width,
            margin: zdp(zdp(5)),
            padding: zdp(5)
        }}>
            <ZText parentStyle={{alignSelf: 'flex-start',width:zdp(80)}} content={title} fontSize={zsp(17)} color={cusColors.text_main}/>
            <ZText parentStyle={{alignSelf: 'flex-start', alignItems: 'flex-start',flex:1, marginRight:zdp(20)}} content={content} fontSize={zsp(16)} color={cusColors.text_secondary} textAlign={'left'} textStyle={{flexWrap:'wrap'}}/>

        </View>
    }


    getTextView(title, content) {
        return <View style={{
            height: zdp(30),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            margin: zdp(5),
            padding: zdp(5)
        }}>

            <Text style={{color: 'black', fontSize: zsp(17), width: zdp(80)}}>{title}</Text>
            <Text style={{
                color: cusColors.linear_default,
                fontSize: zsp(16),
                flex: 1
            }}>{content}</Text>
        </View>;


    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        redData: state.bills.redData,
        navigation: state.bills.redPlanNav
    };
};

export default connect(mapStateToProps)(TabOne);
