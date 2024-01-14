export interface bookingType {
  customerData: string;
  room: string;
  from: number;
  to: number;
}

export interface adminType {
  phone: string;
  clubId: string;
}

export interface AdminSliceState {
  admin: adminType | null;
  loading: boolean;
}
