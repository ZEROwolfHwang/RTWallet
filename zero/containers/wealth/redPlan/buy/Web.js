/**
 * Created by zerowolf Date: 2018/5/5 Time: 下午2:12
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    WebView,
    Dimensions,
    ListView,
    StatusBar
} from 'react-native';
import BaseComponent from "../../../global/BaseComponent";
const {width, height} = Dimensions.get('window');
import {connect} from 'react-redux';
import MyTabView from "../../../../views/MyTabView";
import {zAppBarHeight, zdp, zsp, zStatusBarHeight} from "../../../../utils/ScreenUtil";
import Icon from 'react-native-vector-icons/FontAwesome'

class Web extends BaseComponent {

    constructor(props) {
        super(props);

    }
    componentWillMount() {

        this.payUrl = this.props.navigation.state.params.payUrl;
        // this.payUrl = 'http://api.tzpay.cn/api/toPay.do?orderId=2018062014232357994';
    }
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <WebView
                    ref={(webview) => this.webview = webview}
                    bounces={false}
                    scalesPageToFit={true}
                    source={{uri: this.payUrl, method: 'GET'}}
                    style={{width: width, height: height, marginTop: zdp(20)}}>
                </WebView>

                <MyTabView
                    linear_style={{position:'absolute', top:0}}
                           globalTitleColor={'white'}
                           title={'在线支付'} navigation={this.props.navigation}/>
            </View>)
    }
}
const mapStateToProps = (state) => {
    return {
        nav:state.nav
    }

};

export default connect(mapStateToProps)(Web);

