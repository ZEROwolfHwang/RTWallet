/**
 * Created by zerowolf Date: 2018/5/5 Time: 下午2:12
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image,WebView, Dimensions,ListView
} from 'react-native';
import BaseComponent from "../../../global/BaseComponent";
const {width, height} = Dimensions.get('window');
import {connect} from 'react-redux';
class Web extends BaseComponent {

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        console.log(this.props.navigation.state.params.payUrl);

        this.payUrl = this.props.navigation.state.params.payUrl;
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <WebView
                    ref={(webview) => this.webview = webview}
                    bounces={false}
                    scalesPageToFit={true}
                    source={{uri: this.payUrl, method: 'GET'}}
                    style={{width: width, height: height}}>
                </WebView>
            </View>)
    }
}
const mapStateToProps = (state) => {
    return {
        nav:state.nav
    }

};

export default connect(mapStateToProps)(Web);

