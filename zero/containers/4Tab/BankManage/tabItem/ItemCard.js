/**
 * Created by zerowolf Date: 2018/5/7 Time: 下午11:44
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions, ListView
} from 'react-native';

const {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import TabOne from "./BankManageTabOne";
import {zdp, zsp} from "../../../../utils/ScreenUtil";

export default class TabOneTabOneItemCard extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {
        color1: 'purple',
        color2: 'red'
    }

    render() {
        var params = this.props;

        let cardId = params.cardId;
        let cardId_last = '';
        if (cardId) {
             cardId_last = cardId.substr(cardId.length - 4);
        }
        return (
            <LinearGradient
                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                locations={[0, 1]}
                colors={[params.cardType === 0 ? 'purple' : 'blue', params.cardType === 0 ? 'red' : 'green']}
                style={{
                    marginTop: -zdp(15),
                    marginBottom:-zdp(15),
                    marginLeft:-zdp(20),
                    width: width,
                    height: zdp(100),
                    justifyContent: 'space-around',
                    alignItems: 'flex-start',
                }}>

                <Image style={{
                    width: zdp(120),
                    height: zdp(100),
                    right: zdp(20),
                    position: 'absolute',
                    borderRadius: zdp(70),
                    opacity: 0.5
                }}
                       source={require('../../../../../resource/image/heart.png')}/>

                <View style={{
                    flexDirection: 'row', width: width - zdp(20), justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>

                    <Image style={{width: zdp(40), height: zdp(20), marginRight: zdp(10)}}
                           source={require('../../../../../resource/image/unionPay.png')}/>

                    <Text style={{fontSize: zsp(16), color: 'white'}}>{params.cardName}</Text>
                </View>

                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    alignSelf: 'flex-end'
                }}>
                    <Text style={{
                        fontSize: zsp(16),
                        color: 'white'
                    }}>{`**** **** **** ${cardId_last}`}</Text>

                </View>

                <Text style={{fontSize: zsp(14), color: 'white'}}>提现额度: 100.00元</Text>

            </LinearGradient>
        )
    }
}
