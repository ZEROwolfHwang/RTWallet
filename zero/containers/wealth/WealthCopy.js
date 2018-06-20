/**
 * Created by zerowolf on 2017/12/6.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, ScrollView,
    Dimensions, ListView, TouchableOpacity
} from 'react-native';
import Item from './item/Item';

const {width, height} = Dimensions.get('window');
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PlanItem from './item/PlanItem';

import SizeUtil from '../../utils/SizeUtil';

import BaseComponent from '../global/BaseComponent';
import {actions_wealth} from "./reduce";
import {actions_card} from "../reduce/CardReduce";
import {zdp, zsp} from "../../utils/ScreenUtil";


class Wealth extends BaseComponent {


    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this._renderList())
        }
        this.renderRow = this._renderRow.bind(this);

    }


    componentWillMount() {

    }


    /*   componentDidMount() {
           console.log(this.props.globalInfo.data);
           let phone = this.props.globalInfo.data.phone;
           if (phone) {
               this.props.initCardList(phone)
           }
       }
   */

    _renderList() {
        const bills = this.props.bills;
        console.log(bills);
        var row = [];

        var topList;
        var bottomList = [];
        for (let i in bills.content) {
            console.log(i);

            if (i == 0) {
                topList = bills.content[i]
            } else {
                bottomList.push(bills.content[i])
            }
        }

        console.log(topList);
        console.log(bottomList);
        // console.log(dataList);
        let split = topList.feerat.split('.');
        let channelfeeList = topList.channelfee.split('.');
        row.push(
            <TouchableOpacity
                activeOpacity={0.8}
                style={{
                    width: width - zdp(30),
                    backgroundColor: 'white',
                    borderRadius: zdp(5),
                    shadowColor: '#909191',
                    shadowOffset: {width: zdp(1), height: zdp(1)},
                    shadowOpacity: 0.6,
                    shadowRadius: 2,
                    alignItems: 'center',
                    justifyContent: 'flex-start',

                    elevation: zdp(2),
                    marginTop: zdp(10),
                    marginBottom: zdp(10)
                }}

                onPress={() => {
                    this.pressEnterRedPlan(topList.id)
                }}>

                <View style={{
                    width: width - zdp(50),
                    height: zdp(30),
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingLeft: zdp(10),
                    paddingRight: zdp(10)
                }}>

                    <View style={{
                        width: zdp(60),
                        height: zdp(1),
                        alignSelf: 'center',
                        backgroundColor: 'lightgrey'
                    }}/>
                    <View style={{
                        flex: 1,
                        height: zdp(30),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>


                        <Text style={{
                            fontSize: zsp(12),
                            color: 'lightgrey',
                        }} numberOfLines={1}>为您推荐首选项目</Text>
                    </View>

                    <View style={{width: zdp(60), height: zdp(1), backgroundColor: 'lightgrey'}}/>


                </View>

                <Text style={{fontSize: zsp(18), color: 'black'}}>
                    完美还款 自动还款
                </Text>


                <Text style={{
                    fontSize: zsp(24),
                    color: 'red',
                    margin: zdp(5),
                    fontWeight: 'normal'
                }}>{split[0] + '.'}

                    <Text style={{fontSize: zsp(18), fontWeight: 'normal'}}>{split[1]}

                        <Text style={{
                            fontSize: zsp(24), color: 'red',
                            fontWeight: 'normal'
                        }}>{`+${channelfeeList[0]}`}</Text>
                    </Text>
                </Text>
                <Text style={{fontSize: zsp(12), color: 'lightgrey'}}>
                    用户交易费率
                </Text>

                <Text style={{margin: zdp(5), fontSize: zsp(14), color: 'grey'}}>
                    {`${topList.pay_time}  丨  ${topList.pay_limit}元起(首投1千元1起)`}
                </Text>

            </TouchableOpacity>
        );


        row.push(<Item type={1} title={bills.title} content={bills.description}/>);

        for (let i in bottomList) {
            console.log(bottomList[i].feerat);
            console.log(bottomList[i].channelfee);
            row.push(<PlanItem type={1}
                               channelfee={bottomList[i].channelfee}
                               left2_number={bottomList[i].feerat}
                               center_top_big={bottomList[i].pay_type}
                               center_bottom={bottomList[i].pay_time}
                               right_top_type={bottomList[i].status === 0 ? 0 : 1}
                               right_bottom={`${bottomList[i].pay_limit}起交易`}
                               onPress={() => {
                                   this.pressEnterRedPlan(bottomList[i].id)
                               }}
            />);

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
                    <Text style={{fontSize: zsp(12), color: 'orange'}}>立即到账、短信验证、资金安全</Text>

                </TouchableOpacity>
                <ListView
                    style={{
                        height: Platform.OS === 'ios' ? height - zdp(105) : height - zdp(115),
                        paddingLeft: zdp(10),
                        paddingRight: zdp(10)
                    }}
                    enableEmptySections={true}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}/>

            </View>
        );
    }
i
    pressEnterRedPlan = (entranceId) => {

        this.props.initEntranceId(`${entranceId}`);
        console.log(this.props.entranceId);

        this.props.navigation.navigate('RedPlan', {id: entranceId})

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
        // initCardList: actions_card.getCardList,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Wealth);

