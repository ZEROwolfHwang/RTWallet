/**
 * Created by zerowolf Date: 2018/5/14 Time: 下午11:14
 */
import React, {Component} from "react";
import {ListView, StyleSheet, TouchableOpacity} from "react-native";
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    View,
    List,
    ListItem,
    Text,
    Left,
    Right,
    Body
} from "native-base";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getDebitCardDefault, getDebitCardList, getPayCardList} from "../../../storage/schema_card";
import BaseComponent from "../../global/BaseComponent";
import realm from "../../../storage/realm";
import ItemCard from "./tabItem/ItemCard";
import MyTabView from "../../../views/MyTabView";
import {zdp} from "../../../utils/ScreenUtil";

var cardList = null;
var phone = '13255556666';
var cardType = null;


class MultiListSwipe extends BaseComponent {

    constructor(props) {
        super(props);

        // realm.write(() => {
        //     let Persons = realm.objects('Card');
        //     // 删除
        //     realm.delete(Persons);
        //
        //     realm.create('Card', {
        //         loginPhone: '13255556666',   //登录手机号
        //         bankPhone: '13262975235',   //预留手机号
        //         bankCard: '6228480038115651222',//银行卡号
        //         bank: '交通银行',//所属银行
        //         cardType: 1,//0  支付卡     1 储蓄卡
        //         cardDefault: 1
        //     })
        // });
        //
        //
        // for (let i = 0; i < 5; i++) {
        //     realm.write(() => {
        //         realm.create('Card', {
        //             loginPhone: '13255556666',   //登录手机号
        //             bankPhone: '13262975235',   //预留手机号
        //             bankCard: '622848003811565127' + i,//银行卡号
        //             bank: '招商银行' + i,//所属银行
        //             cardType: 1,//0  支付卡     1 储蓄卡
        //             cardDefault: 0
        //         })
        //     })
        // }

        let globalInfo = this.props.globalInfo;
        let params = this.props.navigation.state.params;

        phone = globalInfo.phone;

        cardType = params.cardType;

        // cardList = getDebitCardList(phone);
         if (params.cardType === 0) {

             cardList = getPayCardList(phone);
         } else {

             cardList = getDebitCardList(phone);
         }


        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            basic: true,
            listViewData: cardList
        };
    }

    componentWillMount() {


    }

    deleteRow(data, secId, rowId, rowMap) {
        console.log(rowId);
        console.log(data);
        realm.write(() => {
            realm.delete(data);
        })


        rowMap[`${secId}${rowId}`].props.closeRow();
        // const newData = [...this.state.listViewData];
        // newData.splice(rowId, 1);
        // this.setState({listViewData: newData});
         if (cardType === 0) {

           cardList = getPayCardList(phone);
       } else {

           cardList = getDebitCardList(phone);
       }
        this.setState({listViewData: cardList});
    }


    pressSetDefault(data) {
        console.log('sakas');
        console.log(data);
        let cardDefault = getDebitCardDefault(phone);
        console.log(cardDefault);
        realm.write(() => {
            if (cardDefault) {
                cardDefault.cardDefault = 0;
            }
            data.cardDefault = 1;

        });
    }

    render() {
        return ( <Container style={styles.container}>

                <MyTabView title={'卡片管理'} navigation={this.props.navigation}/>


                <Content style={{marginTop:zdp(10)}}>
                    <List
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={data =>
                            <ListItem style={{paddingLeft: zdp(20)}}
                                      showsVerticalScrollIndicator={false}>
                                <ItemCard cardName={data.bank}
                                          cardId={data.bankCard}/>
                            </ListItem>}
                        renderLeftHiddenRow={data =>
                            <Button
                                full
                                onPress={_ => this.pressSetDefault(data)}
                                style={{
                                    backgroundColor: "#CCC",
                                    flex: 1,
                                    width: zdp(100),
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <Text style={{textAlign: 'left', marginLeft: -zdp(20)}}>
                                    设为默认
                                </Text>
                                {/*<Icon active name="information-circle"/>*/}
                            </Button>}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button
                                full
                                danger
                                onPress={_ => this.deleteRow(data, secId, rowId, rowMap)}
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <Icon active name="trash"/>
                            </Button>}
                        leftOpenValue={75}
                        rightOpenValue={-75}
                    />
                </Content>
                <TouchableOpacity activeOpacity={0.6}
                                  style={{width:zdp(60),height:zdp(60),backgroundColor:'lightblue', borderRadius:zdp(30),right:zdp(20),bottom:zdp(20),position:'absolute',elevation: zdp(5),
                                  shadowOffset:{width: zdp(5),height:5},
                                  shadowColor: 'grey',
                                  shadowOpacity: 0.6,
                                  shadowRadius: 2,
                                  justifyContent:'center',
                                  alignItems:'center'}}
                                  onPress={this.pressAddCard}>

  <Ionicons size={zdp(30)} name={'md-add'}
          style={{color: 'blue', backgroundColor: 'transparent'}}/>
                </TouchableOpacity>
            </Container>
        );
    }

    pressAddCard=()=>{
        this.props.navigation.navigate('addPayCard', {cardType: cardType})
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"
    },
    text: {
        alignSelf: "center",
        marginBottom: zdp(7)
    },
    mb: {
        marginBottom: zdp(15)
    }
})

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo.data,
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MultiListSwipe);

