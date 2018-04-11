/**
 * Created by zerowolf on 2017/12/12.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, TextInput, Dimensions
} from 'react-native';

// import size from '../stylesUtil'
// const width = size.width;
const width = Dimensions.get('window').width;
export default class ItemAddCard extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (

            <View style={{height: 45, backgroundColor: 'white'}}>
                <View style={{
                    height: 44,
                    width: width,
                    flexDirection: 'row',
                    marginLeft:30,

                }}>
                    <Text style={{flex: 1, color: '#3e3d34', fontSize: 16, alignSelf:'center'}}>{this.props.title}</Text>
                    <TextInput
                        style={{backgroundColor:null,flex: 2, fontSize: 16, color: '#3e3d34'}}
                        placeholder={this.props.placeholder}
                        onChangeText={this.props.onChangeText}
                        value={this.props.value}
                        underlineColorAndroid={'transparent'}
                    />
                </View>

                <View style={{
                    width: width / 1.1,
                    alignSelf: 'center',
                    backgroundColor: '#e4e7e7',
                    height: this.props.imageLine ? 1 : 0
                }}/>

            </View>
        );
    }
}