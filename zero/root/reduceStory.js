/**
 *
 * Created by erfli on 9/20/16.
 */
const initialState = {
    id: "",
    refreshing: true,
    loaded: false,
    story: new Object()
};
export default function story(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_STORY_DETAIL':
            return Object.assign({}, state, {
                id: action.id,
                refreshing: true,
                loaded: false
            });
        case 'FETCH_STORY_DETAIL_DONE':
            console.log(action.story);
            return Object.assign({}, state, {
                id: action.id,
                refreshing: false,
                load: true,
                story: action.story
            });
        default:
            return state;
    }
}
