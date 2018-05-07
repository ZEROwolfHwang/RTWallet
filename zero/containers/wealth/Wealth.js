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

    /*

        passport_fetch = async (url, method, params = '') => {
            //获取存储Token
            var common_url = 'http://sjpay.githubshop.com/app/';
            // let token = await global.storage.load({
            //     key: 'token'
            // })
            // console.log(token);
            let header = {
                // "Content-Type": "application/json;charset=UTF-8",
                "Content-Type": "application/form-data;charset=UTF-8",
                // 'platform': 2,
            };
            // if (token.length) {
            //     header['token'] = token
            // }
            return new Promise(function (resolve, reject) {
                fetch(common_url + url, {

                    method: method,
                    headers: header,
                    // body: JSON.stringify(params)


                }).then((response) => response.json())
                // .then(checkStatus)
                    .then((responseData) => {
                        resolve(responseData);
                    })
                    .catch((err) => {
                        console.log('err:', url, err);
                        reject(err);
                    });
            });
        }
    */

    componentDidMount() {
        console.log(this.props.bills);
    }


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
                width: width - 30,
                backgroundColor: 'white',
                borderRadius: 5,
                shadowColor: '#909191',
                shadowOffset: {width: 1, height: 1},
                shadowOpacity: 0.6,
                shadowRadius: 2,
                alignItems: 'center',
                justifyContent: 'flex-start',

                elevation: 2,
                marginTop: 10,
                marginBottom: 10
            }}
                onPress={()=>{
                    this.props.navigation.navigate('RedPlan',{id:topList.id})
                }}>

                <View style={{
                    width: width - 50,
                    height: 30,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingLeft: 10,
                    paddingRight: 10
                }}>

                    <View style={{
                        width: 80,
                        height: 1,
                        alignSelf: 'center',
                        backgroundColor: 'lightgrey'
                    }}/>
                    <View style={{
                        flex: 1,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>


                        <Text style={{
                            fontSize: 12,
                            color: 'lightgrey',
                        }}>为您推荐首选项目</Text>
                    </View>

                    <View style={{width: 80, height: 1, backgroundColor: 'lightgrey'}}/>


                </View>

                <Text style={{fontSize: 16, color: 'black'}}>
                    保卡提额 自动还款
                </Text>


                <Text style={{
                    fontSize: 24,
                    color:'red',
                    margin:5,
                    fontWeight: 'normal'
                }}>{split[0] + '.'}

                    <Text style={{fontSize: 18, fontWeight: 'normal'}}>{split[1]}

                        <Text style={{
                            fontSize: 24, color: 'red',
                            fontWeight: 'normal'
                        }}>{`+${channelfeeList[0]}`}</Text>
                    </Text>
                </Text>
                <Text style={{fontSize: 12, color: 'lightgrey'}}>
                    用户交易费率
                </Text>

                <Text style={{margin:5,fontSize:14,color:'grey'}}>
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
                               onPress={()=>{
                                   this.props.navigation.navigate('RedPlan',{id:bottomList[i].id})
                               }}
            />);

        }

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
        console.log(this.props.bills);
        return (
            <View style={{backgroundColor: 'white'}}>
                <TouchableOpacity style={{width,height:30,backgroundColor:'lightyellow',justifyContent:'space-around',alignItems:'center',flexDirection:'row'}}>
                    <Text style={{fontSize:12, color:'orange'}}>完成投资前准备即可随时随地的进行投资</Text>

                </TouchableOpacity>
                <ListView
                    style={{
                        height: Platform.OS === 'ios' ? height - 105 : height - 115,
                        paddingLeft: 10,
                        paddingRight: 10
                    }}
                    enableEmptySections={true}
                    contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}/>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    linearGradient: {
        width: SizeUtil.width,
        height: 60,
        backgroundColor: '#00f',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedText: {
        color: 'grey',
        fontSize: 14,
    }
});
const mapStateToProps = (state) => ({
    bills: state.bills.data,
    nav:state.nav
});


export default connect(mapStateToProps)(Wealth);
