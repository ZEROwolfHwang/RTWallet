/**
 * Created by zerowolf on 2018/3/23.
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window');
import s from '../../AllStyles';
import MyTabView from '../../../view/MyTabView';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

export default class Set_account extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
            headerTitle: '账单',
            header: null,
            headerBackTitle: null,
        }
    );

    constructor(props) {
        super(props);

    }

    render() {
        console.log(this.props.navigation);
        return (
            <View style={s.tab}>
                <MyTabView title={'我'} rightIcon={'md-more'} leftView={true} navigation={this.props.navigation}/>


            </View>
        )
    }
}
// const mapStateToProps = (state) => {
//     return {
//         navigation: state.RS_Navigate.data,
//     }
//
// };
//
// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({
//         // initAutoPayAction: Page_AutoPay,
//     }, dispatch);
// };
//
//
// export default connect(mapStateToProps, mapDispatchToProps)(Set_account);
