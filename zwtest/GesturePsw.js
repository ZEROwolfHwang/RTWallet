/**
 * Created by zerowolf Date: 2018/5/23 Time: 下午9:12
 */
/**
 * Created by zerowolf Date: 2018/5/16 Time: 下午2:57
 */
const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Platform, StyleSheet, TextInput,Text, Alert, View, TouchableOpacity, Image, Dimensions,ListView
} from 'react-native';
import PasswordGesture from 'react-native-gesture-password';

var Password1 = '123';

export default class GesturePsw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: 'Please input your password.',
            status: 'normal'
        }
    }

    onEnd(password) {
        if (password == Password1) {
            this.setState({
                status: 'right',
                message: 'Password is right, success.'
            });

            // your codes to close this view
        } else {
            this.setState({
                status: 'wrong',
                message: 'Password is wrong, try again.'
            });
        }
    }

    onStart() {
        this.setState({
            status: 'normal',
            message: 'Please input your password.'
        });
    }

    onReset() {
        this.setState({
            status: 'normal',
            message: 'Please input your password (again).'
        });
    }

    render() {
        return (
            <PasswordGesture
                ref='pg'
                status={this.state.status}
                message={this.state.message}
                onStart={() => this.onStart()}
                onEnd={(password) => this.onEnd(password)}
                innerCircle={true}
                outerCircle={true}
            />
        );
    }
}
