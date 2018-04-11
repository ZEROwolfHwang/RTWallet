/**
 * Created by zerowolf on 2018/1/16.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text, Alert,
    View,
    TouchableOpacity,
    Image, Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window');
import SizeUtil from '../utils/SizeUtil';
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';
export default class MyTabView extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        var params = this.props;
        return (
            <LinearGradient
                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                locations={[0, 1]}
                colors={[params.color1 ? params.color1 : 'white', params.color2 ? params.color2 : 'white']}
                style={styles.linearGradient}>


                {params.leftView ? <TouchableOpacity activeOpacity={0.5}
                                                     style={{
                                                         width: width / 3,
                                                         justifyContent: 'center',
                                                         paddingLeft: 15
                                                     }}
                                                     onPress={() => {
                                                         params.navigation.goBack();
                                                     }}>
                    <Icon size={30} name={'angle-left'}
                          style={{color: 'black', backgroundColor: 'transparent'}}/>

                </TouchableOpacity> : <View style={{width: width / 3}}/>}

                <View style={{
                    flex: 1,
                    width: width / 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                    <Text style={{

                        fontSize: 16,
                        color: params.titleColor ? params.titleColor : 'black',
                        // marginTop: Platform.OS === 'ios'?25:15,
                        backgroundColor: 'transparent',
                    }}>{params.title}</Text>

                </View>
                {params.hasRight ? params.rightView?params.rightView:<TouchableOpacity activeOpacity={0.5}
                                                                         style={{
                                                                             width: width / 3,
                                                                             justifyContent: 'center',
                                                                             alignItems: 'flex-end',
                                                                             paddingRight: 15
                                                                         }}
                                                                         onPress={() => {
                                                                             Alert.alert('更多')
                                                                         }}>
                    <Ionicons size={20} name={params.rightIcon ? params.rightIcon : 'md-more'}
                              style={{color: 'black', backgroundColor: 'transparent'}}/>

                </TouchableOpacity>:params.rightView ===2?params.rightView: <View style={{width: width / 3}}/>}


            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        width: SizeUtil.width,
        height: Platform.OS === 'ios' ? 60 : 50,
        backgroundColor: '#00f',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop:Platform.OS==='ios'?20:0,
        alignItems: 'center'
    },
    selectedText: {
        color: 'grey',
        fontSize: 14,
    }
});