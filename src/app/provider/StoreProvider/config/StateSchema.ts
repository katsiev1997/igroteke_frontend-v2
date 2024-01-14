import { ClubSliceState } from 'src/entities/Club';
import { AdminSliceState } from 'src/entities/Admin/model/types/admin';
import { ReserveType } from 'src/features/Reserve/model/types/ReserveType';
import { AuthState } from 'src/features/auth/model/types/auth';

export interface StateSchema {
  club: ClubSliceState;
  admin: AdminSliceState;
  auth: AuthState;
  reserve: ReserveType;
}
