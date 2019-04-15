/**
 * Created by zerowolf Date: 2018/5/15 Time: 下午1:51
 */

import {zdp, zsp} from "../../../utils/ScreenUtil";

const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Platform,
    StyleSheet,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ListView,
    TextInput
} from 'react-native';
import {cusColors} from "../../../value/cusColor/cusColors";
import ZText from "../../../views/ZText";

export default class Item extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {
        style: {},
        textStyle: {},
        textInputStyle: {},
        title: '',
        onChangeText: null,
        keyboardType: 'default',
        placeholder: ''
    }


    render() {
        var params = this.props;
        return (
            <View style={{marginTop: zdp(10)}}>
                <ZText parentStyle={{alignSelf: 'flex-start'}}
                       content={params.title}
                       fontSize={zsp(16)}
                       color={cusColors.text_main}/>

                <TextInput
                    keyboardType={params.keyboardType}
                    underlineColorAndroid={'transparent'}
                    style={[{
                        width: width - zdp(40),
                        height: zdp(55),
                        fontSize: zsp(15),
                        borderBottomWidth: 1,
                        borderColor: 'lightgrey',
                        alignSelf: 'flex-end',
                        fontFamily: Platform.OS === 'ios' ? 'PingFang TC' : 'PingFang TC',
                    }, params.textInputStyle]}
                    placeholder={params.placeholder}
                    placeholderTextColor={'lightgrey'}
                    onChangeText={(text) => {
                        params.onChangeText(text)
                    }}/>


            </View>);
    }
}
Item.propTypes = {
    style: PropTypes.object,
    textStyle: PropTypes.object,
    textInputStyle: PropTypes.object,
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
    keyboardType: PropTypes.string,
}
