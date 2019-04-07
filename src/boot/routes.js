import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';

import store from '@redux/store';

export function registerScreens() {
  Navigation.registerComponentWithRedux('Boot', () => require('./Boot').default, Provider, store);
  Navigation.registerComponentWithRedux('SignIn', () => require('@screens/SignIn').default, Provider, store);
  Navigation.registerComponentWithRedux('AdminHome', () => require('@screens/AdminHome').default, Provider, store);
  Navigation.registerComponentWithRedux('DriverHome', () => require('@screens/DriverHome').default, Provider, store);
  Navigation.registerComponentWithRedux('AddVehicle', () => require('@screens/AddVehicle').default, Provider, store);
  Navigation.registerComponentWithRedux('VehicleDetail', () => require('@screens/VehicleDetail').default, Provider, store);
}
