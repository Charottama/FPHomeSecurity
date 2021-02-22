import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, Image, Dimensions, AppState } from 'react-native';
import axios from 'axios';
import io from 'socket.io-client/dist/socket.io';
window.navigator.userAgent = 'react-native';
import { user_id, ACCESS_TOKEN } from '../sign-in/sign-in';
var PushNotification = require('react-native-push-notification');

var {width, height} = Dimensions.get('window');

var vw = width/100
var vh = height/100

export var name = '';
export var email = '';
export var role = '';
export var sosNumber = '';
export var emergencyNumber = '';
export var macAddress = '';

export default class Home extends React.Component {

    state = {
        appState: AppState.currentState
    }

    constructor(){
        super();
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.socket = io('http://179.128.11.69:80', {jsonp: false});
    }

    componentDidMount = async() => {
        this.socket.on("FromAPI", data => {
            // alert(data.message)
            PushNotification.localNotification({
                message: data.message
            })
        });
        AppState.addEventListener('change', this.handleAppStateChange);
        const id = user_id;
        const url = 'http://178.128.214.101:7000/home-security/user/' + id; 
        
        // TOKEN
        var token = await AsyncStorage.getItem(ACCESS_TOKEN);
        //console.log("Token di home: " + token)

        axios.get(url, { headers: { accessToken: token, id: id } })
        .then((response) => {
            //console.log(response)
            //console.log("Di home idny " + id)

            name = response.data.data.name;
            email = response.data.data.email;
            role = response.data.data.role;
            sosNumber = response.data.data.sosNumber;
            emergencyNumber = response.data.data.emergencyNumber;
            macAddress = response.data.data.macAddress;
        })
        .catch(function (error) {
            //console.log(error);
        })
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange(appState){
        if(appState === 'background'){
            //console.log('app is in background')
        }
    }

    render() {
        return(
            <View style={styles.mainMenu}>
                <View style={styles.mainMenuWrapper}>
                    <View style={styles.headWrapper}>
                        <Image style={styles.homeImg} source={require("../../assets/Logos.png")} />
                        <Text style={styles.headTitle}>SECURITY IS ACTIVE</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainMenu: {
        minHeight: 300*vh,
        backgroundColor: '#181B23'
    },

    headWrapper: {
        // text-align: center;
        display: 'flex',
        backgroundColor: '#181B23',
        paddingTop: 30*vw,
        alignItems: 'center',
    },

    homeImg: {
        width: 60*vw,
        height: 65*vw,
    },

    headTitle: {
        fontSize: 6*vw,
        color: '#60b557',
        margin: 0,
        paddingTop: 5*vw,
    }
});