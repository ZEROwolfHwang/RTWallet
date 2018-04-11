/**
 * Created by zerowolf on 2017/12/11.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    Button,
    TouchableOpacity,
    Dimensions, TextInput,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Pay_Navigator} from './reduce/index'
import OptionsUtil from '../../utils/OptionsUtil';
import Item from './ItemAddCard';
import realm from '../../storage/realm';
import TouchableUtil from '../../views/TouchableUtil';

let width = Dimensions.get('window').width;
import BaseComponent from '../global/BaseComponent';
import MyTabView from '../../views/MyTabView';


class Pay_Plan_AddCard extends  BaseComponent {

    _iconClick = () => {
        Alert.alert('123')
    };

    constructor(props) {
        super(props);
        // this.props.initNavigationAction(this.props.navigation);
        this.iconClick = this._iconClick.bind(this);
        this.state = {

            data: '查询的数据',

            card_name: 'ZEROwolfHwang',
            number_id: '34082419940265X',
            number_credit_card: 0,
            number_phone: 0,
            card_validity: 0,
            card_cvn2: 0,
            card_data_repay: 0,
            card_data_bill: 0,
        };
    }

    createData = (card_name, number_id, number_credit_card, number_phone,
                  card_validity, card_cvn2, card_data_repay, card_data_bill) => {
        realm.write(() => {
            realm.create('Card', {
                card_name: card_name, number_id: number_id,
                number_credit_card: number_credit_card, number_phone: number_phone,
                card_validity: card_validity, card_cvn2: card_cvn2,
                card_data_repay: card_data_repay, card_data_bill: card_data_bill,
            });
        });

        // this.props.navigation.dispatch({
        //     type: 'Pay_New_Plan'
        // });

        // Alert.alert('添加成功');
        this.query();
    };

    render() {

        return (
            <View style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: '#e4e7e7'
            }}>
                <MyTabView titleColor={'black'} title={'添加信用卡'} leftView={true} rightView={true}
                           navigation={this.props.navigation}/>
                <Item title='持卡人姓名' placeholder='请输入姓名' imageLine={true}
                      onChangeText={(text) => this.setState({card_name: text})}
                      value={this.state.card_name}/>
                <Item title='身份证号' placeholder='请输入姓名' imageLine={false}
                      onChangeText={(text) => this.setState({number_id: text})}
                      value={this.state.number_id}/>

                <View style={{width: width, height: 40, marginLeft: 30, justifyContent: 'flex-end'}}>
                    <Text style={{fontSize: 14, color: '#696b6b', marginBottom: 10}}>
                        请填写信用卡信息
                    </Text>
                </View>
                <Item title='卡号' placeholder='请输入您的信用卡号' imageLine={true}
                      onChangeText={(text) => this.setState({number_credit_card: parseInt(text)})}
                />
                <Item title='手机号' placeholder='请输入银行预留手机号' imageLine={true}
                      onChangeText={(text) => this.setState({number_phone: parseInt(text)})}
                />
                <Item title='信用卡有效期' placeholder='例如:2101' imageLine={true}
                      onChangeText={(text) => this.setState({card_validity: parseInt(text)})}
                />
                <Item title='信用卡cvn2' placeholder='例如:123' imageLine={true}
                      onChangeText={(text) => this.setState({card_cvn2: parseInt(text)})}
                />
                <Item title='信用卡还款日' placeholder='例如:01' imageLine={true}
                      onChangeText={(text) => this.setState({card_data_repay: parseInt(text)})}
                />
                <Item title='信用卡账单日' placeholder='例如:02' imageLine={false}
                      onChangeText={(text) => this.setState({card_data_bill: parseInt(text)})}
                />

                <TouchableUtil
                    text={'提交'}
                    onPress={() => {
                        // this.submitCard()

                        // if ((this.state.number_credit_card).toString().length < 12 ||
                        //     (this.state.number_credit_card).toString().length > 19) {
                        //     Alert.alert('请正确填写信用卡号');
                        //     return;
                        // }
                        // if ((this.state.number_phone).toString().length !== 11) {
                        //     Alert.alert('请正确填写手机号码');
                        //     return;
                        // }
                        // if ((this.state.card_validity).toString().length !== 4) {
                        //     Alert.alert('请正确填写4位信用卡有效期');
                        //     return;
                        // }
                        // if ((this.state.card_cvn2).toString().length !== 3) {
                        //     Alert.alert('请正确填写3位信用卡cvn2');
                        //     return;
                        // }
                        // if ((this.state.card_data_repay).toString().length !== 2) {
                        //     Alert.alert('请正确填写2位信用卡还款日');
                        //     return;
                        // }
                        // if ((this.state.card_data_bill).toString().length !== 2) {
                        //     Alert.alert('请正确填写4位信用卡账单日');
                        //     return;
                        // }


                        this.createData(this.state.card_name,
                            this.state.number_id,
                            this.state.number_credit_card,
                            this.state.number_phone,
                            this.state.card_validity,
                            this.state.card_cvn2,
                            this.state.card_data_repay,
                            this.state.card_data_bill,
                        );
                    }}>


                </TouchableUtil>
                {/*<Button title="123" onPress={() => {*/}
                {/*this.query();*/}
                {/*}}/>*/}
                {/*<ScrollView>*/}
                {/*<Text style={{fontSize: 16, color: 'blue'}}>{this.state.data}</Text>*/}
                {/*</ScrollView>*/}
            </View>
        );
    }

    query = () => {
        let allData;

        // 获取Person对象
        let Card = realm.objects('Card');

        // 遍历表中所有数据
        for (let i = 0; i < Card.length; i++) {
            let tempData = '第' + i + '个' + Card[i].card_name + '---' +
                Card[i].number_id + '---' +
                Card[i].number_credit_card + '---' +
                Card[i].number_phone + '---' +
                Card[i].card_validity + '---' +
                Card[i].card_cvn2 + '---' +
                Card[i].card_data_repay + '---' +
                Card[i].card_data_bill + '\n';
            allData += tempData
        }

        this.setState({
            data: allData
        })
    };
}
const mapStateToProps = (state) => {
    return {
        // RS_AutoPay: state.RS_AutoPay.data,
        // data: state.RS_Nav.data,
        // navigation: state.RS_Navigate.data,
    };

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        // initNavigationAction: Pay_Navigator,
    }, dispatch);
};

Pay_Plan_AddCard.propTypes = {
    card_name: PropTypes.string,
    number_id: PropTypes.string,
    number_credit_card: PropTypes.number,
    number_phone: PropTypes.number,
    card_validity: PropTypes.number,
    card_cvn2: PropTypes.number,
    card_data_repay: PropTypes.number,
    card_data_bill: PropTypes.number,
};

const styles = StyleSheet.create({
    addBorderStyle: {
        width: width / 1.1,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderStyle: 'dashed',
        justifyContent: 'center',
        borderRadius: 5
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Pay_Plan_AddCard);
