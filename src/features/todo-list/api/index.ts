import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../../../shared/api";
import { Todos } from "../constants";
import { GET_TODOS } from "../constants/apiRoutes";

export const getTodos = async () => {
  try {
    const response = await getRequest<Todos[]>(GET_TODOS);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos", error);
    throw new Error("Failed to fetch todos. Please try again later.");
  }
};

export const getTodoById = async (id: string) => {
  try {
    const response = await getRequest<Todos>(`/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching todo by ID", error);
    throw new Error("Failed to fetch todos by id. Please try again later.");
  }
};

export const deleteTodoById = async (id: string) => {
  try {
    await deleteRequest(`/todos/${id}`);
    return id;
  } catch (error) {
    console.error("Error deleting todo by ID", error);
    throw new Error("Failed to delete todos by id. Please try again later.");
  }
};

export const updateTodoById = async ({
  id,
  data,
}: {
  id: string;
  data: Todos;
}) => {
  try {
    const response = await patchRequest<Todos>(`/todos/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error updating todo by ID", error);
    throw new Error("Failed to update todos by id. Please try again later.");
  }
};

export const createTodo = async (data: Todos) => {
  try {
    const response = await postRequest<Todos>("/todos", data);
    return response;
  } catch (error) {
    console.error("Error creating todo", error);
    throw new Error("Failed to create todos. Please try again later.");
  }
};
