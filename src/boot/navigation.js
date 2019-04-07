import { Navigation } from 'react-native-navigation';
import Colors from '@config/Colors';

export const goToAuth = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'Authentication',
      children: [
        {
          component: {
            name: 'SignIn',
          }
        }
      ],
      options: {
        topBar: {
          background: {
            color: Colors.primary,
          },
          title:{
            text: 'Admin',
            color: Colors.light
          },
        }
      }
    }
  }
});

export const gotoAdminPage = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'Admin',
      children: [
        {
          component: { name: 'AdminHome' },
        }
      ],
      options: {
        topBar: {
          background: {
            color: Colors.primary,
          },
          title:{
            text: 'Admin',
            color: Colors.light
          },
          backButton: {
            color: Colors.light
          },
        }
      }
    }
  }
});

export const gotoDriverPage = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'Driver',
      children: [
        {
          component: {
            name: 'DriverHome',
          }
        }
      ],
      options: {
        topBar: {
          background: {
            color: Colors.primary,
          },
          title:{
            text: 'Admin',
            color: Colors.light
          },
          backButton: {
            color: Colors.light
          },
        }
      }
    }
  }
});
