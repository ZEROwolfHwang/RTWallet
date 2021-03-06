/**
 * Created by zerowolf Date: 2018/4/21 Time: 上午10:11
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions, ListView
} from 'react-native';
import {connect} from 'react-redux';
const {width, height} = Dimensions.get('window');
import BaseComponent from '../../../global/BaseComponent';
import MyProgressBar from "../../../../views/MyProgressBar";
import {zdp, zsp} from "../../../../utils/ScreenUtil";
import {cusColors} from "../../../../value/cusColor/cusColors";
import ZText from "../../../../views/ZText";

class TabTwo1 extends BaseComponent {

    constructor(props) {
        super(props);

        var dataJson = this.props.recordData;
        console.log(dataJson);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this._renderList(dataJson)),
            isShowProgress:true
        };
        this.renderRow = this._renderRow.bind(this);
    }

    componentDidMount() {
        let _that = this;
        let time = setTimeout(function() {
            _that.setState({
                isShowProgress: false
            });
            clearTimeout(time)
        }, 500)
    }

    _renderList(dataJson) {
        console.log(dataJson);
        var dataList = [];

        for (let i in dataJson) {
            dataList.push(
                <View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        width: width,
                        height: zdp(45)
                    }}>
                        <ZText parentStyle={{flex:1}}
                                content={`***${dataJson[i].UserID.toString().substring(3,dataJson[i].UserID.length)}`}
                                fontSize={zsp(15)}
                                color={cusColors.text_main}/>

                        <ZText parentStyle={{flex:1}}
                                content={`${dataJson[i].txnAmt}`}
                                fontSize={zsp(15)}
                                color={cusColors.text_main}/>

                           <ZText parentStyle={{flex:1}}
                                content={`${dataJson[i].txnTime}`}
                                fontSize={zsp(15)}
                                color={cusColors.text_main}/>

                    </View>
                    <View style={{backgroundColor:'#cbc8c8',width:width,height:0.5}}/>

                </View>
            )
        }
        return dataList
    }

    _renderRow(data) {
        return (<View>
            {data}
        </View>)
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        width: width,
                        height: zdp(45)
                    }}>
                         <ZText parentStyle={{flex:1}}
                                 content={'用户'}
                                 fontSize={zsp(15)}
                                 color={cusColors.text_secondary}/>

                         <ZText parentStyle={{flex:1}}
                                 content={'加入金额(元)'}
                                 fontSize={zsp(15)}
                                 color={cusColors.text_secondary}/>

                         <ZText parentStyle={{flex:1}}
                                 content={'加入时间'}
                                 fontSize={zsp(15)}
                                 color={cusColors.text_secondary}/>


                    </View>
                    <View style={{backgroundColor: '#bcb9b9', width: width, height: 0.5}}/>
                </View>

                {this.state.isShowProgress?<MyProgressBar/>:<ListView
                    style={{width: width, height: height,marginBottom:zdp(60)}}
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}/>}

            </View>);
    }
}
const mapStateToProps = (state) => {
    return {
        nav:state.nav,
        recordData:state.bills.redData.record
    }

};

export default connect(mapStateToProps)(TabTwo1);
