import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [],
  currentCourse: null,
  enrollments: [],
  loading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setCurrentCourse: (state, action) => {
      state.currentCourse = action.payload;
    },
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    addEnrollment: (state, action) => {
      state.enrollments.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateCourseProgress: (state, action) => {
      const { enrollmentId, progress } = action.payload;
      const enrollment = state.enrollments.find(e => e.id === enrollmentId);
      if (enrollment) {
        enrollment.progress = progress;
      }
    },
  },
});

export const {
  setCourses,
  setCurrentCourse,
  setEnrollments,
  addEnrollment,
  setLoading,
  setError,
  updateCourseProgress,
} = coursesSlice.actions;

export default coursesSlice.reducer; 