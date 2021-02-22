import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View, Text, TouchableOpacity, Image, StatusBar, Dimensions } from 'react-native';
import Communications from 'react-native-communications';
import axios from 'axios';
import { sosNumber } from './home';
import { ACCESS_TOKEN } from '../sign-in/sign-in'
var moment = require('moment');

var {width, height} = Dimensions.get('window');

var vw = width/100
var vh = height/100

export default class notifDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            imageUrl: '',
            date: ''
        }
    }
    async componentDidMount(){
        const {navigation} = this.props;
        const imageId = navigation.getParam('id')
        var token = await AsyncStorage.getItem(ACCESS_TOKEN)
        //console.log(token)
        await axios.get(`${'http://178.128.214.101:7000/home-security/image/' + imageId}`,{
            headers: {accessToken: token}
        })
        .then(res => {
            //console.log(res)
            this.setState({
                imageUrl: res.data.data.imageUrl,
                date: res.data.data.createdDate
            })
            //console.log(this.state.imageUrl)
        })
    }
    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={styles.dateText}>{moment(this.state.date).format('LLLL')}</Text>
                <Image source={{uri: this.state.imageUrl}} style={{width: 85*vw, height:85*vw, alignSelf: 'center', marginVertical: 7*vh}}/>
                <View style={styles.notifContainer}>
                    <TouchableOpacity style={styles.customBtnBG} onPress={() => Communications.phonecall(sosNumber, true)}>
                        {/* <Text style={styles.userName}>I don't know this person</Text> */}
                        <Text style={styles.userName}>SOS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.customBtnBG} onPress={() => this.props.navigation.navigate('Menu')}>
                        <Text style={styles.userName}>Ignore</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 15*vw,
        minHeight: 100*vh,
        backgroundColor: '#181B23',
    },
    userName: {
        fontSize: 7*vw,
        color: "#fff",
        textAlign: 'center'
    },
    row: {
        textAlign: 'center'
    },
    notifContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    customBtnBG: {
        backgroundColor: "#219897",
        width: 40*vw,
        // paddingHorizontal: 10*vw,
        marginHorizontal: 2*vw,
        paddingVertical: 0.5*vh,
        borderRadius: 5
    },
    dateText: {
        color: 'white',
        fontSize: 5*vw,
        alignSelf: 'center',
    },
});