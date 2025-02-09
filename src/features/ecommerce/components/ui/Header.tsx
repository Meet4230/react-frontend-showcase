"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type { Cart } from "../../interface";

export default function Header({
  onSearch,
  cartCount,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  headTitle,
  showSearch = true,
  showCart = true,
}: {
  onSearch?: (query: string) => void;
  cartCount?: number;
  cart?: Cart;
  onUpdateQuantity?: (cartItemId: string, quantity: number) => void;
  onRemoveItem?: (ProductId: string) => void;
  onClearCart?: () => void;
  headTitle: string;
  showSearch: boolean;
  showCart: boolean;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-300">
          {headTitle}
        </h1>

        {showSearch && (
          <div className="relative flex-grow max-w-xl mx-4">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button
              type="submit"
              className="absolute right-3 top-2 text-gray-400 hover:text-blue-500 transition-colors duration-300"
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
          </div>
        )}
        {showCart && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 relative"
            aria-label="Open shopping cart"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            {cartCount && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-blue-600">
                Shopping Cart
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {cart?.items?.length === 0 ? (
              <p className="text-center text-gray-500 py-4">
                Your cart is empty.
              </p>
            ) : (
              <div className="space-y-4">
                {cart?.items?.map((item, index) => (
                  <div
                    key={`${item.product._id}-${index}`}
                    className="border-b pb-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.product.mainImage?.url || "/placeholder.svg"}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {item.product.name}
                        </h3>
                        <p className="text-blue-600 font-medium">
                          ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            item.quantity > 1
                              ? onUpdateQuantity?.(
                                  item.product._id,
                                  item.quantity - 1
                                )
                              : null
                          }
                          className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300"
                        >
                          -
                        </button>
                        <span className="font-medium">{item.quantity}</span>
                        <button
                          onClick={() =>
                            onUpdateQuantity?.(
                              item.product._id,
                              item.quantity + 1
                            )
                          }
                          className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300"
                        >
                          +
                        </button>

                        <span
                          onClick={() => onRemoveItem?.(item.product._id)}
                          className="underline cursor-pointer"
                        >
                          Remove
                        </span>
                      </div>
                      <p className="font-semibold text-gray-800">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Total Price & Checkout */}
            <div className="mt-6 border-t pt-4">
              <p className="text-xl font-semibold text-gray-800">
                Total:{" "}
                <span className="text-blue-600">
                  ${cart?.cartTotal.toFixed(2)}
                </span>
              </p>
              <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 font-medium">
                Proceed to Checkout
              </button>
              <button
                onClick={onClearCart}
                className="w-full mt-4 bg-red-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 font-medium"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
