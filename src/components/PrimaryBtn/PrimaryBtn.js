import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import styles from './PrimaryBtnStyleSheet';

const PrimaryBtn = (props) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={props.onPress}>
      <Text style={styles.btnText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

PrimaryBtn.propTypes = {
  onPress: PropTypes.string,
  title: PropTypes.string
};

export default PrimaryBtn;
