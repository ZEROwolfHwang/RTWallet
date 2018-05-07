/**
 * Created by zerowolf on 2018/3/26.
 */
import React, {Component} from 'react';
import {
    BackHandler, Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions
} from 'react-native';

import {connect} from 'react-redux';
import {
    NavigationActions,
    StackNavigator,
    addNavigationHelpers,
} from 'react-navigation';
import {bindActionCreators} from 'redux';
import MyTabView from '../../../views/MyTabView';

const {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import BaseComponent from '../../global/BaseComponent';

class RedPlanTop extends Component {


    constructor(props) {
        super(props);
    }


    // 1,'9.00%',15,'10万起投','剩余5万元可投'

    render() {
        let redData = this.props.redData;
        let split = redData.feerat.split('.');
        let channelfeeList = redData.channelfee.split('.');
        return (
            <View style={{flex: 1}}>

                <View style={{
                    height: 180,
                    backgroundColor: 'white',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    <LinearGradient
                        start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                        locations={[0, 1]}
                        colors={['#ff7e3f', '#ff2f33']}
                        style={styles.linearStyle}>

                        <Text style={{
                            paddingLeft: 20,
                            fontSize: 14,
                            color: 'white',
                            backgroundColor: 'transparent'
                        }}>新手标</Text>
                    </LinearGradient>
                    <View style={{
                        marginTop: 10,
                        height: 25,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <Text style={{color: '#605a5f', fontSize: 14}}>
                            {/*分红计划 0326-2222*/}
                        </Text>

                    </View>


                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                        <Text style={{
                            fontSize: 40,
                            color: 'red',
                            margin: 5,
                            fontWeight: 'normal'
                        }}>{split[0] + '.'}

                            <Text style={{fontSize: 30, fontWeight: 'normal'}}>{split[1]}

                                <Text style={{
                                    fontSize: 40, color: 'red',
                                    fontWeight: 'normal'
                                }}>{`+${channelfeeList[0]}`}</Text>
                            </Text>
                        </Text>
                    </View>

                    <Text style={{color: '#605a5f', fontSize: 14}}>
                        用户交易费率
                    </Text>

                    <View style={{
                        flex: 1,
                        height: 45,
                        flexDirection: 'row',
                        marginTop: 10,
                        justifyContent: 'space-around',
                        alignSelf: 'center'
                    }}>
                        <View style={{
                            flex: 1,
                            height: 45,
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}>
                            <Text style={{color: '#605a5f', fontSize: 14}}>下发费</Text>
                            <Text style={{color: 'red', fontSize: 14}}>¥ 1</Text>

                        </View>
                        <View style={{
                            backgroundColor: '#837d82',
                            width: 0.5,
                            marginTop: 10,
                            height: 30
                        }}/>
                        <View style={{
                            flex: 1,
                            height: 45,
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}>
                            <Text style={{color: '#605a5f', fontSize: 14}}>单笔交易额度</Text>
                            <Text style={{
                                color: 'red',
                                fontSize: 14
                            }}>{`¥ ${redData.limit}`}</Text>

                        </View>
                        <View style={{
                            backgroundColor: '#837d82',
                            width: 0.5,
                            marginTop: 10,
                            height: 30
                        }}/>
                        <View style={{
                            flex: 1,
                            height: 45,
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}>
                            <Text style={{color: '#605a5f', fontSize: 14}}>结算方式</Text>
                            <Text
                                style={{
                                    color: 'red',
                                    fontSize: 14
                                }}>{`${redData.pay_type}`}</Text>

                        </View>
                    </View>

                    <View style={{
                        backgroundColor: 'lightgrey',
                        alignSelf: 'center',
                        width: width - 40,
                        height: 0.5,
                        marginTop: 5
                    }}/>

                </View>

                <View style={{
                    height: 180,
                    padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{flex: 4, flexDirection: 'row'}}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            marginLeft: 10,
                            alignItems: 'flex-start'
                        }}>
                            <Text style={{fontSize: 12, color: '#837d82'}}>单卡单日交易上限</Text>
                            <Text style={{
                                fontSize: 13,
                                color: 'black',
                                marginTop: 5,
                                marginBottom: 10
                            }}>{`¥ ${redData.upper}`}</Text>
                            <Text style={{
                                fontSize: 12,
                                color: '#837d82'
                            }}>{`${redData.pay_type}交易时间`}</Text>
                            <Text style={{
                                fontSize: 13,
                                color: 'black',
                                marginTop: 5,
                                marginBottom: 10
                            }}>{redData.time}</Text>
                            <Text style={{
                                fontSize: 12,
                                color: '#837d82'
                            }}>{`${redData.other_name}交易时间`}</Text>
                            <Text style={{
                                fontSize: 13,
                                color: 'black',
                                marginTop: 5,
                                marginBottom: 10
                            }}>{redData.other_time}</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Image style={{
                                width: 120,
                                height: 120,
                                marginTop: 10,
                                alignSelf: 'center'
                            }}
                                   source={require('../../../../AImages/red/redPlan1x2.png')}/>
                        </View>

                    </View>

                </View>
                <View style={{
                    paddingLeft:20,
                    paddingRight:20,
                    height: 60,
                    width: width,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Image style={{width: 20, height: 20, alignSelf: 'center'}}
                           source={require('../../../../AImages/red/redPlan2x2.png')}/>
                    <Text style={{fontSize: 13, color: '#686367', margin: 15}}>带积分</Text>
                    <Image style={{width: 20, height: 20, alignSelf: 'center'}}
                           source={require('../../../../AImages/red/redPlan3x2.png')}/>
                    <Text style={{fontSize: 13, color: '#686367', margin: 15}}>立即到账</Text>
                    <Image style={{width: 20, height: 20, alignSelf: 'center'}}
                           source={require('../../../../AImages/red/redPlan4x2.png')}/>
                    <Text style={{fontSize: 13, color: '#686367', margin: 15}}>支持多次交易</Text>

                </View>

                <View style={{
                    height: 30,
                    width: width - 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <Image style={{width: 20, height: 20,}}
                           source={require('../../../../AImages/red/redPlan5x2.png')}/>
                    <Text style={{
                        fontSize: 13,
                        color: '#837d82',
                        marginLeft: 20
                    }}>用户信息多重机密,防止用户信息泄露</Text>
                </View>
                <TouchableOpacity activeOpacity={0.5}
                                  style={{
                                      width,
                                      height: 40,
                                      justifyContent: 'center',
                                      alignItems: 'center'
                                  }}
                                  onPress={() => {
                                      this.props.onPress()
                                  }}
                >
                    <Text style={{
                        fontSize: 13,
                        color: '#837d82',
                        marginTop: 10,
                        marginBottom: 10
                    }}>---------点击可查看更多---------</Text>
                </TouchableOpacity>

            </View>

        );
    }

    // <View style={{
    //     flex: 1,
    //     width: width - 40,
    //     marginBottom: 40,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     alignSelf: 'center'
    // }}>
    //     {/*<Text style={{fontSize: 13, color: '#686367'}}>*/}
    //     {/*标的剩余可投资<Text style={{color: 'red'}}>¥4,207,000</Text>*/}
    //     {/*</Text>*/}
    //
    // </View>
}

const
    styles = StyleSheet.create({

        linearStyle: {
            position: 'absolute',
            alignSelf: 'center',
            borderRadius: 20,
            marginTop: 10,
            left: -40,
            width: 90,
            height: 25,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 20,
            shadowColor: '#ff5a4f',
            shadowOffset: {width: 1, height: 1},
            shadowOpacity: 0.6,
            shadowRadius: 2,
        },
        linearStyle1: {
            marginTop: 10,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            width: width - 40,
            height: 50,
            shadowColor: '#ff5a4f',
            shadowOffset: {width: 1, height: 1},
            shadowOpacity: 0.6,
            shadowRadius: 2,
        }
    });

const
    mapStateToProps = (state) => {
        return {
            nav: state.nav,
            redData: state.bills.redData,
        }

    };


export default connect(mapStateToProps)(RedPlanTop);
