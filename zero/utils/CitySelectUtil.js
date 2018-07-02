/**
 * Created by zerowolf Date: 2018/6/18 Time: 上午1:04
 */
import area from '../../resource/area.json';
const getAreaData = () => {
    let data = [];
    let len = area.length;
    for (let i = 0; i < len; i++) {
        let city = [];
        for (let j = 0, cityLen = area[i]['city'].length; j < cityLen; j++) {
            let _city = {};
            _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
            city.push(_city);
        }

        let _data = {};
        _data[area[i]['name']] = city;
        data.push(_data);
    }
    return data;
};

export {
    getAreaData
};
