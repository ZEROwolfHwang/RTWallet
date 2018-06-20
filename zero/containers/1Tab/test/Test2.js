/**
 * Created by zerowolf Date: 2018/6/19 Time: 下午11:03
 */
import MyButtonView from "../../../views/MyButtonView";

/**
 * Created by zerowolf Date: 2018/5/16 Time: 下午2:57
 */
const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Platform, StyleSheet, TextInput,Text, Alert, View, TouchableOpacity, Image, Dimensions,ListView
} from 'react-native';
import {NavigationActions} from "react-navigation";
import MyTabView from "../../../views/MyTabView";

export default class Test2 extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {

    };

    render() {
        console.log(this.props.navigation.state);;
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView title={'Test2'} navigation={this.props.navigation}/>
                <MyButtonView title={'Test2'} onPress={()=>{
                    this.props.navigation.goBack();
                }}/>
            </View>)
    }
}
Test2.propTypes = {

}
