import configureMockStore from "redux-mock-store'
import thunk from "redux-thunk'
import * as actions from "./adapter'
import {FETCH_REQUEST, FETCH_SUCCESS, url} from "./adapter'
import fetchMock from "fetch-mock";
import {expectRedux, storeSpy} from "expect-redux";
import {createStore} from "redux";

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('my action dispatcher', () => {
  it('eventually dispatches the action', () => {
    // Create store with spy as enhancer
    const store = createStore(state => state, {}, storeSpy);

    // Dispatch the action after declaring our expectation
    setTimeout(() => store.dispatch({type: FETCH_REQUEST}), 100);

    return expectRedux(store)
      .toDispatchAnAction()
      .ofType(FETCH_REQUEST);
  });
});

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates FETCH_SERIES_SUCCESS when fetching series has been done', () => {
    fetchMock
      .getOnce(url, {body: {posts: ['fetch JSON Value']}, headers: {'content-type': 'application/json'}})


    const expectedActions = [
      {type: FETCH_REQUEST},
      {type: FETCH_SUCCESS, body: {posts: ['fetch JSON Value']}}
    ]
    const store = mockStore({posts: []})

    return store.dispatch(actions.fetchPostsWithRedux()).then(() => {
      // return of async actions
      expectRedux(store.getActions()).expectedActions
    })
  })
})
