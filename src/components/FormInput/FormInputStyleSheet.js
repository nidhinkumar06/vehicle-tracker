import { StyleSheet } from 'react-native';
import Colors from '@config/Colors';

const styles = StyleSheet.create({
  formView: {
    margin: 10
  },
  textInput: {
    fontSize: 15,
    borderColor: Colors.gray,
    borderWidth: 1
  },
  errorText: {
    color: Colors.erorr
  }
});

export default styles;
