
import React, {
  Component,
} from 'react';

import {
  Text,
} from 'react-native';

import { Provider } from 'mobx-react/native';
import clientStore from '../stores/clients'

class MobxWrapper extends React.Component {

  render () { 
    
    const stores = {clientStore};

    const Component = this.props.component_inner;

    return(

     <Provider { ...stores }>
       <Component/>
     </Provider>

    ) 

  }
}

export default MobxWrapper