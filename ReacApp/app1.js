/**
 * App - set all the things up
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  Navigator,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native'

import NavigationBar from 'react-native-navbar'
import SideMenu from 'react-native-side-menu'

// Actions
//import * as SideMenuActions from '../actions/sidemenu'

// App Globals
// import AppStyles from '../styles';
// import AppConfig from '../config';
// import AppUtil from '../util';

// Google Analytics
//import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
//const GoogleAnalytics = new GoogleAnalyticsTracker(AppConfig.gaTrackingId);

// Components
// import Menu from '../components/menu';
// import NavbarElements from '../components/navbar.elements';

// Screens
// import Index from '../screens/root';

/* Component ==================================================================== */
class AppContainer extends Component {

  _renderScene = (route, navigator) => {

    // Default Navbar Title
      
      let title = route.title;

      // Show Hamburger Icon when index is 0, and Back Arrow Icon when index is > 0
      let leftButton = {
        onPress: (route.index > 0)
          ? this.refs.rootNavigator.pop 
          : this.props.toggleSideMenu,
        icon: (route.index > 0)
          ? 'ios-arrow-back-outline'
          : 'ios-menu-outline'
      };

      // Show a cross icon when transition pops from bottom
      if(route.transition == 'FloatFromBottom')  {
        leftButton.icon = 'ios-close-outline';
      }

      return (
        <View>
          
          <NavigationBar

            title      =  {<NavbarElements.Title title={title || null} />}

            statusBar  =  {{style: 'light-content', hidden: false}}            

            leftButton =  {<NavbarElements.LeftButton 
                            
                            onPress  =  {leftButton.onPress}/>} />

          <route.component navigator = {navigator} route = {route} {...route.passProps} />

        </View>
      );


  }  

  render() {
    return (
      
    <SideMenu

      isOpen  =  {true}

    >

      <View>


        <Text>111 </Text>
      </View>

      <Navigator 

          ref          = "rootNavigator"          
          renderScene  =  {this._renderScene}

      />      

    </SideMenu>

    );
  }
}


export default AppContainer;