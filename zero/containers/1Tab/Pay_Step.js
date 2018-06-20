/**
 * Created by zerowolf on 2017/12/11.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Alert
} from 'react-native';
import s from '../../styles/AllStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import BaseComponent from '../global/BaseComponent';
import MyTabView from '../../views/MyTabView';
import {zsp} from "../../utils/ScreenUtil";
export default class Pay_Step extends BaseComponent {


    componentDidMount() {

    }

    _reload() {
        // Alert.alert('121121212')
        _this.setState({
            name:_this.state.name+'ppppp'
        })

    }
_reload1() {
        Alert.alert('121121212')
        // _this.setState={
        //     nameaa:_this.nameaa+'pppppp'
        // }
    }

    // componentDidMount() {
    //     this.props.navigation.setParams({
    //         handleThis: this.changeButtonColorHandler
    //     });
    // }


    constructor(props) {
        super(props);
        _this = this;
        _this.state={
            nameaa:'rrrrr',
            name:'wwww'
        }
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <MyTabView titleColor={'black'} title={'操作步骤'} leftView={true} rightView={true}
                           navigation={this.props.navigation}/>

                <Button title="777" onPress={()=>{
                    _this._reload();
                }} />
                <Text style={{color: 'blue', fontSize: zsp(18)}}>
                    操作步骤 !{this.state.name+''}
                </Text>
            </View>
        )
    }
}
