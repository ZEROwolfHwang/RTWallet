/**
 * Created by zerowolf on 2017/12/14.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    Alert
} from 'react-native';
import {zdp} from "../../utils/ScreenUtil";
let post = [];
export default class TodoList extends Component {

    constructor(props) {
        super(props);

        // post.push({title :'1'});
        // post.push({title :'2'});
        // post.push({title :'3'});
        // post.push(<Text>1</Text>);
        // post.push(<Text>2</Text>);
        // post.push(<Text>3</Text>);


        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
        this.renderList = this._renderList.bind(this);

        this.state = {
            dataSource: ds.cloneWithRows(this._renderList()),
        }
        this.renderRow = this._renderRow.bind(this);
    }

    _renderList() {
        post.push({title :'1'});
        post.push({title :'2'});
        post.push({title :'3'});
        // post.push(<Text>1</Text>);
        // post.push(<Text>2</Text>);
        // post.push(<Text>3</Text>);
        return post;
    }

    render() {
        return (
            <View>

                <ListView
                    style={{marginTop: zdp(40)}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                />
                <TouchableOpacity onPress={() => {
                    // post[0].title = '9999';
                    // const newPosts = post.map((post111) => {
                    //     return {...post111};
                    // });
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(post)
                    });
                }}>
                    <Text>
                        askjhdjaudhka
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    _renderRow(rowData) {
        return (
            <View>
                <Text>
                    {rowData.title}
                </Text>

            </View>
        )
            ;
    }

}

