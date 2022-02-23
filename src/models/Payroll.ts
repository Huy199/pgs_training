export interface IPayroll {
  approved: Boolean;
  canceled: Boolean;
  company_id: string;
  confirmed: Boolean;
  currency: string;
  date_canceled: string | null;
  date_confirmed: string | null;
  date_fulfilled: string | null;
  date_matched: string | null;
  date_processed: string | null;
  date_received: string | null;
  date_released: string | null;
  fees: number;
  fulfilled: Boolean;
  is_premium: Boolean;
  matched: Boolean;
  number_of_recipients: Number;
  payment_type: string;
  payroll_id: string;
  received: Boolean;
  released: Boolean;
  subpayroll_ids: string[];
  time_created: string;
  volume_input_in_input_currency: number;
}
export interface IMeta {
  curr_cursor: '';
  next_cursor: {};
}
export interface IListPayRolls {
  company_id: string;
  from_date: null;
  meta: IMeta;
  payrolls: IPayroll[];
  to_date: null;
}
