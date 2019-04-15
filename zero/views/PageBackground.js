import {zAppBarHeight, zdp, zHeight, zModalHeight, zsp, zWidth} from "../utils/ScreenUtil";
import {AllImages} from "../../XImages/AllImages";
import {Image, RefreshControl, ScrollView, View} from "react-native";
import ZText from "./ZText";
import {cusColors} from "../value/cusColor/cusColors";
import React from "react";
import PropTypes from 'prop-types';

const PageBackground = (props) => {

    // console.log(props);

    let {height=zModalHeight, content='',onRefresh,isRefreshing} = props


    return (
        <ScrollView style={{

            backgroundColor: 'white'
        }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    scrollEnabled={true}
                    bounces={true}
            // overScrollMode={'always'}
                    onRefresh={() => {
                        console.log('refresh');
                    }}
                    refreshControl={isRefreshing||onRefresh?
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={()=>onRefresh()}
                            tintColor='#00f'
                            title="正在刷新..."
                            titleColor={cusColors.text_secondary}
                            colors={[cusColors.RefreshColor_01, cusColors.RefreshColor_02, cusColors.RefreshColor_03]}
                            progressBackgroundColor={cusColors.RefreshBackground}
                        />:null
                    }>
            <View style={{
                width: zWidth,
                height: height,
                justifyContent: 'center',
                alignItems: 'center'
            }}>


            <Image source={AllImages.background}
                   resizeMode={'contain'}
                   style={{width: zdp(160), height: zdp(160), backgroundColor: 'transparent'}}/>

            <ZText parentStyle={{marginTop: zdp(20)}}
                   content={content}
                   fontSize={zsp(16)}
                   color={cusColors.text_secondary}/>

            </View>
        </ScrollView>
    )
}
PageBackground.propTypes = {
    content: PropTypes.string.isRequired,
    height: PropTypes.number,
    onRefresh: PropTypes.func,
    isRefreshing: PropTypes.bool,
}

export {
    PageBackground
}
