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

export default class CardBean extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let {...params} = this.props;
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                style={{
                    width: width / 1.05,
                    height: 90,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    justifyContent: 'center',
                    borderRadius: 5,
                    backgroundColor: 'white',
                    flexDirection: 'column'
                }}
                onPress={()=>{
                    this.props.onPress();
                }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    marginLeft: 20,
                    marginTop: 10,
                    flexDirection: 'row'
                }}>
                    <Image style={{width: 35, height: 35, alignSelf: 'center'}} resizeMode={'contain'}
                           source={require('../../../resource/image/unionPay.png')}/>
                    <Text style={{color: '#00f', fontSize: 15, marginLeft: 5, alignSelf: 'center'}}>交通银行</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{
                        fontSize: 16,
                        color: '#00f',
                        marginLeft: 20
                    }}>{params.number_credit_card }</Text>
                    <Text style={{marginRight: 20, fontSize: 14, color: '#696b6b'}}>还款日: {params.card_data_repay}
                        账单日: {params.card_data_bill}</Text>
                </View>

            </TouchableOpacity>
        );
    }
}