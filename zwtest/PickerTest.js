/**
 * Bootstrap of PickerTest
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions, Button, Platform
} from 'react-native';

import Picker from 'react-native-picker';
import area from '../resource/area.json';
import {zdp, zsp} from "../zero/utils/ScreenUtil";

export default class PickerTest extends Component {

    constructor(props, context) {
        super(props, context);
    }


    componentDidMount() {
        this._showAreaPicker();
    }


    _createDateData() {
        let date = [];
        for(let i=1970;i<2020;i++){
            let month = [];
            for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    for(let k=1;k<29;k++){
                        day.push(k+'日');
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if(i%4 === 0){
                        day.push(29+'日');
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        day.push(k+'日');
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        day.push(k+'日');
                    }
                }
                let _month = {};
                _month[j+'月'] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i+'年'] = month;
            date.push(_date);
        }
        return date;
    }

    _createAreaData() {
        let data = [];
        let len = area.length;
        for(let i=0;i<len;i++){
            let city = [];
            for(let j=0,cityLen=area[i]['city'].length;j<cityLen;j++){
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }

            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }

    _showDatePicker() {
        Picker.init({
            pickerData: this._createDateData(),
            pickerFontColor: [255, 0 ,0, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            }
        });
        Picker.show();
    }

    _showAreaPicker=()=> {
        //isLoop	Boolean	false	Android
        // pickerTextEllipsisLen	number	6	Android
        // pickerConfirmBtnText	string	confirm	iOS/Android
        // pickerCancelBtnText	string	cancel	iOS/Android
        // pickerTitleText	string	pls select	iOS/Android
        // pickerConfirmBtnColor	array	[1, 186, 245, 1]	iOS/Android
        // pickerCancelBtnColor	array	[1, 186, 245, 1]	iOS/Android
        // pickerTitleColor	array	[20, 20, 20, 1]	iOS/Android
        // pickerToolBarBg	array	[232, 232, 232, 1]	iOS/Android
        // pickerBg	array	[196, 199, 206, 1]	iOS/Android
        // pickerToolBarFontSize	number	16	iOS/Android
        // wheelFlex	array	[1, 1, 1]	iOS/Android
        // pickerFontSize	number	16	iOS/Android
        // pickerFontColor	array	[31, 31, 31, 1]	iOS/Android
        // pickerFontFamily	string		iOS/Android
        // pickerRowHeight	number	24	iOS
        // pickerData	array		iOS/Android
        // selectedValue	array		iOS/Android
        // onPickerConfirm	function		iOS/Android
        // onPickerCancel	function		iOS/Android
        // onPickerSelect	function		iOS/Android
        Picker.init({
            pickerData: this._createAreaData(),
            pickerTitleText: '选择地址',
            pickerFontFamily:Platform.OS === 'ios' ? 'PingFang TC' : 'PingFang TC',
            pickerTitleColor:[255,255,255,1],       //[55,164,255,1],
            pickerCancelBtnColor:[255,255,255,1],       //[55,164,255,1],
            pickerConfirmBtnColor:[255,255,255,1],      //[55,164,255,1],
            pickerToolBarFontSize: zsp(20),
            pickerFontSize: zsp(17),
            pickerFontColor: [20, 20, 20, 1],
            pickerCancelBtnText:'取消',
            pickerConfirmBtnText:'确认',
            pickerToolBarBg: [55,60 ,246, 0.8],
            pickerBg:[255,255,255,1],
            pickerRowHeight: zdp(30),
            selectedValue: ['广东', '深圳', '宝安区'],
            onPickerConfirm: pickedValue => {
                console.log('area', pickedValue);
            },
            onPickerCancel: pickedValue => {
                console.log('area', pickedValue);
            },
            onPickerSelect: pickedValue => {
                //Picker.select(['山东', '青岛', '黄岛区'])
                console.log('area', pickedValue);
            }
        });
        Picker.show();
    }

    _showTimePicker() {
        let years = [],
            months = [],
            days = [],
            hours = [],
            minutes = [];

        for(let i=1;i<51;i++){
            years.push(i+1980);
        }
        for(let i=1;i<13;i++){
            months.push(i);
            hours.push(i);
        }
        for(let i=1;i<32;i++){
            days.push(i);
        }
        for(let i=1;i<61;i++){
            minutes.push(i);
        }
        let pickerData = [years, months, days, ['am', 'pm'], hours, minutes];
        let date = new Date();
        let selectedValue = [
            date.getFullYear(),
            date.getMonth()+1,
            date.getDate(),
            date.getHours() > 11 ? 'pm' : 'am',
            date.getHours() === 12 ? 12 : date.getHours()%12,
            date.getMinutes()
        ];
        Picker.init({
            pickerData,
            selectedValue,
            pickerTitleText: 'Select Date and Time',
            wheelFlex: [2, 1, 1, 2, 1, 1],
            onPickerConfirm: pickedValue => {
                console.log('area', pickedValue);
            },
            onPickerCancel: pickedValue => {
                console.log('area', pickedValue);
            },
            onPickerSelect: pickedValue => {
                let targetValue = [...pickedValue];
                if(parseInt(targetValue[1]) === 2){
                    if(targetValue[0]%4 === 0 && targetValue[2] > 29){
                        targetValue[2] = 29;
                    }
                    else if(targetValue[0]%4 !== 0 && targetValue[2] > 28){
                        targetValue[2] = 28;
                    }
                }
                else if(targetValue[1] in {4:1, 6:1, 9:1, 11:1} && targetValue[2] > 30){
                    targetValue[2] = 30;

                }
                // forbidden some value such as some 2.29, 4.31, 6.31...
                if(JSON.stringify(targetValue) !== JSON.stringify(pickedValue)){
                    // android will return String all the time，but we put Number into picker at first
                    // so we need to convert them to Number again
                    targetValue.map((v, k) => {
                        if(k !== 3){
                            targetValue[k] = parseInt(v);
                        }
                    });
                    Picker.select(targetValue);
                    pickedValue = targetValue;
                }
            }
        });
        Picker.show();
    }

    _toggle() {
        Picker.toggle();
    }

    _isPickerShow(){
        Picker.isPickerShow(status => {
            alert(status);
        });
    }

    render() {
        return (
            <View style={{height: Dimensions.get('window').height}}>
               <Button title={'area'}
                       onPress={this._showAreaPicker}>

               </Button>
            </View>
        );
    }
};
