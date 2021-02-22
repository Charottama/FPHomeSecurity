import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View, ScrollView, Text, TextInput, Button, TouchableOpacity, Image, StatusBar, Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import {role} from './home';
import { ACCESS_TOKEN } from '../sign-in/sign-in';


var {width, height} = Dimensions.get('window');

var vw = width/100
var vh = height/100

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
   }

    async componentDidMount() {
        var token = await AsyncStorage.getItem(ACCESS_TOKEN)

        //console.log(token)

        axios.get('http://178.128.214.101:7000/home-security/user',{
            headers: {accessToken: token}
        }).then(res => {
            this.setState({
                data: res.data.data
            })
            //console.log(this.state.data)
        }).catch((error) => {
            alert(error);
        });

    }

    render() {
        return(
            <ScrollView style={styles.containerScroll}>
                <View style={styles.containerPad}>
                    <View style={styles.titleCenter}>
                        <Text style={styles.title}>Users</Text>
                    </View>
                    {
                        this.state.data.map((dat) => 
                            <View>
                                <Text style={styles.userName}>{dat.name}</Text>
                                <Text style={styles.userMacAddress}>{dat.macAddress}</Text>
                                <Text style={styles.userRole}>{dat.role}</Text>                         
                            </View>
                        )
                    }
                    {
                        role === 'admin' ? 
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.customBtnBG}
                                    onPress={() => this.props.navigation.navigate('SignUp')}
                                    >
                                    <Text style={styles.customBtnText}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View></View>
                    }
                </View>
            </ScrollView>
        );  
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#181B23',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerScroll: {
        flex: 1,
        backgroundColor: '#181B23'
    },
    containerPad: {
        marginTop: 3*vh
    },

    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 10
    },
    uploadButton: {
        width: 300,
        paddingBottom: 10
    },
    signUpButton: {
        width: 350,
        paddingBottom: 10
    },
    userName: {
        color: 'white',
        fontSize: 7*vw,
        fontWeight: 'bold',
        paddingTop: 1*vh,
        paddingLeft: 2*vw
    },
    userMacAddress: {
        color: 'white',
        fontSize: 6*vw,
        paddingLeft: 2*vw
    },
    userRole: {
        color: 'white',
        fontSize: 6*vw,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        paddingBottom: 2*vh,
        paddingLeft: 2*vw
    },
    titleCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },  
    title: {
        color: 'white',
        fontSize: 11*vw
    },

    /* Here style the text of your button */
    customBtnText: {
        fontSize: 6*vw,
        color: "#fff",
    },

  /* Here style the background of your button */
    customBtnBG: {
        marginTop: 2*vh,
        backgroundColor: "#219897",
        paddingHorizontal: 39*vw,
        paddingVertical: 0.5*vh,
        borderRadius: 5
    }
  });

export default SignUp;