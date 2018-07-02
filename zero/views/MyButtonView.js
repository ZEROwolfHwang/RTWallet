/**
 * Created by zerowolf on 2018/1/7.
 */


import {zdp, zsp, zWidth} from "../utils/ScreenUtil";

const {width, height} = Dimensions.get('window')
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text, Alert,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import SizeUtil from '../utils/SizeUtil';
import LinearGradient from "react-native-linear-gradient";
import {cusColors} from "../value/cusColor/cusColors";
import ZText from "./ZText";

export default class MyButtonView extends Component {
    constructor(props) {
        super(props);

    }

    static defaultProps = {
        title: '点击',
        style: {},
        onPress: null,
        modal: 0,     //null为普通界面风格  1 为登录界面风格
        fontSize: zsp(18)
    };

    render() {
        var params = this.props;
        return (
            <TouchableOpacity
                style={{padding: zdp(6)}}
                activeOpacity={0.7}
                onPress={() => {
                    params.onPress()
                }}
            >
                <LinearGradient
                    style={[{ marginTop: zdp(40),
                        width: zWidth - zdp(60),
                        height: zdp(50),
                        borderRadius: zdp(25),
                        justifyContent: 'center',
                        elevation: zdp(3),
                        shadowOffset:{width:zdp(1),height:zdp(5)},
                        shadowColor: cusColors.shadowColor,
                        shadowOpacity: 0.6,
                        shadowRadius: zdp(2),
                        alignItems: 'center',}, params.style]}
                    start={{x: 0.0, y: 0.0}}
                    end={{x: 0.0, y: 1.0}}
                    locations={[0, 1]}
                    colors={params.modal ? [cusColors.button_light, cusColors.button_default] : [cusColors.linear_default, cusColors.linear_light]}
                >


                    <ZText content={this.props.title} fontSize={params.fontSize} color={'white'}/>
                </LinearGradient>
            </TouchableOpacity>
        );



    }
}
{/*<TouchableOpacity activeOpacity={0.5}*/
}
{/*style={[styles.buttonViewStyle_01, params.style]}*/
}
{/*onPress={() => {*/
}
{/*params.onPress();*/
}
{/*}}>*/
}
{/*</TouchableOpacity>*/
}

MyButtonView.propTypes = {
    title: PropTypes.string.isRequired,
    style: PropTypes.object,
    onPress: PropTypes.func.isRequired,
    modal: PropTypes.number,
    fontSize: PropTypes.number,
}

const styles = StyleSheet.create({
    buttonViewStyle_01: {
        marginTop: zdp(40),
        // width: zdp(220),
        // height: zdp(50),
        // backgroundColor: '#4e73ff',
        borderRadius: zdp(25),
        justifyContent: 'center',
        alignItems: 'center',
        // elevation: zdp(5),
        // shadowOffset: {width: zdp(5), height: 5},
        // shadowColor: cusColors.shadowColor,
        // shadowOpacity: 0.6,
        // shadowRadius: 2,
    },
});