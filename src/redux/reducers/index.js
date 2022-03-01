import { combineReducers } from 'redux';
import alert from './alert';
import customer from './customer';
import search from './search';
import pagination from './pagination';
import confirmationModal from './confirmationModal';
import auth from './auth';
import receipt from './receipt';
import reference from './reference';
import user from './users'
import modal from './modal'
import dashboard from './dashboard'

export default combineReducers({
  alert,
  customer,
  receipt,
  search,
  pagination,
  modal,
  confirmationModal,
  auth,
  reference,
  user,
  dashboard
});
