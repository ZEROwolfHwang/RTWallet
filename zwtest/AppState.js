/**
 * Created by zerowolf Date: 2018/5/29 Time: 下午9:54
 */
import React, { Component } from 'react';
import {
    ToastAndroid,
    AppState,
    BackHandler,
    TouchableHighlight,
    Platform,
    StyleSheet,
    Text,
    View,
    Alert
} from 'react-native';
import {zdp, zsp} from "../zero/utils/ScreenUtil";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


var lastBackPressed = Date.now();

type State = {
    test: string,
};

export default class App extends Component<Props,State>{

    constructor(props: Props){
        super(props);
        this.flage = false,

            this.state = {
            test: "hello",
        };
    }

    //组件加载之后添加监听
    componentDidMount() {
        if(Platform.OS === 'android') BackHandler.addEventListener('hardwareBackPress', this._onBackPressed);
        AppState.addEventListener('change', this._onAppStateChanged);
    }

    //组件卸载之前移除监听
    componentWillUnmount() {
        if(Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress', this._onBackPressed);
        AppState.removeEventListener('change', this._onAppStateChanged(hehe));
    }

    _onBackPressed() {
        console.log(lastBackPressed.toString());
        console.log((lastBackPressed+2000).toString());
        if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
            BackHandler.exitApp();
        }
        lastBackPressed = Date.now();
        console.log(lastBackPressed.toString());
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        return true;
    }

    _onAppStateChanged(hehe) {
        console.log(hehe);
        // switch (AppState.currentState) {
        //     case "active":
        //         console.log("active");
        //         break;
        //     case "background":
        //         console.log("background");
        //         break;
        //     default:
        //
        // }

        if (hehe!= null && hehe === 'active') {

            //如果是true ，表示从后台进入了前台 ，请求数据，刷新页面。或者做其他的逻辑
            if (this.flage) {
                //这里的逻辑表示 ，第一次进入前台的时候 ，不会进入这个判断语句中。
                // 因为初始化的时候是false ，当进入后台的时候 ，flag才是true ，
                // 当第二次进入前台的时候 ，这里就是true ，就走进来了。

                //测试通过
                // alert("从后台进入前台");
                // 这个地方进行网络请求等其他逻辑。
                this.props.navigation.navigate('RegisterApp');

            }
            this.flage = false ;
        }else if(hehe != null && hehe === 'background'){
            this.flage = true;
        }

    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit App.js
                </Text>
                <TouchableHighlight onPress={
                    ()=> {
                        this.setState({test: "aaaa"});
                    }
                }>
                    <Text>{this.state.test}</Text>
                </TouchableHighlight>
                <Text style={styles.instructions}>
                    {instructions}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: zsp(20),
        textAlign: 'center',
        margin: zdp(10),
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: zdp(5),
    },
});
