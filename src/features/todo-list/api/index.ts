import { getRequest } from "../../../shared/api";
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
