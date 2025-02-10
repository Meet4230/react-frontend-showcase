import { deleteRequest, getRequest, postRequest } from "../../../shared/api";
import {
  ADD_OR_UPDATE_CART_ITEM,
  CLEAR_CART,
  CREATE_SHIPPING_ADDRESS,
  GET_ALL_CATEGORIES,
  GET_ALL_PRODUCTS,
  GET_CART_ITEM,
  GET_MY_PROFILE,
} from "../constants/apiRoutes";
import { UpdateCartItem } from "../interface";

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

export const getProductById = async (id: string) => {
  try {
    const response = await getRequest(`${GET_ALL_PRODUCTS}/${id}`);
    return response.data ?? {};
  } catch (error) {
    console.error("Error fetching product by ID");
    return {};
  }
};

export const getCartItem = async () => {
  try {
    const response = await getRequest(GET_CART_ITEM);
    return response.data ?? {};
  } catch (error) {
    console.error("Error fetching cart");
    return {};
  }
};

export const addorUpdateCartItem = async ({
  productID,
  quantity,
}: UpdateCartItem) => {
  try {
    const response = await postRequest(
      `${ADD_OR_UPDATE_CART_ITEM}/${productID}`,
      { quantity }
    );

    return response ?? {};
  } catch (error) {
    console.error("Error updating cart item", error);
    return {};
  }
};

export const removeItemFromCart = async (productId: string) => {
  try {
    await deleteRequest(`${ADD_OR_UPDATE_CART_ITEM}/${productId}`);
    return productId;
  } catch (error) {
    console.error("Error Removing Item from cart");
  }
};

export const clearCart = async () => {
  try {
    await deleteRequest(CLEAR_CART);
    console.log("Cart clear successfully");
  } catch (error) {
    console.error("Error clearing cart");
  }
};

export const getMyProfile = async () => {
  try {
    const response = await getRequest(GET_MY_PROFILE);
    return response.data ?? {};
  } catch (error) {
    console.error("Error getting my profile", error);
    return {};
  }
};

// {
//   "addressLine1": "New lane central, D-203",
//   "addressLine2": "Opposite to central park",
//   "city": "Mumbai",
//   "state": "Maharashtra",
//   "pincode": 409209,
//   "country": "India"
// }

export interface ShippingAddressProps {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: number;
  country: string;
}
export const createShippingAddress = async (formData: ShippingAddressProps) => {
  try {
    const response = await postRequest(CREATE_SHIPPING_ADDRESS, formData);
    return response ?? {};
  } catch (error) {
    console.error("Error creating shipping address", error);
    throw error;
  }
};
