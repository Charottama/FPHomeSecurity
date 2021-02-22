import React, { Component } from 'react';
import { Alert, AsyncStorage, StyleSheet, View, Text, TextInput, Button, TouchableOpacity, Image, StatusBar, Dimensions, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

export const ACCESS_TOKEN = '';
export var user_id;

var {width, height} = Dimensions.get('window');

var vw = width/100
var vh = height/100

class SignIn extends React.Component {
    state = {
        email: '',
        password: '',
        message: '',
    }

    storeToken = async(token) => {
        try {
            await AsyncStorage.setItem(ACCESS_TOKEN, token);
            //console.log('Di store token: ' + token)
            this.getToken();
        } catch(error) {
            //console.log(error.message)
        }
    }

    getToken = async() => {
        try {
            let tokentoken = await AsyncStorage.getItem(ACCESS_TOKEN);
            //console.log('Di get token: ' + tokentoken);

        } catch(error) {
            //console.log(error.message)
        }
    }

    _userLogin = () => {
        axios.post('http://178.128.214.101:7000/home-security/user/sign-in',{
            email: this.state.email,
            password: this.state.password
        })
        .then((response) => {
            //console.log(response);

            this.setState({
                message: response.data.message,
            }) 

            // VALIDASI MSTI DIATAS BIAR GK KE CATCH DIBAWAH
            if(this.state.message == 'SUCCESS') {
                // Alert.alert("Login Successful!")
            }
            else if(this.state.message == 'No data exist') {
                Alert.alert("Invalid username or password!")
            }

            let accessToken = response.data.data.token;

            //console.log(this.state.message)
            //console.log(accessToken)
            this.storeToken(accessToken);

            //console.log(response.data.message)
            //if response.data.code == DATANOTEXIST: 

            // TARO DI GLOBAR VAR ID BUAT DI EXPORT KE PROFILE
            user_id = response.data.data.id;

            this.setState({
                loggedIn: true
            });

            this.props.navigation.navigate('Menu')
        })
        .catch((error) => {
            //console.log(error)

            // if(this.state.message == '') {
            //     Alert.alert("Server Error")
            // }

            this.props.navigation.navigate('SignIn')
        });
    }

    render() {
        return(
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#181B23"
                    barStyle="light-content"
                />

                <Image
                    style={styles.logo}
                    source={require('../../assets/Logos.png')}
                />

                <View style={styles.inputContainer}>
                    <TextInput underlineColorAndroid="white" value={this.state.email} 
                               onChangeText={(email) => this.setState({email: email})} style={styles.inputText} 
                               placeholder="Email" placeholderTextColor="white">
                    </TextInput>
                    <TextInput underlineColorAndroid="white" value={this.state.password} 
                               onChangeText={(pass) => this.setState({password: pass})} style={styles.inputText} 
                               placeholder="Password" secureTextEntry={true} placeholderTextColor="white">
                    </TextInput>
                </View>

                <TouchableOpacity
                    style={styles.customBtnBG}
                    onPress={this._userLogin}
                    >
                    <Text style={styles.customBtnText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        );  
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: '#181B23',
    },
    container: {
        flex: 1,
        backgroundColor: '#181B23',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 55*vw,
        height: 37*vh,
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 20
    },
    inputContainer: {
        // marginBottom: 30
    },
    inputText: {
        width: 70*vw,
        color: 'white',
        fontSize: 5*vw
    },
    buttonContainer: {
        width: 70*vw
        // marginBottom: 20
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpButton: {
        color: 'white'
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
        paddingHorizontal: 27*vw,
        paddingVertical: 0.5*vh,
        borderRadius: 5
    }
  });

export default SignIn;
// export const ACCESS_TOKEN;