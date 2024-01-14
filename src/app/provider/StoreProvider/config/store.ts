import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { $api } from 'src/shared/api';
import { club } from 'src/entities/Club';
import { admin } from 'src/entities/Admin';
import { reserve } from 'src/features/Reserve';
import { auth } from 'src/features/auth';

export const createStore = () => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    club,
    admin,
    auth,
    reserve,
  };

  const store = configureStore({
    reducer: rootReducers,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            api: $api,
          },
        },
      }),
  });

  return store;
};

export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
