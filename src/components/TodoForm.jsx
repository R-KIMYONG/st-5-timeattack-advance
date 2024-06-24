import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { addTodo } from "../api/todos";

export default function TodoForm({ fetchData }) {
  const titleRef = useRef(null);
  const contentsRef = useRef(null);
  const queryClient = useQueryClient();
  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const onhandleAddTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      title: titleRef.current.value,
      contents: contentsRef.current.value,
      isCompleted: false,
      createdAt: Date.now(),
    };
    addTodoMutation.mutate(newTodo);
    titleRef.current.value = "";
    contentsRef.current.value = "";
  };

  return (
    <form onSubmit={onhandleAddTodo}>
      <label htmlFor="title">제목:</label>
      <input type="text" id="title" name="title" ref={titleRef} required />
      <label htmlFor="contents">내용:</label>
      <input id="contents" name="contents" ref={contentsRef} required />
      <button type="submit">추가하기</button>
    </form>
  );
}
