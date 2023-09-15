import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants/constants";
import { Todo } from "../types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "/todos",
      transformResponse: (res: Todo[]) => res.sort((a, b) => b.id - a.id),
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation<
      string,
      { userId: number; title: string; completed: boolean }
    >({
      query: (todo) => {
        return {
          url: "/todos",
          method: "POST",
          body: todo,
        };
      },
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation<string, Todo>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation<string, { id: number }>({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
