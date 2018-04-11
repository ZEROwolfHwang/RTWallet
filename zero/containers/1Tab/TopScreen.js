'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
} from 'react-native';
import SizeUtil from '../../utils/SizeUtil';
import Swiper from 'react-native-swiper';
//var ViewPager = require('./ViewPager');
var deviceWidth = Dimensions.get('window').width;
// var IMGS = [
//     image,
//     image,
//     image,
//     image,
//     image,
// ];
var IMGS = [
    'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
    'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
    'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
    'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
    'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
];
export default class TopScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visibleSwiper: false,
            currentPage: 0,
            duration: 2000   //每隔一秒开始轮播

        };
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                visibleSwiper: true
            });
        }, 500);
    }

    _onMomentumScrollEnd(e, state, context) {
        console.log(state, context.state)
        // console.log(state, context.state)
    }

    /**
     * 当一页滑动结束时调用
     * @param scrollView
     */
    onAnimationEnd(e) {

        // 计算一页滑动的偏移量
        var offSetX = e.nativeEvent.contentOffset.x;
        console.log(offSetX);
        // 算出当前为第几页
        var currentPage = Math.floor((offSetX / deviceWidth));
        this.setState({
            currentPage: currentPage
        });
    }

    render() {
        let swiper = null;
        if (this.state.visibleSwiper) {
            swiper = <Swiper dotColor={'white'}
                // showsButtons
                             activeDotColor={'#FF0A0A'}
                             height={200} horizontal={true}
                             loop={false} bounces={true}
                             onMomentumScrollEnd={this._onMomentumScrollEnd}
                // removeClippedSubviews={false}
            >
                <View style={styles.slide1}>
                    {/*<Image resizeMode='cover' style={styles.image} source={{url:IMGS[0]}} />*/}
                    <Text style={styles.text}>Hello Swiper</Text>
                </View>
                <View style={styles.slide1}>
                    <Text style={styles.text}>Beautiful</Text>
                    {/*<Image resizeMode='cover' style={styles.image} source={require('../../images/dog1.png')} />*/}
                </View>
                <View style={styles.slide1}>
                    {/*<Image resizeMode='cover' style={styles.image} source={{url:IMGS[0]}} />*/}
                    <Text style={styles.text}>And simple</Text>
                </View><View style={styles.slide}>
                {/*<Image resizeMode='cover' style={styles.image} source={{url:IMGS[0]}} />*/}
                <Image resizeMode='cover' style={styles.image}
                       source={{uri: 'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024'}}/>
            </View>

                <View style={styles.slide}>
                    {/*<Image resizeMode='cover' style={styles.image} source={{url:IMGS[0]}} />*/}
                    <Image resizeMode='cover' style={styles.image}
                           source={{uri: 'http://himg2.huanqiu.com/attachment2010/2017/1205/08/51/20171205085117810.jpg'}}/>
                </View>

            </Swiper>;
        } else {
            swiper = <View></View>;
        }
        return (
            <View style={{height: 200}}>
                {swiper}

            </View>)

        //
        // return (
        //     <Swiper style={styles.wrapper} showsButtons>
        //         <View style={styles.slide1}>
        //             <Text style={styles.text}>Hello Swiper</Text>
        //         </View>
        //         <View style={styles.slide2}>
        //             <Text style={styles.text}>Beautiful</Text>
        //         </View>
        //         <View style={styles.slide3}>
        //             <Text style={styles.text}>And simple</Text>
        //         </View>
        //     </Swiper>
        // )
        // <Swiper
        //     style={this.props.style}
        //
        //     dataSource={this.state.dataSource}
        //
        //     renderPage={this._renderPage}
        //     isLoop={true}
        //
        //     autoPlay={true}/>
    }


    _renderPage(data: Object,
                pageID: number | string,) {
        return (
            <Image
                source={{uri: data, cache: 'force-cache'} }
                style={styles.page}/>
        );
    }

}

var styles = StyleSheet.create({
    page: {
        width: deviceWidth,
    },


    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ff4f67'
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    image: {
        width: SizeUtil.width,
        flex: 1
    }

});
