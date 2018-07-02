/**
 * Created by zerowolf Date: 2018/5/11 Time: 上午1:07
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions, ListView, FlatList
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {bindActionCreators} from 'redux';
import BaseComponent from "../../global/BaseComponent";
import MyTabView from "../../../views/MyTabView";
import MyProgressBar from "../../../views/MyProgressBar";
import {actions_card} from "../../reduce/CardReduce";
import {getDebitCardList} from "../../../storage/schema_card";
import realm from "../../../storage/realm";
import {zdp, zsp} from "../../../utils/ScreenUtil";

const {width, height} = Dimensions.get('window');
var data = null;
var params = null;

class CardDefault extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            defaultIndex: 0
        }
        this.pressSetDefault = this._pressSetDefault.bind(this);
    }

    componentWillMount() {
        params = this.props.navigation.state.params;
        let globalInfo = this.props.globalInfo;

        console.log(params);
        if (params.cardType === 0) {
            data = getPayCardList(globalInfo.phone);

            console.log(data);
        } else {
            data = getDebitCardList(globalInfo.phone);
            console.log(data);
        }
        for (const datum of data) {
            console.log(datum);
        }
    }


    _renderItem = (item, index) => {
        // console.log(item);

        let itemData = item.item;
        let bankName = itemData.bank;
        let bankCard = itemData.bankCard;
        let cardLast = bankCard.substr(bankCard.length - 4);
        // console.log(cardLast);
        // console.log(bankName);
        console.log(item.index);
        console.log(index);
        return (<TouchableOpacity activeOpacity={0.8}
                                  style={{
                                      width,
                                      height: zdp(60),
                                      backgroundColor: 'white',
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      alignItems: 'center'
                                  }}
                                  onPress={() => {
                                      this.pressSetDefault(bankCard, item.index)
                                  }}>
            <Text style={{
                marginLeft: zdp(20),
                flex: 1, textAlign: 'left',
                textAlignVertical: 'center',
                color: 'black',
                fontSize: zsp(16)
            }}>{`${bankName}(${cardLast})`}</Text>

            {itemData.cardDefault === 0 ?
                <Icon size={zdp(20)} name={'check'}
                      style={{
                          color: 'red',
                          marginRight: zdp(20),
                          backgroundColor: 'transparent'
                      }}/> : null
            }
        </TouchableOpacity>)
    };
    _separator = () => {
        return <View style={{height: zdp(1), width, marginLeft: zdp(20), backgroundColor: 'lightgrey'}}/>;
    };


    /**
     * 点击设置当前点击项为默认
     */
    _pressSetDefault(bankCard, index) {
        // let payCardByCard = getPayCardByCard(bankCard);
        console.log(index);
        // console.log(payCardByCard);
        realm.write(() => {
            let allCard = realm.objects('Card');
            let filterList = allCard.filtered(`bankCard == '${bankCard}'`);
            let filterListDefault = allCard.filtered(`cardType == 1`);

            filterList[0].cardType = 1;
            filterListDefault[0].cardType = 0;

        });

    };

    render() {
        // console.log(data);
        // data = this.props.cardList;
        var defaultMark = [];
        for (let i = 0; i < data.length; i++) {
            defaultMark.push({index: i})
        }

        return (data ?
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView titleColor={'black'}
                           title={`${params.cardType === 0 ? '默认支付卡' : '默认结算卡'}`}
                           leftView={true}
                           navigation={this.props.navigation}/>

                <FlatList
                    style={{flex: 1}}
                    ref={(flatList) => this._flatList = flatList}
                    ItemSeparatorComponent={this._separator}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    data={data}>
                </FlatList>

            </View> : <MyProgressBar/>)
    }

}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo.data,
        cardList: state.cardList.data
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        // initCardList: actions_card.getCardList
    }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(CardDefault);
