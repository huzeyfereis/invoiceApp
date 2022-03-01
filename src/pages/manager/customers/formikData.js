// A custom validation function for formik Hook. This must return an object
// which keys are symmetrical to our values/initialValues
export const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = ' required';
  }
  if (!values.lastName) {
    errors.lastName = ' required';
  }

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = ' is invalid';
  }
  return errors;
};

export const CUSTOMER_INITIAL_DATA = {
  address: [],
  phones: [],
  email: '',
  firstName: '',
  lastName: '',
  isIndividual: false
};

export const ADDR_INITIAL_DATA = {
  firstLine: '',
  secondLine: '',
  thirdLine: '',
  town: '',
  city: '',
  postCode: ''
};

export const PHONE_INITIAL_DATA = {
  id: "5f18470d6aa99941c451279d",
  phone: ''
};

