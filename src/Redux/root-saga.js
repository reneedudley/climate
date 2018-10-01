'use strict';
import { put, takeEvery, all } from 'redux-saga/effects';
import { citySaga } from './city/city-saga';


export default function* rootSaga() {
    yield all([
        citySaga()
    ])
}
