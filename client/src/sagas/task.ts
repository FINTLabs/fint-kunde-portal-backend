import { Action } from 'redux-actions';
import { call, put, select } from 'redux-saga/effects';
import { Task } from '../model';
//import ApiTasks from '../api/task'; TODO
import { LIST_TASK_SUCCESS, ADD_TASK_SUCCESS, UPDATE_TASK_SUCESS, DELETE_TASK_SUCESS } from '../actions/taskActions';
import { IState } from '../model';

export function* addTask(action: Action<Task>) {
    const task: Task = yield call(ApiTasks.addTask, action.payload);
    yield put({
        type: ADD_TASK_SUCCESS,
        task
    })
}

export function* listTasks() {
    const tasks: Task[] = yield call(ApiTasks.listTasks);
    yield put({
        type: LIST_TASK_SUCCESS,
        tasks: tasks.map((task:Task) => {if(task.startTime) task.startTime = new Date(Number(task.startTime)); return task})
    })
}

export function* deleteTask(action: Action<string>) {
    yield call(ApiTasks.deleteTask, action.payload);
    yield put({
        type: DELETE_TASK_SUCESS,
        taskId: action.payload
    })
}
