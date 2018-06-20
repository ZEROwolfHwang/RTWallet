/**
 * Created by zerowolf on 2017/12/7.
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
    Image,
    ListView,
    ScrollView,
    RefreshControl,
    AsyncStorage,ActivityIndicator
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import OptionsUtil from '../../../utils/OptionsUtil';
const {width, height} = Dimensions.get('window');
import Item from '../ItemManager'
import realm from '../../../storage/realm';
import {PullList} from 'react-native-pull';
import BaseComponent from '../../global/BaseComponent';
import {zdp, zsp} from "../../../utils/ScreenUtil";
var list = [];
class Pay_Manage extends BaseComponent {


    componentDidMount() {

    }


    constructor(props) {
        super(props);

        this.dataSource = [];
        this.state = {
            // list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})).cloneWithRows(this.dataSource),
            List:(new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})).cloneWithRows(this.dataSource),
        };
        this.renderHeader = this.renderHeader.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.topIndicatorRender = this.topIndicatorRender.bind(this);
        this.onPullRelease = this.onPullRelease.bind(this);
        // _this = this;
        this.completeCard = this._completeCard.bind(this);
        //
        // var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
        // this.state = {
        //
        //     dataSource: ds.cloneWithRows(this._renderList())
        // };
        this.renderRow = this._renderRow.bind(this);
        this.deleteCard = this._deleteCard.bind(this);

    }

    componentDidMount() {

    }
    onPullRelease(resolve){
        setTimeout(()=>{
            resolve();
        },3000)

    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        const hide = {position: 'absolute', top: -10000};
        const show = {position: 'relative', top: 0};
        setTimeout(() => {
            if (pulling) {
                this.txtPulling && this.txtPulling.setNativeProps({style: show});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullok) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: show});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullrelease) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: show});
            }
        }, 1);
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: zdp(60)}}>
                <ActivityIndicator size="small" color='red'/>
                <Text ref={(c) => {
                    this.txtPulling = c;
                }}>当前PullList状态: pulling...</Text>
                <Text ref={(c) => {
                    this.txtPullok = c;
                }}>当前PullList状态: pullok......</Text>
                <Text ref={(c) => {
                    this.txtPullrelease = c;
                }}>当前PullList状态: pullrelease......</Text>
            </View>
        );
    }
    //下拉刷新
    _onRefresh() {
        var that = this;
        that.setState({refreshing: true,isShow:true});
        setTimeout(function () {
            that._renderList();
        }, 3000)

    }

    _renderList() {
        this.dataSource = [];
        let Card = realm.objects('Card');
        for (let i = 0; i < Card.length; i++) {
            this.dataSource.push(
                < Item
                    card_complete={this.completeCard}
                    card_delete={this._deleteCard}
                    card_phone={Card[i].number_phone}
                    card_number={Card[i].number_credit_card}/>
            );
        }

        this.dataSource.push(<TouchableOpacity activeOpacity={0.5}
                                   onPress={() => {
                                       // this.props.navigation.goBack();
                                       // const DEMO_TOKEN = await AsyncStorage.getItem('id_token');
                                       // if (DEMO_TOKEN === null) {
                                           this.props.navigation.navigate('Pay_Plan_AddCard', {
                                               onGoBack: () => this.refresh(),
                                           // });
                                           // return -3;
                                       // } else {
                                       //     this.doSomething();
                                       // }
                                       // this.props.navigation.dispatch({
                                       //     type: 'Pay_Plan_AddCard'
                                        });
                                   }}
                                   style={[styles.addBorderStyle,{marginTop:list.length===0?0:10}]}>
            <Text style={{color: 'gray', fontSize: zsp(18), alignSelf: 'center'}}>
                + 添加信用卡
            </Text>

        </TouchableOpacity>);

        setTimeout(() => {
            this.setState({
                List: this.state.List.cloneWithRows(this.dataSource)
            });
        }, 1000);
        // return list;
    }


    _deleteCard(data) {
        // Alert.alert(data + '');
        // 删除
        // var allList = this._renderList;
        //
        realm.write(() => {
            // 获取Person对象
            let Cards = realm.objects('Card');
            // 删除
            let Card = Cards.filtered('number_credit_card =='+ data);
            realm.delete(Card);
        });

        // let datas = JSON.parse(JSON.stringify(cacheResults.dataBlob))

        //
        _this.setState({
            dataSource: _this.state.dataSource.cloneWithRows(_this._renderList())
        });
    //
    }

    _completeCard() {
        Alert.alert('complete')
    }

    _renderRow(data) {

        return (
            <View style={{}}>
                {data}
            </View>
        );
        // this.setState({
        //     isShow: true,
        //     refreshing:false
        // });
    }

    renderHeader() {
        return (
            <View style={{height: zdp(50), backgroundColor: '#eeeeee', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>This is header</Text>
            </View>
        );
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        return (
            <View style={{}}>
                {item}
            </View>
        );
            {/*<View style={{height: zdp(50), backgroundColor: '#fafafa', alignItems: 'center', justifyContent: 'center'}}>*/};
                {/*<Text>{item.title}</Text>*/}
            {/*</View>*/}
    }

    renderFooter() {
        if (this.state.nomore) {
            return null;
        }
        return (
            <View style={{height: zdp(100)}}>

                <ActivityIndicator size={zdp(40)} color= {'red'} style={{marginTop:zdp(30),alignSelf:'center'}}/>
            </View>
        );
    }

    loadMore() {

        this.dataSource = [];
        let Card = realm.objects('Card');
        for (let i = 0; i < Card.length; i++) {
            this.dataSource.push(
                < Item
                    card_complete={this.completeCard}
                    card_delete={this._deleteCard}
                    card_phone={Card[i].number_phone}
                    card_number={Card[i].number_credit_card}/>
            );
        }

        this.dataSource.push(<TouchableOpacity activeOpacity={0.5}
                                    onPress={() => {
                                        // this.props.navigation.goBack();
                                        // const DEMO_TOKEN = await AsyncStorage.getItem('id_token');
                                        // if (DEMO_TOKEN === null) {
                                        this.props.navigation.navigate('Pay_Plan_AddCard', {
                                            onGoBack: () => this.refresh(),
                                            // });
                                            // return -3;
                                            // } else {
                                            //     this.doSomething();
                                            // }
                                            // this.props.navigation.dispatch({
                                            //     type: 'Pay_Plan_AddCard'
                                        });
                                    }}
                                    style={[styles.addBorderStyle,{marginTop:list.length===0?0:10}]}>
            <Text style={{color: 'gray', fontSize: zsp(18), alignSelf: 'center'}}>
                + 添加信用卡
            </Text>

        </TouchableOpacity>);

        setTimeout(() => {
                this.setState({
                    List: this.state.List.cloneWithRows(this.dataSource)
                });
            }, 1000);
        // this.dataSource.push({
        //     id: 0,
        //     title: `begin to create data ...`,
        // });
        // for (var i = 0; i < 15; i++) {
        //     this.dataSource.push({
        //         id: i + 1,
        //         title: 'this is '+i,
        //     })
        // }
        // this.dataSource.push({
        //     id: 10,
        //     title: `finish create data ...`,
        // });
        // setTimeout(() => {
        //     this.setState({
        //         List: this.state.List.cloneWithRows(this.dataSource)
        //     });
        // }, 1000);
    }
    render() {
        return (
            <View style={styles.container}>
                <PullList
                    enableEmptySections={true}
                    style={{}}
                    onPullRelease={this.onPullRelease}
                    topIndicatorRender={this.topIndicatorRender}
                    topIndicatorHeight={60}
                    // renderHeader={this.renderHeader}
                    // dataSource={this.state.List}
                     dataSource={this.renderList}
                    pageSize={1}

                    initialListSize={1}
                    renderRow={this.renderRow}
                    // onEndReached={this.loadMore}
                    onEndReachedThreshold={60}
                    renderFooter={this.renderFooter}
                    isPullEnd={true}

                />
            </View>
        );
    }
}



const mapStateToProps = (state) => {
    return {

        RS_Pay_Manage: state.RS_Pay_Manage,
        nav: state.nav,
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
        marginBottom: zdp(20),
        borderRadius: zdp(5)
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#65c4ff',
    },
});


export default connect(mapStateToProps)(Pay_Manage);
