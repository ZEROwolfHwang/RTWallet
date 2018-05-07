/**
 * Created by zerowolf Date: 2018/4/25 Time: 下午8:24
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
    StatusBar,
    Dimensions,
    ListView,
    ScrollView,
    ViewPagerAndroid, ProgressBarAndroid
} from 'react-native';

const {width, height} = Dimensions.get('window');
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import MyTabView from '../../../views/MyTabView'
import BaseComponent from '../../global/BaseComponent'
import RedPlanTop from "./RedPlanTop";
import RedPlanBottom from './RedPlanBottom';
import {fetchRequest} from "../../../utils/FetchUtil";

import {actions} from '../reduce/index';
import MyProgressBar from "../../../views/MyProgressBar";
import {fetchRequestHeader} from "../../../utils/FetchUtilHeader";
import {fetchRequestToken} from "../../../utils/FetchUtilToken";

class RedPlan extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            showBottom: false
        }

    }

    componentWillMount() {
        console.log(this.props.navigation.state.params.id);

        var requestId = this.props.navigation.state.params.id;


        console.log(this.props.redData);
        fetchRequest(`detail/${requestId}`, 'GET')
            .then(res => {
                if (res.respCode === 200) {
                    this.props.initRedData(res.data)
                    console.log(res);
                } else {
                    // this.props.initGetWebData(netData)
                }
            })
            .then(err => {
                if (err) {
                    console.log(err);
                }
            });

    }


    render() {
        console.log(this.props.redData);

        const Tab = <RedPlanBottom/>;
// ${this.props.redData.pay_type}  D0这个
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <MyTabView titleColor={'black'} color1={'white'} color2={'white'}
                           title={this.props.redData ? `${this.props.redData.title}` : '快捷取现'}
                           leftView={true}
                           hasRight={true} rightView={
                    <TouchableOpacity activeOpacity={0.5}
                                      style={{
                                          width: width / 3,
                                          justifyContent: 'center',
                                          alignItems: 'flex-end',
                                          paddingRight: 15

                                      }}
                                      onPress={() => {
                                          this.props.navigation.navigate('IssueHelp');
                                      }}><Text
                        style={{
                            fontSize: 14,
                            color: 'black',
                            backgroundColor: 'transparent'
                        }}>帮助</Text>
                    </TouchableOpacity>}
                           navigation={this.props.navigation}/>

                {this.props.redData ?
                    this.state.showBottom ?
                        <View style={{flex: 1}}>
                            <TouchableOpacity activeOpacity={0.5}
                                              style={{
                                                  width,
                                                  height: 40,
                                                  justifyContent: 'center',
                                                  alignItems: 'center'
                                              }}
                                              onPress={() => {
                                                  this.setState({
                                                      showBottom: false
                                                  })
                                              }
                                              }
                            >

                                <Text style={{
                                    fontSize: 13,
                                    color: '#837d82',
                                    marginTop: 10,
                                    marginBottom: 10
                                }}>---------点击回返上一页---------</Text>
                            </TouchableOpacity>

                            {Tab}
                            {/*<RedPlanBottom/>*/}
                        </View>
                        :
                        <RedPlanTop
                            onPress={() => {
                                this.setState({
                                    showBottom: true
                                })
                            }
                            }/> :
                    <MyProgressBar/>}

                <View style={{
                    width,
                    height: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#ece4ff33',
                    position: 'absolute',
                    bottom: 0
                }}>
                        <TouchableOpacity activeOpacity={0.5}
                                          onPress={// Alert.alert('立即加入');
                                              this.joinNow
                                          }>
                    <LinearGradient
                        start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                        locations={[0, 1]}
                        colors={['#ff6843', '#ff4d47']}
                        style={styles.linearStyle1}>


                            <Text style={{
                                paddingLeft: 20,
                                fontSize: 20,
                                color: 'white',
                                backgroundColor: 'transparent'
                            }}>立即加入</Text>
                    </LinearGradient>
                        </TouchableOpacity>
                </View>
                {/*{this.state.showBottom?:}*/}
                {/*<View style={[{backgroundColor: 'white'}, pageStyle]}>*/}
                {/*</View>*/}
            </View>
        );

    }

    joinNow = () => {
        console.log('join');

        // storage.load({
        //     key: 'token',
        //     autoSync: true,
        //     syncInBackground: true
        // }).then(ret => {
        //     console.log(ret)
        // }).catch(err=>{
        //     console.log(err);
        // })

        let token = this.props.globalInfo.token;
        console.log(this.props.globalInfo);
        console.log(token);
        if (token) {
            fetchRequestToken('isRegister ', 'POST',token)
                .then(res => {
                    if (res.respCode === 200) {
                        // this.props.initGetWebData(res.data)
                        console.log(res);
                        if (res.data.status === 1) {
                            this.props.navigation.navigate('InvestBuy')
                        } else {
                            this.props.navigation.navigate('ShiMing')
                        }
                    } else {
                        console.log('有返回,但状态错误');
                        // this.props.initGetWebData(netData)
                    }
                })
                .then(err => {
                    if (err) {
                        console.log(err);
                    }
                });
        }
    };
}

const styles = StyleSheet.create({
    linearStyle1: {
        alignSelf: 'center',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: width - 40,
        height: 50,
        shadowColor: '#ff5a4f',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.6,
        shadowRadius: 2,
    }
})
const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo.data,
        redData: state.bills.redData
    }

};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initRedData: actions.fetchRedData
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RedPlan);




