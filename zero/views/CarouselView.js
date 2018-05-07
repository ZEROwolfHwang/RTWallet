/**
 * Created by zerowolf Date: 2018/4/28 Time: 下午3:37
 */
import {View} from 'react-native'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import React from "react";

export default class MyCarousel extends Component {

    _renderItem ({item, index}, parallaxProps) {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: item.thumbnail }}
                    containerStyle={{width:200,height:200}}
                    style={{width:160,height:160}}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                <Text style={styles.title} numberOfLines={2}>
                    { item.title }
                </Text>
            </View>
        );
    }

    render () {
        return (
            <Carousel
                data={this.state.entries}
                renderItem={this._renderItem}
                hasParallaxImages={true}
            />
        );
    }
}
