/**
 * Created by zerowolf on 2017/12/13.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Platform,
    StyleSheet,
    Text, Alert,
    View,
    TouchableOpacity,
    Dimensions,
    TextInput,
} from 'react-native';
import OptionsUtil from '../../utils/OptionsUtil';
const {width, height} = Dimensions.get('window');
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Pay_Navigator} from './reduce/index';
import CutUpLine from './CutUpLine';
import TouchableUtil from '../../views/TouchableUtil';
import Icon from 'react-native-vector-icons/Ionicons'
import BaseComponent from '../global/BaseComponent'
import {zdp, zsp} from "../../utils/ScreenUtil";

class Pay_New_Plan extends BaseComponent {



    constructor(props) {
        super(props);
        this.state = {
            pay_money: 0,
            pay_split: 10
        }
    }

    render() {
        return (
            <View style={{
                backgroundColor: 'white',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start'
            }}>
                <View style={styles.viewStyle}>

                    <Text style={styles.titleStyle}>
                        还款账号
                    </Text>

                    <Text style={styles.contentStyle}>
                        622848003811654224
                    </Text>

                </View>

                <CutUpLine/>

                <View style={styles.viewStyle}>

                    <Text style={styles.titleStyle}>
                        还款类别
                    </Text>

                    <Text style={styles.contentStyle}>
                        完美还款
                    </Text>

                </View>

                <CutUpLine/>

                <View style={styles.viewStyle}>

                    <Text style={styles.titleStyle}>
                        还款总金额
                    </Text>

                    <TextInput style={{
                        width: zdp(70),
                        height: zdp(50),
                        alignSelf: 'center',
                        color: '#696b6b',
                        fontSize: zsp(16)
                    }}
                               maxLength={6}
                               keyboardType={'numeric'}
                               underlineColorAndroid={'transparent'}
                               onChangeText={(text) => this.setState({pay_money: text})}
                    >

                    </TextInput>

                </View>

                <CutUpLine/>


                <View style={styles.viewStyle}>

                    <Text style={styles.titleStyle}>
                        拆分笔数
                    </Text>
                    <View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>

                        <TouchableOpacity activeOpacity={0.5}
                                          onPress={() => {
                                              this.state.pay_split > 0 ?
                                                  this.setState({
                                                      pay_split: this.state.pay_split - 1
                                                  }) : null;
                                          }}>
                            <Icon style={{paddingLeft: zdp(10), paddingRight: zdp(10), color: '#c36920'}} size={zdp(30)}
                                  name='ios-remove'/>
                        </TouchableOpacity>
                        <View style={{
                            width: zdp(25), marginLeft: zdp(5),
                            marginRight: zdp(5), justifyContent: 'center', alignItems: 'center'
                        }}>

                            <Text style={{
                                color: '#696b6b',
                                fontSize: zsp(16)
                            }}>
                                {this.state.pay_split}
                            </Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.5}
                                          onPress={() => {
                                              // Alert.alert("123")
                                              this.state.pay_split < 36 ?
                                                  this.setState({
                                                      pay_split: this.state.pay_split + 1
                                                  }) : null;
                                          }}>

                            <Icon style={{paddingLeft: zdp(10), paddingRight: zdp(10), color: '#c36920'}} size={zdp(30)} name='ios-add'
                            />
                        </TouchableOpacity>


                    </View>

                </View>
                <TouchableUtil text={"提交"}
                               marginTop={20}
                               marginBottom={10}
                               onPress={() => {
                                   if (this.state.pay_money < 500) {
                                       Alert.alert('还款总金额不能小于500元')
                                   }
                               }}/>

            </View>
        );
    }
}
;
Pay_New_Plan.PropTypes = {
    pay_money: PropTypes.number,
    pay_split: PropTypes.number
};
const styles = StyleSheet.create({
    viewStyle: {
        padding: zdp(10),
        width: width,
        height: zdp(50),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleStyle: {
        color: '#1a1915',
        justifyContent: 'center',
        fontSize: zsp(16)
    },
    contentStyle: {
        color: '#696b6b',
        justifyContent: 'center',
        fontSize: zsp(16)
    }
});

export default connect()(Pay_New_Plan);
