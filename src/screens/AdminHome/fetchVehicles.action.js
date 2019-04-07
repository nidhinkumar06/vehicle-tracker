import { db } from '../../firebase';
import {
  fetchVehiclesStart,
  fetchVehiclesSuccess,
  fetchVehiclesError
} from '@redux/actions';

const fetchVehicles = () => {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(fetchVehiclesStart());
      db.vehicleRef.on('value', function(snapshot) {
        const val = snapshot.val();
        if (val) {
          const vehicleInfo = Object.values(val).map((data) => {
            return {
              authType: data.authType,
              driverName: data.driverName,
              email: data.email,
              id: data.id,
              modelName: data.modelName,
              vehicleNo: data.vehicleNo,
              currentTrip: data.currentTrip
            };
          });
          dispatch(fetchVehiclesSuccess(vehicleInfo));
          resolve(val.authType);
        } else {
          dispatch(fetchVehiclesError());
          reject();
        }
      });
    });
};
export default fetchVehicles;
