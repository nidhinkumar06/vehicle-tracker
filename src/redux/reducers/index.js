import { combineReducers } from 'redux';
import authReducer from './auth';
import vehicleReducer from './vehicle';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  vehicle: vehicleReducer
});
export default rootReducer;
