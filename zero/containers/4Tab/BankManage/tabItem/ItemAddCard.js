/**
 * Created by zerowolf Date: 2018/5/7 Time: 下午11:44
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions, ListView
} from 'react-native';

const {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import {zdp, zsp} from "../../../../utils/ScreenUtil";

export default class ItemAddCard extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {
        color1: 'purple',
        color2: 'red'
    }

    render() {
        var params = this.props;
        return (
            <TouchableOpacity activeOpacity={0.8}
                              onPress={() => {
                                  params.onPress()
                              }}>

                <LinearGradient
                    start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                    locations={[0, 1]}
                    colors={[params.cardType === 0 ? 'purple' : 'blue', params.cardType === 0 ? 'red' : 'green']}
                    style={{
                        width: width - zdp(30),
                        height: zdp(120),
                        justifyContent: 'center',
                        margin: zdp(20),
                        marginBottom: 0,
                        alignItems: 'center',
                        borderRadius: zdp(5),
                        padding: zdp(20)
                    }}>

                    <Image style={{
                        width: zdp(120),
                        height: zdp(120),
                        right: zdp(20),
                        position: 'absolute',
                        borderRadius: zdp(70),
                        opacity: 0.5
                    }}
                           source={require('../../../../../resource/image/heart.png')}/>

                    <View style={{
                        width: zdp(40),
                        height: zdp(40),
                        backgroundColor: 'grey',
                        borderRadius: zdp(20),
                        opacity: 0.5,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{fontSize: zsp(50), color: 'black', textAlign: 'center'}}>+</Text>
                    </View>


                </LinearGradient>
            </TouchableOpacity>
        )
    }
}
