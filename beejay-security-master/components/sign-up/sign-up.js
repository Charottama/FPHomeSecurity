import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View, ScrollView, Text, TextInput, Button, TouchableOpacity, Image, StatusBar, Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

import { ACCESS_TOKEN } from '../sign-in/sign-in'

let formData;

var {width, height} = Dimensions.get('window');

var vw = width/100
var vh = height/100

class SignUp extends React.Component {

    state = {
        name: '',
        email: '',
        password: '',
        macAddress: '',
        emergencyNumber: '',
        sosNumber: '',
        role: '',
        newId: '',
        photo: '',
        photoDisplay: ''
    }

    photoUpload = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
              //console.log('User cancelled image picker');
            } else if (response.error) {
              //console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              //console.log('User tapped custom button: ', response.customButton);
            } else {
                var data = new FormData(); 
                data.append('selfieImage', { uri: response.uri, name: response.fileName, type: response.type });

                this.setState({
                    photo: data,
                    photoDisplay: { uri: response.uri }
                });
            }
          });
    }

    _userSignUp = async () => {
        var token = await AsyncStorage.getItem(ACCESS_TOKEN)

        data = {
            name: this.state.name,            
            email: this.state.email,
            password: this.state.password,
            macAddress: this.state.macAddress,
            emergencyNumber: this.state.emergencyNumber,
            sosNumber: this.state.sosNumber,
            role: 'user',
        }

        await axios.post('http://178.128.214.101:7000/home-security/user/add-user', data, {
            headers: {accessToken: token},
        })
        .then((response) => {
            //console.log(response);
            this.setState({
                newId: response.data.data.id
            })
        })
        .catch((error) => {
            //console.log(error);
        });

        const config = { 
            method: 'POST', 
            headers: { 
                'Content-Type': 'multipart/form-data'
            }, 
            body: this.state.photo
        };

        await fetch(`${'http://178.128.214.101:7000/home-security/image/selfie/' + this.state.newId}`, config) 
            .then(response => {
                //console.log(response)
                alert("User Added")
                this.props.navigation.navigate('Profile')
            }) 
            .catch(err => { 
                //console.log(err); 
            });
    }

    render() {
        return(
            <ScrollView style={styles.containerScroll}>

                <StatusBar
                    backgroundColor="#181B23"
                    barStyle="light-content"
                />
                <View style={styles.containerPad}>
             
                {this.state.photoDisplay != '' ? 
                    <View style={styles.photoView}>
                        <Image source={this.state.photoDisplay} style={styles.photo}/>
                    </View> 
                    : 
                    <View style={styles.photoView}>
                        <Image source={require('../../assets/Logos.png')} style={styles.photo}/>
                    </View>}

                <View style={styles.inputContainer}>
                    <TextInput underlineColorAndroid="white" style={styles.inputText} placeholder="Name" placeholderTextColor="white" value={this.state.name} onChangeText={(name) => this.setState({name: name})}></TextInput>
                    <TextInput underlineColorAndroid="white" style={styles.inputText} placeholder="Email" placeholderTextColor="white" value={this.state.email} onChangeText={(email) => this.setState({email: email})}></TextInput>
                    <TextInput underlineColorAndroid="white" style={styles.inputText} placeholder="Password" placeholderTextColor="white" value={this.state.password} secureTextEntry={true} onChangeText={(password) => this.setState({password: password})}></TextInput>
                    <TextInput underlineColorAndroid="white" style={styles.inputText} placeholder="Bluetooth Address" placeholderTextColor="white" value={this.state.macAddress} onChangeText={(macAddress) => this.setState({macAddress: macAddress})}></TextInput>
                    <TextInput underlineColorAndroid="white" style={styles.inputText} placeholder="Emergency Number" placeholderTextColor="white" value={this.state.emergencyNumber} onChangeText={(emergencyNumber) => this.setState({emergencyNumber: emergencyNumber})}></TextInput>
                    <TextInput underlineColorAndroid="white" style={styles.inputText} placeholder="SOS Number" placeholderTextColor="white" value={this.state.sosNumber} onChangeText={(sosNumber) => this.setState({sosNumber: sosNumber})}></TextInput>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.uploadButton}>
                        <Button title="Upload Photo" color="#219897" onPress={this.photoUpload}/>                    
                    </TouchableOpacity>
                </View>
        
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.signUpButton}>
                        <Button title="Sign Up" color="#219897" onPress={this._userSignUp}/>                    
                    </TouchableOpacity>
                </View>
                </View>
            </ScrollView>
        );  
    }
}

const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    }
};

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
        marginTop: 8*vw
    },
    logo: {
        width: 16*vw,
        height: 16*vw,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5*vh
    },
    rectangle: {
        width: 300,
        height: 150,
        borderWidth: 1,
        borderColor: 'white'
    },
    photoView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    photo: {
        width: 50*vw,
        height: 55*vw
    },
    inputContainer: {
        // marginBottom: 30
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 2*vh
    },
    inputText: {
        width: 85*vw,
        fontSize: 5*vw,
        color: 'white',
        // paddingBottom: 1*vh
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadButton: {
        width: 85*vw,
        paddingBottom: 2*vh
    },
    signUpButton: {
        width: 85*vw,
        paddingBottom: 2*vh
    }
  });

export default SignUp;