import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import io from 'socket.io-client/dist/socket.io';
window.navigator.userAgent = 'react-native';

export default class App extends React.Component {

  constructor(){
    super();
    /*This has to be your server IP, cannot localhost or something similar, please do change the IP
    according to your server IP*/
    this.socket = io('http://192.168.43.158:8000', {jsonp: false});
    this.state = {
      text: ""
    }
  }

  //Get the emit from server, put it into the state
  componentDidMount(){
    this.socket.on("FromAPI", data => {
      const res = this.state.text;
      console.log(data)
      this.setState({ text: data })
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
