import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { StackNav } from "./route";

class App extends React.Component {
    render() {
        return(
            <StackNav />
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    logo: {
        width: 160,
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
        marginTop: 0
    },
    signInLabel: {
        fontSize: 35,
        color: 'white'
    },
    inputContainer: {
        marginBottom: 30
    },
    inputText: {
        width: 300,
        color: 'white'
    },
    buttonContainer: {
        width: 300 
    },
    footer: {
        position: 'absolute',
        bottom: 20
    },
    signUpButton: {
        color: 'white'
    }
  });

export default App;