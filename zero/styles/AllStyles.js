/**
 *
 * Created by zerowolf on 2017/12/6.
 */

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    max: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    textStyle: {
        fontSize: 20,
        color: '#64aeff',
    },

    headerStyle: {
        backgroundColor: '#64aeff',
        height: 50
    },
    headerTitleStyle: {
        color: 'white',
        //设置标题的大小
        fontSize: 18,
        //居中显示
        alignSelf: 'center',
    },
});