/**
 * Created by zerowolf on 2017/12/11.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    Button,
    TouchableOpacity,
    Dimensions,
    ListView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Pay_Navigator} from './reduce/index'
import OptionsUtil from '../../utils/OptionsUtil';
import CardBean from './CardBean';
import realm from '../../storage/realm';
import NavigationUtil from '../../utils/NavigationUtil';
import BaseComponent from '../global/BaseComponent';
import MyTabView from '../../views/MyTabView';
import {zdp, zsp} from "../../utils/ScreenUtil";


let width = Dimensions.get('window').width;
var row = [];
class Pay_Plan extends BaseComponent {



    _iconClick = () => {
        // Alert.alert('123')
    };

    constructor(props) {
        super(props);
        // this.props.initNavigationAction(this.props.navigation);
        this.iconClick = this._iconClick.bind(this);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
        this.state = {
            dataSource: ds.cloneWithRows(this._renderList()),
        }

        this.renderRow = this._renderRow.bind(this);
    }

    componentDidUpdate() {
        // Alert.alert('123')
    }
    // componentDidMount() {
    //     super
    // }






    componentWillUnmount() {
    }






    componentWillReceiveProps(nextProps) {
        // Alert.alert('789')
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this._renderList())
        });

    }

    componentWillMount() {
        // Alert.alert('000')
        console.log(this.props.navigation.state.params.id);
    }


    _renderList() {

        row = [];
        // _that = this;

        // 获取Card对象
        let Card = realm.objects('Card');

        // 遍历表中所有数据
        for (let i = 0; i < Card.length; i++) {
            row.push(<CardBean
                number_credit_card={Card[i].number_credit_card}
                card_data_repay={Card[i].card_data_repay}
                card_data_bill={Card[i].card_data_bill}
                onPress={() => {
                    this.props.navigation.dispatch({
                        type: 'Pay_New_Plan'
                    })
                }}
            />)
        }

        row.push(<TouchableOpacity activeOpacity={0.5}
                                   onPress={() => {
                                       // this.props.navigation.goBack();
                                       this.props.navigation.dispatch({
                                           type: 'Pay_Plan_AddCard'
                                       });
                                   }}
                                   style={[styles.addBorderStyle,{marginTop:row.length===0?0:10}]}>
            <Text style={{color: 'gray', fontSize: zsp(18), alignSelf: 'center'}}>
                + 添加信用卡
            </Text>
        </TouchableOpacity>);

        return row;
    }

    /**
     * @description 设置下一步按钮的可点击状态
     * @data {jQuery} $btn
     **/
    _renderRow(data) {
        return (
            <View style={{
                marginTop: zdp(10)
            }}>{data}</View>
        );
    }

// 删除
    deleteAllCard() {
        realm.write(() => {
            // 获取Person对象
            let Card = realm.objects('Card');
            // 删除
            realm.delete(Card);
        })
    }

    render() {
        // Alert.alert('000100000')
        console.log(this.props.nav);
        return (
            <View style={{flex: 1, marginTop: zdp(10), justifyContent: 'flex-start', alignItems: 'center'}}>
               {/* <MyTabView titleColor={'black'} title={'还款计划'} leftView={true} rightView={true}
                           navigation={this.props.navigation}/>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                />
                <TouchableOpacity onPress={() => {
                    this.deleteAllCard();
                    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
                    this.setState({
                        dataSource:ds.cloneWithRows(this._renderList())
                    })
                }}>
                    <Text>删除所有卡片</Text>
                </TouchableOpacity>*/}
                <Text>usaiudu</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        nav:state.nav
        // RS_AutoPay: state.RS_AutoPay.data,
        //data: state.RS_Nav.data,




        // navigation: state.RS_Navigate.data,
    };

};



const styles = StyleSheet.create({
    addBorderStyle: {
        marginTop: zdp(10),
        width: width / 1.1,
        height: zdp(50),
        borderColor: 'gray',
        borderWidth: 1,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 20,
        borderRadius: zdp(5)
    }
});

export default connect(mapStateToProps)(Pay_Plan);
