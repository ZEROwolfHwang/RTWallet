/**
 * Created by zerowolf Date: 2018/6/20 Time: 上午9:24
 */
import {
    getBankABC,
    getBankDetach,
    getBankDetachClose, getBankMarkByBankName,
    getBankName,
    getBankType
} from "../../../../utils/BankUtil";

/**
 * Created by zerowolf Date: 2018/5/16 Time: 下午2:57
 */
const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Platform,
    StyleSheet,
    TextInput,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ListView,
    ScrollView, Modal, RefreshControl
} from 'react-native';
import {bankColor} from "../../../../value/cusColor/cusColors";
import {zdp, zModalHeight, zModalMarginTop, zsp} from "../../../../utils/ScreenUtil";
import ZText from "../../../../views/ZText";
import realm from "../../../../storage/realm";
import {
    getCreditCardDefault,
    getDebitCardDefault, getDebitCardList,
} from "../../../../storage/schema_card";
import {deleteCard} from "./DeleteCardUtil";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

let globalInfo;

class BankCardItem extends Component {

    constructor(props) {
        super(props);

        globalInfo = this.props.globalInfo;

        this.state = {
            isRefreshing: false
        }

    }

    static defaultProps = {};

    viewCardList = (cardList) => {
        console.log(cardList);
        console.log(...cardList);

        var cardListRow = [];
        for (const index in cardList) {
            let cardItem = cardList[index];
            let bankCard = cardItem.bankCard;
            let bankName = cardItem.bank;
            let bankMark = cardItem.bankMark;
            let cardType = cardItem.cardType;

            let bankDetach = getBankDetach(bankCard);
            let bankDetachClose = getBankDetachClose(bankCard);

            // let bankCard_start = bankCard.substr(0, bankCard.length - 4);
            // let bankCard_Last = bankCard.substr(bankCard.length - 4);
            // let str_bankName = getBankName(cardItem.bank);
            let bankABC = getBankABC(bankName);
            if (!bankABC) {
                bankABC = 'cardlogo'
            }

            // getBankMarkByBankName()

            // let str_bankType = getBankType(cardItem.bank);

            cardListRow.push(
                <TouchableOpacity key={index}
                                  activeOpacity={0.8}
                                  style={{
                                      width: width - zdp(20),
                                      height: zdp(100),
                                      backgroundColor: bankColor[bankABC],
                                      borderRadius: zdp(5),
                                      marginBottom: zdp(5)
                                  }}
                                  onPress={() => {
                                      this.setState({
                                          showModal: true
                                      })
                                      this.currentCard = cardItem;
                                  }}>
                    <Image source={{uri: bankABC}}
                           resizeMode={'contain'}
                           style={{
                               width: Platform.OS === 'ios' ? zdp(120) : zdp(150),
                               height: Platform.OS === 'ios' ? zdp(120) : zdp(150),
                               margin: zdp(10),
                               backgroundColor: 'transparent',
                               position: 'absolute',
                               right: zdp(20),
                               alignSelf: 'center',
                               bottom: Platform.OS === 'ios' ? -zdp(15) : -zdp(30),
                               opacity: 0.1
                           }}/>

                    {cardItem.isDefault ?
                        <View style={{
                            borderWidth: zdp(1),
                            borderRadius: zdp(1),
                            borderColor: 'white',
                            padding: zdp(5),
                            paddingTop: zdp(2),
                            paddingBottom: zdp(2),
                            position: 'absolute',
                            top: zdp(10),
                            right: zdp(20),
                        }}>
                            <ZText content={'默认卡'} fontSize={zsp(15)} color={'white'}/>
                        </View>
                        : null}

                    <View style={{
                        flex: 1,
                        paddingTop: zdp(15),
                        paddingLeft: zdp(15),
                        width: width - zdp(20),
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        flexDirection: 'row'
                    }}>

                        <View style={{
                            backgroundColor: 'white',
                            opacity: 0.8,
                            width: zdp(40),
                            height: zdp(40),
                            borderRadius: zdp(30),
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>

                            <Image source={{uri: bankABC}}
                                   resizeMode={'contain'}
                                   style={{width: zdp(35), height: zdp(35)}}/>
                        </View>

                        <View style={{flex: 1, marginLeft: zdp(5)}}>

                            <Text style={{fontSize: zsp(16), color: 'white'}}>
                                {bankName}
                            </Text>
                            <Text
                                style={{
                                    fontSize: zsp(14),
                                    marginTop: zdp(2),
                                    color: '#ffffff66'
                                }}>{cardType === 'DC' ? '储蓄卡' : '信用卡'}</Text>


                            <Text style={{
                                fontSize: zsp(22),
                                color: 'white',
                                textAlign: 'left',
                            }}>{this.props.isEye ? bankDetach : bankDetachClose}

                            </Text>
                        </View>
                    </View>


                </TouchableOpacity>
            );
        }

        return (<View>
            {cardListRow}
        </View>)

    }

    render() {
        var params = this.props;
        let {cardList, onBackPressCardItem} = this.props;
        console.log(cardList);

        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <ScrollView style={{flex: 1}}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}
                            overScrollMode={'always'}
                            onRefresh={() => {
                                console.log('refresh');
                            }}
                            refreshControl={
                                <RefreshControl
                                    refreshing={params.isRefreshing}
                                    onRefresh={params.onRefresh}
                                    tintColor='#00f'
                                    title="Loading..."
                                    titleColor="#00ff00"
                                    colors={['#ff0000', '#00ff00', '#0000ff']}
                                    progressBackgroundColor="lightblue"
                                />
                            }>

                    <View style={{width, height: zdp(10), backgroundColor: 'transparent'}}/>
                    {cardList ? this.viewCardList(cardList, onBackPressCardItem) : null}
                </ScrollView>
                {this.state.showModal ? this.viewModal(cardList) : null}
            </View>
        )
    }

    /**
     * Modal弹出对话框的的视图
     */
    viewModal = (cardList) => {
        // let cardList = this.props.cardList;
        let bankName = this.currentCard.bank;
        let bankABC = getBankABC(bankName);

        return <Modal
            animationType='none'
            transparent={true}
            visible={this.state.showModal}
            onRequestClose={() => this.setState({showModal: false})}
        >
            <TouchableOpacity
                activeOpacity={1}
                style={{
                    width: width,
                    height: zModalHeight,
                    marginTop: zModalMarginTop,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}
                onPress={() => {
                    this.setState({
                        showModal: false
                    })
                }}>


                <View style={{
                    width,
                    height: zdp(160),
                    padding: zdp(10),
                    paddingLeft: zdp(20),
                    backgroundColor: 'white',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                }}>

                    <View style={{
                        flex: 2,
                        width,
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}>
                        <Text style={{
                            fontSize: zsp(15),
                            color: 'grey',
                            textAlign: 'left'
                        }}>{`选择操作方式`}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={1}
                                      style={{
                                          flex: 3,
                                          width,
                                          flexDirection: 'row',
                                          justifyContent: 'flex-start',
                                          alignItems: 'center'
                                      }}

                                      onPress={() => {
                                          console.log(this.currentCard);
                                          realm.write(() => {
                                              this.setState({
                                                  showModal: false
                                              })

                                              if (this.currentCard.isDefault) {
                                                  return;
                                              }

                                              var cardDefault;
                                              if (this.currentCard.cardType === 'DC') {
                                                  //结算卡
                                                  cardDefault = getDebitCardDefault(globalInfo.merCode);

                                              } else if (this.currentCard.cardType === 'CC') {

                                                  cardDefault = getCreditCardDefault(globalInfo.merCode);
                                                  console.log(cardDefault);
                                              }
                                              cardDefault.isDefault = false;

                                              console.log(cardDefault);
                                              console.log(this.currentCard);
                                              this.currentCard.isDefault = true;

                                          })

                                      }}>
                        <Image source={{uri: bankABC}}
                               resizeMode={'contain'}
                               style={{
                                   width: zdp(25),
                                   height: zdp(25),
                                   backgroundColor: 'transparent'
                               }}/>
                        <Text style={{
                            fontSize: zsp(18),
                            marginLeft: zdp(10),
                            color: 'black',
                            textAlign: 'left'
                        }}>{`设为默认`}</Text>


                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1}
                                      style={{
                                          flex: 3,
                                          width,
                                          flexDirection: 'row',
                                          justifyContent: 'flex-start',
                                          alignItems: 'center'
                                      }}

                                      onPress={() => {
                                          deleteCard(this.currentCard, globalInfo.merCode, globalInfo.token,
                                              () => {
                                                  this.setState({
                                                      showModal: false,
                                                      cardList: cardList
                                                  })
                                              },
                                              () => {
                                                  this.setState({
                                                      showModal: false,
                                                  })
                                              });
                                      }}>

                        <Image source={{uri: 'delete'}}
                               resizeMode={'contain'}
                               style={{
                                   width: zdp(25),
                                   height: zdp(25),
                                   backgroundColor: 'transparent'
                               }}/>
                        <Text style={{
                            fontSize: zsp(18),
                            marginLeft: zdp(10),
                            color: 'black',
                            textAlign: 'left'
                        }}>{`解除绑定`}</Text>

                    </TouchableOpacity></View>
            </TouchableOpacity>

        </Modal>
    }
}

BankCardItem.propTypes = {}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo.data,
        isEye: state.bankNav.isEye,
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BankCardItem);

