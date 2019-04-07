import { StyleSheet } from 'react-native';
import Colors from '@config/Colors';

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontSize: 18,
    fontWeight:'bold',
    color: Colors.light
  }
});
export default styles;
