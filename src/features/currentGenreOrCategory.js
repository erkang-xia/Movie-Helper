import { createSlice } from '@reduxjs/toolkit';

//When you call createSlice in the currentGenreOrCategory file, it returns an object that contains the reducer function, as well as the action creators.
export const currentGenreOrCategory = createSlice({
  name: 'genreOrCategory',
  initialState: {
    genreOrCategoryName: '',
    page: 1,
    searchQuery: '',
  },
  reducers: {
    selectGenreOrCategory: (state, action) => {
      state.genreOrCategoryName = action.payload;
      state.searchQuery = '';
    },
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { selectGenreOrCategory, searchMovie } =
  currentGenreOrCategory.actions;
export default currentGenreOrCategory.reducer;
