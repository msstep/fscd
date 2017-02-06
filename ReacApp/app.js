import React, {
  Component,
} from 'react';

import {
  StyleSheet, 
  Text,
  View,
} from 'react-native';

import Clients from './screens/clients';
import Test from './screens/test';
//import IntentAndroidExample from './screens/test_intent';



import Login from './screens/Login';
import Login2 from './screens/Login2';
import Login3 from './screens/Login3';
import Launch from './screens/Launch';
import client_data from './screens/client_data'

import clientStore from './stores/clients'
import MobxWrapper from './components/MobxWrapper'


import {
  Scene,
  Reducer,
  Router,
  Switch,
  Modal,
  Actions,
  ActionConst,
} from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

// define this based on the styles/dimensions you use
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };

  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }

  return style;
};

let currentSwitchPage = 'text1';

const SwitcherPage = (props) => (
  <View>
    <Text style={{ marginTop: 100, textAlign: 'center' }}>current page: {props.text}</Text>
    <Button
      onPress={() => {
        currentSwitchPage = currentSwitchPage === 'text1' ? 'text2' : 'text1';
        Actions.refresh({ key: 'switcher' });
      }}
    >
      Switch!
    </Button>
    <Button
      onPress={() => {
        Actions.launch({ type: ActionConst.RESET });
      }}
    >
      Exit
    </Button>
  </View>
);

class Example extends Component {
  render() {

    //const stores = {clientStore };

    return (

     

        <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
          
          <Scene key="modal" component={Modal} >
            
            <Scene key="root" hideNavBar hideTabBar>
                
                <Scene 
                  key             =  "clients" 
                  component       =  {MobxWrapper} 
                  title           =  "Clients" 
                  component_inner =  {Clients}/>

                <Scene 
                  key             =  "client_data" 
                  component       =  {client_data} 
                  title           =  "Client data"/>

                <Scene 
                  key             =  "test" 
                  component       =  {Test} 
                  title           =  "Test"/>

                <Scene key="clients1" component={Clients} title="Clients" />
                          
                <Scene key="launch" component={Launch} title="Launch" initial />
                
                <Scene key="login" direction="vertical" >
                  
                  <Scene key="loginModal" direction="vertical" component={Login} title="Login" />
                  
                  <Scene
                    key="loginModal2"
                    hideNavBar
                    component={Login2}
                    title="Login2"
                    panHandlers={null}
                    duration={1}
                  />
                  
                  <Scene
                    key="loginModal3"
                    hideNavBar
                    component={Login3}
                    title="Login3"
                    panHandlers={null}
                    duration={1}
                  />

                </Scene>            
            
            </Scene>
                      
          </Scene>

        </Router>
        
         
    );
  }
}

export default Example;








