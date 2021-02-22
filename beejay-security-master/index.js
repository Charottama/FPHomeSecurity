/** @format */
import App from "./App";
import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'

// import Navbar from './components/menu/Navbar'

// const drawernav = DrawerNavigator({
//   Item1: {
//       screen: Navbar,
//     }
//   }, {
//     contentComponent: Sidebar,
//     drawerWidth: Dimensions.get('window').width - 120,  
// });

AppRegistry.registerComponent(appName, () => App);

// Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => App);
// Navigation.registerComponent('Home', () => require('./components/Home').default);
// Navigation.registerComponent('Navbar', () => require('./components/Navbar').default);

// /* BLM PASTI */
// Navigation.registerComponent('Gallery', () => require('./components/Gallery').default);
// Navigation.registerComponent('Settings', () => require('./components/Settings').default);
// Navigation.registerComponent('About', () => require('./components/About').default);
// Navigation.registerComponent('FAQ', () => require('./components/FAQ').default);
// Navigation.registerComponent('ContactSupport', () => require('./components/ContactSupport').default);

// Navigation.events().registerAppLaunchedListener(() => {
//   Navigation.setRoot({
//     root: {
//       component: {
//         name: "navigation.playground.WelcomeScreen"
//       }

//     //   component: {
//     //     name: "Gallery"
//     //   },
//     //   component: {
//     //     name: "Settings"
//     //   },
//     //   component: {
//     //     name: "About"
//     //   },
//     //   component: {
//     //     name: "FAQ"
//     //   },
//     //   component: {
//     //     name: "ContactSupport"
//     //   }
//     }
//   });
// });


