import ComponentApi from "../../api/ComponentApi";
import {fetchComponentsError, fetchComponentsSuccess} from "../actions/component";

export function fetchComponents() {

  return (dispatch) => {
    return ComponentApi.getApis().then(([response, json]) => {
      if (response.status === 200) {
        dispatch(fetchComponentsSuccess(json));
      }
      else {
        dispatch(fetchComponentsError());
      }
    })
  }
}
