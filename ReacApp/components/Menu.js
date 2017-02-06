/**
 * Menu Contents
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

// /* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

// // Screens
import {Actions} from 'react-native-router-flux';


//
/* Component ==================================================================== */
class Menu extends Component {
  
  constructor() {
    
    super();

    // Initial state
    this.state = {
      
      menu: [

        {  title: 'Clients',

           _onClick: () => Actions.clients({data:"Custom data", title:"Clients1" }) 
        },

        {  title: 'Test',

           _onClick: () => Actions.test({data:"Custom data", title:"Test1" }) 
        },        
        
      ],

    };

  }

  /**
    * RENDER
    */
  render = () => {
    
    let { menu }      = this.state;

    // Build the actual Menu Items
    let menuItems     = [];

    menu.map((item)  =>  {
      
      let { title, props } = item;

      menuItems.push(

        <TouchableOpacity key  =  {'menu-item-' + title}
        
          onPress  =  {item._onClick}>
        
          
          <View>

            <Text>

              {title}

            </Text>

          </View>

        
        </TouchableOpacity>
      );

    });

    return (
      <View>
        
        <View>
        
          {menuItems}

        </View>

      </View>
    );
  }
}


// /* Export Component ==================================================================== */
export default Menu
