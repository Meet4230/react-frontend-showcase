"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";

interface Image {
  url: string;
  alt: string;
}

interface Product {
  _id: string;
  category: string;
  description: string;
  mainImage: Image[];
  subImages: Image[];
  name: string;
  owner: string;
  price: number;
  stock: number;
}

export default function ProductDetails({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (productID: string, quantity: number) => void;
}) {
  const [mainImage, setMainImage] = useState(product.mainImage?.url);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row -mx-4">
        {/* Image Section */}
        <div className="md:flex-1 px-4">
          <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
            <img
              src={product.mainImage?.url || "/placeholder.svg"}
              alt={mainImage?.alt || "/placeholder.svg"}
              className="w-full h-full object-cover"
              width={500}
              height={500}
            />
          </div>
          <div className="flex -mx-2 mb-4">
            {product.subImages.map((image, i) => (
              <div className="flex-1 px-2" key={i}>
                <button
                  onClick={() => setMainImage(image)}
                  className="focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center"
                >
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Product Details */}
        <div className="md:flex-1 px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {product.name}
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            {product.category} • By {product.owner}
          </p>
          <div className="flex mb-4">
            <div className="mr-4">
              <span className="font-bold text-gray-700">Price:</span>
              <span className="text-gray-600">${product.price.toFixed(2)}</span>
            </div>
            <div>
              <span className="font-bold text-gray-700">Availability:</span>
              <span className="text-gray-600">
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-gray-700">Description:</span>
            <p className="text-gray-600 text-sm mt-2">{product.description}</p>
          </div>
          <div>
            <button
              className={`bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 ${
                product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={product.stock === 0}
              onClick={() => onAddToCart(product._id, 1)}
            >
              <ShoppingCart className="inline-block mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
