/**
 * Created by zerowolf Date: 2018/6/3 Time: 下午5:03
 */
export const Types_register = {
    ACTION_REGISTER_NAV: 'ACTION_REGISTER_NAV',

}

export const register = (state = {}, action) => {
    switch (action.type) {

        case Types_register.ACTION_REGISTER_NAV:
            console.log(action.data);
            return Object.assign(
                {},
                state,
                {registerNav: action.data});

        default:

            return state;
    }
}

export const actions_register = {
    putNavigation: (data) => ({type: Types_register.ACTION_REGISTER_NAV, data}),
}
