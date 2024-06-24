import axios from "axios";

export const todoApi = axios.create({
  baseURL: "http://localhost:4000/",
});

export const fetchTodos = async () => {
  try {
    const { data } = await todoApi.get("todos");
    return data;
  } catch (error) {
    console.log("fetchTodo error=>", error);
  }
};
export const addTodo = async (newTodo) => {
  try {
    const { data } = await todoApi.post(`todos`, newTodo);
    return data;
  } catch (error) {
    console.log("addTodo error=>", error);
  }
};

export const getTodo = async ({ queryKey }) => {
  const [_, id] = queryKey;
  try {
    const { data } = await todoApi.get(`todos/${id}`);
    return data;
  } catch (error) {
    console.log("getTodo error=>", error);
  }
};
