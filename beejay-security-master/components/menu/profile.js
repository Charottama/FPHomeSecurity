import React, { Component } from 'react';
import { Modal, AsyncStorage, StyleSheet, View, Text, TextInput, Button, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import axios from 'axios';

// Import name ama password dari home buat tampilin di profile
import { name, email, role, sosNumber, emergencyNumber, macAddress } from './home';
// Import token dari sign-in.js
import { user_id, ACCESS_TOKEN }  from '../sign-in/sign-in';
// import DeviceInfo from 'react-native-device-info';
// import BluetoothSerial from 'react-native-blueetooth-serial'

import {NativeModules} from 'react-native';

var {width, height} = Dimensions.get('window');

var vw = width/100
var vh = height/100

export var sosNumberProfile = sosNumber;

export default class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            nameProfile: '',
            emailProfile: '',
            roleProfile: '',
            sosNumberProfile: '',
            emergencyNumberProfile: '',
            macAddressProfile: '',

            // BUAT MODAl
            modalSOSVisible: false,
            modalENVisible: false,
            modalBluetoothVisible: false,

            emptyNewValue: '',
            emptyNewValue1: '',
            emptyNewValue2: '',
        };
    }

    setModalSOSVisible(visible) {
        this.setState({modalSOSVisible: visible});
    }

    setModalENVisible(visible) {
        this.setState({modalENVisible: visible})
    }

    setModalBluetoothVisible(visible) {
        this.setState({modalBluetoothVisible: visible})
    }

    componentDidMount() {
        this.setState({
            nameProfile: name,
            emailProfile: email,
            roleProfile: role,
            sosNumberProfile: sosNumber,
            emergencyNumberProfile: emergencyNumber,
            macAddressProfile: macAddress,
        });

        // DeviceInfo.getMACAddress().then(mac => {
        //     // "E5:12:D8:E5:69:97"
        //     //console.log(DeviceInfo.getMACAddress())
        //     //console.log(mac)
        // });
    }

    // SAVE SOS NUMBER
    savePressedSOS = async () => {
        //await //console.log("emlama ",this.state.emptyNewValue)
        //await //console.log("soslama ",this.state.sosNumberProfile)

        const id = user_id;
        const url = 'http://178.128.214.101:7000/home-security/user/' + id; 

        // TOKEN
        var token = await AsyncStorage.getItem(ACCESS_TOKEN);
        //console.log("Token di profile: " + token)
        //console.log("Di profile idny " + id)

        await this.setState({
            sosNumberProfile: this.state.emptyNewValue,
            emptyNewValue: '',
        })

        let data = {
            sosNumber: this.state.sosNumberProfile,
            emergencyNumber: this.state.emergencyNumberProfile,
            macAddress: this.state.macAddressProfile,
        }

        axios.put(url, data, { 
            headers: { 
                accessToken: token, 
                id: id 
            }
        })
        .then((response) => {
            //console.log(response)

            this.setState({
                sosNumberProfile: response.data.data.sosNumber,
            })
        })
        .catch(function (error) {
            //console.log(error);
        })

        //await //console.log("embaru ",this.state.emptyNewValue)
        //await //console.log("sosbaru ",this.state.sosNumberProfile)

        this.setModalSOSVisible(!this.state.modalSOSVisible);
        alert('New SOS Number saved! Please relog.')
        this.logout()
    }

    // SAVE EMERGENCY NUMBER
    savePressedEN = async () => {
        //await //console.log("emlama ",this.state.emptyNewValue1)
        //await //console.log("ENlama ",this.state.emergencyNumberProfile)

        const id = user_id;
        const url = 'http://178.128.214.101:7000/home-security/user/' + id; 

        // TOKEN
        var token = await AsyncStorage.getItem(ACCESS_TOKEN);
        //console.log("Token di profile: " + token)
        //console.log("Di profile idny " + id)

        await this.setState({
            emergencyNumberProfile: this.state.emptyNewValue1,
            emptyNewValue1: '',
        })

        let data = {
            sosNumber: this.state.sosNumberProfile,
            emergencyNumber: this.state.emergencyNumberProfile,
            macAddress: this.state.macAddressProfile,
        }

        axios.put(url, data, { 
            headers: { 
                accessToken: token, 
                id: id 
            }
        })
        .then((response) => {
            //console.log(response)

            this.setState({
                emergencyNumberProfile: response.data.data.emergencyNumber,
            })
        })
        .catch(function (error) {
            //console.log(error);
        })

        //await //console.log("embaru ",this.state.emptyNewValue1)
        //await //console.log("ENbaru ",this.state.emergencyNumberProfile)

        this.setModalENVisible(!this.state.modalENVisible);
        alert('New Emergency Number saved! Please relog.')
        this.logout()
    }

    // SAVE BLUETOOTH ADDRESS
    savePressedBA = async () => {
        //await //console.log("emlama ",this.state.emptyNewValue2)
        //await //console.log("BAlama ",this.state.macAddressProfile)

        const id = user_id;
        const url = 'http://178.128.214.101:7000/home-security/user/' + id; 

        // TOKEN
        var token = await AsyncStorage.getItem(ACCESS_TOKEN);
        //console.log("Token di profile: " + token)
        //console.log("Di profile idny " + id)

        await this.setState({
            macAddressProfile: this.state.emptyNewValue2,
            emptyNewValue2: '',
        })

        let data = {
            sosNumber: this.state.sosNumberProfile,
            emergencyNumber: this.state.emergencyNumberProfile,
            macAddress: this.state.macAddressProfile,
        }

        axios.put(url, data, { 
            headers: { 
                accessToken: token, 
                id: id 
            }
        })
        .then((response) => {
            //console.log(response)

            this.setState({
                macAddressProfile: response.data.data.macAddress,
            })
        })
        .catch(function (error) {
            //console.log(error);
        })

        //await //console.log("embaru ",this.state.emptyNewValue2)
        //await //console.log("BAbaru ",this.state.macAddressProfile)

        this.setModalBluetoothVisible(!this.state.modalBluetoothVisible);
        alert('New Bluetooth saved! Please relog.')
        this.logout()
    }

    logout = async() => {
        try {
            var token = await AsyncStorage.getItem(ACCESS_TOKEN)
            //console.log("SBLM REMOVE: " + token)
            
            let removeToken = await AsyncStorage.removeItem(ACCESS_TOKEN);
            //console.log("Di logout: " + removeToken)
            this.props.navigation.navigate('SignIn');
        } catch(err) {
            //console.log(err)
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.wrapper}>
                    <View style={styles.headerWrapper}>
                        <View style={styles.profileWrapper}>
                            <Text style={styles.profileTitle}>Profile</Text>
                        </View>
                        <View style={styles.headerContent}>
                            <View style={styles.nameInfo}>
                                <Text style={styles.titleInfo}>{"Name :  " + this.state.nameProfile}</Text>
                            </View>
                            <View style={styles.emailInfo}>
                                <Text style={styles.titleInfo}>{"Email  :  " + this.state.emailProfile}</Text>
                            </View>
                            <View style={styles.roleInfo}>
                                <Text style={styles.titleInfo}>{"Role    :  " + this.state.roleProfile}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.contentWrapper}>
                        <View style={styles.eachRowContent}>
                            <Image style={styles.eachLogo} source={require("../../assets/0_Logo/warning.png")} />
                            <View style={styles.eachInfo}>
                                <Text style={styles.changeText}>SOS Number</Text>
                                <Text style={styles.changeText}>{this.state.sosNumberProfile}</Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button title="Change" style={styles.buttonChange} color="#219897" onPress={() => this.setModalSOSVisible(true)} /> 
                            </View>
                        </View>
                        <View style={styles.eachRowContent}>
                            <Image style={styles.eachLogoEN} source={require("../../assets/0_Logo/phone.png")} />
                            <View style={styles.eachInfoEN}>
                                <Text style={styles.changeText}>Emergency Number</Text>
                                <Text style={styles.changeText}>{this.state.emergencyNumberProfile}</Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button title="Change" style={styles.buttonChange} color="#219897" onPress={() => this.setModalENVisible(true)}/> 
                            </View>
                        </View>
                        <View style={styles.eachRowContent}>
                            <Image style={styles.eachLogo} source={require("../../assets/0_Logo/bluetooth.png")} />
                            <View style={styles.eachInfo}>
                                <Text style={styles.changeText}>Bluetooth Address</Text>
                                <Text style={styles.changeText}>{this.state.macAddressProfile}</Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button title="Change" style={styles.buttonChange} color="#219897" onPress={() => this.setModalBluetoothVisible(true)}/>
                            </View> 
                        </View>
                        <View style={styles.eachRowContent}>
                            <Image style={styles.eachLogo} source={require("../../assets/0_Logo/users.png")} />
                            <Text style={styles.changeText}>Users</Text>
                            <TouchableOpacity style={styles.buttonContainer}>
                                <Button title="View" style={styles.buttonChange} color="#219897" onPress={() => this.props.navigation.navigate('UserList')}/>
                            </TouchableOpacity>
                            {/* <View style={styles.buttonContainer}>
                            </View>  */}
                        </View>
                        <View style={styles.buttonLogout}>
                            <Button title="LOGOUT" color="#219897" onPress={this.logout}/>                    
                        </View>
                    </View>

                    {/* MODAL SOS */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalSOSVisible}
                        onRequestClose={() => {
                            this.setModalSOSVisible(false)
                        }}
                        style={styles.modalWrapper}>

                        <View style={styles.modalWrapper}>
                            <View>
                                <View style={styles.modalTitleWrapper}>
                                    <Text style={styles.modalTitle}>SOS Number</Text>
                                </View>
                                    
                                <View style={styles.bodyInfo}>
                                    <Text style={styles.currentInfoTitle}>Current SOS Number</Text>
                                    <Text style={styles.currentInfo}>{this.state.sosNumberProfile}</Text>
                                    <Text style={styles.newInfoTitle}>New SOS Number</Text>
                                    <TextInput underlineColorAndroid="white" value={this.state.emptyNewValue} 
                                        onChangeText={(emptyNewValue) => this.setState({emptyNewValue: emptyNewValue})} style={styles.newInfo} 
                                        placeholder="SOS Number" placeholderTextColor="white">
                                    </TextInput>
                                </View>

                                <View style={styles.btnModal}>
                                    <View style={styles.btnModalWrapper}>
                                        <TouchableOpacity style={styles.btnModalSaveCancel}>
                                            <Button title="Save" color="#219897" onPress={this.savePressedSOS} />                                            
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.btnModalWrapper}>
                                        <TouchableOpacity style={styles.btnModalSaveCancel}>
                                            <Button title="Cancel" color="#219897" onPress={() => {this.setModalSOSVisible(!this.state.modalSOSVisible);}} />                                        
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                        </View>
                    </Modal>

                    {/* MODAL EN */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalENVisible}
                        onRequestClose={() => {
                            this.setModalENVisible(false)
                        }}
                        style={styles.modalWrapper}>

                        <View style={styles.modalWrapper}>
                            <View>
                                <View style={styles.modalTitleWrapper}>
                                    <Text style={styles.modalTitle}>Emergency Number</Text>
                                </View>

                                <View style={styles.bodyInfo}>
                                    <Text style={styles.currentInfoTitle}>Current Emergency Number</Text>
                                    <Text style={styles.currentInfo}>{this.state.emergencyNumberProfile}</Text>
                                    <Text style={styles.newInfoTitle}>New Emergency Number</Text>
                                    <TextInput underlineColorAndroid="white" value={this.state.emptyNewValue1} 
                                        onChangeText={(emptyNewValue1) => this.setState({emptyNewValue1: emptyNewValue1})} style={styles.newInfo} 
                                        placeholder="Emergency Number" placeholderTextColor="white">
                                    </TextInput>
                                </View>

                                <View style={styles.btnModal}>
                                    <View style={styles.btnModalWrapper}>
                                        <TouchableOpacity style={styles.btnModalSaveCancel}>
                                            <Button title="Save" color="#219897" onPress={this.savePressedEN} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.btnModalWrapper}>
                                        <TouchableOpacity style={styles.btnModalSaveCancel}>
                                            <Button title="Cancel" color="#219897" onPress={() => {this.setModalENVisible(!this.state.modalENVisible);}} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    {/* MODAL BLUETOOTH */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalBluetoothVisible}
                        onRequestClose={() => {
                            this.setModalBluetoothVisible(false)
                        }}
                        style={styles.modalWrapper}>

                        <View style={styles.modalWrapper}>
                            <View>
                                <View style={styles.modalTitleWrapper}>
                                    <Text style={styles.modalTitle}>Bluetooth Address</Text>
                                </View>

                                <View style={styles.bodyInfo}>
                                    <Text style={styles.currentInfoTitle}>Current Bluetooth Address</Text>
                                    <Text style={styles.currentInfo}>{this.state.macAddressProfile}</Text>
                                    <Text style={styles.newInfoTitle}>New Bluetooth Address</Text>
                                    <TextInput underlineColorAndroid="white" value={this.state.emptyNewValue2} 
                                        onChangeText={(emptyNewValue2) => this.setState({emptyNewValue2: emptyNewValue2})} style={styles.newInfo} 
                                        placeholder="Bluetooth Address" placeholderTextColor="white">
                                    </TextInput>
                                </View>

                                <View style={styles.btnModal}>
                                    <View style={styles.btnModalWrapper}>
                                        <TouchableOpacity style={styles.btnModalSaveCancel}>
                                            <Button title="Save" color="#219897" onPress={this.savePressedBA} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.btnModalWrapper}>
                                        <TouchableOpacity style={styles.btnModalSaveCancel}>
                                            <Button title="Cancel" color="#219897" onPress={() => this.setModalBluetoothVisible(!this.state.modalBluetoothVisible)} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        minHeight: 95*vh,
        backgroundColor: '#181B23',
        fontSize: 8*vw,
    },
    
    headerWrapper: {
        // display: 'flex',
        // flexDirection: 'row',
        // alignItems: 'center',
        paddingTop: 2*vw,
        paddingBottom: 7.5*vw,
        paddingHorizontal: 4*vw,
    },

    profileWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    profileTitle: {
        fontSize: 11*vw,
        color: 'white',
    },

    headerContent: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 3*vw,
        paddingRight: 7*vw,
        paddingTop: 4*vw,
    },

    titleInfo: {
        fontSize: 5*vw,
        color: 'white',
    },

    nameInfo: {
        paddingBottom: 2*vw,
    },

    emailInfo: {
        paddingBottom: 2*vw,
    },

    contentWrapper: {
        // marginTop: 3*vw,
    },

    eachRowContent: {
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: .5*vw,
        borderColor: 'white',
        alignItems: 'center',
        marginBottom: 4*vw,
        paddingBottom: 2*vw,
        marginHorizontal: 5*vw,
    },

    eachLogo: {
        width: 14*vw,
        height: 14*vw,
    },

    eachLogoEN: {
        width: 14*vw,
        height: 14*vw,
    },

    eachInfo: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 0*vw,
    },
    
    eachInfoEN: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 0*vw,
    },

    changeText: {
        fontSize: 5*vw,
        color: 'white',
        paddingLeft: 3.5*vw,
    },

    buttonContainer: {
        position: 'absolute',
        right: 0,
        width: 25*vw,
        paddingBottom: 15
    },

    buttonLogout: {
        paddingTop: 2*vw,
        // alignItems: 'center',
        paddingHorizontal: 4*vw,
    },

    modalWrapper: {
        backgroundColor: '#181B23',
        minHeight: 100*vh,
    },

    modalTitleWrapper: {
        display: 'flex',
        alignItems: 'center',
    },

    modalTitle: {
        fontSize: 7*vw,
        color: 'white',
        paddingTop: 7*vw,
    },

    bodyInfo: {
        marginHorizontal: 7*vw,
    },

    currentInfoTitle: {
        fontSize: 5*vw,
        color: 'white',
        paddingTop: 12*vw,
    },

    currentInfo: {
        fontSize: 4.5*vw,
        color: 'white',
        paddingLeft: 2*vw,
        paddingTop: 2.5*vw,
    },

    newInfoTitle: {
        fontSize: 5*vw,
        color: 'white',
        paddingTop: 7*vw,
    },

    newInfo: {
        fontSize: 4.5*vw,
        color: 'white',
    },

    btnModal: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10*vw,
    },

    btnModalWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10*vw,
    },

    btnModalSaveCancel: {
        width: 110
    }
});