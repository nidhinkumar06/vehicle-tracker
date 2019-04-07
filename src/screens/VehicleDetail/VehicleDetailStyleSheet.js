import { StyleSheet } from 'react-native';
import Colors from '@config/Colors';

const styles = StyleSheet.create({

  suggestions: {
    backgroundColor: Colors.light,
    padding: 5,
    fontSize: 18,
    borderWidth: 0.5,
    marginLeft: 5,
    marginRight: 5
  },

  sourceInput: {
    height: 40,
    borderWidth: 0.5,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
    backgroundColor: Colors.light
  },

  destinationInput: {
    height: 40,
    borderWidth: 0.5,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
    backgroundColor: Colors.light
  },
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  overview: {
    ...StyleSheet.absoluteFillObject,
  },
  footer: {
    position: 'absolute',
    flex:0.1,
    left: 0,
    right: 0,
    bottom: -10,
    backgroundColor:Colors.primary,
    flexDirection:'row',
    height:80,
    alignItems:'center',
  },
  bottomButtons: {
    alignItems:'center',
    justifyContent: 'center',
    flex:1,
  },
  stateButtons: {
    alignItems:'center',
    justifyContent: 'center',
    flex: 1,
    height: 80,
    backgroundColor: 'green',
  },
  footerText: {
    color:'white',
    fontWeight:'bold',
    alignItems:'center',
    fontSize:16,
  },

});

export default styles;
