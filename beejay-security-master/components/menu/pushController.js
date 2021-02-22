import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';

export default class PushController extends Component{
    componentDidMount(){
        PushNotification.configure({
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },
            popInitialNotification: true,
            requestPermissions: true,
            onNotification: function(notification) {
              //console.log( 'NOTIFICATION:', notification );
            },
          });
    }

    render(){
        return null;
    }
}