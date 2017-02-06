/**
 * Global App Config
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

import Dimensions from 'Dimensions';
var window = Dimensions.get('window');

/* Setup ==================================================================== */
exports.title = 'GlobalConfig';

const dsDummy    = 0;
const dsDB       = 1;
const dsFireBase = 2;

export default {
 // App Details
 appName: 'StarterKit',

 // Window Dimensions
 windowHeight: window.height,
 windowWidth: window.width,

 // Grid
 windowWidthHalf: window.width * 0.5,
 windowWidthYhird: window.width * 0.333,
 windowWidthYwoThirds: window.width * 0.666,
 windowWidthQuarter: window.width * 0.25,
 windowWidthThreeQuarters: window.width * 0.75,

 // General Element Dimensions
 navbarHeight: 64,
 statusBarHeight: 22,

 // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: (__DEV__) ? 'UA-84284256-2' : 'UA-84284256-1',

 // Fonts
 baseFont: "Avenir",
 baseFontSize: 14,

 // Colors
 primaryColor: "#4099FF",
 secondaryColor: "#FFE229",
 textColor: "#555",
 borderColor: "#E7E7E7",
 //server: (__DEV__) ? 'https://fascedo12345.herokuapp.com' : 'http://192.168.0.100:3000',
 server: 'http://192.168.0.103:3000',
 //server: 'https://fascedo12345.herokuapp.com',
 DB: {users   :   "users", 
      clients :   "clients"},

 ACCESS_TOKEN: 'fascedo_access_token',

 Data_Source: dsDummy

 
}
