/**
 * Created by zerowolf on 2018/4/3.
 */
'use strict';
import React, {Component} from "react";
import PropTypes from "prop-types";

import {
    StyleSheet,//样式
    View,//视图组件；
    Image,//图片
    Text,
    TextInput,//输入框
    TouchableOpacity,//一个类似button的组件
    Dimensions

} from "react-native";
const {width, height} = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';
export default class TextInputRightButton extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            inputValue: "",
        };
    }

    _isNull(str) {
        let result = true;
        if (str === "" || str === undefined) {
            result = true;
        }

        if (str.length > 0) {
            result = false;
        }
        return result;
    }


    render() {
        var props = this.props;
        return (
                <View style={{
                    width: props.width,
                    height: 50,
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{paddingLeft:10,width: 80, fontSize: 16, color: 'grey', backgroundColor: 'transparent'}}>
                        {props.title}
                    </Text>
                    <TextInput
                        keyboardType={props.keyboardType?props.keyboardType:'default'}
                        style={{flex:1}}
                        placeholderTextColor={"#999999"}
                        underlineColorAndroid="transparent"
                        numberOfLines={1}
                        // clearButtonMode={'never'}
                        maxLength={props.maxLength}
                        value={this.state.inputValue}
                        onChangeText={(text)=> {
                            this.setState({
                                inputValue: text
                            });
                            props.onChangeText(text)}}
                        />
                    {this._isNull(this.state.inputValue) ? null : this._getRightButtonView()}
                </View>


        );
    }

    _getRightButtonView() {
        //右侧按钮图
        //自定义 按钮图
        // let source = this.props.source ? this.props.source : require('../../../../resource/image/qianbao.png');
        return (
            <TouchableOpacity activeOpacity={0.5}
                              style={{
                                  position: 'absolute',
                                  right: 0,
                                  height: 50,
                                  width: 50,
                                  paddingRight:10,
                                  justifyContent: 'center',
                                  alignItems:'flex-end',
                                  backgroundColor:'transparent'
                              }}
                              onPress={() => {
                                  // this.props.onButtonClick();
                                  this.setState({
                                      inputValue: ''
                                  });
                                  this.props.onBackClear();
                              }}>

                <Ionicons size={25} name={'md-close-circle'}
                          style={{color: 'grey', backgroundColor: 'transparent'}}/>

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center'
        },
        closeStyle: {
            height: 18,
            width: 18,
        },

    }
);

// 传递参数属性定义
TextInputRightButton.propTypes = {
    // onButtonClick: PropTypes.func.isRequired
};
