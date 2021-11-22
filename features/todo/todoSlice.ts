import { createSlice } from "@reduxjs/toolkit";
import { todoApi, Todo } from "../../app/services/todo";

export interface TodoState {
  todos: Todo[] | [];
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
