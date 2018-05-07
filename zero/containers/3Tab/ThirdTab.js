/**
 * Created by zerowolf on 2018/4/2.
 */
import React, {Component} from 'react';
import {
    Platform,StyleSheet,Text,Alert,View,TouchableOpacity, Image,Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window');
import MyTabView from '../../views/MyTabView';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import  BaseComponent from '../global/BaseComponent'
class ThirdTab extends BaseComponent{

    constructor(props){
        super(props);

    }

    render(){
       return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView titleColor={'black'} title={'第三页'}
                           navigation={this.props.navigation}/>

                <TouchableOpacity onPress={()=>{
                    this.props.navigation.dispatch({
                        type:'WebView1'
                    })
                }}>

                <Text style={{color: 'blue', fontSize: 18}}>
                    3New Page !
                </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        nav: state.nav,
    }

};


export default connect(mapStateToProps)(ThirdTab);
