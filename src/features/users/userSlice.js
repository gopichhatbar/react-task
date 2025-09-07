import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  localUsers: [],
  search: "",
  currentPage: 1,
  itemsPerPage: 5,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addLocalUser: (state, action) => {
      state.localUsers.push(action.payload);
    },
    updateLocalUser: (state, action) => {
      const index = state.localUsers.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) state.localUsers[index] = action.payload;
    },
    deleteLocalUser: (state, action) => {
      state.localUsers = state.localUsers.filter((u) => u.id !== action.payload);
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { addLocalUser, updateLocalUser, deleteLocalUser, setSearch, setPage } =
  userSlice.actions;

export default userSlice.reducer;
