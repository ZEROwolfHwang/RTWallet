/**
 * Created by zerowolf Date: 2018/6/19 Time: 下午11:03
 */
import MyButtonView from "../../../views/MyButtonView";

/**
 * Created by zerowolf Date: 2018/5/16 Time: 下午2:57
 */
const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Platform, StyleSheet, TextInput,Text, Alert, View, TouchableOpacity, Image, Dimensions,ListView
} from 'react-native';
import {NavigationActions} from "react-navigation";

export default class Test1 extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {

    };

    render() {
        console.log(this.props.navigation.state);
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyButtonView title={'Test1'} onPress={()=>{
                    const resetAction = NavigationActions.reset({
                        index: 1,
                        actions: [
                            // NavigationActions.navigate({routeName: 'RegisterApp'}),
                            NavigationActions.navigate({routeName: 'Tab'}),
                            NavigationActions.navigate({routeName: 'Test2'})
                        ]
                    })
                    this.props.navigation.dispatch(resetAction)
                }}/>
            </View>)
    }
}
Test1.propTypes = {

}
