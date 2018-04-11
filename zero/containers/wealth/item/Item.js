/**
 * Created by zerowolf on 2018/3/22.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text, Alert,
    View, TouchableOpacity,
    Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
export default class Navigator extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        var params = this.props;
        return (
            <View style={{
                width: width - 20,
                height: 25,
                marginTop: 5,
                marginBottom: 5,
                alignItems: 'center',
                flexDirection: 'row'
            }}>
                {/*type
               * 1  红色 分红计划
               * 2  蓝色稳健计划
               * 3  橙色定存计划
               * */}
                <LinearGradient
                    start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                    locations={[0, 1]}
                    colors={params.type === 1 ? ['#ff6843', '#ff4d47']
                        : params.type === 2 ? ['#00b2ef', '#008ff8']
                            : ['#ffa300', '#ff6d40']}
                    style={ {
                        flex: 0,
                        // backgroundColor: params.color,
                        borderRadius: 2,
                        paddingLeft: 5,
                        paddingRight: 5,
                        paddingTop: 3,
                        paddingBottom: 3
                    }}>


                    <Text style={{fontSize: 13, backgroundColor: 'transparent', color: 'white'}}>{params.title}</Text>

                </LinearGradient>
                <Text style={{marginLeft: 5, color: 'grey', fontSize: 13}}>{params.content}</Text>
            </View>
        );
    }
}