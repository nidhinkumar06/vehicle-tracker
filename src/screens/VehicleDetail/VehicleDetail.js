import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import Colors from '@config/Colors';
import onSignOut from '@actions/onSignOut';
import MapView, { Polyline, Marker } from 'react-native-maps';
import styles from './VehicleDetailStyleSheet';

class VehicleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      pointCoords: [],
      distanceData: {}
    };
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    let locationData = this.props.vehicleDetail.currentTrip;
    this.map.fitToCoordinates(locationData.pointCoords);
    this.setState({
      latitude: locationData.currentLocation.latitude,
      longitude: locationData.currentLocation.longitude,
      pointCoords: locationData.pointCoords,
      distanceData: {
        distance: locationData.locationDetails[0].distance.text,
        duration: locationData.locationDetails[0].duration.text
      }
    });
  }

  static get options() {
    return {
      topBar: {
        title: {
          text: 'VehicleDetail'
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

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'logOutBtn') {
      onSignOut();
    }
  }

  render() {
    let marker = null;
    if (this.state.pointCoords.length > 1) {
      marker = (
        <Marker
          coordinate={this.state.pointCoords[this.state.pointCoords.length - 1]}
        />
      );
    }
    return (
      <View style={styles.overview}>
        <View style={styles.container}>
          <MapView
            ref={(map) => {
              this.map = map;
            }}
            style={styles.map}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121
            }}
            showsUserLocation={true}
          >
            <Polyline
              coordinates={this.state.pointCoords}
              strokeWidth={4}
              strokeColor="red"
            />
            {marker}
          </MapView>
        </View>
        <View style={styles.footer}>
          <TouchableHighlight style={styles.bottomButtons}>
            <Text style={styles.footerText}>
              {this.state.distanceData.distance}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.bottomButtons}>
            <Text style={styles.footerText}>
              {this.state.distanceData.duration}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

VehicleDetail.propTypes = {
  vehicleDetail: PropTypes.object
};
export default VehicleDetail;
