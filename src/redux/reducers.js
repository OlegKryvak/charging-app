import {combineReducers} from 'redux';
import authReducer from './slices/authSlice';
import transactionsSlice from './slices/transactionsSlice';
import plansSlice from './slices/plansSlice';
import serviceHistorySlice from './slices/serviceHistorySlice';
const REDUCER_KEY = {
  AUTH_REDUCER: 'auth',
  TRANSACTIONS_REDUCER: 'transactions',
  PLANS_REDUCER: 'plans',
  SERVICE_HISTORY_REDUCER: 'serviceHistory',
};

export default () =>
  combineReducers({
    [REDUCER_KEY.AUTH_REDUCER]: authReducer,
    [REDUCER_KEY.TRANSACTIONS_REDUCER]: transactionsSlice,
    [REDUCER_KEY.PLANS_REDUCER]: plansSlice,
    [REDUCER_KEY.SERVICE_HISTORY_REDUCER]: serviceHistorySlice,
  });
