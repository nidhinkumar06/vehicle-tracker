const validate = (values) => {
  const errors = {};

  if (!values.vehicleNo) {
    errors.vehicleNo = 'VehicleNo no is required';
  }

  if (!values.modelName) {
    errors.modelName = 'Model Name  is required';
  }

  if (!values.driverName) {
    errors.driverName = 'Driver Name is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Enter valid E-Mail';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Confirm password didn\'t match. Please try again';
  }

  return errors;
};
export default validate;
