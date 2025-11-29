"use client"; // Ensures this component is a Client-Side component

import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function HomePage() {
  const router = useRouter(); // Initialize router

  const handleViewProduct = (productId: string) => {
    router.push(`/products/${productId}`); // Use router.push for navigation
  };

  return (
    <div className="min-h-screen bg-[#0d0d10] text-white flex flex-col">
      {/* Hero Section */}
      <header className="w-full py-12 px-8 text-center bg-[#1a1a1a]">
        <h1 className="text-5xl font-bold mb-4">Welcome to LootLakeDavao</h1>
        <p className="text-lg text-gray-400 mb-8">
          Discover exclusive thrift collections and more. Shop your style today!
        </p>
        <button
          onClick={() => router.push("/auth/login")} // Use router.push for login redirection
          className="bg-blue-600 hover:bg-blue-700 py-3 px-6 rounded-lg text-white font-medium"
        >
          Start Shopping
        </button>
      </header>

      {/* Featured Products */}
      <section className="py-12 px-8 bg-[#111114]">
        <h2 className="text-3xl font-semibold text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Product 1 */}
          <div className="bg-[#222222] p-4 rounded-xl shadow-lg">
            <Image
              src="/product-placeholder.jpg" // Replace with product image
              alt="Product 1"
              width={300}
              height={300}
              className="w-full h-64 object-cover mb-4 rounded-xl"
            />
            <h3 className="text-xl font-semibold text-white">Product Name</h3>
            <p className="text-gray-400 mb-4">$49.99</p>
            <button
              onClick={() => handleViewProduct("1")}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            >
              View Product
            </button>
          </div>
          {/* Product 2 */}
          <div className="bg-[#222222] p-4 rounded-xl shadow-lg">
            <Image
              src="/product-placeholder.jpg" // Replace with product image
              alt="Product 2"
              width={300}
              height={300}
              className="w-full h-64 object-cover mb-4 rounded-xl"
            />
            <h3 className="text-xl font-semibold text-white">Product Name</h3>
            <p className="text-gray-400 mb-4">$69.99</p>
            <button
              onClick={() => handleViewProduct("2")}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            >
              View Product
            </button>
          </div>
          {/* Product 3 */}
          <div className="bg-[#222222] p-4 rounded-xl shadow-lg">
            <Image
              src="/product-placeholder.jpg" // Replace with product image
              alt="Product 3"
              width={300}
              height={300}
              className="w-full h-64 object-cover mb-4 rounded-xl"
            />
            <h3 className="text-xl font-semibold text-white">Product Name</h3>
            <p className="text-gray-400 mb-4">$39.99</p>
            <button
              onClick={() => handleViewProduct("3")}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            >
              View Product
            </button>
          </div>
          {/* Product 4 */}
          <div className="bg-[#222222] p-4 rounded-xl shadow-lg">
            <Image
              src="/product-placeholder.jpg" // Replace with product image
              alt="Product 4"
              width={300}
              height={300}
              className="w-full h-64 object-cover mb-4 rounded-xl"
            />
            <h3 className="text-xl font-semibold text-white">Product Name</h3>
            <p className="text-gray-400 mb-4">$79.99</p>
            <button
              onClick={() => handleViewProduct("4")}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            >
              View Product
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111114] py-8 px-12 text-center text-sm text-gray-400">
        <p>&copy; 2025 LootLakeDavao. All rights reserved.</p>
        <div className="mt-4">
          <a href="/about" className="hover:text-blue-500">
            About Us
          </a>{" "}
          |{" "}
          <a href="/contact" className="hover:text-blue-500">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
}
