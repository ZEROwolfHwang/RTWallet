/**
 * Created by zerowolf on 2017/12/25.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text, Alert,
    View,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {zdp, zsp} from "../../utils/ScreenUtil";
import {cusColors} from "../../value/cusColor/cusColors";

const {width, height} = Dimensions.get('window');
export default class Item extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        var params = this.props;
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',

            }}>

                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: zsp(40)
                    }}
                    onPress={() => {
                        this.props.onPress();
                    }}>
                    {/*<Image style={{width: zdp(25), height: zdp(25),alignSelf:'center'}}*/}
                    {/*source={this.props.image}/>*/}

                    <View style={{
                        width: zdp(40),
                        height: zdp(40),
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: zdp(8)
                    }}>

                        {/*<Icon size={zdp(20)} resizeMode={'cover'} name={this.props.image}
                              color={cusColors.linear_default}/>*/}
                              <Image source={{uri: params.image}}
                                     resizeMode={'contain'}
                                     style={{
                                         width: zdp(30),
                                         height:zdp(30),
                                         backgroundColor: 'transparent'
                                     }}/>

                    </View>

                    <Text style={{
                        flex: 1,
                        fontSize: zsp(15),
                        color: '#3d3f3f',
                        marginLeft: zdp(10)
                    }}>{this.props.title}</Text>
                    <FontAwesome size={zdp(25)} name={'angle-right'}
                          style={{color: '#a9adad', marginRight: zdp(10)}}/>


                </TouchableOpacity>

                <View style={{
                    width: width - zdp(80),
                    height: this.props.line ? 1 : 0,
                    backgroundColor: '#edf0f0',
                    alignSelf: 'flex-end',
                    justifyContent: 'flex-end'
                }}/>
            </View>
        );
    }
}
