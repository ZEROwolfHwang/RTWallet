/**
 * Created by zerowolf Date: 2018/5/27 Time: 下午10:45
 */

/**
 * Created by zerowolf Date: 2018/5/3 Time: 下午8:57
 */
// const ACTION_GLOBAL = 'action_global';
export const Types_replay = {
    ACTION_REPLAY_ENTER: 'ACTION_REPLAY_ENTER',
    ACTION_REPLAY_DATA: 'ACTION_REPLAY_DATA',
}

export const replay = (state = {}, action) => {
    switch (action.type) {
        case Types_replay.ACTION_REPLAY_DATA:
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

export const actions_replay = {
    putReplayList: (data) => ({type: Types_replay.ACTION_REPLAY_DATA, data}),
}
