import {
  ADD_VEHICLE_START,
  ADD_VEHICLE_SUCCESS,
  ADD_VEHICLE_ERROR
} from '../actionTypes/vehicle';

export const addVehicleStart = () => ({ type: ADD_VEHICLE_START });
export const addVehicleSuccess = () => ({
  type: ADD_VEHICLE_SUCCESS
});

export const addVehicleError = () => ({ type: ADD_VEHICLE_ERROR });
