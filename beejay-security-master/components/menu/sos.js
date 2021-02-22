import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View, Text, TextInput, Button, TouchableOpacity, Image, StatusBar, Dimensions, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Communications from 'react-native-communications';
import { sosNumber, emergencyNumber } from './home';
import axios from 'axios';

var {width, height} = Dimensions.get('window');

var vw = width/100
var vh = height/100

export default class SOS extends React.Component {
    constructor() {
        super();
        this.state = {
            sosNum: '',
            emNum: ''
        }
    }
    componentDidMount(){
        this.setState({
            sosNum: sosNumber,
            emNum: emergencyNumber
        })
        policeNumber = this.state.emNum
        
    }
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.headWrapper}>
                    <TouchableOpacity onPress={() => Communications.phonecall(this.state.sosNum, true)}>
                        <View style={styles.callContent}>
                            <Image style={styles.sosLogo} source={require("../../assets/0_Logo/warning.png")} />
                            <Text style={styles.callText}>Call SOS</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Communications.phonecall(this.state.emNum, true)}>
                        <View style={styles.callContent}>
                            <Image style={styles.sosLogo} source={require("../../assets/0_Logo/phone.png")} />
                            <Text style={styles.callText}>Call Emergency</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        minHeight: 100*vh,
        backgroundColor: '#181B23',
    },

    callContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: .5*vw,
        borderColor: 'white',
        marginBottom: 3*vw,
        marginTop: 5*vw,
        paddingBottom: 3*vw,
        marginHorizontal: 7*vw,
    },
    
    sosLogo: {
        width: 18*vw,
        height: 18*vw,
        paddingLeft: 2*vw,
    },

    callText: {
        fontSize: 7*vw,
        paddingLeft: 3*vw,
        color: 'white',
    },

    btnOkay: {
        fontSize: 4*vw,
    }
});