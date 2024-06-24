import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTodo, todoApi } from "../api/todos";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // TODO: useQuery 로 리팩터링 하세요.

  const {
    data: todo,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["todo", id],
    queryFn: getTodo,
  });
  if (isPending) {
    return <div style={{ fontSize: 36 }}>로딩중...</div>;
  }
  if (isError) {
    console.error(isError);
    return <div style={{ fontSize: 24 }}>에러가 발생했습니다: {isError}</div>;
  }
  return (
    <div>
      <button onClick={() => navigate("/")}>홈으로 이동</button>
      <p>제목: {todo.title}</p>
      <p>내용: {todo.contents}</p>
      <p>작성일자: {new Date(todo.createdAt).toDateString()}</p>
    </div>
  );
}
