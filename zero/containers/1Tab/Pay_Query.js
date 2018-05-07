/**
 * Created by zerowolf on 2017/12/11.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {connect} from 'react-redux';
import BaseComponent from '../global/BaseComponent';
import MyTabView from '../../views/MyTabView';
 class Pay_Query extends BaseComponent{
    constructor(props){
        super(props);

    }

    render(){
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView titleColor={'black'} title={'还款进度查询'} leftView={true} rightView={true}
                           navigation={this.props.navigation}/>
                <Text style={{color: 'blue', fontSize: 18}}>
                    还款进度查询 !
                </Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        nav:state.nav
    }

};

export default connect(mapStateToProps)(Pay_Query);
