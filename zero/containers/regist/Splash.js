/**
 * Created by zerowolf Date: 2018/6/29 Time: 下午11:02
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Platform, StyleSheet, TextInput, Text, Alert, View, TouchableOpacity, Image, ListView, StatusBar
} from 'react-native';
import BaseComponent from "../global/BaseComponent";
import Swiper from 'react-native-swiper';
import {zdp, zHeight, zWidth} from "../../utils/ScreenUtil";
import MyButtonView from "../../views/MyButtonView";

class Splash extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            swipeShow: false,
        };
    }

    componentDidMount() {

        setTimeout(() => {
            this.setState({
                swipeShow: true
            });
        }, 0)
    }


    viewSwipe() {
        if (this.state.swipeShow) {
            return (
                <Swiper
                    automaticallyAdjustContentInsets={true}
                    bounces={true}
                    showsPagination={false}
                    scrollEnabled={true}
                    loop={false}
                    removeClippedSubviews={false}
                    containerStyle={{width: zWidth, height: zHeight}}
                    style={{width: zWidth, height: zHeight}}
                    autoplay={true}
                >

                    <View style={{flex: 1}}>

                        <Image source={{uri: 'guide1'}}
                               resizeMode={'cover'}
                               style={{
                                   flex: 1,
                                   width: zWidth,
                                   backgroundColor: 'transparent'
                               }}/>
                    </View>
                    <View style={{flex: 1}}>

                        <Image source={{uri: 'guide2'}}
                               resizeMode={'cover'}
                               style={{
                                   flex: 1,
                                   width: zWidth,
                                   backgroundColor: 'transparent'
                               }}/>
                    </View>
                    <View style={{flex: 1, width: zWidth, height: zHeight, alignItems: 'center'}}>
                        <View style={{flex: 1}}>

                            <Image source={{uri: 'guide3'}}
                                   resizeMode={'cover'}
                                   style={{
                                       flex: 1,
                                       width: zWidth,
                                       backgroundColor: 'transparent'
                                   }}/>

                        </View>
                        <View style={{
                            position: 'absolute',
                            bottom: zdp(80)
                        }}>

                            <MyButtonView style={{marginTop: 0, width: zWidth - zdp(160)}}
                                          title={'立即使用'}
                                          onPress={() => {
                                              this.props.navigation.navigate('RegisterApp');
                                          }}/>
                        </View>
                    </View>

                </Swiper>
            );
        } else {
            return (
                <Image source={{uri: 'guide2'}}
                       resizeMode={'cover'}
                       style={{
                           flex: 1,
                           width: zWidth,
                           backgroundColor: 'transparent'
                       }}/>
            );
        }
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <StatusBar
                    hidden={false}
                    translucent={true}
                    barStyle={'light-content'}//'default', 'light-content', 'dark-content'
                    backgroundColor={'#fff6fd00'}
                    networkActivityIndicatorVisible={false}
                />


                {this.viewSwipe()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
