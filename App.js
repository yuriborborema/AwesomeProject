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

/*var deviceRssiScreen =2;

const altDevRs = (rssiScanneado) =>{
  deviceRssiScreen = rssiScanneado;
}*/

class Bles extends Component{
constructor() {
  super();
  this.manager = new BleManager();
  this.state = {
    rssiScanneado:1,
    timePassed: false, };
    distDev:1
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
                        this.state.rssiScanneado = device.rssi;
                        //altDevRs(device.rssi);

                        
                        let MeasuredPower = -64;

                        this.state.distDev = Math.pow(10,())
                        //Alert.alert(device.rssi+' rssi '+ this.state.rssiScanneado);
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
  let that = this;

  setTimeout(function(){that.setState({timePassed: true})}, 500);

  if (!that.state.timePassed){
      return <Text>
      LoadingRssi</Text>;
    }else{
      let rssiScren = this.state.rssiScanneado;
      return (
        <Text>
        Rssi (dB): {rssiScren} - Distancia (m):
        </Text>
      );
    }
}

}

export default class App extends Component<Props> {

render() {

      return (
        <View style={styles.container}>
        <Bles/>
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
