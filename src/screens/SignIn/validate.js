const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Enter valid E-Mail';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  return errors;
};
export default validate;
