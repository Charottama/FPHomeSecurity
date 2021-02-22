import React from 'react';
import { Text, View, Dimensions, ScrollView, Image, StyleSheet, AsyncStorage, RefreshControl } from 'react-native';
import axios from 'axios';
import io from 'socket.io-client/dist/socket.io';
window.navigator.userAgent = 'react-native';
import { ACCESS_TOKEN } from '../sign-in/sign-in'
var moment = require('moment');

var {width, height} = Dimensions.get('window');

var vw = width/100
var vh = height/100


export default class LiveStream extends React.Component {
    constructor(props){
        super();
        this.socket = io('http://socket-fp-soft-eng.herokuapp.com/', {jsonp: false});
        this.state = {
            date: `${new Date().getFullYear() + '/' + new Date().getMonth()}`,
            data: [],
            refreshing: false
        }
    }
    
    async componentDidMount(){
        var token = await AsyncStorage.getItem(ACCESS_TOKEN)
        axios.get('http://178.128.214.101:7000/home-security/image',{
            params: {
                date: this.state.date
            },
            headers: {accessToken: token}
        }).then(res => {
            this.setState({
                data: res.data.data
            })
        }).catch((error) => {
            alert(error);
        });
    }

    _onRefresh = async () => {
        var token = await AsyncStorage.getItem(ACCESS_TOKEN)
        this.setState({refreshing: true});
        axios.get('http://178.128.214.101:7000/home-security/image',{
            params: {
                date: this.state.date
            },
            headers: {accessToken: token}
        }).then(res => {
            this.setState({
                data: res.data.data,
                refreshing: false
            })
        }).catch((error) => {
            alert(error);
        });
      }

    render() {
        //http://192.168.1.111:8081
        return(
            <ScrollView style={styles.mainMenu}
            refreshControl={
                <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}/>
            }>
                {
                    this.state.data.map((dat) =>
                    <View style={styles.margination}>
                        <Image resizeMode="contain" style={{width: 47*vw, height: 20*vh, backgroundColor:'#181B23'}} source={{uri: `${dat.imageUrl}`}}/>
                        <Text style={styles.dateText}>{moment(dat.createdDate).format('HH:mm:ss, DD MMMM YYYY')}</Text>
                    </View>
                    )
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    mainMenu: {
        // paddingTop: 1*vh,
        backgroundColor: '#181B23'
    },
    dateText: {
        color: 'white',
        fontSize: 4*vw,
        alignSelf: 'center',
        marginLeft: 1.2*vw
    },
    margination: {
        // marginVertical: 70,
        // justifyContent: 'center',
        // alignItems: 'stretch',
        flexDirection: 'row',
        flex: 1,
        borderBottomWidth: .3*vw,
        borderColor: 'white',
    }
})
