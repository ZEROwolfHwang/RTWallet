/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React, {Component, PropTypes} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    Button,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import s from '../styles/AllStyles';
const Options = (navigation, nameLeft, nameRight, title, onPressLeft, onPressRight) => ({

    //设置滑动返回的距离
    gestureResponseDistance: {horizontal: 300},

    //是否开启手势滑动返回，android 默认关闭 ios打开
    gesturesEnabled: false,

    //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
    // headerBackTitle: '123',
    //导航栏的样式
    headerStyle: s.headerStyle,
    //导航栏文字的样式
    headerTitleStyle: s.headerTitleStyle,
    //返回按钮的颜色
    headerTintColor: 'white',

    //隐藏顶部导航栏
    // header: null,


    //设置导航栏左边的视图

    headerLeft: (
        nameLeft ?
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'}}>

                <Icon.Button
                    size={25}
                    left={5}
                    name={nameLeft}
                    backgroundColor={null}
                    color={'white'}
                    onPress={onPressLeft}>
                </Icon.Button>

                <Text style={{fontSize: 18, color: 'white'}}>
                    {title}
                </Text>
            </View> : <Text style={{fontSize: 18, color: 'white', left: 20}}>
            {title}
        </Text>),

    //设置顶部导航栏右边的视图  和 解决当有返回箭头时，文字不居中
    headerRight: (
        nameRight?<View>
            <Icon.Button
                size={25}
                left={5}
                name={nameRight}
                backgroundColor={null}
                color={'white'}
                onPress={onPressRight}>
            </Icon.Button>
        </View>:null),
});

export default {
    Options
} ;