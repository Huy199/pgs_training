import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../../../redux/reducer';
import moment from 'moment';

export const payrollList = (state: AppState) => state.payroll?.payrolls;
export const filterStatus = (state: AppState) => state.payroll?.filter?.status;
export const filterDate = (state: AppState) => state.payroll?.filter?.date;
export const searchOrder = (state: AppState) => state.payroll?.search;
export const payrollRemaining = createSelector(
  payrollList,
  filterStatus,
  filterDate,
  searchOrder,
  (payrolls, status, date, order) => {
    return payrolls.filter((payroll) => {
      const startDate = moment(date.startDate).format('MM/DD/yyyy');
      const end = moment(date.endDate).format('MM/DD/yyyy');
      const c = moment(payroll.time_created).format('MM/DD/yyyy');
      const start = new Date(date.startDate);
      const endD = new Date(date.endDate);
      const compare = new Date(c);
      const ss = compare >= start ? compare : '';

      if (status !== '') {
        if (status === 'Received') {
          return (
            payroll.received &&
            (date.endDate !== '' && date.startDate !== ''
              ? compare.getTime() >= start.getTime() && compare.getTime() <= endD.getTime()
              : true) &&
            (order !== '' ? payroll.payroll_id.includes(order) : true)
          );
        } else if (status === 'Processing') {
          return (
            (payroll.matched || payroll.approved) &&
            !payroll.received &&
            (date.endDate !== '' && date.startDate !== ''
              ? moment(payroll.time_created).format('DD/MM/yyyy') > startDate &&
                moment(payroll.time_created).format('DD/MM/yyyy') < end
              : true) &&
            (order !== '' ? payroll.payroll_id.includes(order) : true)
          );
        } else if (status === 'Fullfilled') {
          return (
            payroll.fulfilled &&
            !(payroll.matched || payroll.approved) &&
            !payroll.received &&
            (date.endDate !== '' && date.startDate !== ''
              ? moment(payroll.time_created).format('DD/MM/yyyy') > startDate &&
                moment(payroll.time_created).format('DD/MM/yyyy') < end
              : true) &&
            (order !== '' ? payroll.payroll_id.includes(order) : true)
          );
        } else if (status === 'Pending') {
          return (
            !payroll.received &&
            !(payroll.matched || payroll.approved) &&
            !payroll.fulfilled &&
            (date.endDate !== '' && date.startDate !== ''
              ? moment(payroll.time_created).format('DD/MM/yyyy') > startDate &&
                moment(payroll.time_created).format('DD/MM/yyyy') < end
              : true) &&
            (order !== '' ? payroll.payroll_id.includes(order) : true)
          );
        }
      } else if (date.endDate !== '' && date.startDate !== '') {
        return (
          (date.endDate !== '' && date.startDate !== ''
            ? compare.getTime() >= start.getTime() && compare.getTime() <= endD.getTime()
            : true) && (order !== '' ? payroll.payroll_id.includes(order) : true)
        );
      } else if (order !== '') {
        return payroll.payroll_id.includes(order);
      } else {
        return payroll;
      }
    });
  },
);
