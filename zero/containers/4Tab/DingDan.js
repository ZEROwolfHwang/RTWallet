/**
 * Created by zerowolf on 2018/1/7.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text, Alert,
    View,
    TextInput,
    Image,
    TouchableOpacity,
} from 'react-native';
// import PropTypes from 'prop-types'
import SizeUtil from '../../utils/SizeUtil';
import OptionsUtil from '../../utils/OptionsUtil';
import ButtonView from '../../view/ButtonView';
import Icon from "react-native-vector-icons/Ionicons";

import MyTabView from '../../view/MyTabView';
import MyTextInput from '../../view/MyTextInput'
import moment from 'moment';

import DateTimePicker from 'react-native-modal-datetime-picker';
import {zdp, zsp} from "../../utils/ScreenUtil";
export default class DingDan extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
            headerTitle: '账单',
            header: null,
            headerBackTitle: null,
        }
    );

    // static navigationOptions = ({navigation}) =>
    //     OptionsUtil.Options(navigation, 'md-arrow-back', 'md-more', '订单详情列表', () => {
    //         console.log(navigation);
    //         navigation.goBack()
    //         }, () => {
    //
    //         }
    //     );

    constructor(props) {
        super(props);

        this.state = {
            textColor_start: true,
            textColor_end: true,
            time_start: '起始时间',
            time_end: '结束时间',
            isDateTimePickerVisible: false,
            openType: 'start',
            zonge: ''
        };
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView titleColor={'black'} color1={'white'} color2={'white'} title={'订单明细'} leftView={true} rightView={true}
                           navigation={this.props.navigation}/>

                <View style={{width: SizeUtil.width, height: zdp(100), backgroundColor: 'white', flexDirection: 'column'}}>

                    <View style={{
                        height: zdp(50), marginTop: zdp(10), flexDirection: 'row',
                        justifyContent: 'space-around', alignItems: 'center', paddingLeft: zdp(10), paddingRight: zdp(10)
                    }}>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => {
                                this.showDateTimePicker();
                                this.setState({openType: 'start'})
                            }}
                            style={styles.timeText_contain}>
                            <Text
                                style={[styles.timeText_style, {color: this.state.textColor_start ? 'grey' : 'black',}]}
                            >
                                {this.state.time_start}
                            </Text>
                        </TouchableOpacity>
                        <Icon style={{paddingLeft: zdp(10), paddingRight: zdp(10), color: '#c36920'}} size={zdp(30)}
                              name='ios-remove'/>
                        <TouchableOpacity activeOpacity={0.5}
                                          onPress={() => {
                                              this.showDateTimePicker();
                                              this.setState({openType: 'end'})
                                          }}
                                          style={[styles.timeText_contain, {alignItems: 'flex-end',}]}>
                            <Text style={[styles.timeText_style, {color: this.state.textColor_end ? 'grey' : 'black',}]}
                            >
                                {this.state.time_end}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        height: zdp(45),
                        justifyContent: 'space-around',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: zdp(10),
                        paddingRight: zdp(10)
                    }}>
                        <Text style={styles.searchTextStyle}
                              onPress={() => {
                                  this.setState({zonge: 100000})
                              }
                              }>查询</Text>
                        <Text style={styles.dateTextStyle}>本周</Text>
                        <Text style={styles.dateTextStyle}>本月</Text>
                        <View style={{
                            flex: 1,
                            paddingLeft: zdp(10),
                            justifyContent: 'flex-end',
                            flexDirection: 'row',
                            paddingRight: zdp(10),
                            borderRadius: zdp(5)
                        }}
                        >
                            <Text style={{flexWrap: 'wrap', fontSize: zsp(16), paddingLeft: zdp(10), color: 'red'}}>总额:
                                ¥{this.state.zonge}</Text>
                        </View>
                    </View>
                </View>
                {/*cover: 在保持图片宽高比的前提下缩放图片，直到宽度和高度都大于等于容器视图的尺寸（如果容器有padding内衬的话，则相应减去）。译注：这样图片完全覆盖甚至超出容器，容器中不留任何空白。*/}

                {/*contain: 在保持图片宽高比的前提下缩放图片，直到宽度和高度都小于等于容器视图的尺寸（如果容器有padding内衬的话，则相应减去）。译注：这样图片完全被包裹在容器中，容器中可能留有空白*/}

                {/*stretch: 拉伸图片且不维持宽高比，直到宽高都刚好填满容器。*/}

                {/*repeat: 重复平铺图片直到填满容器。图片会维持原始尺寸。仅iOS可用。*/}

                {/*center: 居*/}
                <View style={{flex:1,backgroundColor:'#f2f2f2'}}>

                <Image style={{flex: 1,width:SizeUtil.width}} resizeMode={'center'} source={require('../../AImages/unnotes.png')}/>
                </View>

                {this.renderDateTimePicker(this.state.openType)}
            </View>
        );
    }

    renderDateTimePicker(type) {
        return (
            <DateTimePicker
                titleIOS={'选择时间'}
                mode={'date'}
                isVisible={this.state.isDateTimePickerVisible}
                // onConfirm={this.handleDatePicked(type).bind(this)}
                onConfirm={(date) => {
                    this.handleDatePicked(date, type);
                }}
                onCancel={this.hideDateTimePicker.bind(this)}/>
        )
    }

    showDateTimePicker() {
        this.setState({isDateTimePickerVisible: true})
    }

    hideDateTimePicker() {
        // console.warn('安卓隐藏');
        this.setState({isDateTimePickerVisible: false})
    }

    handleDatePicked(date, type) {
        this.hideDateTimePicker();
        var DateFormat = moment(date).format("YYYY-MM-DD");
        if (type === 'start') {
            this.setState({time_start: DateFormat});
            this.setState({textColor_start: false});
        } else {
            this.setState({time_end: DateFormat});
            this.setState({textColor_end: false});

        }
    }
}

const styles = StyleSheet.create({
    textInputStyle: {
        width: SizeUtil.width - zdp(20),
        height: zdp(40),
        backgroundColor: 'white',
        marginTop: zdp(10),
    },
    timeText_contain: {
        flex: 1,
        height: zdp(40),
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderRadius: zdp(5),
        borderColor: 'blue',
    },
    timeText_style: {
        fontSize: zsp(16),
        paddingLeft: zdp(10),
        paddingRight: zdp(10),
    },
    dateTextStyle: {
        color: '#00bfff',
        textDecorationLine: 'underline',
        fontSize: zsp(16),
        paddingLeft: zdp(10),
        paddingRight: zdp(10),
        borderRadius: zdp(5)
    },
    searchTextStyle: {
        backgroundColor: '#00bfff', color: 'white', fontSize: zsp(16), paddingLeft: zdp(10), paddingRight: zdp(10), borderRadius: zdp(5)
    }
});
