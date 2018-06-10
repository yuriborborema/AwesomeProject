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

class bles extends Component{
constructor() {
  super();
  this.manager = new BleManager();
  this.devicesScanned;

}

componentWillMount() {

const subscription = this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {

            this.manager.startDeviceScan(null, null, (error, device) => {
                if (error) {
                    Alert.alert('error on on scanAndConnect');

                }

                if (device.name === 'HMSoft') {
                    this.manager.stopDeviceScan();

                    device.connect().then((device) => {
                      //Alert.alert('connnected');
                      Alert.alert(readRSSIForDevice(this.device,null).then());
                      })
                }
                  //Alert.alert(device.id);


            });

        subscription.remove();
      }
  }, true);
  //return device.name;

}

}

export default class App extends Component<Props> {


render() {
    const blest= new bles();
      return (
        <Text>
        {blest.componentWillMount()}
        </Text>
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
