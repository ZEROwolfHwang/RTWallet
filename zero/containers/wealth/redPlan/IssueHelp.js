import React, {Component} from "react";
import {Platform, StyleSheet} from "react-native";
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    ListItem,
    Text,
    Badge,
    Left,
    Right,
    Body,
    Switch,
    Radio,
    Picker,
    Separator
} from "native-base";
import MyTabView from '../../../views/MyTabView';
import BaseComponent from '../../global/BaseComponent';

// import styles from "./styles";

const Item = Picker.Item;

class IssueHelp extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: undefined,
            selected1: "key1",
            results: {
                items: []
            }
        };
    }

    onValueChange(value: string) {
        this.setState({
            selected1: value
        });
    }

    render() {
        return (
            <Container style={styles.container}>
                <MyTabView titleColor={'black'} title={'常见问题'}
                           leftView={true}
                           navigation={this.props.navigation}/>

                <Content >
                    {/*<Separator style={{height: 20,backgroundColor:'transparent'}} bordered/>*/}

                    {this.getList('关于贝米', "pizza", "red", () => {
                        this.props.navigation.navigate('AboutApp')
                    })}

                    {this.getList('注册认证', "pie", "orange", () => {
                        this.props.navigation.navigate('AboutApp')
                    })}

                    {this.getList('贝米计划', "pulse", "purple", () => {
                        this.props.navigation.navigate('AboutApp')
                    })}

                    {this.getList('安全问题', "film", "green", () => {
                        this.props.navigation.navigate('AboutApp')
                    })}

                    {this.getList('充值与提现', "beer", "lavender", () => {
                        this.props.navigation.navigate('AboutApp')
                    })}

                    {this.getList('用户中心', "paw", "coral", () => {
                        this.props.navigation.navigate('AboutApp')
                    })}

                    {this.getList('贝米商城', "flag", "beige", () => {
                        this.props.navigation.navigate('AboutApp')
                    })}
                    {this.getList('贝米黑卡', "rose", "aqua", () => {
                        this.props.navigation.navigate('AboutApp')
                    })}

                </Content>
            </Container>
        );
    }

    getList(title, iconName, iconColor, onPress) {
        return (
            <ListItem icon onPress={() => {
                onPress()
            }}>
                <Left>
                    <Button style={{backgroundColor: iconColor}}>
                        <Icon active name={iconName}/>
                    </Button>
                </Left>
                <Body>
                <Text>{title}</Text>
                </Body>
                <Right>
                    <Icon active name="arrow-forward"/>
                </Right>
            </ListItem>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        // padding:10,
        // paddingTop:20
    },
    text: {
        alignSelf: "center",
        marginBottom: 7
    },
    mb: {
        marginBottom: 15
    }
})
export default IssueHelp;
