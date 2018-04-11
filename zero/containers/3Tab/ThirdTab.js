/**
 * Created by zerowolf on 2018/4/2.
 */
import React, {Component} from 'react';
import {
    Platform,StyleSheet,Text,Alert,View,TouchableOpacity, Image,Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window');
import MyTabView from '../../views/MyTabView';
export default class ThirdTab extends Component{
    static navigationOptions = ({navigation, screenProps}) => ({
            headerTitle: '',
            header: null,
            headerBackTitle: null,
        }
    );

    constructor(props){
        super(props);

    }

    render(){
       return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView titleColor={'black'} title={'第三页'}
                           navigation={this.props.navigation}/>

                <Text style={{color: 'blue', fontSize: 18}}>
                    3New Page !
                </Text>
            </View>
        )
    }
}