interface bookingType {
  _id: string; 
  customerData: string;
  roomName: string;
  from: number;
  to: number;
}

interface roomsType {
  name: string;
  availableTimeSlots: boolean[];
  bookings: bookingType[];
}

export interface clubType {
  _id: string;
  phone: string;
  name: string;
  address: string;
  roomsNumber: number;
  rooms: roomsType[];
}

export enum StatusClub {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface ClubSliceState {
  clubs: clubType[];
  status: StatusClub;
}
