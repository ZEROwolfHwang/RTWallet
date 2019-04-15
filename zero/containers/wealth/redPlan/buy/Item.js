/**
 * Created by zerowolf Date: 2018/5/1 Time: 下午9:15
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
    Dimensions,
    ListView,
    TextInput
} from 'react-native';
import {zdp, zsp} from "../../../../utils/ScreenUtil";
import PropTypes from 'prop-types';
import ZText from "../../../../views/ZText";
import {cusColors} from "../../../../value/cusColor/cusColors";

const {width, height} = Dimensions.get('window');
export default class Item extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {
        isRequired: '',
        maxLength: 21,
        editable: true,
        defaultValue: ''
    };


    render() {
        var params = this.props;
        return <View style={[{
            width,
            height: zdp(50),
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: params.hasLine ? zdp(1) : 0,
            backgroundColor: 'white',
            flexDirection: 'row', paddingLeft: zdp(15)
        }, params.style]}>

            <ZText parentStyle={{}}
                   textStyle={{width: zdp(10)}}
                   content={params.isRequired}
                   fontSize={zsp(16)}
                   color={'red'}/>

            <ZText parentStyle={{}}
                   textStyle={[{
                       width: zdp(130),
                       textAlign: 'left'
                   }, params.textStyle]}
                   textAlign={'left'}
                   content={params.title}
                   fontSize={zsp(16)}
                   color={cusColors.text_main}/>
            <TextInput underlineColorAndroid={'transparent'}
                       maxLength={params.maxLength}
                       keyboardType={params.keyboardType}
                       placeholder={params.placeholder}
                       placeholderTextColor={'lightgrey'}
                       editable={params.editable}
                       style={{
                           flex: 1,
                           height: zdp(50),
                           fontSize: zsp(16),
                           backgroundColor: 'transparent',
                           fontFamily: Platform.OS === 'ios' ? 'PingFang TC' : 'PingFang TC',
                           color: cusColors.text_secondary
                       }}
                       onChangeText={(text) => {
                           params.onChangeText(text);
                       }}
                       defaultValue={params.defaultValue}
                       value={params.value}/>
        </View>;
    }
};
Item.propTypes = {
    maxLength: PropTypes.number,
    isRequired: PropTypes.string,
    editable: PropTypes.bool,
    defaultValue: PropTypes.string
}
