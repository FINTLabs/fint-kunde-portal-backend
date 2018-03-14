import { takeLatest, all, takeEvery } from 'redux-saga/effects';
import { ADD_TASK, LIST_TASK, DELETE_TASK } from '../actions/taskActions';
import { UPDATE_KONTAKTPERSON, UPDATE_JURIDISKANSVARLIG, ADD_JURIDISKANSVARLIG, DELETE_JURIDISKANSVARLIG  } from '../actions/organisasjonActions'; 
import { addTask, listTasks, deleteTask, startTask, stopTask, finishTask } from './task';

// saga generators
export function* sagas() {
  yield all([
    takeEvery(ADD_TASK, addTask),
    takeLatest(LIST_TASK, listTasks),
    takeEvery(DELETE_TASK, deleteTask),
    takeLatest(UPDATE_KONTAKTPERSON, addTask)
  ]);
}