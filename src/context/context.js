import React, { useReducer, createContext } from "react";
import contextReducer from "./contextReducer";
const initialState = [];

export const QuizContext = createContext(initialState);
export const Provider = ({ children }) => {
  const [user, dispatch] = useReducer(contextReducer, initialState);

  //Action Creators
  const loginUser = (loginDetails) =>
    dispatch({ type: "LOGIN", payload: loginDetails });

  return (
    <QuizContext.Provider value={{ loginUser, user }}>
      {children}
    </QuizContext.Provider>
  );
};
