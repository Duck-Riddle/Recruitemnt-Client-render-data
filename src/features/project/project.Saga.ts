import { takeLatest, put, call } from "redux-saga/effects";
import { AsyncRequest, AsyncResponse } from "./project.Slice";
import { PayloadAction } from "@reduxjs/toolkit";

import { getProject, getInit } from "../../app/api";
import { Init, ProjectProps } from "./project.interfaces";

function* handleRequest(action: PayloadAction<string>) {
  try {
    const response: ProjectProps = yield call(getProject, action.payload);
    yield put(AsyncResponse({ project: response }));
  } catch (err) {
    console.log(`error at "handleRequest": ${err}`);
    yield put(AsyncResponse({ errMsg: `${err}` }));
  }
}

function* handleInit() {
  try {
    const response: Init = yield call(getInit);
    yield put(AsyncResponse({ init: response }));
  } catch (err) {
    console.log(`error at "handleInit": ${err}`);
    yield put(AsyncResponse({ errMsg: `${err}` }));
  }
}

export default function* projectSaga() {
  yield handleInit();
  yield takeLatest(AsyncRequest, handleRequest);
}
