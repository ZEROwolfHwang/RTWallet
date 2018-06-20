/**
 * Created by zerowolf Date: 2018/5/15 Time: 下午10:48
 */
import React, {Component} from 'react';
import {View, TextInput, Image, Animated, Keyboard, StyleSheet} from 'react-native';
// import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL} from './styles';
import logo from '../resource/image/qianbao.png';

let IMAGE_HEIGHT = 100;
let IMAGE_HEIGHT_SMALL = 100;
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import MyButtonView from "../zero/views/MyButtonView";
import {zdp, zsp} from "../zero/utils/ScreenUtil";

class Demo extends Component {
    constructor(props) {
        super(props);

        this.keyboardHeight = new Animated.Value(0);
        this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    }

    componentWillMount() {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    keyboardWillShow = (event) => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: event.endCoordinates.height,
            }),
            Animated.timing(this.imageHeight, {
                duration: event.duration,
                toValue: IMAGE_HEIGHT_SMALL,
            }),
        ]).start();
    };

    keyboardWillHide = (event) => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: 0,
            }),
            Animated.timing(this.imageHeight, {
                duration: event.duration,
                toValue: IMAGE_HEIGHT,
            }),
        ]).start();
    };

    render() {
        return (
            <KeyboardAwareScrollView
                style={{flex: 1, backgroundColor: '#4c69a5'}}
                resetScrollToCoords={{x: 0, y: 0}}
                contentContainerStyle={{
                    justifyContent: 'center',

                    alignItems: 'center'
                }}
                scrollEnabled={false}
                extraHeight={160}
                extraScrollHeight={120}
                keyboardShouldPersistTaps={'always'}
            >
                <Image source={logo} style={{marginTop: zdp(100), width: zdp(80), height: zdp(80)}}/>
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Username"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Confirm Password"
                    style={styles.input}
                />
                <MyButtonView title={'asda'} onPress={()=>{}}/>
            </KeyboardAwareScrollView>
        );

    }
};
{/*<Animated.View style={{flex: 1,justifyContent:'center',alignItems:'center',paddingBottom: this.keyboardHeight }}>
                <Animated.Image source={logo} style={{width:this.imageHeight, height: this.imageHeight }} />
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Username"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Confirm Password"
                    style={styles.input}
                />
            </Animated.View>*/
}
const styles = StyleSheet.create({
    input: {
        fontSize: zsp(18),
        width: zdp(250),
        height: zdp(60)
    }
})

export default Demo;
