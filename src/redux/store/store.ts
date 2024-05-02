import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { contactSlice } from '@/redux/features/contact/contactSlice';

const rootReducer = combineSlices(contactSlice);
export type RootState = ReturnType<typeof rootReducer>;
export type MakeStore = ReturnType<typeof makeStore>;

export const makeStore = (preloadedState?: Partial<RootState> | object) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export const store = makeStore();

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
