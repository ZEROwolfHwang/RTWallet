/**
 * Created by zerowolf on 2018/3/26.
 */
import React, {Component} from 'react';
import {
    AppState,
    BackHandler, Platform
} from 'react-native';

import {
    NavigationActions,
} from 'react-navigation';
import NavigationUtil from "../../utils/NavigationUtil";
import realm from "../../storage/realm";
import ToastUtil from "../../utils/ToastUtil";

// let navigation;
// let lastBackPressed;
export default class BaseComponent extends Component {
    static navigationOptions = ({
            headerTitle: '分红计划',
            header: null,
            headerBackTitle: null,
        }
    );

    constructor(props) {
        // console.log(props);
        // navigation = props.navigation;
        // lastBackPressed = Date.now();
        // console.log(lastBackPressed);
        super(props);
    }

    /*   componentDidMount() {
           console.log('父类注册监听事件');
           BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
           // AppState.addEventListener('change', this._onAppStateChanged);
       }

       componentWillUnmount() {
           console.log('父类注销监听事件');
           BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
           // AppState.removeEventListener('change', this.nAppStateChanged);
       }
   /*
       _onAppStateChanged(nextState) {
           console.log(nextState);


           if (nextState != null && nextState === 'active') {

               if (this.flage) {

                   if (lastBackPressed && lastBackPressed + 3000 <= Date.now()) {

                       let objects = realm.objects('Gesture');

                       if (objects.length > 0) {
                           navigation.navigate('VerrifyByGesture');
                       } else {
                           NavigationUtil.reset(navigation, 'RegisterApp');
                       }
                   }
                   lastBackPressed = Date.now();
               }
               this.flage = false;
           } else if (nextState != null && nextState === 'background') {
               this.flage = true;
           }
       }

       onBackPress = () => {
           console.log(this.props);
           const {dispatch, nav} = this.props;

           if (nav.index === 1) {
               console.log('nav.index === 1 为真   返回false');
               if (!lastBackPressed) {
                   lastBackPressed = Date.now();
                   ToastUtil.showShort('再按一次退出应用');
                   console.log(lastBackPressed);
                   return true;
               }
               console.log(lastBackPressed);

               let cutTime = Date.now() - lastBackPressed;
               console.log(cutTime);
               // if (lastBackPressed && cutTime < 2000) {
               if (cutTime < 1500) {
                   NavigationUtil.reset(navigation, 'RegisterApp')
                   BackHandler.exitApp();
                   return false;
               } else {
                   ToastUtil.showShort('再按一次退出应用');
                   lastBackPressed = Date.now();
                   return true;
               }
           } else {
               console.log('nav.index === else 为真   返回True');
               lastBackPressed = null;
               this.props.navigation.goBack();

               return true;   // true 拦截  不能返回
           }
           return true;

       };*/
}

