/**
 * Created by zerowolf Date: 2018/5/13 Time: 下午3:48
 */
import {cusColors} from "../value/cusColor/cusColors";

const {width, height} = Dimensions.get('window');
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions,ListView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {zdp, zsp} from "../utils/ScreenUtil";
export default class ItemIconTextIconView extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {
        title:'条目',
        globalColor:'grey',  //title字体的颜色
        iconName:'home',
        iconColor:cusColors.linear_default,
        iconSize:zdp(25),
        onPress: null,
        style:{}
    }

    render() {
        var params  = this.props;
        return  <TouchableOpacity activeOpacity={0.8} style={[{width,height:zdp(45), marginTop:zdp(20),flexDirection:'row',backgroundColor:'white',justifyContent:'center',alignItems:'center',
        elevation:2,
        shadowOffset:{width:zdp(5),height:zdp(5)},
        shadowColor: cusColors.shadowColor,
        shadowOpacity: 0.6,
        shadowRadius: 2,},params.style]}
                                  onPress={()=>{
                                      params.onPress();
                                  }}>
            <View style={{
                width: zdp(45),
                height: zdp(45),
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Icon size={params.iconSize} name={params.iconName}
                  style={{color: params.iconColor,backgroundColor: 'transparent'}}/>
            </View>
            <Text style={{flex: 1,fontSize:zsp(16), color:params.globalColor,textAlign:'left',
            }}>{params.title}</Text>
            <Icon size={zdp(20)} name={'angle-right'}
                  style={{color: 'lightgrey', marginRight: zdp(20),backgroundColor: 'transparent'}}/>
        </TouchableOpacity>


    }
}
ItemIconTextIconView.propTypes={
    title:PropTypes.string.isRequired,
    style: PropTypes.object,
    globalColor:PropTypes.string,
    iconName:PropTypes.string.isRequired,
    iconColor:PropTypes.string,
    iconSize:PropTypes.number,
    onPress: PropTypes.func.isRequired,
}

