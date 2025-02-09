import { Product } from "../../interface";
import ProductCard from "./ProductCard";

export default function ProductShowcase({
  products = [],
  onAddToCart,
  showAddToCart,
}: {
  products?: Product[];
  onAddToCart?: (productId: string, quantity: number) => void;
  showAddToCart?: boolean;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={(id, quantity) => onAddToCart?.(id, quantity)}
              showAddToCart={showAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}
