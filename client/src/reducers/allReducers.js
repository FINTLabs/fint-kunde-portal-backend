
const allReducer =  (state = {}, action) =>{
  switch (action.type) {
    case "FETCH_REQUEST":
      return state;
    case "FETCH_SUCCESS": 
      return {...state,posts:action.payload};
    case "FETCHORG_REQUEST":
        return state;  
    case "FETCHORG_SUCCESS": 
    	console.log("fetch");
    	console.log(action.payload);
        return {...state,organisation:action.payload};
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
        newState.splice(indexOfAdapterToDelete, 1);
        return newState;
      }
    
    case "CREATE_SUCCESS": {
        const newState = Object.assign([], state);
        const indexOfAdapterToSave = state.posts.findIndex(({ id }) => id == action.payload); 
        newState.splice(indexOfAdapterToSave, 1);
        return newState;
    }
    case "UPDATE_SUCCESS": {
        const newState = Object.assign([], state);
        const indexOfAdapterToUpdate = state.posts.findIndex(({ id }) => id == action.payload); 
        newState.splice(indexOfAdapterToUpdate, 1);
        return newState;
    }
    default:
      return state;
  }
} 
export default allReducer

