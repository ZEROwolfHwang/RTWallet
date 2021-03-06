/**
 * Created by zerowolf on 2018/4/8.
 */
import { StyleSheet } from 'react-native';
import {zdp, zsp} from "../../../utils/ScreenUtil";

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.black
    },
    container: {
        flex: 1,
        backgroundColor: colors.background1
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    scrollview: {
        flex: 1
    },
    exampleContainer: {
        paddingVertical: 30
    },
    exampleContainerDark: {
        backgroundColor: colors.black
    },
    exampleContainerLight: {
        backgroundColor: 'white'
    },
    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: zsp(20),
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titleDark: {
        color: colors.black
    },
    subtitle: {
        marginTop: zdp(5),
        paddingHorizontal: zdp(30),
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: zsp(13),
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        marginTop: zdp(15),
       // overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 10 // for custom animation
    },
    paginationContainer: {
        margin: -zdp(15),
        // borderWidth:1,
        // borderColor: 'grey'
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: zdp(4),
        marginHorizontal: 8,
        margin:0,
        padding:0
    }
});
