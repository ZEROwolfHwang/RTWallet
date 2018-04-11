/**
 * Created by zerowolf on 2017/12/25.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text, Alert,
    View,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'
const {width, height}= Dimensions.get('window');
export default class Navigator extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{
                justifyContent:'center',
                alignItems:'center',

            }}>

                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height:40
                    }}
                    onPress={() => {
                        this.props.onPress();
                    }}>
                    <Image style={{width: 25, height: 25, marginLeft: 20, alignSelf:'center'}}
                           source={this.props.image}/>
                    <Text style={{flex: 1, fontSize: 13, color: '#3d3f3f', marginLeft: 20}}>{this.props.title}</Text>
                    <Icon size={20} name={'angle-right'} style={{height:20,width:20,color: '#a9adad',marginRight:10}}/>

                </TouchableOpacity>

                <View style={{width:width-80,height:this.props.line?1:0,backgroundColor:'#edf0f0', alignSelf:'flex-end',justifyContent:'flex-end'}}/>
            </View>
        );
    }
}
