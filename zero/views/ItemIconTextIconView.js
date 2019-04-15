/**
 * Created by zerowolf Date: 2018/5/13 Time: 下午3:48
 */
import {cusColors} from "../value/cusColor/cusColors";

const {width, height} = Dimensions.get('window');
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions, ListView
} from 'react-native';
import {zdp, zsp} from "../utils/ScreenUtil";
import ZText from "./ZText";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default class ItemIconTextIconView extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {
        title: '条目',
        globalColor: cusColors.text_main,  //title字体的颜色
        iconName: undefined,
        iconColor: cusColors.linear_default,
        iconSize: zdp(25),
        onPress: null,
        style: {},
        rightContent:undefined,
        rightFontSize: zsp(16),
        rightColor: cusColors.text_secondary
    }

    render() {
        var params = this.props;
        return <TouchableOpacity activeOpacity={0.8} style={[{
            width,
            height: zdp(45),
            flexDirection: 'row',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: zdp(15)
            // elevation: 2,
            // shadowOffset: {width: zdp(5), height: zdp(5)},
            // shadowColor: 'lightgrey',
            // shadowOpacity: 0.6,
            // shadowRadius: 2,
        }, params.style]}
                                 onPress={() => {
                                     params.onPress();
                                 }}>

      {/*      <View style={{
                width: zdp(45),
                height: zdp(45),
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <FontAwesome size={params.iconSize} name={params.iconName}
                      style={{color: params.iconColor, backgroundColor: 'transparent'}}/>
            </View>*/}

            <ZText
                parentStyle={{flex: 1, alignItems: 'flex-start'}}
                content={params.title}
                fontSize={zsp(16)}
                color={params.globalColor}
                textAlign={'left'}
            />
            {params.rightContent ?
                <ZText
                    parentStyle={{alignItems: 'flex-end', marginRight: zdp(5)}}
                    content={params.rightContent}
                    fontSize={params.rightFontSize}
                    color={params.rightColor}
                    textAlign={'left'}
                /> : null
            }


            <FontAwesome size={zdp(25)} name={'angle-right'}
                         style={{color: '#a9adad', marginRight: zdp(15), marginLeft: zdp(10)}}/>

        </TouchableOpacity>;


    }
}
ItemIconTextIconView.propTypes = {
    title: PropTypes.string.isRequired,
    style: PropTypes.object,
    globalColor: PropTypes.string,
    iconName: PropTypes.string,
    iconColor: PropTypes.string,
    iconSize: PropTypes.number,
    onPress: PropTypes.func.isRequired,
    rightContent: PropTypes.string,
    rightFontSize: PropTypes.number,
    rightColor: PropTypes.string
}

