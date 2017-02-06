/**
 * Form SCREEN
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  TextInput,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native'
 import FormValidation from 'tcomb-form-native'


 // App Globals
 import AppStyles from '../common/styles'
 import AppUtil from '../common/util'

 // Components
 import Button from '../components/button'
 import Alerts from '../components/alerts'
 import AppConfig from '../common/config'
 import tokenStore from '../stores/token'
 import clientStore from '../stores/clients'

/* Component ==================================================================== */
class ClientEditForm extends Component {
 
  static componentName  = 'ClientEditForm';
  static componentTable = AppConfig.DB.clients;



  constructor(props) {
 
    super(props);

    FormValidation.form.Form.i18n = {
      optional: '',
      required: ' (required)'
    };

    // Initial state
    this.state = {
      
      resultMsg: {

        status: '',
        success: '',
        error: '',

      },

      form_fields: FormValidation.struct({

        firstname: FormValidation.String,
        lastname: FormValidation.String,


      }),

      empty_form_values: {

        firstname: '',
        lastname: '',
      },

      form_values: {},
      
      options: {
      
        fields: {
          
          firstname: { error: 'Please enter first name' },
          
          lastname: { error: 'Please enter last name' },          

        }
      },

    }
  }

  /**
    * Executes after all modules have been loaded
    */
  componentDidMount = () => {
    
    this.client = clientStore.getClientByID(this.props.data.client_id);
    
    console.log(9999)
    console.log(this.props.data.client_id)
    console.log(this.client)
    console.log(this.props)

    if (this.props.data.client_id != 0)
    {
      this.setState({
              form_values: {firstname: this.client.FirstName, lastname: this.client.LastName}
            });
    }

  }

  AddClient() {

    clientStore.add(
    {                                   
      FirstName: this.state.form_values.firstname,
      LastName: this.state.form_values.lastname,
    })

  }

  UpdateClient() {

    clientStore.update(
    {                                   
      Id: this.props.data.client_id,
      FirstName: this.state.form_values.firstname,
      LastName: this.state.form_values.lastname,
    })

  }

  DeleteClient() {

  }

  /**
    * Save Form Data to App
    */
  _saveData = () => {
    if (this.props.data.client_id == 0) 
    {
      this.AddClient()
    } else
    {
      this.UpdateClient()
    }  

  }

  /**
    * Delete Data
    */
  _deleteData = () => {

     this.DeleteClient()
      
  }

  /**
    * Sign Up
    */
  _signUp = () => {
    // Get new values and update
    var values = this.refs.form.getValue();

    // Form is valid
    if(values) {
      this.setState({form_values: values}, () => {
        // Persist Data
        this._saveData()

      });
    }
  }

  /**
    * RENDER
    */
  render = () => {

      FormValidation.form.Form.i18n = {
        optional: ' (opzionale)',
        required: '',
        add: 'Nuovo',
        remove: 'Elimina',
        up: 'Su',
        down: 'Giù'
      };
    
    var Form = FormValidation.form.Form;

    console.log(1111)
    console.log(this.props)

    return (
      <ScrollView 


        automaticallyAdjustContentInsets={false}

        ref={'scrollView'}

        style={[AppStyles.container]}
        
        contentContainerStyle={[AppStyles.containerCentered, styles.container]}>
        
        <View style={[AppStyles.paddingHorizontal]}>

          <Alerts
            
            status={this.state.resultMsg.status}
            success={this.state.resultMsg.success}
            error={this.state.resultMsg.error} />

          <Text style={[AppStyles.baseText, AppStyles.h3, AppStyles.centered]}>
            {this.state.form_values.firstname == '' ? "Sign Up" : "Update Profile"}
          </Text>

          <Text style={[AppStyles.baseText, AppStyles.p, AppStyles.centered]}>
            This page saves your input to the local DB. FOR ID = {this.props.data.client_id}
          </Text>

          <View style={AppStyles.spacer_20} />

          <Form
            ref="form"
            type={this.state.form_fields}
            value={this.state.form_values}
            options={this.state.options} />

        </View>

        <View style={[AppStyles.row]}>
         
          <View style={[AppStyles.flex1, AppStyles.paddingLeft]}>
              <Button
                text={"Delete"}
                onPress={this._deleteData} />
          </View>

          <View style={[AppStyles.flex1, AppStyles.paddingRight]}>
            <Button
              text={"Save"}
              onPress={this._signUp} />
          </View>

        </View>

        <View style={AppStyles.hr} />


      </ScrollView>
    );
  }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

/* Export Component ==================================================================== */
export default ClientEditForm
