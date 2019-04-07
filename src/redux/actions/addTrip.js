import {
  ADD_TRIP_START,
  ADD_TRIP_SUCCESS,
  ADD_TRIP_ERROR
} from '../actionTypes/vehicle';

export const addTripStart = () => ({ type: ADD_TRIP_START });
export const addTripSuccess = () => ({
  type: ADD_TRIP_SUCCESS
});

export const addTripError = () => ({ type: ADD_TRIP_ERROR });
