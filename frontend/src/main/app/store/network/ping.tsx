import { type ForkEffect, delay, put, takeEvery } from "redux-saga/effects";

export function * ping (): Generator<object> {
    yield delay(1000);
    yield put({ type: 'PONG' });
}

export function * pingSaga (): Generator<ForkEffect<never>> {
    yield takeEvery('PING', ping);
}
