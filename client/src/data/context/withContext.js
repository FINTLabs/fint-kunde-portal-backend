import React from "react";
import AppContext from "./AppContext";

export function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <AppContext.Consumer>
        {context =>
          <Component {...props} context={context}/>
        }
      </AppContext.Consumer>
    );
  };
}
