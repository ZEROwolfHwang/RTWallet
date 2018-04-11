/**
 * Created by zerowolf on 2017/12/6.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';


export default class Item extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (<TouchableOpacity activeOpacity={0.5}
                                  onPress={this.props.onPress}
                                  style={{
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      marginTop: 20,
                                      height: 40,
                                      width: Dimensions.get('window').width / 1.2,
                                      borderRadius: 10,
                                      backgroundColor: '#7c72ff'
                                  }}
        >
            <Text style={{color: 'white', fontSize: 20, alignItems: 'center'}}>
                {this.props.title}
            </Text>
        </TouchableOpacity>);
    }
}
Item.propTypes = {
    title: PropTypes.string.isRequired
};
