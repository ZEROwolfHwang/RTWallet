/**
 * Created by zerowolf Date: 2018/5/1 Time: 下午6:41
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Platform,
    StyleSheet,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ListView,
    TextInput, Modal
} from 'react-native';

const {width, height} = Dimensions.get('window');
import MyTabView from '../../../../views/MyTabView';
import BaseComponent from '../../../../containers/global/BaseComponent';
import MyTextInput from "../../../../views/MyTextInput";
import Item from "./Item";
import ButtonView from "../../../../views/ButtonView";
import Icon from 'react-native-vector-icons/FontAwesome'
import {
    isMobileNumber,
    validateIdCard,
    isEmpty
} from "../../../4Tab/verify/Verification";
import ToastUtil from "../../../../utils/ToastUtil";
import {fetchRequestHeader} from "../../../../utils/FetchUtilHeader";
import InvestBuy from "./InvestBuy";
import realm from "../../../../storage/realm";
import {fetchRequestToken} from "../../../../utils/FetchUtilToken";
import {actions} from "../../../../root/GlobalAction";
import {getCardList} from "../../../../storage/schema_card";
import MyProgressBar from "../../../../views/MyProgressBar";
import ItemAddCard from "./ItemAddCard";
import {showModal} from "../../../../utils/ModalUtil";

var cardType = null;
import bankList from '../../../../../resource/bankList';
import bankMap from '../../../../../resource/bankMap';

// let bankMap = require('../../../../../resource/bankMap.json');
class addPayCard extends BaseComponent {

    constructor(props) {
        super(props);

        this.positionStyle = null;

        // this.props.initGlobalInfo({
        //     token: 'akjsaa761236812737',
        //     username: 'heheda',
        //     phone: '13222222222',
        //     IDCard: '340824199402261111'
        // });

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            bankCard: '',
            phone: '',
            bankName: '',
            showBank: false,
            dataSource: ds.cloneWithRows(this._renderList()),
        }
        this.renderRow = this._renderRow.bind(this);

    }

    componentWillMount() {
        this.cardType = this.props.navigation.state.params.cardType;
        // this.cardType = 0;
        // console.log(cardType);
    }

    _renderList() {
        var row = [];
        for (let dataItem of bankList) {
            row.push(<TouchableOpacity activeOpacity={0.8}
                                       style={{flex: 1, height: 30, backgroundColor: 'transparent'}}
                                       onPress={() => {
                                           console.log(dataItem);
                                           this.setState({
                                               showBank: false,
                                               bankName: `${dataItem}${this.cardType === 0 ? '信用卡' : '储蓄卡'}`
                                           })
                                       }}>
                    <Text style={{fontSize: 20, color: 'black'}}>
                        {`${dataItem}`}
                    </Text>
                </TouchableOpacity>
            )
        }
        return row
    }


    _renderRow(dataRow) {
        return (<View>
            {dataRow}
        </View>)
    }


    render() {
        let globalInfo = this.props.globalInfo;
        console.log(globalInfo);
        return (
            globalInfo ?
                <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                    <MyTabView titleColor={'black'} title={'添加新卡'}
                               navigation={this.props.navigation}/>


                    <ItemAddCard style={{marginTop: 40}}
                                 title={'持卡人姓名'}
                                 hasLine={true}
                                 content={globalInfo.username}/>
                    <ItemAddCard
                        title={'身份证号'}
                        content={globalInfo.IDCard}/>


                    <View style={{
                        height: 50,
                        width,
                        alignItems: 'flex-start',
                        justifyContent: 'flex-end'
                    }}>

                        <Text style={{
                            backgroundColor: 'transparent',
                            color: 'grey',
                            fontSize: 16,
                            marginLeft: 20,
                            marginBottom: 10
                        }}>请填写银行卡信息</Text>
                    </View>
                    <Item title={'卡号'}
                          hasLine={true}
                          keyboardType={'numeric'}
                          onChangeText={(text) => {
                              this.changeTextCard(text);
                          }}/>


                    <View style={{
                        width,
                        height: 60,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                            <Text style={{padding: 20, width: 110, textAlign: 'left'}}>所属银行</Text>

                            <TouchableOpacity
                                ref={ref => this.textRef = ref}
                                style={styles.boxStyle}
                                onPress={this.pressBottom}
                            >
                                <Text style={{
                                    fontSize: 16,
                                    color: 'black'
                                }}> {this.state.bankName}</Text>
                                <Icon size={25} name={'angle-right'}
                                      style={{
                                          color: 'lightgrey',
                                          marginRight: 5,
                                          backgroundColor: 'transparent'
                                      }}/>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{height: 0.5, backgroundColor: 'lightgrey', width: width - 30}}/>
                    </View>


                    <Item title={'手机号'}
                          keyboardType={'numeric'}
                          onChangeText={(text) => {
                              this.setState({
                                  phone: text
                              })
                          }}/>

                    <ButtonView
                        style={{borderRadius: 5, marginTop: 30, backgroundColor: 'lightseagreen'}}
                        title={'提交'}
                        onPress={
                            this.pressSubmit
                        }/>

                    {this._renderModal()}

                </View>
                : <MyProgressBar/>
        );

    }

    /**
     * 点击弹出Modal下拉框
     * @param title
     */
    pressBottom = () => {
        // this.show()
        showModal(250, this.textRef, styles.boxStyle, (positionStyle) => {
            console.log(positionStyle);
            this.positionStyle = positionStyle;
            this.setState({
                showBank: true
            })
        })
    };

    /**
     * 下拉model 的视图
     * @returns {*}
     * @private
     */
    _renderModal() {
        if (this.positionStyle && this.state.showBank) {
            return (
                <Modal animationType='fade'
                       transparent={true}
                       visible={this.state.showBank}
                       onRequestClose={() => this.setState({showBank: false})}>

                    <TouchableOpacity activeOpacity={1}
                                      style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}
                                      onPress={() => {
                                          this.setState({
                                              showBank: false
                                          })
                                      }}>

                        <View style={[this.positionStyle, {
                            padding: 10,
                            backgroundColor: 'white',
                            position: 'absolute',
                        }]}>
                            <ListView
                                enableEmptySections={true}
                                dataSource={this.state.dataSource}
                                renderRow={this.renderRow}
                                showsVerticalScrollIndicator={false}
                                keyboardShouldPersistTaps={'handled'}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>

            );
        }
    }


    pressSubmit = () => {

        if (!(this.state.bankCard.length >= 16 && this.state.bankCard.length <= 19)) {
            ToastUtil.showShort('银行卡位数错误')
            return
        }

        if (this.cardType === 0) {
            if (this.state.bankName.indexOf('信用卡') === -1) {
                ToastUtil.showShort('请添加类型为信用卡的卡片');
                return;
            }
        } else if (this.cardType === 1) {
            if (this.state.bankName.indexOf('储蓄卡') === -1) {
                ToastUtil.showShort('请添加类型为储蓄卡的卡片');
                return;
            }
        }


        if (!isMobileNumber(this.state.phone)) {
            ToastUtil.showShort('请输入正确手机号');
            return;
        }

        let formData = new FormData();
        formData.append('Card', this.state.bankCard);
        formData.append('phone', this.state.phone);
        formData.append('bankname', '招商银行信用卡');
        formData.append('cardType', 0);

        let globalInfo = this.props.globalInfo;
        console.log(globalInfo.token);
        fetchRequestToken('PayCard', 'POST', globalInfo.token, formData)
            .then(res => {
                console.log(res);
                if (res.respCode === 200) {
                    this._saveRealm(globalInfo.phone);
                    this.props.navigation.navigate('InvestBuy');
                } else {
                    ToastUtil.showShort(res.respMsg)
                }
            }).then(err => {
            console.log(err);

        });

    };

    _saveRealm(loginPhone) {
        realm.write(() => {
            realm.create('Card', {
                loginPhone: loginPhone,   //预留手机号
                bankPhone: this.state.phone,   //预留手机号
                bankCard: this.state.bankCard,//银行卡号
                bank: '招商银行信用卡',//所属银行
                cardType: 0,//0  储蓄卡     1 支付卡
                cardDefault: 1
            });
        });

        this.props.initCardList(getCardList(loginPhone));

    }

    changeTextCard(text) {
        this.setState({
            bankCard: text
        })
        if (text.length >= 16) {
            //https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=6221506020009066385&cardBinCheck=true
            var bankUrl = `https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=${text}&cardBinCheck=true`;
            fetch(bankUrl)
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);  //网络请求成功返回的数据
                    if (responseData.cardType === 'DC') {

                        this.setState({
                            // register_bank:responseData.bank,
                            bankName: `${bankMap[responseData.bank]}储蓄卡`,
                        });
                    } else if (responseData.cardType === 'CC') {

                        this.setState({
                            // register_bank:responseData.bank,
                            bankName: `${bankMap[responseData.bank]}信用卡`,
                        });
                    } else if (responseData.cardType === 'SCC') {

                        this.setState({
                            // register_bank:responseData.bank,
                            bankName: `${bankMap[responseData.bank]}准贷记卡`,
                        });
                    } else if (responseData.cardType === 'PC') {
                        this.setState({
                            // register_bank:responseData.bank,
                            bankName: `${bankMap[responseData.bank]}预付费卡`,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            this.setState({
                // register_bank:responseData.bank,
                bankName: '',
            })
        }
    }
}

const styles = StyleSheet.create({
    boxStyle: {
        flex: 1,
        width: width - 110,
        paddingLeft: 10,
        paddingRight: 10,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'lightgrey'
    },
    clockStyle: {
        paddingTop: 5,
        paddingBottom: 5,
        flex: 1,
        height: 60,
        backgroundColor: 'transparent',
        marginLeft: 10,
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});
const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo.data
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initCardList: actions.getCardList,
        initGlobalInfo: actions.getGlobalInfo
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(addPayCard);
