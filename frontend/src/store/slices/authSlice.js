import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: window.USER_DATA || {
    isAuthenticated: false,
    username: null,
    email: null,
    fullName: null,
    isStaff: false,
  },
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = {
        isAuthenticated: false,
        username: null,
        email: null,
        fullName: null,
        isStaff: false,
      };
    },
  },
});

export const { setUser, setLoading, setError, logout } = authSlice.actions;

export default authSlice.reducer; 