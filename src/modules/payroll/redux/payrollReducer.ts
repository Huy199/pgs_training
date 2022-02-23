import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IListPayRolls, IPayroll } from '../../../models/Payroll';

export interface IFilterDate {
  startDate: string;
  endDate: string;
}
export interface PayrollState {
  payrolls: Array<IPayroll>;
  filter: {
    status: string;
    date: IFilterDate;
  };
  search: string;
}

export const setPayrolls = createCustomAction('payrolls/setPayrolls', (data: Array<IPayroll>) => ({ data }));
export const deletePayrolls = createCustomAction('payrolls/deletePayrolls', (data: Array<IPayroll>) => ({ data }));
export const filterStatus = createCustomAction('payrolls/filterStatus', (data: string) => ({ data }));
export const filterDateAction = createCustomAction('payrolls/filterDate', (data: IFilterDate) => ({ data }));
export const searchByOrder = createCustomAction('payrolls/searchByOrder', (data: string) => ({ data }));
const actions = { setPayrolls, deletePayrolls, filterStatus, filterDateAction, searchByOrder };
type Action = ActionType<typeof actions>;

export default function reducer(
  state: PayrollState = { payrolls: [], filter: { status: '', date: { startDate: '', endDate: '' } }, search: '' },
  action: Action,
) {
  switch (action.type) {
    case getType(setPayrolls):
      return { ...state, payrolls: action.data };

    case getType(deletePayrolls): {
      return {
        ...state,
        payrolls: action.data,
      };
    }
    case getType(filterStatus): {
      return {
        ...state,
        filter: {
          ...state.filter,
          status: action.data,
        },
      };
    }
    case getType(filterDateAction): {
      return {
        ...state,
        filter: {
          ...state.filter,
          date: {
            startDate: action.data.startDate,
            endDate: action.data.endDate,
          },
        },
      };
    }
    case getType(searchByOrder): {
      return {
        ...state,
        search: action.data,
      };
    }
    default:
      return state;
  }
}
