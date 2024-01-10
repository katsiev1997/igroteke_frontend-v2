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

export interface CustomerSliceState {
  customer: customerType | null;
  loading: boolean;
}
