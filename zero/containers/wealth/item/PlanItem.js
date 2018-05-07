/**
 * Created by zerowolf on 2018/3/22.
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window');

import LinearGradient from 'react-native-linear-gradient';
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
                <View style={{flex: 1, height: 80}}>
                    {params.left1_title ? <LinearGradient
                        start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                        locations={[0, 1]}
                        colors={['#ff6843', '#ff4d47']}
                        style={styles.linearStyle}>

                        <Text style={{
                            fontSize: 10,
                            color: 'white',
                            backgroundColor: 'transparent'
                        }}>{params.left1_title}</Text>
                    </LinearGradient> : <View style={{flex: 2}}/>}
                    <View style={{
                        flex: 4,
                        marginLeft: 25,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start',
                        marginBottom: 8
                    }}>

                        <Text style={{
                            fontSize: 24,
                            color: params.type === 1 ? 'red' : params.type === 2 ? '#6170ff' : '#ff823a',
                            fontWeight: 'normal'
                        }}>{split[0] + '.'}

                            <Text style={{fontSize: 18, fontWeight: 'normal'}}>{split[1]}

                            <Text style={{fontSize: 24, color: params.type === 1 ? 'red' : params.type === 2 ? '#6170ff' : '#ff823a',
                                fontWeight: 'normal'}}>{`+${channelfeeList[0]}`}</Text>
                            </Text>
                        </Text>
                    </View>
                    <Text style={{
                        flex: 3,
                        marginLeft: 25,
                        fontSize: 11,
                        color: params.type === 1 ? '#ff8284' : params.type === 2 ? '#94c0ff' : '#ffad86'
                    }}>历史年化收益率</Text>
                </View>

                <View style={{flex: 0.8, height: 80}}>

                    <View style={{
                        flex: 6,
                        marginLeft: 40,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start',
                        marginBottom: 8
                    }}>

                        <Text style={{
                            fontSize: 24,
                            color: '#545454',
                            fontWeight: 'bold'
                        }}>{params.center_top_big}
                        </Text>
                    </View>
                    <Text style={{flex: 3, marginLeft: 30, fontSize: 11, color: 'grey'}}>{params.center_bottom}</Text>
                </View>

                {/*最右边的内容
                 *right_top_type  1 加入
                 *                2 售完
                 *                3 查看
                 */}

                <View style={{flex: 1, height: 80, justifyContent: 'center', alignItems: 'center',}}>
                    {params.right_top_type === 1 ?
                        <View style={{flex: 6, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 8}}>
                            <LinearGradient
                                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                                locations={[0, 1]}
                                colors={['#ff6843', '#ff4d47']}
                                style={[styles.linearGradient, {
                                    // borderBottomLeftRadius: 20,
                                    // borderBottomRightRadius: 20,
                                    borderRadius: 10, alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 20,
                                    width: 55,
                                }]}>


                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    style={{
                                        backgroundColor: 'transparent',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 20,
                                        width: 55,
                                        // borderRadius: 10
                                    }}
                                    onPress={() => {
                                        params.onPress();
                                    }}>

                                    <Text
                                        style={{fontSize: 12, color: 'white', backgroundColor: 'transparent'}}>详情</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                        :
                        params.right_top_type === 0 ?
                            <View style={{flex: 6, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 8}}>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    style={{
                                        backgroundColor: '#938c92',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 20,
                                        width: 55,
                                        borderRadius: 10
                                    }}>

                                    <Text style={{fontSize: 12, color: 'white'}}>维护</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{flex: 6, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 8}}>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    style={{
                                        borderWidth: 2,
                                        borderColor: '#ff563c',
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 20,
                                        width: 55,
                                    }}>

                                    <Text style={{fontSize: 12, color: '#ff563c'}}>查看</Text>
                                </TouchableOpacity>
                            </View>
                    }


                    <Text style={{flex: 3, fontSize: 11, color: 'grey'}}>{params.right_bottom}</Text>
                </View>

            </View>
        );

    }
}
const styles = {
    topView: {
        height: 80,
        width: width - 30,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: '#909191',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.6,
        shadowRadius: 2,
        alignItems: 'center',
        justifyContent: 'space-around',
        elevation: 2,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10
    },
    linearStyle:{
        borderRadius: 20,
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        width: (width - 20) / 3 - 60,
        shadowColor: '#ff5a4f',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.6,
        shadowRadius: 2,
    }
};
