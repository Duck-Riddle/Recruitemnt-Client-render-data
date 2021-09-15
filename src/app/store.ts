import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import projectReducer from "../features/project/project.Slice";
import projectSaga from "../features/project/project.Saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    project: projectReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(projectSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
