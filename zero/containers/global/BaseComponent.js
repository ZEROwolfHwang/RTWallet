/**
 * Created by zerowolf on 2018/3/26.
 */
import React, {Component} from 'react';
import {
    BackHandler
} from 'react-native';

import {
    NavigationActions,
} from 'react-navigation';

export default class BaseComponent extends Component {
    static navigationOptions = ({
            headerTitle: '分红计划',
            header: null,
            headerBackTitle: null,
        }
    );

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        console.log(this.props);
        const {dispatch, nav} = this.props;
        if (nav.index === 0) {
            console.log('nav.index === 0 为真   返回false');
            return false;
        }else if (nav.index === 1) {
            console.log('nav.index === 1 为真   返回true');
            BackHandler.exitApp();
        return true;

        }

        // dispatch(NavigationActions.back());
        this.props.navigation.goBack();
        return true;
    };
}

