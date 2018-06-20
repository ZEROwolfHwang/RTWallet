import {NavigationActions} from 'react-navigation';
import {SNavigator} from '../root/SNavigator';


export const nav = (state, action) => {
    switch (action.type) {

        // case 'RedPlan':
        //     return SNavigator.router.getStateForAction(
        //         NavigationActions.navigate({routeName: 'RedPlan'}),
        //         {...state, data: action.data}
        //     );

        case 'WebView1':
            return SNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'WebView1'}),
                {...state, webViewURL: action.webViewURL}
            );

        case 'DetailRecord':
            return SNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'DetailRecord'}),
                {...state, webViewURL: action.webViewURL}
            );

        // case 'Pay_Plan':
        //     return SNavigator.router.getStateForAction(
        //         NavigationActions.navigate({routeName: 'Pay_Plan'}),
        //         {...state, data: action.data}
        //     );
        case 'Page_Auto':
            return SNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'Page_Auto'}),
                {...state, data: action.data}
            );
        case 'Wealth':
            return SNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'Wealth'}),
                {...state, data: action.data}
            );

        case 'Pay_Plan_AddCard':
            return SNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'Pay_Plan_AddCard'}),
                {...state, data: action.data}
            );
        case 'Pay_New_Plan':
            return SNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'Pay_New_Plan'}),
                {...state, data: action.data}
            );
        // case 'Pay_Query':
        //     return SNavigator.router.getStateForAction(
        //         NavigationActions.navigate({routeName: 'Pay_Query'}),
        //         {...state, data: action.data}
        //     );
        case 'Pay_Manager':
            return SNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'Pay_Manager'}),
                {...state, data: action.data}
            );
        case 'Pay_Upgrade':
            return SNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'Pay_Upgrade'}),
                {...state, data: action.data}
            );

        case 'Pay_Step':
            return SNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'Pay_Step'}),
                {...state, data: action.data}
            );


        case 'UserInfo':
            return SNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'UserInfo'}),
                {...state, data: action.data}
            );


        default:
            const navigateOnce = (getStateForAction) => (action, state) => {
                const {type, routeName} = action;
                return (
                    state &&
                    type === NavigationActions.NAVIGATE &&
                    routeName === state.routes[state.routes.length - 1].routeName
                ) ? null : getStateForAction(action, state);
            };

//这是第二步
//             SNavigator.router.getStateForAction = navigateOnce(SNavigator.router.getStateForAction);

            // return SNavigator.router.getStateForAction(action, state) || state;
            return navigateOnce(SNavigator.router.getStateForAction)(action, state) || state;
    }
}
