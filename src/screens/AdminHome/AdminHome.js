import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import Colors from '@config/Colors';
import onSignOut from '@actions/onSignOut';
import fetchVehicles from './fetchVehicles.action';
import styles from './AdminHomeStyleSheet';

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    Navigation.events().bindComponent(this);
  }
  componentDidMount() {
    this.props.dispatch(fetchVehicles());
  }

  gotoPage = (screenName) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName
      }
    });
  };

  static get options() {
    return {
      topBar: {
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

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'logOutBtn') {
      onSignOut();
    }
  }

  onVehicleDetails = (params) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'VehicleDetail',
        passProps: {
          vehicleDetail: params
        }
      }
    });
  };

  render() {
    const { vehicleData } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {vehicleData.length ? (
            vehicleData.map((value, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  style={styles.gridView}
                  onPress={this.onVehicleDetails.bind(this, value)}
                >
                  <Image
                    source={require('../../images/cab.png')}
                    style={styles.img}
                  />
                  <View>
                    <View style={styles.valueView}>
                      <Text style={styles.label}>Vehicle.No: </Text>
                      <Text style={styles.valueText}>{value.vehicleNo}</Text>
                    </View>

                    <View style={styles.valueView}>
                      <Text style={styles.label}>Model Name: </Text>
                      <Text style={styles.valueText}>{value.modelName}</Text>
                    </View>
                    <View style={styles.valueView}>
                      <Text style={styles.label}>Driver Name: </Text>
                      <Text style={styles.valueText}>{value.driverName}</Text>
                    </View>
                    <View style={styles.valueView}>
                      <Text style={styles.label}>Status: </Text>
                      <Text
                        style={[
                          styles.valueText,
                          value.currentTrip ? styles.isMoving : styles.isHalt
                        ]}
                      >
                        {value.currentTrip ? 'Moving' : 'Halt'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text style={styles.noVehicle}>No Vehicle Fonud</Text>
          )}
        </ScrollView>
        <TouchableOpacity
          style={styles.buttonView}
          onPress={this.gotoPage.bind(this, 'AddVehicle')}
        >
          <Text style={styles.addBtnText}>Add Vehicle</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

AdminHome.propTypes = {
  componentId: PropTypes.string,
  vehicleData: PropTypes.array,
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => ({
  vehicleData: state.vehicle.data
});

export default connect(mapStateToProps)(AdminHome);
