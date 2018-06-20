/**
 * Created by zerowolf Date: 2018/5/27 Time: 下午11:00
 */
import BaseComponent from "../global/BaseComponent";

const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Platform,
    StyleSheet,
    TextInput,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ListView, AppState,
    ScrollView, BackHandler
} from 'react-native';
import PageReplayDetail from "./PageReplayDetail";
import ToastUtil from "../../utils/ToastUtil";
import {cusColors} from "../../value/cusColor/cusColors";
import {zdp, zsp} from "../../utils/ScreenUtil";
import {onAppStateChanged, onBackPress} from "../../utils/GoBackUtil";

let navigation;
let lastBackPressed

class PageReplay extends BaseComponent {

    constructor(props) {
        super(props);
        navigation = this.props.navigation;
        console.log(this.props.replay);
    }


    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        AppState.addEventListener('change', this._onAppStateChanged);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
        AppState.removeEventListener('change', this._onAppStateChanged);
    }


    _onAppStateChanged(nextState) {
        onAppStateChanged(nextState, lastBackPressed, navigation, () => {
            lastBackPressed = Date.now();
        });
    }


    onBackPress = () => {
        return onBackPress(lastBackPressed,this.props.navigation,()=>{
            lastBackPressed = Date.now();
        })
    };


    viewReplayList(dataList) {
        var replayRow = [];

        for (let index in dataList) {
//:
// channelfee
// :
// "1.00"
// feerat
// :
// "0.430%"
// id
// :
// 2
// pay_limit
// :
// "400"
// pay_time
// :
// "立即到账"
// pay_type
// :
// "D0"
// status
// :
// 1
            let dataItem = dataList[index];
            let channelfee = dataItem.channelfee;
            let name = dataItem.name;
            let feerat = dataItem.feerat;
            let id = dataItem.id;
            let payLimit = dataItem.pay_limit;
            let payType = dataItem.pay_type;
            let pay_time = dataItem.pay_time;
            let status = dataItem.status;

            replayRow.push(
                <TouchableOpacity key={index}
                                  activeOpacity={0.9}
                                  style={{
                                      marginTop: zdp(10),
                                      backgroundColor: 'white',
                                      justifyContent: 'flex-start',
                                      alignItems: 'center',
                                      flexDirection: 'column',
                                      height: zdp(100),
                                      width,
                                      elevation: zdp(5),
                                      shadowOffset: {width: zdp(5), height: 5},
                                      shadowColor: 'lightgrey',
                                      shadowOpacity: 0.6,
                                      shadowRadius: 2,
                                      paddingLeft: zdp(10),
                                      paddingRight: zdp(10),
                                  }}
                                  onPress={() => {
                                      this.pressReplayItem(dataList[index])
                                  }}>


                    <View style={{
                        width,
                        height: zdp(40),
                        paddingLeft: zdp(10),
                        paddingRight: zdp(10),
                        backgroundColor: cusColors.linear_default,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: zsp(16),
                            color: 'white',
                            textAlign: 'center'
                        }}>{name}</Text>
                        <Text style={{
                            fontSize: zsp(16),
                            color: 'white',
                            textAlign: 'center'
                        }}>{`费率${feerat}`}</Text>
                    </View>

                    <View style={{
                        flex: 1,
                        width,
                        paddingLeft: zdp(10),
                        paddingRight: zdp(10),
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            height: zdp(60),
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: zsp(14),
                                color: 'grey',
                                textAlign: 'center'
                            }}>{`下发费`}</Text>
                            <Text style={{
                                fontSize: zsp(16),
                                color: cusColors.linear_default,
                                textAlign: 'center'
                            }}>{`${channelfee}`}</Text>
                        </View>
                        <View style={{
                            height: zdp(60),
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: zsp(14),
                                color: 'grey',
                                textAlign: 'center'
                            }}>{`到账时间`}</Text>
                            <Text style={{
                                fontSize: zsp(16),
                                color: 'black',
                                textAlign: 'center'
                            }}>{`${pay_time}`}</Text>
                        </View>
                        <View style={{
                            height: zdp(60),
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: zsp(14),
                                color: 'grey',
                                textAlign: 'center'
                            }}>{`最小金额`}</Text>
                            <Text style={{
                                fontSize: zsp(16),
                                color: 'black',
                                textAlign: 'center'
                            }}>{`${payLimit}`}</Text>
                        </View>


                    </View>


                </TouchableOpacity>
            );
        }

        return <ScrollView style={{flex: 1}}
                           contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                           showsVerticalScrollIndicator={false}
                           showsHorizontalScrollIndicator={false}>
            {replayRow}

        </ScrollView>
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>

                {this.viewReplayList(this.props.replay)}


            </View>);
    }

    /**
     * 点击完美还款的条目
     */
    pressReplayItem = (dataItem) => {
        console.log(dataItem);
        // this.props.navigation.navigate('PageReplayDetail', {entranceId: dataItem.id});
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        replay: state.replay.data
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PageReplay);
