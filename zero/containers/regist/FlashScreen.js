/**
 * Created by zerowolf Date: 2018/7/13 Time: 上午11:14
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Platform, StyleSheet, TextInput, Text, Alert, View, TouchableOpacity, Image, ListView, StatusBar
} from 'react-native';
import ZText from "../../views/ZText";
import {isFirstLogin, saveFirstLogin} from "../../storage/Storage";
import NavigationUtil from "../../utils/NavigationUtil";
import BaseComponent from "../global/BaseComponent";
import {zHeight, zWidth} from "../../utils/ScreenUtil";
import {cusColors} from "../../value/cusColor/cusColors";

class FlashScreen extends BaseComponent {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        // saveFirstLogin();
        this.timeout = setTimeout(() => {
            console.log(isFirstLogin());
            isFirstLogin()
                .then(res => {
                    console.log('res: ', res);
                    if (res) {
                        saveFirstLogin();
                        this.props.navigation.navigate('Splash');
                    } else {
                        NavigationUtil.backToLogin(this.props.navigation);
                    }
                }).catch(err => {
                saveFirstLogin();
                this.props.navigation.navigate('Splash');
            });
            clearTimeout(this.timeout)
        }, 1500);

     /*   setTimeout(() => {
            this.props.navigation.navigate('Splash');
        }, 2000);
*/
    }


    render() {
        return (
            <View style={{
                flex: 1, justifyContent: 'center', alignItems: 'center',
                backgroundColor: cusColors.linear_light
            }}>
                <StatusBar
                    ref={ref => this.statusBarRef = ref}
                    hidden={false}
                    translucent={true}
                    // barStyle={this.state.showLightBar ? 'light-content' : 'dark-content'}//'default', 'light-content', 'dark-content'
                    barStyle={'light-content'}//'default', 'light-content', 'dark-content'
                    backgroundColor={'#fff6fd00'}
                    networkActivityIndicatorVisible={false}
                />

                <Image source={{uri: 'shanpin'}}
                       resizeMode={'contain'}
                       style={{
                           width: zWidth,
                           height: zHeight,
                           backgroundColor: 'transparent'
                       }}/>
            </View>)
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FlashScreen);
