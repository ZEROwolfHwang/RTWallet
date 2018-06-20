/**
 * Created by zerowolf Date: 2018/5/23 Time: 下午9:21
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window')
import PasswordGesture from 'react-native-gesture-password';
import {zdp, zsp} from "../zero/utils/ScreenUtil";

var Password1 = '';

export default class AppDemo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: 'Please input your password.',
            status: 'normal'
        }
    }

    onEnd(password) {
        if ( Password1 === '' ) {
            // The first password
            Password1 = password;
            this.setState({
                status: 'normal',
                message: '请输入您的手势密码'
            });
        } else {
            // The second password
            if ( password === Password1 ) {
                this.setState({
                    status: 'right',
                    message: '您的密码设置成功 为:' + password
                });

                Password1 = '';
                // your codes to close this view
            } else {
                this.setState({
                    status: 'wrong',
                    message:  '输入错误,您还有2次机会'
                });
                Password1 = '';


            }
        }
    }
    //完成后请抬起手指
//冲会手势以确认
    //两次图案不一致,请重新绘制
    //请绘制新的解锁手势

    onStart() {
        if ( Password1 === '') {
            this.setState({
                status: 'normal',
                message: '请输入您的手势密码'
            });
        } else {
            this.setState({
                message: '请再次输入输入您的手势密码'
            });
        }
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View style={{width,height:zdp(60), backgroundColor:'white'}}/>
            <PasswordGesture
                style={{flex: 1,backgroundColor:'white'}}
                textStyle={{fontSize: zsp(16),marginTop:zdp(60),paddingTop:0}}
                ref='pg'
                status={this.state.status}
                message={this.state.message}
                onStart={() => this.onStart()}
                onEnd={(password) => this.onEnd(password)}
                innerCircle={true}
                outerCircle={true}
            />
            </View>
        );
    }
}
