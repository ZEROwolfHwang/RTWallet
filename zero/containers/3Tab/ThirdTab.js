/**
 * Created by zerowolf on 2018/4/2.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    BackHandler,
    AppState, ImageBackground, RefreshControl, ScrollView
} from 'react-native';

const {width, height} = Dimensions.get('window');
import MyTabView from '../../views/MyTabView';
import {connect} from 'react-redux';
import BaseComponent from '../global/BaseComponent'
import {fetchRequest} from "../../utils/FetchUtil";
import {zDispatch_replay, Types_replay} from "./reduces/reduceReplay";
import MyProgressBar from "../../views/MyProgressBar";
import PageReplay from "./PageReplay";
import ToastUtil, {toastAlert} from "../../utils/ToastUtil";
import PageNull from "../../views/PageNull";
import {onAppStateChanged, onBackPress} from "../../utils/GoBackUtil";
import {Api} from "../../utils/Api";
import {fetchRequestToken} from "../../utils/FetchUtilToken";
import ZText from "../../views/ZText";
import {zdp, zHeight, zModalHeight, zsp, zWidth} from "../../utils/ScreenUtil";
import {cusColors} from "../../value/cusColor/cusColors";
import {getRandomBank} from "../global/emun/BankBgName";
import {getBankABC, getBankDetach, getBankDetachClose} from "../../utils/BankUtil";
import NavigationUtil from "../../utils/NavigationUtil";
import {PlanMode} from "../global/emun/ReplayType";

let lastBackPressed;
let globalInfo;
let navigation

class ThirdTab extends BaseComponent {

    constructor(props) {
        super(props);
        navigation = this.props.navigation;
        globalInfo = this.props.globalInfo;

        this.state={
            isRefreshing: false
        }
    }

    componentWillMount() {
        zDispatch_replay(this.props.navigation, globalInfo.token);
    }

    fetchData=()=>{

        this.setState({
            isRefreshing: true
        });

        zDispatch_replay(this.props.navigation, globalInfo.token);

        this.timeout = setTimeout(() => {
            this.setState({
                isRefreshing: false
            });
            clearTimeout(this.timeout)
        }, 1000);
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

        return onBackPress(lastBackPressed, this.props.navigation, () => {
            lastBackPressed = Date.now();
        })
    };


    viewAddCardPlan() {
        return <View
            key={10009}
            style={{
                marginTop: zdp(5),
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: zdp(20)
            }}>


            <TouchableOpacity
                activeOpacity={0.9}
                style={{
                    marginBottom: zdp(20),
                }}
                onPress={this.pressAddCardPlan}>

                <ImageBackground source={{uri: 'bg_add'}}
                                 resizeMode={'contain'}
                                 style={{
                                     width: zWidth - zdp(30),
                                     height: zdp(70),
                                     justifyContent: 'space-around',
                                     flexDirection: 'row',
                                     alignItems: 'center',
                                     alignSelf: 'center',
                                 }}>


                    <ZText parentStyle={{
                        marginLeft: zdp(40),
                        marginRight: zdp(20),
                        width: zdp(25),
                        height: zdp(25),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'black',
                        borderRadius: zdp(15)
                    }} content={'+'} fontWeight={'500'} fontSize={zsp(18)} color={'white'}/>

                    <ZText parentStyle={{flex: 1, alignItems: 'flex-start'}} content={'添加卡计划'}
                           color={cusColors.text_main} fontSize={zsp(18)}/>

                    <Image source={{uri: 'common_next'}}
                           resizeMode={'contain'}
                           style={{
                               marginRight: zdp(10),
                               width: zdp(20),
                               height: zdp(20),
                               backgroundColor: 'transparent'
                           }}/>
                </ImageBackground>
            </TouchableOpacity>

            <View style={{height: zModalHeight - zdp(180)}}/>
        </View>
    }


    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView titleColor={'black'} title={'完美还款'}
                           leftView={false}
                           navigation={this.props.navigation}/>

                {
                    this.props.planCardList && this.props.planCardList.length > 0 ?
                        <PageReplay PlanMode={PlanMode.RUNNING}/> :
                        <ScrollView style={{width: zWidth, height: zHeight, marginTop: zdp(20)}}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{
                                        justifyContent: 'flex-start',
                                        alignItems: 'center'
                                    }}
                                    scrollEnabled={true}
                                    bounces={true}
                            // overScrollMode={'always'}
                                    onRefresh={() => {
                                        console.log('refresh');
                                    }}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.isRefreshing}
                                            onRefresh={this.fetchData}
                                            tintColor='#00f'
                                            title="正在刷新..."
                                            titleColor={cusColors.text_secondary}
                                            colors={[cusColors.RefreshColor_01, cusColors.RefreshColor_02, cusColors.RefreshColor_03]}
                                            progressBackgroundColor={cusColors.RefreshBackground}
                                        />
                                    }>
                            {
                                this.viewAddCardPlan()
                            }
                        </ScrollView>
                }

            </View>
        );
    }


    /**
     * 添加还款计划  , 监听返回,刷新列表
     */
    pressAddCardPlan = () => {
        this.props.navigation.navigate('SelectCreditCard');
    };

}


const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        replay: state.replay.data,
        globalInfo: state.globalInfo.data,
        planCardList: state.replay.planCardList,
    }

};


export default connect(mapStateToProps)(ThirdTab);
