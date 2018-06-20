/**
 * Created by zerowolf Date: 2018/5/7 Time: 下午6:06
 */
import React, {Component} from 'react';
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
    FlatList,
    BackHandler
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyTabView from "../../../../views/MyTabView";
import OptionsUtil from "../../../../utils/OptionsUtil";
import s from "../../../../styles/AllStyles";
import BaseComponent from "../../../global/BaseComponent";
import NavigationUtil from "../../../../utils/NavigationUtil";
import {fetchRequestToken} from "../../../../utils/FetchUtilToken";
import ToastUtil from "../../../../utils/ToastUtil";
import {actions} from "../reduce";
import MyProgressBar from "../../../../views/MyProgressBar";
import ItemRecord from "./ItemRecord";
import {zdp} from "../../../../utils/ScreenUtil";
import PageNull from "../../../../views/PageNull";

const {width, height} = Dimensions.get('window');

class TabOne extends BaseComponent {

    constructor(props) {
        super(props);

        // var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            // dataSource: ds.cloneWithRows(this._renderList()),
        };
        this.renderRow = this._renderRow.bind(this);
    }


    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    };


     _renderList(){
         var dataList = ['1','2','3','4','5','6','7'];
         var row = [];
         for (let dataItem of dataList) {
             row.push(<TouchableOpacity activeOpacity={0.8}
                                        style={{flex:1,height:zdp(30),backgroundColor:'lightgrey'}}
                                        onPress={()=>{
                                            console.log(dataItem);
                                        }}>
                 <Text style={{fontSize: zsp(20),color:'black'}}>
                 {`条目 ${dataItem}`}
             </Text>
                 </TouchableOpacity>
         )
         }
         return dataList
     }
     _renderRow=(dataItem)=>{
         console.log(dataItem);
         return(<ItemRecord
             style={{marginTop:dataItem.index===0?zdp(10):0}}
             payCard={dataItem.item.payCard}
                            txnAmt={dataItem.item.txnAmt}
                            txnTime={dataItem.item.txnTime}
                            status={dataItem.item.status}
             onPress={()=>{
                 this.props.navigation.navigate('DetailRecord',{data:dataItem.item});
             }}
         />)
     }

    // _renderItem = (item) => {
    //     <ItemRecord/>
    // }
    //
    _separator = () => {
        return <View style={{width: width - zdp(10), height: 0.5, backgroundColor: 'lightgrey', alignSelf: 'flex-end'}}/>

    };

    render() {
        // console.log(this.props.navigation);
        // console.log(this.props.recordNav);
        // console.log(this.props.nav);

        console.log(this.props.recordDetail);

        return (
            this.props.recordDetail ?
                <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>

                    <FlatList
                        ref={ref => this.flatList = ref}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this.renderRow}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        data={this.props.recordDetail._recordAllList}>
                    </FlatList>

                </View> : <PageNull/>);

    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        navigation: state.recordNav.data,
        recordDetail: state.recordNav.detail
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TabOne);
