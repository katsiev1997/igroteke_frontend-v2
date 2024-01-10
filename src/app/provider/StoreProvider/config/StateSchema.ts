import { ClubSliceState } from 'src/entities/Club';
import { CustomerSliceState } from 'src/entities/Customer/model/types/customer';
import { ReserveType } from 'src/features/Reserve/model/types/ReserveType';
import { AuthState } from 'src/features/auth/model/types/auth';

export interface StateSchema {
  club: ClubSliceState;
  customer: CustomerSliceState;
  auth: AuthState;
  reserve: ReserveType;
}
