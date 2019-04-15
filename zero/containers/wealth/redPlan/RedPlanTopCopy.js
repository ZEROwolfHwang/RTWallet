/**
 * Created by zerowolf on 2018/3/26.
 */
import React, {Component} from 'react';
import {
    BackHandler,
    Platform,
    StyleSheet,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    FlatList
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
import {cusColors} from "../../../value/cusColor/cusColors";
import {zdp, zsp} from "../../../utils/ScreenUtil";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ZText from "../../../views/ZText";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

class RedPlanTopCopy extends Component {


    constructor(props) {
        super(props);
    }


    // 1,'9.00%',15,'10万起投','剩余5万元可投'

    render() {



        let redData = this.props.redData;
        let split = redData.feerat.split('.');
        let channelfee = redData.channelfee
        let supported = redData.supported;
        let detail = redData.detail;
        return (
            <View style={{flex: 1}}>

                <View style={{
                    // height: zdp(1)80,
                    paddingTop: zdp(10),
                    paddingBottom: zdp(10),
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <LinearGradient
                        start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                        locations={[0, 1]}
                        colors={[cusColors.linear_default, cusColors.linear_light]}
                        style={styles.linearStyle}>

                        <ZText content={'通道详情'}
                               parentStyle={{width: zdp(120)}}
                               textStyle={{
                                   margin: zdp(3),
                                   marginLeft: zdp(20),
                                   marginRight: zdp(10),
                                   fontSize: zsp(15),
                                   color: 'white',
                                   backgroundColor: 'transparent'
                               }}/>

                    </LinearGradient>


                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: width
                    }}>

                        <Text style={{
                            backgroundColor: 'transparent',
                            fontSize: zsp(40),
                            color: cusColors.linear_default,
                            fontWeight: 'normal',
                            alignSelf: 'flex-end',
                        }}>{split[0] + '.'}
                        </Text>


                        <Text style={{
                            alignSelf: 'flex-end',
                            backgroundColor: 'transparent',
                            color: cusColors.linear_default, fontSize: zsp(30), fontWeight: 'normal'
                        }}>{split[1]}
                        </Text>

                    </View>

                    <Text style={{color: '#605a5f', fontSize: zsp(16)}}>
                        用户交易费率
                    </Text>

                    <View style={{
                        flexDirection: 'row',
                        height: zdp(50),
                        marginTop: zdp(10),
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            flex: 1,
                            height: zdp(45),
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}>
                            <Text style={{color: '#605a5f', fontSize: zsp(15)}}>下发费</Text>
                            <Text style={{
                                color: cusColors.linear_default,
                                fontSize: zsp(15)
                            }}>{`¥ ${channelfee}`}</Text>

                        </View>
                        <View style={{
                            backgroundColor: 'lightgrey',
                            width: zdp(0.5),
                            marginTop: zdp(10),
                            height: zdp(30)
                        }}/>
                        <View style={{
                            flex: 1.3,
                            height: zdp(45),
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}>
                            <Text style={{color: '#605a5f', fontSize: zsp(15)}}>单笔交易额度</Text>
                            <Text style={{
                                color: cusColors.linear_default,
                                fontSize: zsp(15)
                            }}>{`¥ ${redData.limit}`}</Text>

                        </View>
                        <View style={{
                            backgroundColor: 'lightgrey',
                            width: zdp(0.5),
                            marginTop: zdp(10),
                            height: zdp(30)
                        }}/>
                        <View style={{
                            flex: 1,
                            height: zdp(45),
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}>
                            <Text style={{color: '#605a5f', fontSize: zsp(15)}}>结算方式</Text>
                            <Text
                                style={{
                                    color: cusColors.linear_default,
                                    fontSize: zsp(15)
                                }}>{`${redData.pay_type}`}</Text>

                        </View>
                    </View>

                    <View style={{
                        backgroundColor: 'lightgrey',
                        alignSelf: 'center',
                        width: width - zdp(40),
                        height: zdp(0.5),
                        marginTop: zdp(5)
                    }}/>

                </View>

                <View style={{flex: 1}}>


                    <View style={{
                        paddingTop: zdp(15),
                        paddingBottom: zdp(15),
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        backgroundColor: 'transparent'
                    }}>

                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            paddingLeft: zdp(25),
                            alignItems: 'flex-start'
                        }}>
                            <Text style={{fontSize: zsp(15), color: '#837d82'}}>单卡单日交易上限</Text>
                            <Text style={{
                                fontSize: zsp(16),
                                color: 'black',
                                marginTop: zdp(5),
                                marginBottom: zdp(10)
                            }}>{`¥ ${redData.upper}`}</Text>
                            <Text style={{
                                fontSize: zsp(15),
                                color: '#837d82'
                            }}>{`${redData.pay_type}交易时间`}</Text>
                            <Text style={{
                                fontSize: zsp(16),
                                color: 'black',
                                marginTop: zdp(5),
                                marginBottom: zdp(10)
                            }}>{redData.time}</Text>
                            <Text style={{
                                fontSize: zsp(15),
                                color: '#837d82'
                            }}>{`${redData.other_name}交易时间`}</Text>
                            <Text style={{
                                fontSize: zsp(16),
                                color: 'black',
                                marginTop: zdp(5),
                                marginBottom: zdp(10)
                            }}>{redData.other_time}</Text>

                        </View>

                        {/*<View style={{flex: 3, paddingRight: zdp(20)}}>


                        {this.viewSupportBankList(detail)}

                    </View>*/}
                        <View style={{
                            flex: 1,
                            paddingRight: zdp(20),
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Image style={{
                                width: zdp(160),
                                height: zdp(160),
                                marginTop: zdp(10),
                                alignSelf: 'center'
                            }}
                                   source={require('../../../../resource/image/guildimage.png')}/>
                        </View>

                    </View>
                    {this.viewCommend('支持银行:', supported)}
                    <View style={{
                        backgroundColor: 'lightgrey',
                        alignSelf: 'center',
                        width: width - zdp(40),
                        height: zdp(0.5),
                    }}/>
                </View>

                {/*  <View style={{
                    padding: zdp(20),
                    paddingTop: zdp(10),
                    paddingBottom: zdp(10),
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}>

                    <View style={{flex: 1}}/>

                    <Text style={{
                        textAlign: 'left',
                        fontSize: supported.length > 60 ? zsp(15) : supported.length > 40 ? zsp(16) : zsp(17),
                        fontFamily: Platform.OS === 'ios' ? 'PingFang TC' : 'PingFang TC',
                        color: 'black'
                    }}>
                        支持银行: <Text style={{
                        color: 'grey',
                        fontSize: supported.length > 60 ? zsp(14) : supported.length > 40 ? zsp(15) : zsp(16)
                    }}>{`${supported}`}
                    </Text>

                    </Text>

                </View>*/}

                <View style={{
                    marginTop: zdp(20),
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>


                    <View style={{
                        paddingLeft: zdp(20),
                        paddingRight: zdp(20),
                        height: zdp(30),
                        width: width,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <View style={{marginLeft: zdp(5), flexDirection: 'row'}}>

                            <Feather size={zdp(18)} name={'award'}
                                     style={{
                                         color: cusColors.linear_default,
                                         backgroundColor: 'transparent',
                                         marginRight: zdp(10)
                                     }}/>

                            <ZText content={'带积分'} color={'#686367'} marginLeft={zdp(5)}
                                   fontSize={zsp(15)}/>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <MaterialCommunityIcons size={zdp(18)} name={'speedometer'}
                                                    style={{
                                                        color: cusColors.linear_default,
                                                        backgroundColor: 'transparent',
                                                        marginRight: zdp(10)
                                                    }}/>

                            <ZText content={'立即到账'} color={'#686367'}
                                   fontSize={zsp(15)}/>
                        </View>

                        <View style={{marginRight: zdp(5), flexDirection: 'row'}}>
                            <Feather size={zdp(18)} name={'repeat'}
                                     style={{
                                         color: cusColors.linear_default,
                                         backgroundColor: 'transparent',
                                         marginRight: zdp(10)
                                     }}/>

                            <ZText content={'支持多次交易'} color={'#686367'}
                                   fontSize={zsp(15)}/>
                        </View>

                    </View>

                    <View style={{
                        height: zdp(30),
                        marginTop: zdp(10),
                        width: width,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        <MaterialIcons size={zdp(20)} name={'security'}
                                       style={{
                                           color: cusColors.linear_light,
                                           backgroundColor: 'transparent'
                                       }}/>

                        <Text style={{
                            fontSize: zsp(14),
                            color: '#837d82',
                            marginLeft: zdp(10)
                        }}>用户信息多重机密,防止用户信息泄露</Text>
                    </View>

                    <TouchableOpacity activeOpacity={0.5}
                                      style={{
                                          width,
                                          height: zdp(60),
                                          justifyContent: 'center',
                                          alignItems: 'center'
                                      }}
                                      onPress={() => {
                                          this.props.onPress()
                                      }}
                    >
                        <Text style={{
                            fontSize: zsp(16),
                            color: '#837d82',
                            marginTop: zdp(10),
                            marginBottom: zdp(10)
                        }}>---------点击可查看更多---------</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height: zdp(80)}}/>
            </View>
        );
    }

    // 银行名称  单笔限额   当日限额
    _header = () => {
        return <View style={{
            height: zdp(30),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#aaaab922',
            paddingLeft: zdp(5)
        }}>

            <ZText parentStyle={{flex: 1}} textStyle={{alignSelf: 'flex-start'}} content={'银行名称'}
                   textAlign={'left'} fontSize={zsp(15)} color={'#413d43'}/>
            <ZText parentStyle={{flex: 1}} textStyle={{alignSelf: 'flex-start'}} content={'单笔限额'}
                   textAlign={'left'} fontSize={zsp(15)} color={'#413d43'}/>
            <ZText parentStyle={{flex: 1}} textStyle={{alignSelf: 'flex-start'}} content={'当日限额'}
                   textAlign={'left'} fontSize={zsp(15)} color={'#413d43'}/>

        </View>
    }
    _renderItem = (data) => {
        console.log(data);
        let dataItem = data.item;
        let bankName = dataItem.bankName;
        let limit = dataItem.limit;
        let upper = dataItem.upper;

        return <View style={{
            height: zdp(25),
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: zdp(5),
            justifyContent: 'space-between',
            backgroundColor: '#aaaab911'
        }}>
            <ZText parentStyle={{flex: 1}} textStyle={{alignSelf: 'flex-start'}} content={bankName}
                   textAlign={'left'} fontSize={zsp(15)} color={'#5a555d'}/>
            <ZText parentStyle={{flex: 1}} textStyle={{alignSelf: 'flex-start'}} content={limit}
                   textAlign={'left'} fontSize={zsp(15)} color={'#5a555d'}/>
            <ZText parentStyle={{flex: 1}} textStyle={{alignSelf: 'flex-start'}} content={upper}
                   textAlign={'left'} fontSize={zsp(15)} color={'#5a555d'}/>

        </View>
    }
    _separator = () => {
        return <View style={{height: zdp(1), backgroundColor: 'white'}}/>
    }


    viewSupportBankList(supportBankList) {
        return <FlatList
            ref={(flatList) => this._flatList = flatList}
            ListHeaderComponent={this._header}
            // ListFooterComponent={this._footer}
            ItemSeparatorComponent={this._separator}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}

            // numColumns ={3}
            // columnWrapperStyle={{width:width,borderWidth:2,borderColor:'black',paddingLeft:20}}

            // horizontal={true}

            //getItemLayout={(data,index)=>(
            //{length: ITEM_HEIGHT, offset: (ITEM_HEIGHT+2) * index, index}
            //)}

            // onEndReachedThreshold={5}
            // onEndReached={(info)=>{
            // console.warn(info.distanceFromEnd);
            // }}

            // onViewableItemsChanged={(info)=>{
            // console.warn(info);
            // }}
            data={supportBankList}>
        </FlatList>
    }

    // <View style={{
    //     flex: 1,
    //     width: width - 40,
    //     marginBottom: 40,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     alignSelf: 'center'
    // }}>
    //     {/*<Text style={{fontSize: zsp(14), color: '#686367'}}>*/}
    //     {/*标的剩余可投资<Text style={{color: 'red'}}>¥4,207,000</Text>*/}
    //     {/*</Text>*/}
    //
    // </View>
    viewCommend(title, supported) {
        return <View style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: width,
            paddingLeft: zdp(20),
            paddingRight: zdp(20),
        }}>
            <ZText parentStyle={{alignSelf: 'flex-start', width: zdp(80)}} content={title}
                   fontSize={supported.length > 60 ? zsp(15) : supported.length > 40 ? zsp(16) : zsp(17)}
                   color={cusColors.text_main}/>
            <ZText parentStyle={{alignSelf: 'flex-start', flex: 1, marginRight: zdp(20)}}
                   content={supported}
                   fontSize={supported.length > 60 ? zsp(14) : supported.length > 40 ? zsp(15) : zsp(16)}
                   color={cusColors.text_secondary} textAlign={'left'}
                   textStyle={{flexWrap: 'wrap'}}/>

        </View>
    }
}


const
    styles = StyleSheet.create({

        linearStyle: {
            position: 'absolute',
            alignSelf: 'center',
            top: 0,
            borderRadius: zdp(20),
            marginTop: zdp(10),
            left: -zdp(40),
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: zdp(20),
            shadowColor: 'lightgrey',
            shadowOffset: {width: zdp(1), height: zdp(1)},
            shadowOpacity: 0.6,
            shadowRadius: zdp(2),
        },
        linearStyle1: {
            marginTop: zdp(10),
            borderRadius: zdp(30),
            alignItems: 'center',
            justifyContent: 'center',
            width: width - zdp(40),
            height: zdp(50),
            shadowColor: cusColors.shadowColor,
            shadowOffset: {width: zdp(1), height: zdp(1)},
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


export default connect(mapStateToProps)(RedPlanTopCopy);
