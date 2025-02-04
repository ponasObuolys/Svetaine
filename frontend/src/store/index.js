import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import coursesReducer from './slices/coursesSlice';
import newsReducer from './slices/newsSlice';
import youtubeReducer from './slices/youtubeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    news: newsReducer,
    youtube: youtubeReducer,
  },
});

export default store; 