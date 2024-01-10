import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { $api } from 'src/shared/api';
import { club } from 'src/entities/Club';
import { customer } from 'src/entities/Customer';
import { reserve } from 'src/features/Reserve';
import { auth } from 'src/features/auth';

export const createStore = () => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    club,
    customer,
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
