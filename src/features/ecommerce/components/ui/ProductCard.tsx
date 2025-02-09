import { Link } from "react-router-dom";
import { Product } from "../../interface";

export default function ProductCard({
  product,
  onAddToCart,
  showAddToCart = true,
}: {
  product: Product;
  onAddToCart: (productId: string, quantity: number) => void;
  showAddToCart?: boolean;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.mainImage?.url ?? "/placeholder.svg"}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600">{product.category}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {showAddToCart && (
            <button
              onClick={() => onAddToCart(product._id, 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
