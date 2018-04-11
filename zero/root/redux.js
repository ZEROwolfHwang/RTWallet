/**
 * Created by zerowolf on 2018/4/2.
 */
import {
    createReactNavigationReduxMiddleware,
    createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';

const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);
const addListener = createReduxBoundAddListener("root");

export {
    middleware,
    addListener,
};