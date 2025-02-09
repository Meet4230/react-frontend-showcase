import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addorUpdateCartItem,
  clearCart,
  getCartItem,
  getProductById,
} from "../../api";
import { useParams } from "react-router-dom";
import Header from "../../components/ui/Header";
import ProductDetails from "../../components/ProductDetails";
export default function ProductView() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ["getProductsByID", id],
    queryFn: () => getProductById(id ?? ""),
  });

  const {
    isLoading: isCartLoading,
    error: isCartError,
    data: cart,
  } = useQuery({
    queryKey: ["getCartItem"],
    queryFn: () => getCartItem(),
  });

  const updateMutation = useMutation({
    mutationFn: addorUpdateCartItem,
    onError: (error) => {
      console.error("Error updating cart", error);
    },

    onSuccess: () => {
      console.log("cart updated");
      queryClient.invalidateQueries({ queryKey: ["getCartItem"] });
    },
  });

  const handleUpdateToCart = async (productID: string, quantity: number) => {
    if (!productID || quantity < 1) {
      console.error("Invalid productId or quantity too low");
      return;
    }

    try {
      await updateMutation.mutateAsync({ productID, quantity });
    } catch (error) {
      console.error("Error updating qantity", error);
    }
  };

  const deleteMutation = useMutation({
    mutationFn: clearCart,
    onError: (error) => {
      console.error("Error clearing cart", error);
    },

    onSuccess: () => {
      console.log("Cart cleared successfully");
      queryClient.invalidateQueries({ queryKey: ["getCartItem"] });
    },
  });

  const handleClearCart = async () => {
    await deleteMutation.mutateAsync();
  };
  if (isLoading || isCartLoading) {
    return <div>Loading...</div>;
  }

  if (error || isCartError) {
    return <div className="text-red-500">{error?.message}</div>;
  }

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Header
        headTitle="E-commorce"
        cart={cart}
        cartCount={cart.items.length}
        onUpdateQuantity={handleUpdateToCart}
        onClearCart={handleClearCart}
        showSearch={false}
        showCart={true}
      />
      <ProductDetails product={data} onAddToCart={handleUpdateToCart} />
      {/* <ProductCard product={data} onAddToCart={handleUpdateToCart} /> */}
    </div>
  );
}
