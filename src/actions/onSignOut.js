import { auth } from '../firebase';
import { AsyncStorage } from 'react-native';
import Constants from '@config/Constants';
import { goToAuth } from '@boot/navigation';

const onSignOut = () => {
  auth.onSignOut();
  AsyncStorage.removeItem(Constants.USERINFO);
  goToAuth();
};
export default onSignOut;
