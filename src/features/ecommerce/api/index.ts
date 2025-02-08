import { getRequest } from "../../../shared/api";
import { GET_ALL_CATEGORIES, GET_ALL_PRODUCTS } from "../constants/apiRoutes";

export const getAllProducts = async () => {
  try {
    const response = await getRequest(GET_ALL_PRODUCTS);
    return response.data ?? {};
  } catch (error) {
    console.error("Error fetching all products:", error);
    return {};
  }
};

export const getAllCategories = async () => {
  try {
    const response = await getRequest(GET_ALL_CATEGORIES);
    return response.data ?? {};
  } catch (error) {
    console.error("Error fetching categories", error);
    return {};
  }
};
