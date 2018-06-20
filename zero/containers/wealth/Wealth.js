/**
 * Created by zerowolf on 2017/12/6.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Alert,
    Dimensions,
    ListView,
    TouchableOpacity,
    Image,
    BackHandler,
    AppState,
    ProgressBarAndroid,
    RefreshControl
} from 'react-native';
import PropTypes from 'prop-types';

const {width, height} = Dimensions.get('window');
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PlanItem from './item/PlanItem';

import SizeUtil from '../../utils/SizeUtil';

import BaseComponent from '../global/BaseComponent';
import {actions_wealth} from "./reduce";
import {actions_card} from "../reduce/CardReduce";
import {zdp, zsp, zWidth} from "../../utils/ScreenUtil";
import ZText from "../../views/ZText";
import ToastUtil from "../../utils/ToastUtil";
import {cusColors} from "../../value/cusColor/cusColors";
import NavigationUtil from "../../utils/NavigationUtil";
import realm from "../../storage/realm";
import {TYPES} from "../../root/GlobalAction";
import {onAppStateChanged, onBackPress} from "../../utils/GoBackUtil";
import {fetchRequest} from "../../utils/FetchUtil";
import MarqueeText from "../../views/MarqueeText";
import {updateAppByLogin} from "../../utils/updateAppUtil";

let lastBackPressed;
let navigation;

class Wealth extends BaseComponent {


    constructor(props) {
        super(props);
        lastBackPressed = null;

        navigation = this.props.navigation;
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            isRefreshing: false,
            dataSource: ds.cloneWithRows(this._renderList())
        }
        this.renderRow = this._renderRow.bind(this);

    }


    componentDidMount() {
        // this.pressEnterRedPlan(28, 1)

        this.timer = setTimeout(() => {
            //登录检查版本升级
            updateAppByLogin();
            clearTimeout(this.timer)
        }, 3000);

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



    _renderList() {
        const bills = this.props.bills;
        console.log(bills);
        var row = [];


        for (let index in bills.content) {
            let billItem = bills.content[index];

            let channelfee = billItem.channelfee;
            let id = billItem.id;
            let feerat = billItem.feerat;
            let pay_type = billItem.pay_type;
            let name = billItem.name;
            let pay_time = billItem.time;
            let status = billItem.status;
            let pay_limit = billItem.pay_limit;
            let pay_uper = billItem.pay_uper;

            row.push(<TouchableOpacity key={index}
                                       activeOpacity={0.9}
                                       style={{
                                           marginTop: zdp(20),
                                           backgroundColor: 'white',
                                           justifyContent: 'flex-start',
                                           alignItems: 'center',
                                           flexDirection: 'column',
                                           width: zWidth-zdp(20),
                                           elevation: zdp(5),
                                           shadowOffset: {width: zdp(5), height: 5},
                                           shadowColor: 'lightgrey',
                                           shadowOpacity: 0.6,
                                           shadowRadius: 2,
                                           paddingLeft: zdp(10),
                                           paddingRight: zdp(10),
                                       }}
                                       onPress={() => {
                                           this.pressEnterRedPlan(id, status)
                                       }}>


                <View style={{
                    width: width - zdp(20),
                    height: zdp(45),
                    backgroundColor: status === 1 ? cusColors.linear_default : 'lightgrey',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>

                    <Image source={{uri: status === 1 ? 'unionpay' : 'unionpay_dark'}}
                           resizeMode={'contain'}
                           style={{
                               width: zdp(40),
                               height: zdp(20),
                               marginLeft: zdp(10),
                               marginRight: zdp(5),
                               backgroundColor: 'transparent'
                           }}/>
                    <ZText content={`${name}`} color={'white'} fontSize={zsp(18)}
                           parentStyle={{marginRight: zdp(10)}}/>
                    <View style={{flex: 1}}/>
                    <ZText content={`${status === 1 ? `费率${feerat}` : '维护中'}`} color={'white'}
                           fontSize={zsp(16)} parentStyle={{marginRight: zdp(10)}}/>
                </View>

                <View style={{
                    flex: 1,
                    width: width - zdp(20),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingLeft: zdp(5),
                    paddingRight: zdp(5)
                }}>
                    <Item color={cusColors.main_light} title={'下发费'} content={channelfee}/>
                    <Item title={'单笔额度'} content={`${pay_limit}~${pay_uper}`}/>
                    <Item title={'带积分'} content={`是`}/>
                    <Item title={'到账时间'} content={`立即`}/>
                    <Item title={'交易时间'} content={pay_time}/>


                </View>
                {/*<View style={{justifyContent:'center', alignItems:'center',padding:zdp(5)}}>
                    <MarqueeText style={{width: zWidth-zdp(20), backgroundColor: 'white'}}
                                 text='中国农业银行,汇丰银行,中国银行,中国建设银行,中国邮政储蓄银行,交通银行,招商银行,上海浦东发展银行,兴业银行,华夏银行,广东发展银行,中国民生银行,中信银行,' onBack={(timer) => {
                        // clearInterval(timer);
                        console.log(timer);
                        this.timer = timer;
                    }}/>
                </View>*/}

            </TouchableOpacity>);

        }

        row.push(<View style={{height: zdp(80)}}/>)
        return row;
    }

    _renderRow(data) {
        return (
            <View>
                {data}
            </View>
        )
    }


    _onRefresh = () => {
        this.setState({isRefreshing: true});

        fetchRequest('enchashment ', 'GET')
            .then(res => {
                console.log(res);
                if (res.respCode === 200) {
                    this.props.initGetWebData(res.data)
                } else {
                    ToastUtil.showShort(res.respMsg)
                }
            })
            .then(err => {
                if (err) {
                    console.log(err);
                }
            });

        var timer = setTimeout(() => {
            // let cardList1 = getAllCard(this.globalInfo.phone);
            this.setState({
                isRefreshing: false,
                dataSource: this.state.dataSource.cloneWithRows(this._renderList())
            });
            clearTimeout(timer);
        }, 2000);
    };


    render() {
        // console.log(this.props.bills);
        return (

            <View style={{backgroundColor: 'white'}}>
                <TouchableOpacity style={{
                    width,
                    height: zdp(30),
                    backgroundColor: 'lightyellow',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <Text style={{fontSize: zsp(14), color: 'orange'}}>立即到账、短信验证、资金安全</Text>

                </TouchableOpacity>
                <ListView
                    style={{
                        width: zWidth,
                        height: Platform.OS === 'ios' ? height - zdp(105) : height - zdp(115),
                    }}
                    enableEmptySections={true}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor='#00f'
                            title="Loading..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#1318ff', '#c8e7ff']}
                            progressBackgroundColor={"white"}
                        />
                    }

                />

            </View>
        );
    }

    i
    pressEnterRedPlan = (entranceId, status) => {
        if (status === 1) {

            this.props.initEntranceId(`${entranceId}`);
            console.log(this.props.entranceId);

            this.props.navigation.navigate('RedPlan');

        } else {
            Alert.alert(
                '正在维护中...',
                '该通道正在维护中,请等待通道维护完成',
                [
                    {text: '确定', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            )
        }
    }
}

const mapStateToProps = (state) => ({
    nav: state.nav,
    bills: state.bills.data,
    globalInfo: state.globalInfo,
    entranceId: state.bills.entranceId
});
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initEntranceId: actions_wealth.getEntranceId,
        initGetWebData: actions_wealth.fetchData,
        // initCardList: actions_card.getCardList,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Wealth);


class Item extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {
        color: 'black'
    };

    render() {
        var params = this.props;
        return (
            <View style={{height: zdp(65), justifyContent: 'space-around', alignItems: 'center'}}>
                <ZText content={params.title} fontSize={zsp(14)} color={'grey'}
                       textAlign={'center'}/>
                <ZText content={params.content} fontSize={zsp(15)} color={params.color}
                       textAlign={'center'}/>
            </View>);
    }
}

Item.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string
}
