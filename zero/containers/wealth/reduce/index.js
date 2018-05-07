/**
 * Created by zerowolf on 2018/4/8.
 */
export const types = {
    Action_RedData: 'action_reddata',
    Action_FetchData: 'action_fetchdata',

};

export const bills = (state = {}, action) => {
    switch (action.type) {
        case types.Action_RedData:
            console.log(action.data);
            return Object.assign(
                {},
                state,
                {redData: action.data}
            );
        case types.Action_FetchData:
            console.log(action.data);
            return Object.assign(
                {},
                state,
                {data: action.data}
            );
        default:
            return state;
    }
};


export const actions = {
    fetchRedData: (data) => ({type: types.Action_RedData, data: data}),
    fetchData: (data) => ({type: types.Action_FetchData, data: data})
};

export function initFetch(action) {
    return (url) => {
        return (dispatch) => {
            fetch(url)
                .then(res => res.json())
                .then(json => {
                    dispatch(action(json));
                    // dispatch(fetchLoading(false));
                })
                .catch(msg => console.log('usshowList-err  ' + msg));
        }
    }
}

