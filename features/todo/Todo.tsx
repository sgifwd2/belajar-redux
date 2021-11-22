import React, { useEffect, useRef, useState } from "react";
import { TodoEntity, todoApi } from "../../app/services/todo";

export const Todo: React.FC = () => {
  const inputCreateTodoRef = useRef<HTMLInputElement>(null);
  const [createTodo] = todoApi.useCreateTodoMutation();
  const [updateTodo] = todoApi.useUpdateTodoMutation();
  const [deleteTodo] = todoApi.useDeleteTodoMutation();
  const [selectedTodo, setSelectedTodo] = useState<TodoEntity["id"] | null>(
    null
  );
  const { data: allTodo, isLoading } = todoApi.useGetAllTodoQuery(undefined, {
    refetchOnReconnect: true,
  });

  const { data: detailTodo, refetch: refetchDetailTodo } =
    todoApi.useGetTodoQuery(selectedTodo!, {
      skip: selectedTodo === null,
    });

  const handleCreateTodo = () => {
    if (inputCreateTodoRef.current!.value !== "") {
      createTodo({ name: inputCreateTodoRef.current!.value });
      inputCreateTodoRef.current!.value = "";
    }
  };

  useEffect(() => {
    if (selectedTodo) {
      refetchDetailTodo();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTodo]);

  if (isLoading) return <span>Loading...</span>;

  return (
    <div>
      {detailTodo && (
        <div>
          <div>Detail Todo</div>
          <div>{JSON.stringify(detailTodo)}</div>
        </div>
      )}
      {allTodo?.map((todo) => (
        <div
          key={todo.id}
          className="flex justify-between items-center cursor-pointer bg-gray-100 py-2 px-4 rounded-md my-2 shadow-md space-x-5"
        >
          <div className="text-gray-500 font-semibold">{todo.name}</div>
          <div className="flex justify-center items-center space-x-3">
            <div
              onClick={() => updateTodo({ ...todo, isDone: !todo.isDone })}
              className={`font-semibold py-1 px-4 hover:bg-gray-200 hover:shadow rounded-md ${
                todo.isDone ? "text-green-500" : "text-red-500"
              }`}
            >
              {String(todo.isDone)}
            </div>
            <button
              onClick={() => setSelectedTodo(todo.id)}
              className="px-2 py-1 bg-gray-300 rounded-md text-gray-500 font-semibold hover:bg-gray-700 hover:text-gray-50 transition"
            >
              detail
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="px-2 py-1 bg-gray-300 rounded-md text-gray-500 font-semibold hover:bg-gray-700 hover:text-gray-50 transition"
            >
              delete
            </button>
          </div>
        </div>
      ))}
      <div className="w-full flex rounded-md mt-5 shadow-md overflow-hidden">
        <input
          ref={inputCreateTodoRef}
          type="text"
          className="block flex-auto bg-gray-100 focus:outline-none px-4 py-2"
        />
        <button
          onClick={() => handleCreateTodo()}
          className="px-4 py-2 text-gray-500 font-semibold bg-gray-300"
        >
          create
        </button>
      </div>
    </div>
  );
};
