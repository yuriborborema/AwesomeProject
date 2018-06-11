/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Alert,
  View
} from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const testbleplx = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'hahahahhahfdsafdsgdas',
});

type Props = {};

var deviceRssiRec = 18787;

const altDevRs = () =>{
  deviceRssiRec = 2;
}

class bles extends Component{
constructor() {
  super();
  this.manager = new BleManager();
  this.devicesScanned;
  this.state = {
    devRssi: 1,
    devName: 1,
    devId: 1,
  }

}

componentWillMount() {

const subscription = this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {

            this.manager.startDeviceScan(null, null, (error,device) => {
                if (error) {
                    Alert.alert('error on on scanAndConnect');
                }

                if (device.name === 'HMSoft') {

                    this.manager.stopDeviceScan();

                    device.connect().then((device) => {
                      return device.discoverAllServicesAndCharacteristics(device.id)
                    })
                    .then((device) => {
                      device.readRSSI().then((device) => {
                        this.state.devRssi = device.rssi;
                        a='joa 414141';
                        Alert.alert(device.rssi+' rssi' + 'a ' + a);

                      })

                        /*device.readRSSI()
                          .then(()=>{
                            Alert.alert(device.rssi+'faf');
                            })
                          .catch(()=>{
                            Alert.alert('erro no rssi');
                          })
                          /*device.discoverAllServicesAndCharacteristics()
                            .then(()=>{

                            device.services()
                              .then((fromResolve)=>{
                                Alert.alert(fromResolve.forEach(function(item,array){
                                  return item;}
                                )+' hehe Borborema');
                                })
                          })*/


                      })
                }
                  //Alert.alert(device.id);


            });

        subscription.remove();
      }
  }, true);
  //return device.name;
}

render(){
  this.componentWillMount();

  return (
      <Text>
      oi {this.state.devRssi} olha o a ai
      </Text>
  );
}

}

export default class App extends Component<Props> {


render() {
    altDevRs();
    const blest= new bles();
      return (
        <View style={styles.container}>

        <Text>
        {blest.render()}

        {deviceRssiRec}
        </Text>
        </View>
      );

  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
