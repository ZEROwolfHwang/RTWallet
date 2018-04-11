/**
 * Created by zerowolf on 2017/12/12.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
const {width, height} = Dimensions.get('window');

export default class ItemManager extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {...params} = this.props;
        return (
            <View
                style={{
                    marginTop:10,
                    width: width -20,
                    height: 90,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    justifyContent: 'center',
                    alignSelf:'center',
                    borderRadius: 5,
                    backgroundColor: 'white',
                    flexDirection: 'column'
                }}>

                <View style={{
                    flex: 1,
                    marginTop: 10,
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1, justifyContent: 'flex-start',
                        flexDirection: 'row',
                        marginLeft: 20,
                    }}>

                        <Image style={{width: 35, height: 35, alignSelf: 'center'}} resizeMode={'contain'}
                               source={require('../../../resource/image/image_phone.png')}/>
                        <Text style={{color: '#00f', fontSize: 15, marginLeft: 5, alignSelf: 'center'}}>{params.card_phone}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        flex: 1, justifyContent: 'flex-end',
                        marginRight:20,
                        marginLeft: 20,
                    }}>

                        <TouchableOpacity activeOpacity={0.5}
                                          style={{alignSelf:'center'}}
                                          onPress={()=>{
                                              {params.card_complete()}
                                          }}>

                        <Text style={{color: 'red', fontSize: 14, marginLeft: 5}}>完善资料</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.5}
                                          style={{alignSelf:'center'}}
                                          onPress={()=>{
                                              {this.props.card_delete(params.card_number)}
                                          }}>
                        <Text
                            style={{color: 'red', fontSize: 14, marginLeft: 5}}>删除</Text>

                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',marginBottom:10}}>
                    <Text style={{
                        fontSize: 18,
                        color: '#21201b',
                        alignSelf:'center',
                        marginLeft: 40
                    }}>{params.card_number }</Text>
                    <Text style={{marginRight: 20, fontSize: 18, color: '#21201b',alignSelf:'center'}}>招商银行</Text>
                </View>

            </View>
        );
    }
}