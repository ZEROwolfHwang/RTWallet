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
            return Object.assign(
                {},
                state,
                {payload: action.payload}
            );
        default:
            return state;
    }
};
export const bills1 = (state = {}, action) => {
    switch (action.type) {
        case types.Action_FetchData:
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
    redData: (a, b, c, d, e) => ({type: types.Action_RedData, payload: {aaa: a, bbb: b, ccc: c, ddd: d, eee: e}}),
    fetchData: (data) => ({type: types.Action_FetchData, data: data})
};
//添加list
// export const fetchData = (data) => {
//     return {
//         type: types.Action_FetchData,
//         data
//     }
// }
// export const getWebData = () => {
//     return initFetch(fetchData)('http://sjpay.githubshop.com/app/wikilist')
// }

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
// const initFetch = (action) => {
//     return (url) => {
//         return (dispatch) => {
//             fetch(url)
//                 .then(res => res.json())
//                 .then(json => {
//                     console.log(json);
//                     dispatch(action(json));
//                     // dispatch(fetchLoading(false));
//                 })
//                 .catch(msg => console.log('usshowList-err  ' + msg));
//         }
//     }
// }