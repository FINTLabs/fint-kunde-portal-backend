import allReducer from '../reducers/index';
import expect from 'expect';

describe('allReducer', function() {
    it('Returns the JSON value state', function() {
      expect(
          allReducer([], {
        type: "FETCH_SUCCESS",
        posts: undefined
      })
    ).toEqual( {"posts": undefined})
})
});
