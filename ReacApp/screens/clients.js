import React from 'react';
import {  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ListView,
  TouchableOpacity} from "react-native";

import { observer, inject } from 'mobx-react/native' 
import {Actions} from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import AppStyles from '../common/styles'
import Button from '../components/button'



let deviceWidth  = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height


@inject('clientStore')
@observer 
class Clients extends React.Component {

  
  componentWillMount() {
    console.log(55555)
    
    this.props.clientStore.getClients();
    console.log(this.props.clientStore.Clients)
  }

  render () {


    let ds         =  new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})  
    let dataSource =  ds.cloneWithRows(this.props.clientStore.Clients.slice());   
    console.log(2222)
    console.log(this.props.clientStore.Clients)
    console.log(dataSource)

    return (
        
     <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
        {/*Rest of App come ABOVE the action button component!*/}


          <View> 
            
            <View>
              <Text>Launch page</Text>
            </View>

            <ListView

              dataSource = {dataSource}

              renderRow = { (data) => {
                
                let id_client = data.Id;

                return (                 
                  <TouchableOpacity
                        onPress = {() => {

                          Actions.client_data({data:{client_id: id_client}, title:"Edit client data" })                           

                        }} >
                  
                    <View style={styles.card}>                      
                      <View>
                        
                        <Image                      
                          style  = {styles.avatar}
                          source = {{uri: 'http://avki.ru/avatar-famous/avki-ru-0052-ava-famous.jpg' }}/>

                      </View>                      
                      <View style={styles.description}>                        
                        <View style={styles.firstRow}>
                          <Text style={styles.username}>000000</Text>
                          <Text style={styles.username}>111111</Text>
                        </View>
                        <Text style={styles.title}>{data.FirstName + ' ' + data.LastName}</Text>                        
                      </View>

                    </View>
                  
                  </TouchableOpacity>

                )
              }} />
              
          </View>


        <ActionButton buttonColor="rgba(231,76,60,1)" 
                      onPress = {() => { Actions.client_data({data:{client_id: 0}, title:"Add client data" })}} >
                    
        </ActionButton>

      </View>
                    



    )
  }
}


let styles = StyleSheet.create({

  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

  container: {
    width: deviceWidth,
    backgroundColor: '#f4f4f4'
  },
  progressbar: {
    marginTop: 10,
    alignItems: 'center'
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC'
  },
  avatar: {
    padding: 10,
    width: 50,
    height: 50
  },
  description: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column'
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  username: {
    fontSize: 10
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
    color: '#000',
    fontSize: 12
  },
  countContainer: {
    flexDirection: 'row'
  },
  count: {
    fontSize: 10
  }
})

export default Clients
