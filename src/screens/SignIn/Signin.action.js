import { auth, db } from '../../firebase';
import { authStart, authSuccess, authError } from '@redux/actions';

const authUser = (email, password) => {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(authStart());
      auth
        .onSignin(email, password)
        .then((response) => {
          const { email } = response.user;
          const rmDotEmail = email.replace('.', '_dot_');

          db.getVehicle(rmDotEmail)
            .then((snapshot) => {
              const val = snapshot.val();
              if (val) {
                const userInfo = {
                  authType: val.authType,
                  driverName: val.driverName,
                  email: val.email,
                  id: val.id,
                  modelName: val.modelName,
                  vehicleNo: val.vehicleNo
                };
                dispatch(authSuccess(userInfo));
                resolve(val.authType);
              } else {
                dispatch(authSuccess());
                resolve('admin');
              }
            })
            .catch((error) => {
              dispatch(authError());
              reject(error.message);
            });
        })
        .catch((error) => {
          dispatch(authError());
          reject(error.message);
        });
    });
};
export default authUser;
