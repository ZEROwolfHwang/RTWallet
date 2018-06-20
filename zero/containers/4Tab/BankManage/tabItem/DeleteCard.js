/**
 * Created by zerowolf Date: 2018/5/18 Time: 上午1:30
 */
import MyTabView from "../../../../views/MyTabView";

const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Platform, StyleSheet, TextInput,Text, Alert, View, TouchableOpacity, Image, Dimensions,ListView
} from 'react-native';
import BaseComponent from "../../../global/BaseComponent";
class DeleteCard extends BaseComponent {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
               <MyTabView title={''} leftView={true} navigation={this.props.navigation} hasRight={true}
                          onPressRight={()=>{
                              console.log('asdsa');
                          }}/>


            </View>)
    }
}
const mapStateToProps = (state) => {
    return {
        nav:state.nav
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCard);
