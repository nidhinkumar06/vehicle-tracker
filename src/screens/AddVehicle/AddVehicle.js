import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, ToastAndroid } from 'react-native';
import firebase from 'react-native-firebase';
import FormInput from '@components/FormInput';
import PrimaryBtn from '@components/PrimaryBtn';
import { Navigation } from 'react-native-navigation';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import addVehicle from './AddVehicle.action';
import validate from './validate';
import Colors from '@config/Colors';
import onSignOut from '@actions/onSignOut';

class AddVehicle extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Add Vehicle'
        },
        rightButtons: [
          {
            id: 'logOutBtn',
            text: 'Logout',
            color: Colors.light
          }
        ]
      }
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      isAdding: false
    };
    Navigation.events().bindComponent(this);
  }
  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'logOutBtn') {
      onSignOut();
    }
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  onCreate = (values) => {
    this.setState({ isAdding: true });
    const vehicleRef = firebase.database().ref('vehicles');
    const vehicleRefKey = vehicleRef.push().key;
    const vehicle = {};
    const rmDotEmail = values.email.replace('.', '_dot_');
    vehicle[rmDotEmail] = { id: vehicleRefKey, authType: 'driver', ...values };

    this.props
      .dispatch(addVehicle(vehicle))
      .then(() => {
        this.setState({ isAdding: false });
        ToastAndroid.show('Vehicle Created Successfully!', ToastAndroid.SHORT);
        Navigation.pop(this.props.componentId);
      })
      .catch((error) => {
        this.setState({ isAdding: false });
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <ScrollView>
        <Field
          name="vehicleNo"
          maxLength={10}
          component={FormInput}
          placeholder="Enter Vehicle Number"
        />

        <Field
          name="modelName"
          maxLength={30}
          component={FormInput}
          placeholder="Enter Model Name"
        />
        <Field
          name="driverName"
          maxLength={30}
          component={FormInput}
          placeholder="Enter Driver Name"
        />

        <Field
          name="email"
          component={FormInput}
          keyboardType="email-address"
          placeholder="Enter Your Email"
        />

        <Field
          name="password"
          component={FormInput}
          placeholder="Enter Your Password"
          secureTextEntry
        />
        <Field
          name="confirmPassword"
          component={FormInput}
          placeholder="Re Enter Your Password"
          secureTextEntry
        />

        <PrimaryBtn
          title={this.state.isAdding ? 'Vehicle Adding...' : 'Add Vehicle'}
          onPress={handleSubmit(this.onCreate)}
        />
      </ScrollView>
    );
  }
}

AddVehicle.propTypes = {
  handleSubmit: PropTypes.func,
  dispatch: PropTypes.func,
  componentId: PropTypes.string
};

const addVehicleForm = reduxForm({
  form: 'addVehicleForm',
  validate
})(AddVehicle);

export default connect(null)(addVehicleForm);
