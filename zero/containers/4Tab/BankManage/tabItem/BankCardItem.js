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
    ListView, ImageBackground,
    ScrollView, Modal, RefreshControl
} from 'react-native';
import {bankColor, cusColors} from "../../../../value/cusColor/cusColors";
import {zdp, zModalHeight, zModalMarginTop, zsp, zWidth} from "../../../../utils/ScreenUtil";
import ZText from "../../../../views/ZText";
import realm from "../../../../storage/realm";
import {
    getCreditCardDefault,
    getDebitCardDefault, getDebitCardList,
} from "../../../../storage/schema_card";
import {deleteCard} from "./DeleteCardUtil";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getRandomBank} from "../../../global/emun/BankBgName";

let globalInfo;

class BankCardItem extends Component {

    constructor(props) {
        super(props);

        globalInfo = this.props.globalInfo;

        this.state = {
            isRefreshing: false,
            showModalAddCard: false,                //添加卡片,
            showModalSet: false
        }

    }

    static defaultProps = {};

    viewCardList = (cardList) => {
        console.log(cardList);
        console.log(...cardList);

        var cardListRow = [];
        for(const index in cardList) {
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

            cardListRow.push(<TouchableOpacity key={index} activeOpacity={0.9}
                                               style={{
                                                   width: width - zdp(20),
                                                   height: zdp(130),
                                                   justifyContent: 'center',
                                                   alignItems: 'center'
                                               }}
                                               onPress={() => {
                                                   this.setState({
                                                       showModalSet: true
                                                   })
                                                   this.currentCard = cardItem;
                                               }}>

                    <ImageBackground
                        resizeMode={'contain'}
                        style={{
                            width: width - zdp(20),
                            height: zdp(130),
                            // backgroundColor: bankColor[bankABC],
                            borderRadius: zdp(5),
                        }}
                        source={{uri: getRandomBank(index)}}

                        onPress={() => {

                        }}>
                        {/*  <Image source={{uri: bankABC}}
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
                           }}/>*/}

                        {cardItem.isDefault ?
                            <View style={{
                                borderWidth: zdp(1),
                                borderRadius: zdp(1),
                                borderColor: 'white',
                                padding: zdp(5),
                                paddingTop: zdp(2),
                                paddingBottom: zdp(2),
                                position: 'absolute',
                                flexDirection: 'row',
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
                                width: zdp(45),
                                height: zdp(45),
                                borderRadius: zdp(30),
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>

                                <Image source={{uri: bankABC}}
                                       resizeMode={'contain'}
                                       style={{width: zdp(45), height: zdp(45)}}/>
                            </View>

                            <View style={{
                                flex: 1,
                                marginLeft: zdp(5),
                                justifyContent: 'center',
                                alignItems: 'flex-start'
                            }}>

                                <ZText parentStyle={{}}
                                       content={bankName}
                                       fontSize={zsp(18)}
                                       color={'white'}/>

                                <ZText
                                    content={cardType === 'DC' ? '储蓄卡' : '信用卡'}
                                    fontSize={zsp(16)}
                                    color={'white'}/>

                            </View>


                        </View>

                        <ZText parentStyle={{
                            flex: 1,
                            width: zWidth - zdp(20),
                            backgroundColor: 'transparent',
                            // alignSelf: 'flex-start',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            paddingLeft: zdp(20)
                        }}
                               content={this.props.isEye ? bankDetach : bankDetachClose}
                               fontSize={zsp(24)}
                               textAlign={'left'}
                               color={'white'}/>


                    </ImageBackground>
                </TouchableOpacity>
            );
        }

        cardListRow.push(
            <View
                key={1001}
                style={{
                    marginTop: zdp(5),
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: zdp(20)
                }}>


                <TouchableOpacity
                    activeOpacity={0.9}
                    style={{
                        marginBottom: zdp(20),
                    }}
                    onPress={() => {
                        this.setState({
                            showModalAddCard: true
                        })
                    }}>

                    <ImageBackground source={{uri: 'bg_add'}}
                                     resizeMode={'contain'}
                                     style={{
                                         width: width - zdp(30),
                                         height: zdp(70),
                                         justifyContent: 'space-around',
                                         flexDirection: 'row',
                                         alignItems: 'center',
                                         alignSelf: 'center',
                                     }}>


                    <ZText parentStyle={{
                        marginLeft: zdp(40),
                        marginRight: zdp(20),
                        width: zdp(25),
                        height: zdp(25),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'black',
                        borderRadius: zdp(15)
                    }} content={'+'} fontWeight={'500'} fontSize={zsp(18)} color={'white'}/>

                    <ZText parentStyle={{flex: 1, alignItems: 'flex-start'}} content={'添加银行卡'}
                           color={cusColors.text_main} fontSize={zsp(18)}/>

                    <Image source={{uri: 'common_next'}}
                           resizeMode={'contain'}
                           style={{
                               marginRight: zdp(10),
                               width: zdp(20),
                               height: zdp(20),
                               backgroundColor: 'transparent'
                           }}/>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
        return (<View>
            {cardListRow}
        </View>)

    }

    render() {
        var params = this.props;
        let {cardList, onBackPressCardItem} = this.props;
        console.log(cardList);

        return (
            <View style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingBottom: zdp(20)
            }}>
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

                    <View style={{width, height: zdp(15), backgroundColor: 'transparent'}}/>
                    {cardList ? this.viewCardList(cardList, onBackPressCardItem) : null}
                </ScrollView>

                {this.state.showModalSet ? this.viewModalSetDefault(cardList) : null}

                {this.viewModalAddCard()}
            </View>
        );
    }

    /**
     * Modal弹出对话框的的视图
     */
    viewModalSetDefault = (cardList) => {
        // let cardList = this.props.cardList;
        let bankName = this.currentCard.bank;
        let bankABC = getBankABC(bankName);

        return <Modal
            animationType='none'
            transparent={true}
            visible={this.state.showModalSet}
            onRequestClose={() => this.setState({showModalSet: false})}
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
                        showModalSet: false
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
                                                  showModalSet: false
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
                                                      showModalSet: false,
                                                      cardList: cardList
                                                  })
                                              },
                                              () => {
                                                  this.setState({
                                                      showModalSet: false,
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

    /**
     * Modal弹出对话框的的视图
     */
    viewModalAddCard() {
        // let cardList = this.props.cardList;
        return <Modal
            animationType='fade'
            transparent={true}
            visible={this.state.showModalAddCard}
            onRequestClose={() => this.setState({showModalAddCard: false})}
        >
            <TouchableOpacity
                activeOpacity={1}
                style={{
                    width: width,
                    height: zModalHeight,
                    marginTop: zModalMarginTop,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.2)'
                }}
                onPress={() => {
                    this.setState({
                        showModalAddCard: false
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

                         <ZText parentStyle={{alignItems:'flex-start'}}
                                 content={'选择添加卡类型'}
                                textAlign={'left'}
                                 fontSize={zsp(15)}
                                 color={cusColors.text_secondary}/>
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
                                          this.pressAddCard('DC');
                                      }}>

                        <Image source={{uri: 'abc'}}
                               resizeMode={'contain'}
                               style={{
                                   width: zdp(25),
                                   height: zdp(25),
                                   backgroundColor: 'transparent'
                               }}/>
                        <ZText parentStyle={{alignItems:'flex-start', paddingLeft:zdp(10)}}
                               content={'添加结算卡'}
                               textAlign={'left'}
                               fontSize={zsp(16)}
                               color={cusColors.text_main}/>
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
                                          /**
                                           * 添加卡片
                                           */
                                          this.pressAddCard('CC');
                                      }}>

                        <Image source={{uri: 'cmb'}}
                               resizeMode={'contain'}
                               style={{
                                   width: zdp(25),
                                   height: zdp(25),
                                   backgroundColor: 'transparent'
                               }}/>

                        <ZText parentStyle={{alignItems:'flex-start', paddingLeft:zdp(10)}}
                               content={'添加支付卡'}
                               textAlign={'left'}
                               fontSize={zsp(16)}
                               color={cusColors.text_main}/>
                    </TouchableOpacity>


                </View>


            </TouchableOpacity>
        </Modal>
    }

    /**
     * 添加卡片
     */
    pressAddCard = (cardType) => {
        this.setState({
            showModalAddCard: false
        });
        this.props.navigation.navigate('addPayCard', {
            cardType: cardType, onGoBack: () => {
            }
            // ,onGoBack: () => this.refreshCardList()
        })
    };
}

BankCardItem.propTypes = {}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo.data,
        isEye: state.bankNav.isEye,
        navigation: state.bankNav.bank_nav,
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BankCardItem);

