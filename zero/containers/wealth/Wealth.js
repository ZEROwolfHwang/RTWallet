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
import MyTabView from '../../views/MyTabView';

import SizeUtil from '../../utils/SizeUtil';
import {actions} from './reduce/index';
import NavigationUtil1 from '../../utils/NavigationUtil';
import LinearGradient from 'react-native-linear-gradient';

import BaseComponent from '../global/BaseComponent';
class Wealth extends BaseComponent {

    constructor(props) {
        super(props);
        console.log(this.props.navigation);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
        this.state = {
            dataSource: ds.cloneWithRows(this._renderList())
        }
        this.renderRow = this._renderRow.bind(this);

        // this.props.initNavigation(this.props.navigation);
    }


    componentWillMount() {
        // this.props.initGetWebData()
        // fetch('http://sjpay.githubshop.com/app/wikilist')
        //     .then(res => res.json())
        //     .then(json => {
        //         this.props.initGetWebData(json)
        //
        //         console.log(json);
        //         //dispatch(action(json));
        //         // dispatch(fetchLoading(false));
        //     })
        //     .catch(msg => console.log('usshowList-err  ' + msg));

        this.passport_fetch('wikilist', 'GET').then(
            (data) => {
                console.log('获取信息成功');
                console.log(data);
                // this.refs.toast.show('获取信息成功');
            }
        ).catch(
            err => {
                console.log('usshowList-err  ' + err)
                // this.refs.toast.show(err);
            }
        )
    }

    passport_fetch = async (url, method, params = '') => {
        //获取存储Token
        var common_url = 'http://sjpay.githubshop.com/app/';
        let token = await global.storage.load({
            key: 'token'
        })
        console.log(token);
        let header = {
            // "Content-Type": "application/json;charset=UTF-8",
            "Content-Type": "application/form-data;charset=UTF-8",
            // 'platform': 2,
        };
        if (token.length) {
            header['token'] = token
        }
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


    _renderList() {
        var row = [];

        row.push(<Item type={1} title={'分红计划'} content={'兼顾灵活与收益'}/>);
        row.push(<PlanItem type={1} left1_title={'新手标'}
                           left2_number={'9.00%'}
                           center_top_big={15}
                           center_top_small={'天'}
                           center_bottom={'10万起投'}
                           right_top_type={1}
                           right_bottom={'剩余5万元可投'}
                           onPress={() => {

                               /*this.props.initData(1, '9.00%', 15, '10万起投', '剩余5万元可投');
                                console.log(this.props.navigation);
                                console.log(this.props.dispatch);
                                this.props.navigation.dispatch({
                                type: 'RedPlan'
                                })*/
                               // NavigationUtil1.reset(this.props.navigation,'RedPlan')
                           }}
        />);
        row.push(<PlanItem type={1} left1_title={'新手标'}
                           left2_number={'11.00%'}
                           center_top_big={27}
                           center_top_small={'天'}
                           center_bottom={'100元起投'}
                           right_top_type={1}
                           right_bottom={'剩余50万元可投'}
                           onPress={() => {
                               this.props.initData(1, '11.00%', 27, '100元起投', '剩余50万元可投');
                               this.props.navigation.dispatch({
                                   type: 'RedPlan'
                               })
                           }}
        />);

        row.push(<Item type={2} title={'稳健计划'} content={'兼顾灵活与收益'}/>);
        row.push(<PlanItem type={2}
                           left2_number={'8.00%'}
                           center_top_big={'存取灵活'}
                           center_bottom={'15元起投'}
                           right_top_type={2}
                           right_bottom={'剩余25万元可投'}

        />);


        row.push(<Item type={3} title={'定存计划'} content={'长期高回报'}/>);
        row.push(<PlanItem type={3}
                           left2_number={'12.00%'}
                           center_top_big={3}
                           center_top_small={'个月'}
                           center_bottom={'100元起投'}
                           right_top_type={3}
                           right_bottom={'剩余300万元可投'}
        />);
        row.push(<PlanItem type={3}
                           left2_number={'9.50%'}
                           center_top_big={5}
                           center_top_small={'个月'}
                           center_bottom={'100元起投'}
                           right_top_type={3}
                           right_bottom={'剩余600万元可投'}
        />);
        row.push(<PlanItem type={3}
                           left2_number={'11.00%'}
                           center_top_big={3}
                           center_top_small={'个月'}
                           center_bottom={'100元起投'}
                           right_top_type={3}
                           right_bottom={'剩余500万元可投'}
        />);

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
        {/*<ListView dataSource={this.state.dataSource}*/
        }
        //shadowRadius:5,,shadowOffset:{width:10,height:10}
        {/*renderRow={this.renderRow}/>*/
        }
        console.log(this.props.bills1);
        return (
            <View style={{backgroundColor: 'white'}}>


                <MyTabView titleColor={'black'} title={'贝米计划'} navigation={this.props.navigation}/>
                {/*<View style={{flex: 1, backgroundColor: '#00f'}}/>*/}
                {/*<View style={{height: 60}}/>*/}
                <ListView
                    style={{
                        height: Platform.OS === 'ios' ? height - 105 : height - 115,
                        paddingLeft: 10,
                        paddingRight: 10
                    }}
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
    nav: state.nav,
    bills1: state.bills1
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initData: actions.redData,
        initGetWebData: actions.fetchData,
    }, dispatch);
};


// export default connect(mapStateToProps, mapDispatchToProps)(Wealth);
export default connect(mapStateToProps, mapDispatchToProps)(Wealth);
