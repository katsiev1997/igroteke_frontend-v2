interface bookingType {
  clubId: string;
  room: string;
  from: number;
  to: number;
}

export interface adminType {
  _id: string;
  phone: string;
  booking: bookingType;
}

export enum StatusAdmin {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface adminSliceType {
  status: StatusAdmin;
  admin: adminType | null;
}
