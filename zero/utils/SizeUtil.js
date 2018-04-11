/**
 * Created by zerowolf on 2018/1/3.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,Alert,
    View,
    Dimensions
} from 'react-native';
const {width, height}= Dimensions.get('window');
const Size = {
    width: width,
    height:height
};
export default Size;