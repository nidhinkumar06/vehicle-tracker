import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './BootStyleSheet';
import { goToAuth, gotoAdminPage, gotoDriverPage } from './navigation';
import { AsyncStorage } from 'react-native';
import Constants from '@config/Constants';


class Boot extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    try {
      const user = await AsyncStorage.getItem(Constants.USERINFO);
      if (!user) {
        goToAuth();
      } else {
        user === 'driver' ? gotoDriverPage() : gotoAdminPage();
      }
    } catch (err) {
      goToAuth();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading</Text>
      </View>
    );
  }
}


export default Boot;
