import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, Text } from 'react-native';
import styles from './FormInputStyleSheet';

class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      placeholder,
      keyboardType,
      maxLength,
      secureTextEntry,
      input: { onChange },
      meta: { error, touched }
    } = this.props;
    return (
      <View style={styles.formView}>
        <TextInput
          style={styles.textInput}
          onChangeText={onChange}
          placeholder={placeholder}
          keyboardType={keyboardType}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
        />
        {touched && error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
}
FormInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
  maxLength: PropTypes.number,
  secureTextEntry: PropTypes.bool
};
export default FormInput;
