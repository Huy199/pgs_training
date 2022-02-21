import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducers, { AuthState } from '../modules/auth/redux/authReducer';
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer';
import dataReducer, { DataState } from '../modules/home/redux/dataReducer';
import payrollReducer, { PayrollState } from '../modules/payroll/redux/payrollReducer';

export interface AppState {
  router: RouterState;
  intl: IntlState;
  profile: AuthState;
  data: DataState;
  payroll: PayrollState;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    profile: authReducers,
    data: dataReducer,
    payroll: payrollReducer,
  });
}
