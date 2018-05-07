/**
 * Created by zerowolf on 2018/4/12.
 */
import React, {Component} from 'react';
import {
    Platform,StyleSheet,Text,Alert,View,TouchableOpacity, Image,Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window');
import MyTabView from '../../views/MyTabView';
import BaseComponent from '../global/BaseComponent';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


 class WebView1 extends BaseComponent{
    constructor(props){
        super(props);

    }

    render(){
       return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                  <MyTabView titleColor={'black'} title={'询价'}
                           navigation={this.props.navigation}/>
                <Text style={{color: 'blue', fontSize: 18}}>
                    New Page !
                </Text>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        nav: state.nav,
    }

};


export default connect(mapStateToProps)(WebView1);
