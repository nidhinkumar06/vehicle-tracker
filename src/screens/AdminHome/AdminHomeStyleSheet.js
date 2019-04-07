import { StyleSheet } from 'react-native';
import Colors from '@config/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    marginBottom: 50
  },
  gridView: {
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 5,
    borderBottomColor: Colors.dark,
    borderBottomWidth: 1
  },
  valueView: {
    flexDirection: 'row'
  },
  label: {
    fontSize: 16,
    color: Colors.dark,
    fontWeight: 'bold',
    marginRight: 5
  },
  valueText: {
    fontSize: 16,
    color: Colors.dark
  },
  img: {
    height: 70,
    width: 100,
    marginRight: 20
  },
  buttonView: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  addBtnText: {
    fontSize: 15,
    color: Colors.light
  },
  noVehicle: {
    marginVertical: 20,
    fontSize: 15,
    color: Colors.dark,
    textAlign: 'center'
  },
  isMoving: {
    color: Colors.success
  },
  isHalt: {
    color: Colors.erorr
  }
});
export default styles;
