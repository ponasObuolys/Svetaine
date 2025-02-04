import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articles: [],
  currentArticle: null,
  categories: [],
  tags: [],
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setCurrentArticle: (state, action) => {
      state.currentArticle = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setTags: (state, action) => {
      state.tags = action.payload;
    },
    addComment: (state, action) => {
      if (state.currentArticle) {
        state.currentArticle.comments.push(action.payload);
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    incrementViews: (state) => {
      if (state.currentArticle) {
        state.currentArticle.views += 1;
      }
    },
  },
});

export const {
  setArticles,
  setCurrentArticle,
  setCategories,
  setTags,
  addComment,
  setLoading,
  setError,
  incrementViews,
} = newsSlice.actions;

export default newsSlice.reducer; 