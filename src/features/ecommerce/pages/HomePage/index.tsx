import { useState } from "react";
import ProductShowcase from "../../components/ui/ProductShowcase";
import CategoryNav from "../../components/ui/CategoryNav";
import Header from "../../components/ui/Header";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories, getAllProducts } from "../../api";
import { Product } from "../../interface";
import { Loading } from "../../../../shared/components/Loading";
import { useDebounce } from "../../../../shared/hooks/useDebounce";

export default function HomePage() {
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

  if (isLoading || isCategoriesLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error || categoriesError) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        An error occurred: {error?.message || categoriesError?.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onSearch={handleSearch} />
      <CategoryNav
        categories={categories}
        onSelectCategory={handleSelectCategory}
      />
      <main>
        <ProductShowcase products={filteredProducts} />
      </main>
    </div>
  );
}
