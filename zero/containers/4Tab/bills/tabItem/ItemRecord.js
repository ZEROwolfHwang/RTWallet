/**
 * Created by zerowolf Date: 2018/5/9 Time: 下午3:02
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions, ListView
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {zdp, zsp} from "../../../../utils/ScreenUtil";
// import Icon from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('window');
export default class ItemRecord extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {
        // cutLineHeight:1,
        payCard: '',
        txnAmt: '',
        txnTime: '',
        status: 0
    }
// payCard={dataItem.payCard}
//                             txnAmt={dataItem.txnAmt}
//                             txnTime={dataItem.txnTime}
//                             status={dataItem.status}
    render() {
        var params = this.props;
        return (
            <View>
                <TouchableOpacity activeOpacity={0.8}
                                  style={[{
                                      width,
                                      height: zdp(100),
                                      backgroundColor: 'white',
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      alignItems: 'center'
                                  }, params.style]}
                                  onPress={() => {
                                      params.onPress();
                                  }}>

                    <View style={{
                        flex: 1,
                        flexDirection:'column',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                    }}>
                        {params.status===0?<View style={{flex:1}}/>
                        :<View style={{
                            width: zdp(80),
                                height:zdp(30),
                                backgroundColor: 'lightgrey',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>

                            <Text>交易成功</Text>
                        </View>
                        }

                        <Text style={{
                            marginLeft: zdp(10),
                            marginTop: zdp(10),
                            fontSize: zsp(16),
                            flex:1,
                            color: 'black'
                        }}>{`支付卡号:${params.payCard}`}</Text>
                        <Text style={{flex: 1,marginLeft: zdp(10), fontSize: zsp(14), color: 'lightgrey'}}>
                            {`${params.txnTime}`}</Text>
                    </View>


                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingRight: zdp(20)
                    }}>
                        <Text style={{fontSize: zsp(16), color: 'black', marginRight: zdp(10)}}>
                            {`${params.txnAmt}`}
                        </Text>
                        <Icon size={zdp(30)} name={'angle-right'}
                              style={{color: 'grey', backgroundColor: 'transparent'}}/>
                    </View>

                </TouchableOpacity>
                {/*<View style={{width, height:params.cutLineHeight, backgroundColor: 'lightgrey'}}/>*/}
            </View>
        )
    }
}
ItemRecord.propTypes = {
    // cutLineHeight: PropTypes.number,
    // style: PropTypes.object
}
