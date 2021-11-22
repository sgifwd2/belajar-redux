import { createSlice } from "@reduxjs/toolkit";
import { todoApi, TodoEntity } from "../../app/services/todo";

export interface TodoState {
  todos: TodoEntity[] | [];
}

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      todoApi.endpoints.getAllTodo.matchFulfilled,
      (state, { payload }) => {
        state.todos = payload;
      }
    );
  },
});

export default todoSlice.reducer
