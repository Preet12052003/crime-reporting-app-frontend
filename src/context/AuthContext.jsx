import react from 'react'
import React, { createContext, useContext, useReducer, useEffect } from 'react';


// Initial state
const initialState = {
  user: localStorage.getItem('user') || null,
  loading: true,
};

// Action types
const ActionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return { ...state, user: action.payload, loading: false };
    case ActionTypes.LOGOUT:
      return { ...state, user: null, loading: false };
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      // Simulated delay
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        dispatch({ type: ActionTypes.LOGIN, payload: storedUser });
      } else {
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      }
    };

    fetchUser();
  }, []);

  const login = async (userData) => {
    // Simulate an API call to log in
    // Replace with real user data
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in local storage
    dispatch({ type: ActionTypes.LOGIN, payload: userData });
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: ActionTypes.LOGOUT });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
