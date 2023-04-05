import { createContext, useReducer, useState } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_EMPLOYEE":
      return {
        ...state,
        editData: action.payload,
      };
  }
}

const initialState = {
  editData: {
    editName: "",
    editPosition: "",
    editTask: "",
    editWage: "",
    editId: "",
  },
};

export const Context = createContext();

export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider
      value={{
        editData: state.editData,
        dispatch,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
