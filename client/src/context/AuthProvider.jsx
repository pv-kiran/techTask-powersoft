/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_AUTHSTATE":
      return {
        ...state,
        authState: JSON.parse(localStorage.getItem("user"))
          ? JSON.parse(localStorage.getItem("user"))
          : null,
      };
    case "CLEAR_AUTHSTATE":
      return {
        ...state,
        authState: null,
      };
    default:
      return {
        state,
      };
  }
};

const initialState = {
  authState: JSON.parse(localStorage.getItem("user")),
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setAuthState = () => {
    dispatch({ type: "SET_AUTHSTATE" });
  };

  const clearAuthState = () => {
    dispatch({ type: "CLEAR_AUTHSTATE" });
  };

  return (
    <AuthContext.Provider value={{ ...state, setAuthState, clearAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
