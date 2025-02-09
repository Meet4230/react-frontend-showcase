import { useState } from "react";
import ProductShowcase from "../../components/ui/ProductShowcase";
import CategoryNav from "../../components/ui/CategoryNav";
import Header from "../../components/ui/Header";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addorUpdateCartItem,
  clearCart,
  getAllCategories,
  getAllProducts,
  getCartItem,
  removeItemFromCart,
} from "../../api";
import { Product } from "../../interface";
import { Loading } from "../../../../shared/components/Loading";
import { useDebounce } from "../../../../shared/hooks/useDebounce";

export default function HomePage() {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["fetchAllProducts"],
    queryFn: getAllProducts,
    staleTime: Infinity,
  });

  const {
    isLoading: isCategoriesLoading,
    error: categoriesError,
    data: categoriesData,
  } = useQuery({
    queryKey: ["fetchAllCategories"],
    queryFn: getAllCategories,
    staleTime: Infinity,
  });

  const {
    isLoading: isCartLoading,
    error: isCartError,
    data: cart,
  } = useQuery({
    queryKey: ["getCartItem"],
    queryFn: () => getCartItem(),
  });

  const cartMutation = useMutation({
    mutationFn: addorUpdateCartItem,
    onError: (error) => {
      console.error("Error updating cart item", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCartItem"] });
    },
  });

  const handleUpdateQuantity = async (
    productID: string,
    newQuantity: number
  ) => {
    if (!productID || newQuantity < 1) {
      console.error("Invalid product ID or quantity too low.");
      return;
    }

    try {
      await cartMutation.mutateAsync({ productID, quantity: newQuantity });
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const deleteCartItemMutation = useMutation({
    mutationFn: removeItemFromCart,
    onError: (error) => {
      console.error("Error removing item from cart", error);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCartItem"] });
    },
  });

  const handleRemoveItem = async (productID: string) => {
    await deleteCartItemMutation.mutateAsync(productID);
  };

  const clearCartMutation = useMutation({
    mutationFn: clearCart,
    onError: (error) => {
      console.error("Error clearing cart", error);
    },
    onSuccess: () => {
      console.log("Succefully cleared cart");
      queryClient.invalidateQueries({ queryKey: ["getCartItem"] });
    },
  });

  const handleClearCart = async () => {
    await clearCartMutation.mutateAsync();
  };

  const products = data?.products ?? [];
  const categories = categoriesData?.categories ?? [];

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery);

  const filteredProducts = products.filter((product: Product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  if (isLoading || isCategoriesLoading || isCartLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error || categoriesError || isCartError) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        An error occurred: {error?.message || categoriesError?.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        headTitle="E-commorce"
        onSearch={handleSearch}
        cartCount={cart?.items?.length ?? 0}
        onUpdateQuantity={handleUpdateQuantity}
        cart={cart}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        showSearch={true}
        showCart={true}
      />
      <CategoryNav
        categories={categories}
        onSelectCategory={handleSelectCategory}
      />
      <main>
        <ProductShowcase
          products={filteredProducts}
          showAddToCart={false}
          // onAddToCart={handleUpdateQuantity}
        />
      </main>
    </div>
  );
}
