/**
 * @format
 */

import { Navigation } from 'react-native-navigation';
import { registerScreens } from '@boot/routes';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Boot'
      }
    }
  });
});
