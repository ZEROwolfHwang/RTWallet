/**
 * Created by zerowolf on 2018/3/22.
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');

import LinearGradient from 'react-native-linear-gradient';
import ItemButton from "./ItemButton";
import {zdp, zsp} from "../../../utils/ScreenUtil";
import {cusColors} from "../../../value/cusColor/cusColors";

export default class Navigator extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        var params = this.props;

        let number = params.left2_number;
        let channelfeeList = params.channelfee.split('.');
        console.log(number);
        let split = number.split('.');

        return (
            <View style={styles.topView}>

                <View style={{
                    width: width / 2.5,
                    backgroundColor: 'transparent',
                    paddingLeft: zdp(20),
                    justifyContent: 'space-between'
                }}>

                    <Text style={{
                        flex: 1,
                        width: width / 2.5,
                        alignSelf: 'center',
                        fontSize: zsp(24),
                        textAlign: 'left',
                        backgroundColor: 'transparent',
                        color: params.type === 1 ? 'red' : params.type === 2 ? '#6170ff' : '#ff823a',
                        fontWeight: 'normal'
                    }} numberOfLines={1}>{split[0] + '.'}

                        <Text style={{fontSize: zsp(18), fontWeight: 'normal'}}>{split[1]}

                            <Text style={{
                                fontSize: zsp(24),
                                color: params.type === 1 ? 'red' : params.type === 2 ? '#6170ff' : '#ff823a',
                                fontWeight: 'normal'
                            }}>{`+${channelfeeList[0]}`}</Text>
                        </Text>
                    </Text>

                    <Text style={{
                        width: width / 2.5,
                        alignSelf: 'center',
                        fontSize: zsp(11),
                        marginBottom: zdp(6),
                        textAlign: 'left',
                        color: params.type === 1 ? '#ff8284' : params.type === 2 ? '#94c0ff' : '#ffad86'
                    }}>资金手续费</Text>
                </View>


                <View style={{
                    width: width / 4,
                    backgroundColor: 'transparent',
                    justifyContent: 'space-between'
                }}>


                    <Text style={{
                        flex: 1,
                        width: width / 4,
                        alignSelf: 'center',
                        fontSize: zsp(24),
                        textAlign: 'left',
                        backgroundColor: 'transparent',
                        fontWeight: 'bold'
                    }}>{params.center_top_big}
                    </Text>
                    <Text style={{
                        width: width / 4,
                        alignSelf: 'center',
                        fontSize: zsp(11),
                        marginBottom: zdp(6),
                        textAlign: 'left', color: 'grey'
                    }}>{params.center_bottom}</Text>
                </View>


                {/*最右边的内容
                 *right_top_type  1 加入
                 *                2 售完
                 *                3 查看
                 */}

                <View style={{
                    width: width / 4,
                    backgroundColor: 'transparent',
                    justifyContent: 'space-between'
                }}>

                    <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>

                        <TouchableOpacity activeOpacity={0.8} style={{
                            alignSelf: 'center',
                            backgroundColor: params.right_top_type===1?'#ff6843':'#938c92',
                            height: zdp(20),
                            width: zdp(55),
                            justifyContent:'center',
                            alignItems: 'center',
                            borderRadius: zdp(10)
                        }} onPress={()=>{
                            params.right_top_type===1?params.onPress():null;
                        }}>

                            <Text style={{color:'white',fontSize:zsp(16)}}>{params.right_top_type===1?`详情`:'维护'}</Text>

                        </TouchableOpacity>

                    </View>

                    <Text style={{
                        width: width / 4,
                        alignSelf: 'center',
                        fontSize: zsp(11),
                        marginBottom: zdp(6),
                        textAlign: 'center', color: 'grey'
                    }}>{params.right_bottom}</Text>
                </View>

            </View>
        );

    }
}
const styles = {
    topView: {
        paddingTop: zdp(20),
        height: zdp(80),
        width: width - zdp(30),
        backgroundColor: 'white',
        borderRadius: zdp(5),
        shadowColor: '#909191',
        shadowOffset: {width: zdp(1), height: zdp(1)},
        shadowOpacity: 0.6,
        shadowRadius: zdp(2),
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: zdp(2),
        flexDirection: 'row',
        marginTop: zdp(10),
        marginBottom: zdp(10)
    },
    linearStyle: {
        borderRadius: zdp(20),
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: zdp(20),
        width: (width - zdp(20)) / 3 - zdp(60),
        shadowColor: cusColors.shadowColor,
        shadowOffset: {width: zdp(1), height: zdp(1)},
        shadowOpacity: 0.6,
        shadowRadius: zdp(2),
    }
};
