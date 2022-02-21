import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IListPayRolls, IPayroll } from '../../../models/Payroll';

export interface PayrollState {
  payrolls: Array<IPayroll>;
}

export const setPayrolls = createCustomAction('payrolls/setPayrolls', (data: Array<IPayroll>) => ({ data }));
export const deletePayrolls = createCustomAction('payrolls/deletePayrolls', (data: Array<IPayroll>) => ({ data }));
const actions = { setPayrolls, deletePayrolls };
type Action = ActionType<typeof actions>;

export default function reducer(state: PayrollState = { payrolls: [] }, action: Action) {
  switch (action.type) {
    case getType(setPayrolls):
      return { ...state, payrolls: action.data };
    case getType(deletePayrolls):
      return {
        ...state,
        payrolls: action.data,
      };
    default:
      return state;
  }
}
