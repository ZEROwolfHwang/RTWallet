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
    ProgressBarAndroid,
    BackHandler
} from 'react-native';

const {width, height} = Dimensions.get('window');
import MyTabView from '../../views/MyTabView';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions_wealth} from './reduce/index';
import Wealth from './Wealth';
import {fetchRequest} from '../../utils/FetchUtil';

import BaseComponent from '../global/BaseComponent';
import ToastUtil from "../../utils/ToastUtil";
import {Api} from "../../utils/Api";

class SecondTab extends BaseComponent {


    componentWillMount() {
        fetchRequest(Api.enchashment, "GET")
            .then(res => {
                console.log(res);
                if (res.respCode === 200) {
                    this.props.initGetWebData(res.data)
                } else {
                    ToastUtil.showShort(res.respMsg)
                }
            }).catch(err => {
            console.log(err);
        });
    }


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView titleColor={'black'} leftView={false} title={'刷卡支付'}
                           navigation={this.props.navigation}/>
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
        nav: state.nav,
    }

};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initGetWebData: actions_wealth.fetchData,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(SecondTab);
