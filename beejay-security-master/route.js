import React from 'react';
import Home from './components/menu/home';
import LiveStream from './components/menu/livestream';
import Profile from './components/menu/profile';
import SOS from './components/menu/sos';
import Notification from './components/menu/notification';
import SignIn from "./components/sign-in/sign-in";
import SignUp from "./components/sign-up/sign-up";
import UserList from "./components/menu/userList";
import NotifDetails from "./components/menu/notifDetails";
import Gallery from "./components/menu/gallery";
import { AsyncStorage, StyleSheet, View, Text, TextInput, Button, TouchableOpacity, Image, StatusBar, Dimensions, ScrollView } from 'react-native';

import{ createBottomTabNavigator, StackNavigator } from 'react-navigation';
import Icon from "react-native-vector-icons/MaterialIcons";

export const MainMenu = createBottomTabNavigator(
    {
      Home: {
        screen: Home,
        navigationOptions: {
          // tabBarIcon: <Icon name="home" size={30} color={'red'}/>,
          tabBarIcon: ({tintColor}) => <Icon name='home' color={tintColor} size={25}/>,
          tabBarOptions: {
            activeTintColor: 'white',
            style: {
              backgroundColor: 'black',
            }
          }
        }
      },
      SOS: {
        screen: SOS,
        navigationOptions: {
          // tabBarIcon: <Icon name="warning" size={25} />
          tabBarIcon: ({tintColor}) => <Icon name='warning' color={tintColor} size={25}/>,
          tabBarOptions: {
            activeTintColor: 'white', 
            style: {
              backgroundColor: 'black',
            }
          }
        }
      },
      Notification: {
        screen: Notification,
        navigationOptions: {
          // tabBarIcon: <Icon name="warning" size={25} />
          tabBarIcon: ({tintColor}) => <Icon name='notifications' color={tintColor} size={25}/>,
          tabBarOptions: {
            activeTintColor: 'white', 
            style: {
              backgroundColor: 'black',
            }
          }
        }
      },
      Gallery:{
        screen: Gallery,
        navigationOptions: {
          // tabBarIcon: <Icon name="warning" size={25} />
          tabBarIcon: ({tintColor}) => <Icon name='photo' color={tintColor} size={25}/>,
          tabBarOptions: {
            activeTintColor: 'white', 
            style: {
              backgroundColor: 'black',
            }
          }
        }
      },
      Livestream: {
        screen: LiveStream,
        navigationOptions: {
          // tabBarIcon: <Icon name="videocam" size={30} />
          tabBarIcon: ({tintColor}) => <Icon name='videocam' color={tintColor} size={25}/>,
          tabBarOptions: {
            activeTintColor: 'white',
            style: {
              backgroundColor: 'black',
            }  
          }
        }
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          // tabBarIcon: <Icon name="nature-people" size={25} />
          tabBarIcon: ({tintColor}) => <Icon name='person' color={tintColor} size={25}/>,
          tabBarOptions: {
            activeTintColor: 'white',
            style: {
              backgroundColor: 'black',
            }
          }
        }
      }
    },
    {
        initialRouteName: 'Home'
    }
  );

export const StackNav = StackNavigator(
    {
      SignIn: {
        screen: SignIn,
        navigationOptions: { header: null }
    },
      SignUp: {
        screen: SignUp,
        navigationOptions: { header: null }
      },
      Menu: {
        screen: MainMenu,
        navigationOptions: { header: null }
      },
      NotifDetails: {
        screen: NotifDetails,
        navigationOptions: { header: null }
      },
      UserList: {
        screen: UserList,
        navigationOptions: { header: null }
      }
    },
      
    {
      initialRouteName: 'SignIn',
    }
  );