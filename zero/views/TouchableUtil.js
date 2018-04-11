/**
 *
 * Created by zerowolf on 2017/12/6.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text, Alert,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';
const {width, height} = Dimensions.get('window');
export default class Navigator extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <TouchableOpacity activeOpacity={this.props.activeOpacity?this.props.activeOpacity:0.5}

                              style={{
                                  marginTop: this.props.marginTop ? this.props.marginTop : 30,
                                  marginBottom: this.props.marginBottom ? this.props.marginBottom :0,
                                  width: this.props.width ? this.props.width : width - 20,
                                  height: this.props.height ? this.props.height : 45,
                                  justifyContent: this.props.justifyContent ? this.props.justifyContent : 'center',
                                  alignSelf: this.props.alignSelf ? this.props.alignSelf : 'center',
                                  alignItems: this.props.alignItems ? this.props.alignItems : 'center',
                                  backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : '#64aeff',
                                  borderRadius: this.props.borderRadius ? this.props.borderRadius : 5,
                              }}
                              onPress={() => {
                                  this.props.onPress();
                              }
                              }
            >
                <Text style={{fontSize: 16, color: 'white'}}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}