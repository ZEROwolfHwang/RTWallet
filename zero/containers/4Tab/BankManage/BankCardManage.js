/**
 * Created by zerowolf Date: 2018/5/16 Time: 下午10:39
 */
import MyTabView from "../../../views/MyTabView";

const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {bindActionCreators} from 'redux';
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
    Modal,
    BackHandler
} from 'react-native';
import BaseComponent from "../../global/BaseComponent";
import BankManageTabs from "./BankManageTabs";
import {actions_bank, Types} from "./reduce/bankReduce";
import {zdp, zModalHeight, zModalMarginTop, zsp} from "../../../utils/ScreenUtil";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import EvilIcons from "react-native-vector-icons/EvilIcons";

class BankCardManage extends BaseComponent {

    constructor(props) {
        super(props);

        this.props.initNavigation(this.props.navigation);

        this.state = {
            showModal: false,
            isEye: false
        }
    }


    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        this.props.navigation.dispatch({
            type: Types.ACTION_BANK_EYE,
            isEye: false
        });
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }


    onBackPress = () => {
        this.props.navigation.dispatch({
            type: Types.ACTION_BANK_EYE,
            isEye: false
        })
        this.props.navigation.goBack();
        return true;
    };


    render() {
        let BankTabs = <BankManageTabs/>;
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView title={'卡片管理'} leftView={true} navigation={this.props.navigation}
                           hasRight={true}
                           rightView={<View activeOpacity={0.5}
                                            style={{
                                                width: width / 4,
                                                justifyContent: 'center',
                                                alignItems: 'flex-end',
                                                paddingRight: zdp(10),
                                                flexDirection: 'row'
                                            }}>


                               {this.state.isEye ?

                                   <EvilIcons size={zdp(35)} name={'eye'}
                                              style={{
                                                  marginBottom: zdp(5),
                                                  color: 'white',
                                                  backgroundColor: 'transparent',
                                                  marginRight: zdp(10)
                                              }}
                                              onPress={() => {
                                                  this.props.navigation.dispatch({
                                                      type: Types.ACTION_BANK_EYE,
                                                      isEye: !this.state.isEye
                                                  });
                                                  this.setState({
                                                      isEye: !this.state.isEye
                                                  })
                                              }}/>
                                   : <FontAwesome size={zdp(25)} name={'eye-slash'}
                                                  style={{
                                                      padding: zdp(5),
                                                      color: 'white',
                                                      backgroundColor: 'transparent',
                                                      marginRight: zdp(10)
                                                  }}
                                                  onPress={() => {
                                                      this.props.navigation.dispatch({
                                                          type: Types.ACTION_BANK_EYE,
                                                          isEye: !this.state.isEye
                                                      });
                                                      this.setState({
                                                          isEye: !this.state.isEye
                                                      })
                                                  }}/>
                               }
                               {/*    <TouchableOpacity activeOpacity={0.9}
                                                 onPress={()=>{
                                                     this.props.navigation.dispatch({
                                                         type: Types.ACTION_BANK_EYE,
                                                         isEye: !this.state.isEye
                                                     });
                                                     this.setState({
                                                         isEye: !this.state.isEye
                                                     })
                                                 }}>

                               <Image source={{uri: this.state.isEye ? 'eye_open' : 'eye_close'}}
                                      resizeMode={'contain'}
                                      style={{
                                          width: zdp(30),
                                          height: zdp(30),
                                          backgroundColor: 'transparent'
                                      }} />
                               </TouchableOpacity>*/}

                               <Ionicons size={zdp(25)} name={'md-add'}
                                         style={{
                                             padding: zdp(5),
                                             color: 'white',
                                             backgroundColor: 'transparent'
                                         }}
                                         onPress={() => {
                                             this.setState({
                                                 showModal: true
                                             })
                                         }}/>


                           </View>}/>

                <View style={{flex: 1, width: width, height}}>

                    {BankTabs}
                </View>

                {this.viewModal()}
            </View>);
    }

    /**
     * Modal弹出对话框的的视图
     */
    viewModal() {
        // let cardList = this.props.cardList;
        return <Modal
            animationType='fade'
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
                        }}>{`选择添加卡类型`}</Text>
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
                        <Text style={{
                            fontSize: zsp(16),
                            marginLeft: zdp(10),
                            color: 'black',
                            textAlign: 'left'
                        }}>{`添加结算卡`}</Text>
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
                        <Text style={{
                            fontSize: zsp(16),
                            marginLeft: zdp(10),
                            color: 'black',
                            textAlign: 'left'
                        }}>{`添加支付卡`}</Text>
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
            showModal: false
        });
        this.props.navigation.navigate('addPayCard', {
            cardType: cardType, onGoBack: () => {
            }
            // ,onGoBack: () => this.refreshCardList()
        })
    };
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,

    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initNavigation: actions_bank.getBankNav
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BankCardManage);
