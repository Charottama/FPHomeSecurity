import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { MainMenu } from "../../route";

var {width, height} = Dimensions.get('window');

var vw = width/100
var vh = height/100


class Menu extends Component {

    render() {
        return(
            <MainMenu />
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1
    },

    logo: {
        width: 160,
        height: 160
    }
})

export default Menu;