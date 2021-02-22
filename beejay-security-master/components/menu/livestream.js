import React from 'react';
import { Text, View, Dimensions, WebView, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import io from 'socket.io-client/dist/socket.io';
window.navigator.userAgent = 'react-native';

var {width, height} = Dimensions.get('window');

var vw = width/100
var vh = height/100


export default class LiveStream extends React.Component {
    constructor(props){
        super();
        this.socket = io('http://socket-fp-soft-eng.herokuapp.com/', {jsonp: false});
        this.state = {
            cctvImage: ''
        }
    }
    
    componentDidMount(){
        this.socket.on("cctv", data => {
            this.setState({
                cctvImage: data
            })
            //console.log(data)
        });
        //console.log(this.state.cctvImage)
    }

    render() {
        //http://192.168.1.111:8081
        return(
            <View style={styles.mainMenu}>
                <Text style={{color: 'white', fontSize: 8*vw}}>Camera 1</Text>
                <Image style={{width: 400, height: 300}} source={{uri: `${'data:image/jpg;base64,' + this.state.cctvImage}`}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainMenu: {
        minHeight: 300*vh,
        backgroundColor: '#181B23',
        paddingTop: 2*vh
    },
})
