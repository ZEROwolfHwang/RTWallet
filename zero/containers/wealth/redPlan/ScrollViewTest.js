/**
 * Created by zerowolf Date: 2018/4/26 Time: 上午12:11
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions,ListViewm,ScrollView
} from 'react-native';
const {width, height} = Dimensions.get('window');
import MyTabView from '../../../views/MyTabView';
import BaseComponent from '../../global/BaseComponent';
export default class ScrollViewTest extends BaseComponent {

    constructor(props) {
        super(props);

    }

    render() {
        console.log('habsjd');
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView titleColor={'black'} title={'标题'}
                           navigation={this.props.navigation}/>

                <Text>aksdaslkdas</Text>

                < ScrollView
                    style={{flex:1}}
                    onScroll={(event)=>{
                        // console.log(event.nativeEvent.contevtOffset.x);//水平滚动距离
                        console.log(event.nativeEvent.contevtOffset.y)//垂直滚动距离
                        
                    }}

                    // onRefresh = {this._onRefreshData}
                    // onMomentumScrollEnd = {this._contentViewScroll}
                    // refreshing={this.state.refreshing}
                    automaticallyAdjustContentInsets={false}
                    showsVerticalScrollIndicator={false}
                    scrollsToTop={true}>
                    <View style={{width,height:height,backgroundColor:'blue'}} >
                    </View>
                    <View style={{width,height:height,backgroundColor:'red'}} >
                    </View>
                </ScrollView >
            </View>);
    }
    //
    _contentViewScroll(e){
        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        console.log(offsetY);
        if (offsetY + oriageScrollHeight >= contentSizeHeight){
            console.log('上传滑动到底部事件')
        }
    }
}
