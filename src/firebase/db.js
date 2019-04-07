import { db } from './firebase';

export const vehicleRef = db.ref('vehicles');

export const addNewVehicle = (data) => vehicleRef.update(data);

export const getVehicle = (vehicleID) =>
  vehicleRef.child(vehicleID).once('value');

export const updateVehicleStatus = (params, vehicleID) => {
  vehicleRef.child(vehicleID).update(params);
};
