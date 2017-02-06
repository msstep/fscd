'use_strict'

import {observable, action} from 'mobx'
import AppConfig from '../common/config'
import tokenStore from '../stores/token'




class ClientStore {
  
  id_sequence = 0;
  @observable Clients = [];  
  isLoading = false;


  getClients = () => {

  
    switch (AppConfig.Data_Source) {
      case 0: this.getClients_Dummy();
      
      default:
        return this.getClients_DB();
    }
    
  }
  // Test persistent ************************
  
  //----------------------------------------
  
  getClients_Dummy = () => {

    isLoading = true;        
    
    this.Clients = [ 
     
      {Id: '1', FirstName: 'FirstName1', LastName: 'LastName1', Age: '31', Phone: '111111'}, 
      {Id: '2', FirstName: 'FirstName2', LastName: 'LastName2', Age: '31', Phone: '222222'},
      {Id: '3', FirstName: 'FirstName3', LastName: 'LastName3', Age: '31', Phone: '333333'},
      {Id: '1', FirstName: 'FirstName1', LastName: 'LastName1', Age: '31', Phone: '111111'}, 
      {Id: '2', FirstName: 'FirstName2', LastName: 'LastName2', Age: '31', Phone: '222222'},
      {Id: '3', FirstName: 'FirstName3', LastName: 'LastName3', Age: '31', Phone: '333333'},      


    ]

    this.id_sequence = 7;
     
    isLoading = true; 

  }
  
  //----------------------------------------
  
  @action add(data) {
   let new_id = this.id_sequence++ 

   this.Clients.push({Id: new_id, FirstName: data.FirstName, LastName: data.LastName})
   
  }  

  @action update(data) {
    let client = this.getClientByID(data.Id)
    
    client.FirstName = data.FirstName
    client.LastName  = data.LastName
    newClients = this.Clients.slice()

    for(var i=0;i<newClients.length; i++) {
      if (newClients[i].Id === data.Id) {
        newClients[i].FirstName = data.FirstName
        newClients[i].LastName = data.LastName

      } 

    this.Clients = newClients.slice()  
    console.log(8888)
    console.log(this.Clients)


   }
  
  } 

  getClientByID(id) {
   for(var i=0;i<this.Clients.length; i++) {
    if (this.Clients[i].Id === id) {return this.Clients[i]} 
   }
  }

  //----------------------------------------

  // DB persistent *************************

  //----------------------------------------

  getClients_DB = () => {

  }



  async getClientByID_DB() {
    
     fetch(AppConfig.server + '/' + AppConfig.DB.clients + '/' + this.props.route.client_id + '.json' + 
           '?session%5Baccess_token%5D=' + tokenStore.getToken())
        
          .then((response) => response.json())
          .then((responseJson) => {
            
              const val = JSON.stringify(responseJson)

              this.setState({
                          form_values: JSON.parse(val)
                        });


          })
          .catch((error) => {
          });

  }



  async addClient() {

    try {
      let response = await fetch(AppConfig.server + "/" + AppConfig.DB.clients, {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: //JSON.stringify(this.state.form_values)
                              JSON.stringify({
                                session: {access_token: tokenStore.getToken()},
                                client:{                                  
                                  firstname: this.state.form_values.firstname,
                                  lastname: this.state.form_values.lastname,
                                }
                              })
                           });

      if (response.status >= 200 && response.status < 300) {

      } else {
          //Handle errors
          let error = res;
          throw error
      }
    } catch(errors) {
   
    }
  }



}



const clientStore = new ClientStore;

export default clientStore;