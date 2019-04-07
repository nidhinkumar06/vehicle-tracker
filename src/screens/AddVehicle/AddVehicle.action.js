import { db } from '../../firebase';
import {
  addVehicleStart,
  addVehicleSuccess,
  addVehicleError
} from '@redux/actions';

const addVehicle = (params) => {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(addVehicleStart());
      db.addNewVehicle(params)
        .then((response) => {
          dispatch(addVehicleSuccess());
          resolve(response);
        })
        .catch((error) => {
          dispatch(addVehicleError());
          reject(error.message);
        });
    });
};
export default addVehicle;
