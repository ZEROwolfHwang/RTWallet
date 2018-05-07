/**
 * Created by zerowolf on 2018/4/2.
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions, ProgressBarAndroid
} from 'react-native';

const {width, height} = Dimensions.get('window');
import MyTabView from '../../views/MyTabView';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions} from './reduce/index';
import Wealth from './Wealth';
import {fetchRequest} from '../../utils/FetchUtil';

import Storage from '../../storage/Storage';
import BaseComponent from '../global/BaseComponent';

class SecondTab extends BaseComponent {


    componentWillMount() {
        var netData = {
            "respCode": 200,
            "respMsg": "success",
            "data": {
                "title": "快捷取现",
                "description": "自动代付到账",
                "content": [
                    {
                        "id": 20,
                        "feerat": "0.38%",
                        "channelfee": "0.50",
                        "pay_type": "D0",
                        "pay_time": "立即到账",
                        "pay_limit": "500",
                        "status": 1
                    },
                    {
                        "id": 17,
                        "feerat": "0.41%",
                        "channelfee": "1.00",
                        "pay_type": "D0",
                        "pay_time": "立即到账",
                        "pay_limit": "100",
                        "status": 1
                    },
                    {
                        "id": 7,
                        "feerat": "0.38%",
                        "channelfee": "0.20",
                        "pay_type": "D0",
                        "pay_time": "立即到账",
                        "pay_limit": "100",
                        "status": 0
                    }
                ]
            }
        }
        fetchRequest('enchashment ', 'GET')
            .then(res => {
                if (res.respCode === 200) {
                    this.props.initGetWebData(res.data)
                } else {
                    this.props.initGetWebData(netData)
                }
            })
            .then(err => {
                if (err) {
                    console.log(err);
                }
            });

    }


    constructor(props) {


        super(props);
        // this.props.initGetWebData(netData);

        // let token = global.storage.load({
        //     key: 'token'
        // });
        // console.log(token);
    }


    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView titleColor={'black'} title={'刷卡取现'} navigation={this.props.navigation}/>
                {/*<View style={{flex: 1, backgroundColor: '#00f'}}/>*/}
                {/*<View style={{height: 60}}/>*/}
                {this.props.bills
                    ? <Wealth navigation={this.props.navigation}/>
                    : <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ProgressBarAndroid styleAttr="Inverse"/>
                    </View>
                }

            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        bills: state.bills.data,
        nav:state.nav,
    }

};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initGetWebData: actions.fetchData,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(SecondTab);
