import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  Text,
  View,
  Keyboard,
  TouchableHighlight,
  ToastAndroid
} from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { Navigation } from 'react-native-navigation';
import { env } from '@config';
import {size, replace} from 'lodash';
import PolyLine from '@mapbox/polyline';
import { getLocation } from '@lib/geolocation-service';
import styles from './DriverHomeStyleSheet';
import Colors from '@config/Colors';
import { connect } from 'react-redux';
import startTrip from './DriveHome.action';
import onSignOut from '@actions/onSignOut';


class DriverHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      latitude: 0,
      longitude: 0,
      source: '',
      destination: '',
      sourceData: [],
      destinationData: [],
      sourcePredictions: [],
      destinationPredictions: [],
      pointCoords: [],
      distanceData: {},
      drivingState: 'START'
    };
    Navigation.events().bindComponent(this);
  }

  static get options() {
    return {
      topBar: {
        title: {
          text: 'Driver',
        },
        rightButtons: [{
          id: 'logOutBtn',
          text: 'Logout',
          color: Colors.light
        }],
      }
    };
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'logOutBtn') {
      onSignOut();
    }
  }

  componentDidMount() {
    getLocation().then((response) => {
      this.setState({
        latitude: response.coords.latitude,
        longitude: response.coords.longitude,
      });
    });
  }

  async getRouteDirections() {
    Keyboard.dismiss();
    let sourcePlaceId = this.state.sourceData.placeId;
    let sourceName = this.state.sourceData.locationName;
    let destinationPlaceId = this.state.destinationData.placeId;
    let destinationName = this.state.destinationData.locationName;
    let params = {};
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${sourcePlaceId}&destination=place_id:${destinationPlaceId}&key=${env.googleApiKey}`
      );
      const json = await response.json();
      let resultantData = json.routes[0].legs;
      const points = PolyLine.decode(json.routes[0].overview_polyline.points);
      const pointCoords = points.map((point) => {
        return { latitude: point[0], longitude: point[1] };
      });
      let routesData = {distance: resultantData[0].distance.text, duration: resultantData[0].duration.text};
      params.currentLocation = {latitude: this.state.latitude, longitude: this.state.longitude};
      params.pointCoords = pointCoords;
      params.locationDetails = resultantData;
      this.setState({
        pointCoords,
        predictions: [],
        soruce: sourceName,
        destination: destinationName,
        distanceData: routesData
      });
      this.map.fitToCoordinates(pointCoords);
      let tripData = {currentTrip: params};
      this.updateTripData(tripData, 'started');
    } catch (error) {
      console.error(error);
    }
  }

  async onLocationChange(location, type) {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${env.googleApiKey}
    &input=${location}&location=${this.state.latitude},${this.state.longitude}&radius=2000`;
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      this.setState({
        [type]: json.predictions
      });
      this.showPredictions(type);
    } catch (err) {
      console.error(err);
    }
  }

  showPredictions = (type) => {
    let addressKey = replace(type, 'Predictions', '');
    let routeKey = `${addressKey}Data`;
    let predictionsListKey = `${type}List`;
    const predictions = this.state[type].map((prediction) => (
      <TouchableHighlight
        onPress={() =>
          this.setState({
            [routeKey] : {placeId: prediction.place_id, locationName: prediction.structured_formatting.main_text},
            [addressKey]: prediction.structured_formatting.main_text,
            [predictionsListKey]: []
          })
        }
        key={prediction.id}
      >
        <View>
          <Text style={styles.suggestions}>
            {prediction.structured_formatting.main_text}
          </Text>
        </View>
      </TouchableHighlight>
    ));
    this.setState({[predictionsListKey]: predictions});
  }

  changeDrivingState = () => {
    if (this.state.drivingState === 'START') {
      this.getRouteDirections();
      this.setState({drivingState: 'STOP'});
    }else {
      let tripData = {currentTrip: {}};
      this.updateTripData(tripData, 'stopped');
      this.setState({drivingState: 'START'});
    }
  }

  updateTripData = (tripData, status) => {
    const userKey = this.props.userInfo.email.replace('.', '_dot_');
    this.props.dispatch(startTrip(tripData, userKey, status)).then((response) => {
      ToastAndroid.show(response, ToastAndroid.SHORT);
    });
  }

  render() {
    let marker = null;
    let isButtonDisabled = size(this.state.sourceData) && size(this.state.destinationData) > 0 ? false : true;
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
          {this.state.drivingState === 'START' &&
              <TextInput
                placeholder="Enter source..."
                style={styles.sourceInput}
                value={this.state.source}
                clearButtonMode="always"
                onChangeText={(source) => {
                  this.setState({ source });
                  this.onLocationChange(source, 'sourcePredictions');
                }}
              />
          }
          {this.state.sourcePredictionsList}

          {this.state.drivingState === 'START' &&
            <TextInput
              placeholder="Enter destination..."
              style={styles.destinationInput}
              value={this.state.destination}
              clearButtonMode="always"
              onChangeText={(destination) => {
                this.setState({ destination });
                this.onLocationChange(destination, 'destinationPredictions');
              }}
            />
          }
          {this.state.destinationPredictionsList}
        </View>
        <View style={styles.footer}>
          <TouchableHighlight style={styles.bottomButtons}>
            <Text style={styles.footerText}>{this.state.distanceData.distance}</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.stateButtons} disabled={isButtonDisabled} underlayColor={'lightgreen'} onPress={this.changeDrivingState.bind(this)}>
            <Text style={styles.footerText}>{this.state.drivingState}</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.bottomButtons}>
            <Text style={styles.footerText}>{this.state.distanceData.duration}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

}

DriverHome.propTypes = {
  dispatch: PropTypes.func,
  userInfo: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    userInfo: state.auth.userInfo
  };
}


export default connect(mapStateToProps)(DriverHome);
