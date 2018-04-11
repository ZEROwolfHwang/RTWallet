/**
 * Created by zerowolf on 2017/11/6.
 */
/**
 * @author ling
 * @email helloworld3q3q@gmail.com
 * @create date 2017-05-16 08:34:36
 * @modify date 2017-05-16 08:34:36
 * @desc [description]
 */
export const hotshow = 'https://api.douban.com/v2/movie/in_theaters';
export const sonshow = 'https://api.douban.com/v2/movie/coming_soon';
export const usshow = 'https://api.douban.com/v2/movie/us_box';
export const nearcinemas = 'http://m.maoyan.com/cinemas.json';

// const hotshow = 'http://192.168.×.9:8080/weixin/hotshow.json';
// const sonshow = 'http://192.168.×.9:8080/weixin/sonshow.json';
// const usshow = 'http://192.168.×.9:8080/weixin/usshow.json';
// const nearcinemas = 'http://192.168.×.9:8080/weixin/nearcinemas.json';

// import { initHotshow, fetchLoading } from '../actions/hotshow-action';
//
// export function hotshowFetch(action) {
//     return (dispatch) => {
//         fetch(hotshow).then(res => res.json())
//             .then(json => {
//                 dispatch(action(json));
//                 dispatch(fetchLoading(false));
//             }).catch(msg => console.log('hotshowList-err  '+ msg));
//     }
// }