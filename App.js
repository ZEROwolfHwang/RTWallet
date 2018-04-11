/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AllReducers from './zero/root/AllReducers';
import AppNavigator from './zero/root/AppNavigator';

import { middleware } from './zero/root/redux';

const store = createStore(
    AllReducers,
    applyMiddleware(middleware)
);

export default class App extends Component<{}> {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            // this.state.showSplash ? <Splash navigation = {this.props.navigation} />
            //     :
            <Provider store={store}>
              <AppNavigator/>
            </Provider>
        )
            ;
    }

}
