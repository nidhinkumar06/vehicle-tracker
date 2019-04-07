const INITIAL_STATE = {
  submitted: false,
  error: false,
  data: []
};

import {
  ADD_VEHICLE_START,
  ADD_VEHICLE_SUCCESS,
  ADD_VEHICLE_ERROR,
  ADD_TRIP_START,
  ADD_TRIP_SUCCESS,
  ADD_TRIP_ERROR,
  FETCH_VEHICLES_START,
  FETCH_VEHICLES_SUCCESS,
  FETCH_VEHICLES_ERROR
} from '../actionTypes/vehicle';

function vehicleReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_VEHICLE_START: {
      return { ...state, submitted: true };
    }
    case ADD_VEHICLE_SUCCESS: {
      return {
        ...state,
        submitted: false
      };
    }
    case ADD_VEHICLE_ERROR: {
      return { ...state, submitted: false, error: true };
    }
    case ADD_TRIP_START: {
      return { ...state, submitted: true };
    }
    case ADD_TRIP_SUCCESS: {
      return {
        ...state,
        submitted: false
      };
    }
    case ADD_TRIP_ERROR: {
      return { ...state, submitted: false, error: true };
    }

    case FETCH_VEHICLES_START: {
      return { ...state, submitted: true };
    }
    case FETCH_VEHICLES_SUCCESS: {
      return {
        ...state,
        submitted: false,
        data: action.payload
      };
    }
    case FETCH_VEHICLES_ERROR: {
      return { ...state, submitted: false, error: true };
    }
    default:
      return state;
  }
}
export default vehicleReducer;
