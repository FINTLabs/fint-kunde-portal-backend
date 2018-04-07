
const allReducer =  (state = {}, action) =>{
  switch (action.type) {
    case "FETCH_REQUEST":
      return state;
    case "FETCH_SUCCESS": 
      return {...state,posts:action.payload};
    case "UPDATE_REQUEST":
        return {...state, 
             updateData: {
                ...state.updateData,
                [action.updatedDataId]: action.updatedData
             }
        } 
        
    case "DELETE_SUCCESS": {
        const newState = Object.assign([], state);
        const indexOfAdapterToDelete = state.posts.findIndex(({ id }) => id == action.payload);  
 //       const indexOfAdapterToDelete = state.findIndex(adapter => {return adapter.name == action.adapter.name})
        newState.splice(indexOfAdapterToDelete, 1);
//        browserHistory.push('/adapters');
        return newState;
      }
    
    case "CREATE_SUCCESS": {
        const newState = Object.assign([], state);
        const indexOfAdapterToSave = state.posts.findIndex(({ id }) => id == action.payload); 
        newState.splice(indexOfAdapterToSave, 1);
        return newState;
    }
//        browserHistory.push(`/adapters/${action.adapter.id}`)
//        return [
//          ...state.filter(adapter => adapter.id !== action.adapter.id),
//          Object.assign({}, action.adapter)
//        ]
    default:
      return state;
  }
} 
export default allReducer

