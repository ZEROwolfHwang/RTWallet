import NavigationUtil from "./NavigationUtil";
import realm from "../storage/realm";
import {isGestureLogin} from "../storage/schema_gesture";
import {TYPES} from "../root/GlobalAction";
import {BackHandler,Keyboard} from "react-native";
import ToastUtil from "./ToastUtil";

/**
 * Created by zerowolf Date: 2018/6/7 Time: 下午2:43
 */

const onAppStateChanged = (nextState,lastBackPressed,navigation,onBack) => {
    console.log(nextState);
    console.log(navigation);
    console.log(lastBackPressed);

    if (nextState != null && nextState === 'active') {

        if (this.flage) {

            if (lastBackPressed && lastBackPressed + 60000 <= Date.now()) {

                if (isGestureLogin()) {
                    navigation.navigate('VerifyByGesture');
                } else {
                    NavigationUtil.reset(navigation, 'RegisterApp');
                }
            }

            onBack();
        }
        this.flage = false;
    } else if (nextState != null && nextState === 'background') {
        Keyboard.dismiss();
            onBack();
        this.flage = true;
    }
};


const onBackPress = (lastBackPressed,navigation,onBack)=>{

    if (!lastBackPressed) {
        onBack();
        ToastUtil.showShort('再按一次退出应用');
        console.log(lastBackPressed);
        return true;
    }
    console.log(lastBackPressed);

    let cutTime = Date.now() - lastBackPressed;
    console.log(cutTime);
    if (cutTime < 1500) {

        navigation.dispatch({type: TYPES.ACTION_GLOBAL, data: null})

        NavigationUtil.reset(navigation, 'RegisterApp')
        BackHandler.exitApp();
        return false;
    } else {
        ToastUtil.showShort('再按一次退出应用');
        onBack();
        return true;
    }

    return true;
}



export {
    onAppStateChanged,
    onBackPress

};

