import {
  FETCH_VEHICLES_START,
  FETCH_VEHICLES_SUCCESS,
  FETCH_VEHICLES_ERROR
} from '../actionTypes/vehicle';

export const fetchVehiclesStart = () => ({ type: FETCH_VEHICLES_START });
export const fetchVehiclesSuccess = (data) => ({
  type: FETCH_VEHICLES_SUCCESS,
  payload: data
});

export const fetchVehiclesError = () => ({ type: FETCH_VEHICLES_ERROR });
