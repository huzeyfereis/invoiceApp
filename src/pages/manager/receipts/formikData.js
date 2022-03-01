export const RECEIPT_INITIAL_DATA = {
  customer: { id: '', name: '' },
  amount: '',
  amountInLetters: '',
  date: new Date(),
  receivedBy: { id: '', name: '' },
  branch: { id: '', name: '' },
  paymentType: { id: '', name: '' },
  paymentReason: { id: '', name: '' },
  details: ''
};

export const validate = (values) => {
  const errors = {};
  if (values.customer.id?.trim() === '') {
    errors.customer = ' required';
  }
  if (values.receivedBy.name?.trim() === '') {
    errors.receivedBy = ' required';
  }
  if (values.branch.name?.trim() === '') {
    errors.branch = ' required';
  }
  if (values.amount.toString().trim() === '') {
    errors.amount = ' required';
  } else if (values.amount && isNaN(values.amount)) {
    errors.amount = ' invalid type';
  }

  if (values.paymentType.name?.trim() === '') {
    errors.paymentType = ' required';
  }
  if (values.amountInLetters.trim() === '') {
    errors.amountInLetters = ' required';
  } else if (values.amountInLetters && !/^[a-zA-Z\s\-_]*$/.test(values.amountInLetters)) {
    errors.amountInLetters = ' invalid type';
  }

  if (values.paymentReason.name?.trim() === '') {
    errors.paymentReason = ' required';
  }

  if (!values.date) {
    errors.date = ' required';
  }

  return errors;
};
