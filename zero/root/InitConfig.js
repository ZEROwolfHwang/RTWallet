import FlashScreen from "../containers/regist/FlashScreen";
import Splash from "../containers/regist/Splash";
import RegisterApp from "../containers/regist/RegisterApp";

/**
 * Created by zerowolf Date: 2018/7/26 Time: 下午3:58
 */
const InitConfig = {
    // initialRouteName: 'FirstTab',
    initialRouteName: 'SecondTab',
    // initialRouteName: 'ThirdTab',
    // initialRouteName: 'FourthTab',

    // loginPhone: '',
    phone: '13262975235',
    // loginPhone: '13262972222',

    password: '',
    // password: 'qqqqqq',


    isLoginDirect: true,
    // isLoginDirect: false,

    launch: {
        RegisterApp: RegisterApp,
        FlashScreen: FlashScreen,
        Splash: Splash
    }
};


export {
    InitConfig
}
