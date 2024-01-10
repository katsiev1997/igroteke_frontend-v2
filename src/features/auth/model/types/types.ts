interface bookingType {
  clubId: string;
  room: string;
  from: number;
  to: number;
}

export interface customerType {
  _id: string;
  phone: string;
  booking: bookingType;
}


export enum StatusCustomer {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface customerSliceType {
  status: StatusCustomer;
  customer: customerType | null;
}