/**
 * Created by zerowolf Date: 2018/5/23 Time: 下午11:56
 */
import MyTabView from "../../../../views/MyTabView";

const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Platform,
    StyleSheet,
    TextInput,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ListView,
    CheckBox
} from 'react-native';
import BaseComponent from "../../../global/BaseComponent";
import {
    deleteGestureLogin,
    getGestureData,
    isGestureLogin
} from "../../../../storage/schema_gesture";
import realm from "../../../../storage/realm";
import {zdp, zsp} from "../../../../utils/ScreenUtil";

class PageGesture extends BaseComponent {

    constructor(props) {
        super(props);

        // Alert.alert(realm.path);
        console.log(realm.path);

        let isGesture = isGestureLogin();

        this.state = {
            isCheck: isGesture
        }
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView title={'设置手势密码'} navigation={this.props.navigation}/>

                <View style={{
                    marginTop: zdp(20),
                    width,
                    height: zdp(60),
                    backgroundColor: 'white',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>

                    <Text style={{color: 'grey', marginLeft: zdp(20), fontSize: zsp(18)}}>使用手势密码解锁</Text>

                    <CheckBox
                        style={{marginRight: zdp(10)}}
                        value={this.state.isCheck}
                        onChange={this.pressCheckChange}/>

                </View>

                {this.state.isCheck ?
                    <TouchableOpacity activeOpacity={0.9}
                                      style={{
                                          marginTop: zdp(20),
                                          width,
                                          height: zdp(60),
                                          backgroundColor: 'white',
                                          justifyContent: 'space-between',
                                          alignItems: 'center',
                                          flexDirection: 'row'
                                      }}
                                      onPress={this.pressChangeGesturePsw}>

                        <Text style={{color: 'grey', marginLeft: zdp(20), fontSize: zsp(18)}}>修改手势密码</Text>

                        <Icon size={zdp(30)} name={'angle-right'}
                              style={{
                                  color: 'black',
                                  marginRight: zdp(10),
                                  backgroundColor: 'transparent'
                              }}/>
                    </TouchableOpacity>
                    : null
                }
            </View>);
    }

    /**
     * 点击CheckBox改变CheckBox的状态
     */
    pressCheckChange = () => {
        if (this.state.isCheck) {   //点击前就是选中状态(手势密码登录)
            this.setState({
                isCheck: false
            });
            deleteGestureLogin();   //删除数据库中的手势密码
        } else {
            this.setState({
                isCheck: true
            });
            this.props.navigation.navigate('PageSetGesturePsw', {
                type:1,
                onGoBack: () => {
                    console.log(isGestureLogin());
                    getGestureData();
                    if (isGestureLogin()) {
                        this.setState({
                            isCheck: true
                        });
                    } else {
                        this.setState({
                            isCheck: false
                        });

                    }
                }
            });

        }
    };

    /**
     * 修改手势密码(进入修改手势密码的界面)
     */
    pressChangeGesturePsw = () => {
        this.props.navigation.navigate('PageChangeGesturePsw', {
                onGoBack: () => {
                    console.log(isGestureLogin());
                    getGestureData();
                    if (isGestureLogin()) {
                        this.setState({
                            isCheck: true
                        });
                    } else {
                        this.setState({
                            isCheck: false
                        });

                    }
                }
            }
        );
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PageGesture);
