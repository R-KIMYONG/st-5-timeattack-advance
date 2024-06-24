import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchTodos } from "../api/todos";

export default function TodoList() {
  const navigate = useNavigate();

  const {
    data: todos,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isPending) {
    return <div style={{ fontSize: 36 }}>로딩중...</div>;
  }

  if (isError) {
    console.error(isError);
    return <div style={{ fontSize: 24 }}>에러가 발생했습니다: {isError}</div>;
  }
  return (
    <ul style={{ listStyle: "none", width: 250 }}>
      {todos.map((todo) => (
        <li
          key={todo.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{todo.title}</h3>
          <button onClick={() => navigate(`/detail/${todo.id}`)}>
            내용보기
          </button>
        </li>
      ))}
    </ul>
  );
}
