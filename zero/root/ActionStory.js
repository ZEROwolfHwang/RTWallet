/**
 * Created by erfli on 9/21/16.
 */
const fetchStoryBegin=(id)=> {
    return {
        type: 'FETCH_STORY_DETAIL',
        id,
    };
}
const fetchStoryDone=(id, story)=> {
    return {
        type: 'FETCH_STORY_DETAIL_DONE',
        id,
        story
    };
}
export {
    fetchStoryBegin,
    fetchStoryDone
}
