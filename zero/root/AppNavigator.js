import React from 'react';
import { connect } from 'react-redux';
import { SNavigator } from './SNavigator';

import { addListener } from '../root/redux';

const AppNavigator = ({dispatch, nav}) => {
    return  <SNavigator
        navigation={{
            dispatch,
            state: nav,
            addListener,
        }}
    />
};

const mapStateToProps = state => ({
        nav: state.nav,
});

export default connect(mapStateToProps)(AppNavigator);
