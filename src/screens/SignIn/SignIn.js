import React from 'react';
import PropTypes from 'prop-types';
import { ToastAndroid, ScrollView } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import FormInput from '@components/FormInput';
import PrimaryBtn from '@components/PrimaryBtn';
import authUser from './Signin.action';
import validate from './validate';
import { gotoAdminPage, gotoDriverPage } from '@boot/navigation';
import { AsyncStorage } from 'react-native';
import Constants from '@config/Constants';

class SignIn extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Sign In'
        }
      }
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      isSignin: false
    };
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  onSignin = (values) => {
    const { email, password } = values;
    this.setState({ isSignin: true });
    this.props
      .dispatch(authUser(email, password))
      .then((res) => {
        this.setState({ isSignin: false });
        ToastAndroid.show('Sign In Successfully!', ToastAndroid.SHORT);
        AsyncStorage.setItem(Constants.USERINFO, res);
        if (res === 'driver') {
          gotoDriverPage();
        } else {
          gotoAdminPage();
        }
      })
      .catch(() => {
        this.setState({ isSignin: false });
        ToastAndroid.show('Sign In Failed!', ToastAndroid.SHORT);
      });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <ScrollView>
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

        <PrimaryBtn
          title={this.state.isSignin ? 'Signing In....' : 'Sign In'}
          onPress={handleSubmit(this.onSignin)}
        />
      </ScrollView>
    );
  }
}

SignIn.propTypes = {
  componentId: PropTypes.string,
  handleSubmit: PropTypes.func,
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo
});

const signinForm = reduxForm({
  form: 'signinForm',
  validate
})(SignIn);

export default connect(mapStateToProps)(signinForm);
