/**
 * Created by zerowolf Date: 2018/4/21 Time: 下午10:38
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Alert, View, TouchableOpacity, Image, Dimensions, ListView, WebView
} from 'react-native';

const {width, height} = Dimensions.get('window');
import MyTabView from '../../views/MyTabView';
import BackgroundPage from '../../views/BackgroundPage';
import BaseComponent from '../../containers/global/BaseComponent';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Card,
    CardItem,
    Text,
    Left,
    Right,
    Body
} from "native-base";

export default class WXShare extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            isShowCard: false
        };
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView titleColor={'black'} title={'邀请好友'}
                           leftView={true}
                           navigation={this.props.navigation}/>





                <WebView bounces={false}
                         scalesPageToFit={true}
                         source={{uri: "http://www.baidu.com", method: 'GET'}}
                         style={{width: width, height: height}}
                         onLoad={(e) => console.log('onLoad')}
                         onLoadEnd={(e) => console.log('onLoadEnd')}
                         onLoadStart={(e) => console.log('onLoadStart')}
                         renderError={() => {
                             console.log('renderError')
                             return <View><Text>renderError回调了，出现错误</Text></View>
                         }}
                         renderLoading={() => {
                             return <View><Text>这是自定义Loading...</Text></View>
                         }}>
                </WebView>
                <View style={{width: width, height: 80, backgroundColor: '#fffbff99',justifyContent:'center',alignItems:'center',bottom:0,position:'absolute'}}>
                    <TouchableOpacity activeOpacity={0.5}
                                      onPress={this.wxShare}
                                      style={{
                        width: width - 40,
                        height: 45,
                        justifyContent: 'center',
                        backgroundColor:'red',
                        alignItems: 'center',
                        borderRadius: 20,
                        shadowColor: 'grey',
                        shadowOffset: {width: 0, height: 5},
                        elevation: 5
                    }}>
                        <Text style={{fontSize: 20, color: 'white'}}>
                            立即邀请好友加入
                        </Text>
                    </TouchableOpacity>
                </View>

                {this.state.isShowCard ? <BackgroundPage
                    backgroundColor={this.state.isShowCard ? '#e4e1e177' : 'transparent'}
                    onPress={() => {
                    this.setState({
                        isShowCard: false
                    });
                }}/>: null}

                {this.state.isShowCard?this.getCardView():null}
            </View>);
    }

    wxShare = () => {
        this.setState({
            isShowCard: true
        });
    };

    getCardView=()=> {
        // const card =
        return (
            <Content style={{
                width: width - 60,
                marginTop: 150,
                alignSelf: 'center',
                position: 'absolute'
            }} padder>
                <Card style={styles.mb}>
                    <CardItem header bordered>
                        <Text>邀请好友</Text>
                    </CardItem>
                    {this.getButtonCardItem('微信好友', 'logo-googleplus', '#DD5044', () => {
                        console.log('微信分享');
                    })}

                    {this.getButtonCardItem('朋友圈', 'logo-facebook', '#3B579D', () => {
                        console.log('dianji');
                    })}

                    {this.getButtonCardItem('QQ分享', 'logo-twitter', '#55ACEE', () => {
                        console.log('dianji');
                    })}

                    {this.getButtonCardItem('其他', 'logo-reddit', '#FF4500', () => {
                        console.log('dianji');
                    })}

                </Card>
            </Content>);
    };

    getButtonCardItem = (title, iconName, iconColor, onPress) => {
        return (
            <CardItem button onPress={
                onPress
            }>
                <Left>
                    <Icon
                        active
                        name={iconName}
                        style={{color: iconColor}}
                    />
                    <Text>{title}</Text>
                </Left>
            </CardItem>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"
    },
    text: {
        alignSelf: "center",
        marginBottom: 7
    },
    mb: {
        marginBottom: 15


    }
});
