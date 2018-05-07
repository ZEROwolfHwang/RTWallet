/**
 * Created by zerowolf on 2018/4/2.
 */
import React, {Component} from "react";

import {
    Dimensions,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
} from "react-native";
const {width, height} = Dimensions.get("window");

import ModalDropdown from "react-native-modal-dropdown";
// import bankList from "../../resource/bankList1"

var bankStrList ;
export  default class DropDown extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        // bankStrList = [];
        // for (let i in bankList) {
        //     console.log(bankList[i]['bank']);
        //     bankStrList.push(bankList[i]['bank'])
        // }
        //
        // console.log(bankStrList.slice(0,100));
        // console.log(bankStrList.slice(99,163));
        //
    }
    render() {
        let props = this.props;
        return (
            <View style={props.style}>
                <ModalDropdown
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "center",
                        height: 60,
                        width: 60,
                        backgroundColor: "transparent",

                    }}
                    defaultIndex={0}
                    defaultvalue={"🔽️"}
                    textStyle={{
                        fontSize: 18,
                        color: "black",
                        textAlign: "center",
                        textAlignVertical: "center"
                    }}

                    dropdownStyle={{
                        alignSelf:"center",
                        width: width-40,
                        height: 300,
                        left:20,
                        shadowColor: "#d7d9d9",
                        shadowOffset: {height: 5},
                        shadowOpacity: 0.6,
                        elevation:5,
                    }}
                    onSelect={(idx, value)=>{
                        props.onSelect(idx,value)
                    }}
                    options={['1','2','3']}
                    // renderButtonText={(rowData) => this._dropdown_2_renderButtonText(rowData)}
                    renderButtonText={(rowData) => "🔽"}
                    renderRow={this._dropdown_2_renderRow.bind(this)}
                />
            </View>
        );
    }

    /*
     * button上显示的内容
     * */
    _dropdown_2_renderButtonText(rowData) {
        console.log(rowData);

        return `${rowData}️`;
    }

    /*
     * 条目的style
     * */
    _dropdown_2_renderRow(rowData, rowID, highlighted) {
        return (
            <TouchableHighlight underlayColor="cornflowerblue">
                <View style={{
                    height: 60,
                    width:60,
                    marginBottom:20,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white"
                }}>


                    <Text style={{
                        fontSize: 20,
                        textAlign: "center",
                        color: "black"
                    }}>
                        {`${rowData}`}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    //
    // _dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    //     if (rowID == DEMO_OPTIONS_1.length - 1) return;
    //     let key = `spr_${rowID}`;
    //     return (<View style={styles.dropdown_2_separator}
    //                   key={key}
    //     />);
    // }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

