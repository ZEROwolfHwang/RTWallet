/**
 * Created by zerowolf Date: 2018/5/5 Time: 下午3:32
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions, ListView
} from 'react-native';
import {zdp, zsp} from "../../../../utils/ScreenUtil";
import {cusColors} from "../../../../value/cusColor/cusColors";
import ZText from "../../../../views/ZText";

const {width, height} = Dimensions.get('window');
export default class ItemAddCard extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        var params = this.props;
        return <View style={[{
            width,
            height: zdp(45),
            justifyContent: 'center',
            alignItems: 'center',

            backgroundColor: 'transparent',
        }, params.style]}>
            <View style={{
                height: zdp(44),
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                paddingLeft: zdp(15)
            }}>

                <ZText
                    parentStyle={{paddingLeft: zdp(5), width: zdp(140), alignItems: 'flex-start'}}
                    content={params.title}
                    textAlign={'left'}
                    fontSize={zsp(16)}
                    color={cusColors.text_main}/>

                <ZText parentStyle={{flex: 1, alignItems: 'flex-start'}}
                       content={params.content}
                       fontSize={zsp(16)}
                       textAlign={'left'}
                       color={cusColors.text_secondary}/>

            </View>
            <View style={{
                height: params.hasLine ? zdp(1) : 0,
                backgroundColor: 'transparent',
                width: width - zdp(30)
            }}/>
        </View>
    }
}
