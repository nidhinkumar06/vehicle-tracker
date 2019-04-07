import { db } from '../../firebase';
import { addTripStart, addTripSuccess, addTripError } from '@redux/actions';

const startTrip = (params, key, status) => {
  return (dispatch) =>
    new Promise(function(resolve, reject) {
      dispatch(addTripStart());
      db.updateVehicleStatus(params, key).then(() => {
        dispatch(addTripSuccess());
        resolve(`Trip ${status}`);
      }).catch((error) => {
        dispatch(addTripError(error));
        reject(error);
      });
    });
};
export default startTrip;
