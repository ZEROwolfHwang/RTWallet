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
import PropTypes from 'prop-types';

const {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import BaseComponent from '../../global/BaseComponent';
import {cusColors} from "../../../value/cusColor/cusColors";
import {zdp, zsp, zWidth} from "../../../utils/ScreenUtil";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ZText from "../../../views/ZText";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

class RedPlanTop extends Component {


    constructor(props) {
        super(props);
    }


    // 1,'9.00%',15,'10万起投','剩余5万元可投'

    viewTop() {
        let redData = this.props.redData;
        let split = redData.feerat.split('.');
        // let split = '0.390%'.split('.');
        return <View style={{
            width: zWidth,
            height: zdp(200),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: cusColors.linear_default
        }}>
            <View
                style={{
                    position: 'absolute',
                    bottom: -1,
                    backgroundColor: '#eeeeee',
                    width: zWidth,
                    height: zdp(80)
                }}/>


            <View
                style={{
                    width: zWidth - zdp(60),
                    height: zdp(100),
                    position: 'absolute',
                    borderRadius: zdp(3),
                    left: zdp(30),
                    top: zdp(10),
                    backgroundColor: '#ffffff44'
                }}>

            </View>
            <View
                style={{
                    width: zWidth - zdp(50),
                    height: zdp(100),
                    position: 'absolute',
                    borderRadius: zdp(3),
                    left: zdp(25),
                    top: zdp(15),
                    backgroundColor: '#ffffff66'
                }}>

            </View>


            <View
                style={{
                    width: zWidth - zdp(40),
                    height: zdp(160),
                    position: 'absolute',
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    left: zdp(20),
                    top: zdp(20),
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    elevation: zdp(5),
                    shadowOffset: {width: zdp(2), height: zdp(5)},
                    shadowColor: 'lightgrey',
                    shadowOpacity: 0.6,
                    shadowRadius: zdp(2),
                }}>


                <View style={{
                    flex: 1, justifyContent: 'space-between', alignItems: 'center',
                    paddingLeft: zdp(15),
                    paddingRight: zdp(10),
                    flexDirection: 'row'
                }}>

                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        flexDirection: 'column'
                    }}>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>

                            <Text style={{
                                backgroundColor: 'transparent',
                                fontSize: zsp(35),
                                alignSelf: 'flex-end',
                                color: cusColors.main_orange,
                                fontWeight: 'normal',
                            }}>{split[0] + '.'}
                            </Text>


                            <Text style={{
                                backgroundColor: 'transparent',
                                alignSelf: 'flex-end',
                                color: cusColors.main_orange,
                                fontSize: zsp(25),
                                fontWeight: 'normal'
                            }}>{split[1]}
                            </Text>

                        </View>
                        <ZText parentStyle={{alignItems: 'flex-start'}}
                               content={'用户交易费率'}
                               fontSize={zsp(16)}
                               color={cusColors.text_secondary}/>

                    </View>


                    <View style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        alignSelf: 'center',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                        <ZText parentStyle={{
                            borderWidth: zdp(1),
                            borderColor: cusColors.main_orange,
                            borderRadius: 2,
                            padding: zdp(5),
                            paddingTop: zdp(2),
                            paddingBottom: zdp(2)
                        }}
                               content={'积分'}
                               fontSize={zsp(14)}
                               color={cusColors.main_orange}/>
                        <ZText parentStyle={{
                            borderWidth: zdp(1),
                            borderColor: cusColors.main_orange,
                            borderRadius: 2,
                            padding: zdp(5),
                            marginLeft: zdp(8),
                            marginRight: zdp(8),
                            paddingTop: zdp(2),
                            paddingBottom: zdp(2)
                        }}
                               content={'立即到账'}
                               fontSize={zsp(14)}
                               color={cusColors.main_orange}/>
                        <ZText parentStyle={{
                            borderWidth: zdp(1),
                            borderColor: cusColors.main_orange,
                            borderRadius: 2,
                            padding: zdp(5),
                            paddingTop: zdp(2),
                            paddingBottom: zdp(2)
                        }}
                               content={'多次交易'}
                               fontSize={zsp(14)}
                               color={cusColors.main_orange}/>

                    </View>

                </View>

                <View style={{
                    flex: 1,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>

                    <DetailTopItem title={'单笔交易额度'} content={`¥ ${redData.limit[0]} ~ ${redData.limit[1]}`}
                                   contentColor={cusColors.main_orange} flex={4}/>
                    <DetailTopItem title={'下发费'} content={`¥ ${redData.channelfee}`} flex={2}/>
                    <DetailTopItem title={'结算方式'} content={`${redData.pay_type}`} flex={2}/>

                </View>


                <View
                    style={{height: zdp(2), width: zWidth - zdp(40), backgroundColor: '#FF5A49'}}/>
            </View>

        </View>

    }

    /**
     * 交易详情
     */
    viewDetail() {
        let redData = this.props.redData;
        console.log('redData: ',redData);

        let supported = redData.supported;
        let detail = redData.detail;
        return <View
            style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: 'white'
            }}>

            <ZText parentStyle={{alignSelf: 'flex-start', padding: zdp(10), paddingLeft: zdp(20)}}
                   content={'交易详情'}
                   fontWeight={'500'}
                   fontSize={zsp(20)}
                   color={cusColors.text_main}/>
            <View style={{
                width: zWidth,
                height: 1,
                backgroundColor: 'grey',
                opacity: 0.1,
                alignSelf: 'flex-end'
            }}/>

            <Image source={{uri: 'xiangqing_liuc'}}
                   resizeMode={'contain'}
                   style={{
                       marginTop: zdp(5),
                       width: zWidth - zdp(60),
                       height: zdp(80),
                       backgroundColor: 'transparent'
                   }}/>
            <View style={{flex: 1}}>

                <View style={{
                    paddingTop: zdp(15),
                    paddingBottom: zdp(25),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'transparent'
                }}>

                    <DetailItem title={`单卡单日\n交易上限`} content={`¥ ${redData.upper}`}/>
                    <DetailItem title={`${redData.pay_type}交易时间`} content={redData.time}/>
                    <DetailItem title={`${redData.other_name}交易时间`}
                                content={redData.other_time}/>
                    <DetailItem title={`支持银行`} content={supported}/>

                </View>
            </View>

        </View>

    }

    viewBottom() {
        return <TouchableOpacity activeOpacity={0.5}
                                 style={{
                                     width,
                                     backgroundColor: 'transparent',
                                     justifyContent: 'center',
                                     alignItems: 'center',
                                     marginBottom: zdp(60)
                                 }}
                                 onPress={() => {
                                     this.props.onPress()
                                 }}
        >

             <ZText parentStyle={{padding: zdp(10), alignItems:'flex-start'}}
                     content={'---------点击可查看更多---------'}
                     fontSize={zsp(16)}
                     color={cusColors.text_secondary}/>
        </TouchableOpacity>
    }

    render() {

        let redData = this.props.redData;
        let split = redData.feerat.split('.');
        let channelfee = redData.channelfee
        let supported = redData.supported;
        let detail = redData.detail;
        return (
            <View style={{flex: 1}}>


                {this.viewTop()}


                {this.viewDetail()}


                {this.viewBottom()}

                {/*   <View style={{
                    // height: zdp(1)80,
                    paddingTop: zdp(10),
                    paddingBottom: zdp(10),
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>


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

                </View>*/}


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

                {/* <View style={{
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
                </View>*/}
            </View>
        );
    }

    /* // 银行名称  单笔限额   当日限额
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
 */
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
    /*   viewCommend(title, supported) {
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
       }*/
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        redData: state.bills.redData,
    }

};


export default connect(mapStateToProps)(RedPlanTop);

class DetailItem extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {};

    render() {
        var params = this.props;
        return (
            <View style={{
                width: zWidth,
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
                paddingTop: zdp(5),
                paddingBottom: zdp(5),
                paddingLeft: zdp(15),
                paddingRight: zdp(5),
            }}>
                <ZText parentStyle={{
                    width: zdp(110), flex: 0,
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start'
                }}
                       content={params.title}
                       textAlign={'left'}
                       fontSize={zsp(17)}
                       color={cusColors.text_secondary}/>

                <ZText parentStyle={{
                    flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start',
                }}
                       textAlign={'left'}
                       content={params.content}
                       fontSize={params.content.length > 120 ? zsp(12):params.content.length > 80 ? zsp(14) : params.content.length > 60 ? zdp(16) : params.content.length > 40 ? zsp(16) : zsp(18)}
                       color={cusColors.text_main}/>
            </View>)
    }
}


DetailItem.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}

class DetailTopItem extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {
        contentColor: cusColors.text_666
    };

    render() {
        var params = this.props;
        return (
            <View style={{
                flex: params.flex,
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'column',
                paddingTop: zdp(5),
                paddingBottom: zdp(5),
                paddingLeft: zdp(15),
                paddingRight: zdp(5),
            }}>
                <ZText parentStyle={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginBottom: zdp(5)
                }}
                       content={params.title}
                       textAlign={'left'}
                       fontSize={zsp(16)}
                       color={cusColors.text_secondary}/>

                <ZText parentStyle={{
                    justifyContent: 'flex-start', alignItems: 'center',
                }}
                       content={params.content}
                       fontSize={zsp(20)}
                       color={params.contentColor}/>


            </View>);

    }
}


DetailTopItem.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    contentColor: PropTypes.string
}
