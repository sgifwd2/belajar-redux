import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TodoEntity {
  id: string;
  name: string;
  isDone: boolean;
  createdAt: Date;
}

export const todoApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://61985777164fa60017c23015.mockapi.io/api/v1/todos",
  }),
  tagTypes: ["Todos"],
  endpoints: (build) => ({
    getAllTodo: build.query<TodoEntity[], void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Todos", id } as const)),
              { type: "Todos", id: "LIST" },
            ]
          : [{ type: "Todos", id: "LIST" }],
    }),
    createTodo: build.mutation<TodoEntity, { name: string }>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body: { ...body, isDone: false } as Pick<TodoEntity, "name" | "isDone">,
      }),
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
    getTodo: build.query<TodoEntity, TodoEntity["id"]>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Todos", id }],
    }),
    updateTodo: build.mutation<TodoEntity, Partial<TodoEntity>>({
      query: (todo) => {
        const { id, ...body } = todo;

        return {
          url: `/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, todo) => [
        { type: "Todos", id: todo.id },
      ],
    }),
    deleteTodo: build.mutation<TodoEntity, TodoEntity["id"]>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Todos", id }],
    }),
  }),
});
