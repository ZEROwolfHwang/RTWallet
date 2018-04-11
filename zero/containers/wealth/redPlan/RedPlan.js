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
class RedPlan extends BaseComponent {


    constructor(props) {
        super(props);
        console.log(this.props.nav);
        console.log(this.props.naviga);
        console.log(this.props.navigation);

    }


    // 1,'9.00%',15,'10万起投','剩余5万元可投'
    render() {
        var data = this.props.data;
        console.log(data.aaa + '   ' + data.bbb);
        // console.log(data);
        var split = data.bbb.split('.');

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <MyTabView titleColor={'black'} color1={'white'} color2={'white'} title={'分红计划'} leftView={true}
                           hasRight={true} rightView={<TouchableOpacity activeOpacity={0.5}
                                                                        style={{
                                                                            width: width / 3,
                                                                            justifyContent: 'center',
                                                                            alignItems: 'flex-end',
                                                                            paddingRight: 15

                                                                        }}
                                                                        onPress={() => {
                                                                            Alert.alert('帮助');
                                                                        }}><Text
                    style={{fontSize: 14, color: 'black', backgroundColor: 'transparent'}}>帮助</Text></TouchableOpacity>}


                           navigation={this.props.navigation}/>


                <View style={{
                    flex: Platform.OS === 'ios' ? 1.8 : 2,
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
                    <View style={{marginTop: 10, height: 25, justifyContent: 'center', alignItems: 'center'}}>

                        <Text style={{color: '#605a5f', fontSize: 14}}>
                            分红计划 0326-2222
                        </Text>
                    </View>

                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                        <Text style={{
                            fontSize: 45,
                            // color: params.type === 1 ? 'red' : params.type === 2 ? '#6170ff' : '#ff823a',
                            color: 'red',
                            fontWeight: 'bold'
                        }}>{split[0] + '.'}

                            <Text style={{fontSize: 32, fontWeight: 'normal'}}>{split[1]}</Text>
                        </Text>
                    </View>

                    <Text style={{color: '#605a5f', fontSize: 14}}>
                        历史年化收益率
                    </Text>


                    <View style={{
                        flex: 1,
                        height: 45,
                        flexDirection: 'row',
                        marginTop: 10,
                        justifyContent: 'space-around',
                        alignSelf: 'center'
                    }}>
                        <View style={{flex: 1, height: 45, justifyContent: 'space-around', alignItems: 'center'}}>
                            <Text style={{color: '#605a5f', fontSize: 14}}>总募集额</Text>
                            <Text style={{color: 'red', fontSize: 14}}>¥5,000,000</Text>

                        </View>
                        <View style={{backgroundColor: '#837d82', width: 0.5, marginTop: 10, height: 30}}/>
                        <View style={{flex: 1, height: 45, justifyContent: 'space-around', alignItems: 'center'}}>
                            <Text style={{color: '#605a5f', fontSize: 14}}>项目期限</Text>
                            <Text style={{color: 'red', fontSize: 14}}>{data.ccc}天</Text>

                        </View>
                        <View style={{backgroundColor: '#837d82', width: 0.5, marginTop: 10, height: 30}}/>
                        <View style={{flex: 1, height: 45, justifyContent: 'space-around', alignItems: 'center'}}>
                            <Text style={{color: '#605a5f', fontSize: 14}}>起投金额</Text>
                            <Text style={{color: 'red', fontSize: 14}}>¥100</Text>

                        </View>


                    </View>

                </View>

                <View style={{
                    backgroundColor: '#837d82',
                    alignSelf: 'center',
                    width: width - 40,
                    height: 0.5,
                    marginTop: 5
                }}/>


                <View style={{flex: 3, padding: 20, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{flex: 4, flexDirection: 'row'}}>
                        <View style={{flex: 1, justifyContent: 'center', marginLeft: 10, alignItems: 'flex-start'}}>
                            <Text style={{fontSize: 12, color: '#837d82'}}>加入上限</Text>
                            <Text style={{fontSize: 13, color: 'black', marginTop: 5, marginBottom: 10}}>50,000</Text>
                            <Text style={{fontSize: 12, color: '#837d82'}}>开始计息时间</Text>
                            <Text style={{fontSize: 13, color: 'black', marginTop: 5, marginBottom: 10}}>2018-03-27
                                00:00:00</Text>
                            <Text style={{fontSize: 12, color: '#837d82'}}>开始计息时间</Text>
                            <Text style={{fontSize: 13, color: 'black', marginTop: 5, marginBottom: 10}}>2018-04-23
                                00:00:00</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Image style={{width: 120, height: 120, marginTop: 10, alignSelf: 'center'}}
                                   source={require('../../../../AImages/red/redPlan1x2.png')}/>
                        </View>

                    </View>
                    <View style={{
                        flex: 1,
                        width: width - 40,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Image style={{width: 20, height: 20, alignSelf: 'center'}}
                               source={require('../../../../AImages/red/redPlan2x2.png')}/>
                        <Text style={{fontSize: 13, color: '#686367', margin: 15}}>隔日计息</Text>
                        <Image style={{width: 20, height: 20, alignSelf: 'center'}}
                               source={require('../../../../AImages/red/redPlan3x2.png')}/>
                        <Text style={{fontSize: 13, color: '#686367', margin: 15}}>灵活取存</Text>
                        <Image style={{width: 20, height: 20, alignSelf: 'center'}}
                               source={require('../../../../AImages/red/redPlan4x2.png')}/>
                        <Text style={{fontSize: 13, color: '#686367', margin: 15}}>支持自动复投</Text>

                    </View>
                    <View style={{
                        flex: 1,
                        width: width - 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 10,
                        flexDirection: 'row'
                    }}>
                        <Image style={{width: 20, height: 20,}}
                               source={require('../../../../AImages/red/redPlan5x2.png')}/>
                        <Text style={{fontSize: 13, color: '#837d82', marginLeft: 20}}>账户资金安全由众安保险和贝米钱包保障</Text>
                    </View>
                    <Text style={{fontSize: 13, color: '#837d82', marginTop: 10, marginBottom: 10}}>---------向上滑动可查看更多---------</Text>

                </View>
                <View style={{
                    flex: 1,
                    width: width - 40,
                    marginBottom: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center'
                }}>
                    <Text style={{fontSize: 13, color: '#686367'}}>
                        标的剩余可投资<Text style={{color: 'red'}}>¥4,207,000</Text>
                    </Text>
                    <LinearGradient
                        start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                        locations={[0, 1]}
                        colors={['#ff6843', '#ff4d47']}
                        style={styles.linearStyle1}>

                        <TouchableOpacity activeOpacity={0.5}
                                          onPress={() => {
                                              // Alert.alert('立即加入');
                                              this.props.navigation.dispatch({
                                                  type: 'WebView1'
                                              })
                                          }}>

                            <Text style={{
                                paddingLeft: 20,
                                fontSize: 20,
                                color: 'white',
                                backgroundColor: 'transparent'
                            }}>立即加入</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>


            </View>

        );


    }
}
const styles = StyleSheet.create({

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
const mapStateToProps = (state) => {
    return {
        data: state.bills.payload,
        // nav: state.RS_Nav,
        // nav:state.nav,
        // naviga :state.RS_NEW
    }

};


export default connect(mapStateToProps)(RedPlan);