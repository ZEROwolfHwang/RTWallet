/**
 * Created by zerowolf on 2017/12/6.
 */
import React, {Component, PropTypes} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image, Dimensions,
    Alert, StatusBar, ScrollView, SafeAreaView
} from 'react-native';
import TopScreen from './TopScreen'
import Item from './Item';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Item_PayManage} from './reduce/index';
import {Pay_Navigator} from './reduce/index'
import LinearGradient from 'react-native-linear-gradient';

// const {width, height} = Dimensions.get('window');
function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

import styles, {colors} from './carousel/index.style';
import NavigationUtil from '../../utils/NavigationUtil';
import Carousel, {Pagination} from 'react-native-snap-carousel'
import {ENTRIES1, ENTRIES2} from './carousel/entries';
import SliderEntry from './carousel/SliderEntry';
import BaseComponent from '../global/BaseComponent';
import {zdp} from "../../utils/ScreenUtil";

const SLIDER_1_FIRST_ITEM = 1;

class Page_Auto extends BaseComponent {

    constructor(props) {
        super(props);

        this.props.initPayManageAction();
        // this.props.initNavigationAction(this.props.navigation);

        this.pay_plan = this._payPlan.bind(this);
        this.pay_query = this._payQuery.bind(this);
        this.pay_manager = this._payManager.bind(this);
        this.pay_upgrade = this._payUpgrade.bind(this);
        this.pay_step = this._payStep.bind(this);

        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM
        };

    }

    _renderItemWithParallax({item, index}, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        );
    }


    //设置还款计划
    _payPlan = () => {
        // this.props.navigation.navigate('Pay_Plan');
        this.props.navigation.navigate('Pay_Plan',{id:111})

        // this.props.navigation.navigate('WebView1',);
        // this.props.navigation.dispatch({
        // type: 'Pay_Plan'
        // type: 'WebView1'
        // });
    };
    //还款进度查询
    _payQuery = (data) => {
        this.props.navigation.navigate('Pay_Query');
        // this.props.navigation.dispatch({
        //     type: 'Pay_Query', bool: false
        // });
    };
    //信用卡管理
    _payManager = () => {
        this.props.navigation.navigate('Pay_Manage');
    };
    //还款升级
    _payUpgrade = (data) => {
        this.props.navigation.dispatch({
            type: 'Pay_Upgrade', bool: false
        });
    };
    //操作步骤
    _payStep = () => {
        this.props.navigation.dispatch({
            type: 'Pay_Step', bool: false
        });
    };


    mainExample() {
        // const { slider1ActiveSlide } = this.state;
        return (
            <View style={{paddingVertical: zdp(10), paddingBottom: 0}}>
                {/*<Text style={styles.title}>{`Example ${number}`}</Text>*/}
                {/*<Text style={styles.subtitle}>{title}</Text>*/}
                <Carousel
                    ref={c => this._slider1Ref = c}
                    data={ENTRIES1}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages={true}
                    firstItem={this.state.slider1ActiveSlide}//定义开始加载时滑块的位置
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    // inactiveSlideShift={zdp(20)}
                    containerCustomStyle={{
                        marginTop: zdp(15),
                        overflow: 'visible'
                    }}// for custom animations
                    contentContainerCustomStyle={{paddingVertical: 10}}
                    loop={false}
                    loopClonesPerSide={2}
                    autoplay={false}
                    autoplayDelay={500}
                    autoplayInterval={3000}
                    onSnapToItem={(index) => {
                        this.setState({slider1ActiveSlide: index})
                    }}
                />

                <Pagination
                    dotsLength={ENTRIES1.length}
                    activeDotIndex={this.state.slider1ActiveSlide}
                    containerStyle={styles.paginationContainer}
                    dotColor={'rgba(255, 255, 255, 0.92)'}
                    dotStyle={styles.paginationDot}
                    inactiveDotColor={colors.black}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={this._slider1Ref}
                    tappableDots={!!this._slider1Ref}
                />
            </View>
        );
    }

    gradient() {
        return (
            <LinearGradient
                colors={[colors.background1, colors.background2]}
                startPoint={{x: 1, y: 0}}
                endPoint={{x: 0, y: 1}}
                style={{...StyleSheet.absoluteFillObject}}
            />
        );
    }

    render() {
        console.log(this.props.nav);
        let {RS_AutoPay} = this.props;
        const example1 = this.mainExample();
        return (
            <View style={{
                flex: 1,
                backgroundColor: colors.black
            }}>
                <View style={{
                    flex: 1,
                    backgroundColor: colors.background1
                }}>
                    <StatusBar
                        translucent={true}
                        backgroundColor={'transparent'}
                        barStyle={'light-content'}
                    />
                    {this.gradient}


                    <ScrollView
                        style={{flex: 1}}
                        scrollEventThrottle={200}
                        directionalLockEnabled={true}
                    >
                        {example1}

                        <View style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>


                            <Item title={'设置还款计划'} onPress={this.pay_plan}/>
                            <Item title={'还款进度查询'} onPress={this.pay_query}/>
                            <Item title={'信用卡管理'} onPress={this.pay_manager}/>
                            <Item title={'还款升级'} onPress={this.pay_upgrade}/>
                            <Item title={'操作步骤'} onPress={this.pay_step}/>


                        </View>
                    </ScrollView>
                </View>
            </View>


        );
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        RS_AutoPay: state.RS_AutoPay.data,
        // RS_Navigate: state.RS_Navigate.data
        RS_Pay_Manage: state.RS_Pay_Manage.data,
        // navigation: state.RS_Navigate.data,
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initPayManageAction: Item_PayManage,
        // initNavigationAction: Pay_Navigator,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Page_Auto);
