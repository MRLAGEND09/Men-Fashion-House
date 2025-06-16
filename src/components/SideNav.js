"use client";

import { useState, useEffect } from "react";
import { getData } from "../helper";
import ProductCard from "./ProductsCard";
import { IoMdClose } from "react-icons/io";

const SideNav = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const endPoint = "https://shoppingapi.vercel.app/products";

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getData(endPoint);
      setProducts(productsData);
      setFilteredProducts(productsData);
    };

    fetchProducts();
  }, []);

  // Function to filter products by category
  const handleCategoryClick = (category) => {
    if (category === "All Products") {
      setFilteredProducts(products); // Show all products
    } else {
      const filtered = products.filter((product) =>
        product.category.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  // Function to handle search
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
    const searchResult = products.filter((product) =>
      product.name.toLowerCase().includes(searchValue)
    );
    setFilteredProducts(searchResult);
  };

  return (
    <div className="flex">
      {/* Fixed sidebar for category filtering */}
      <div className="fixed top-16 left-0 h-screen w-64 p-5 bg-white shadow-md space-y-3 overflow-auto">
        <h1 className="text-red-400 font-bold">Category Filter</h1>
        <p
          onClick={() => handleCategoryClick("All Products")}
          className="text-black hover:underline cursor-pointer"
        >
          All Products
        </p>
        <p
          onClick={() => handleCategoryClick("Men's Sneaker")}
          className="text-black hover:underline cursor-pointer"
        >
          Mens Sneaker
        </p>
        <p
          onClick={() => handleCategoryClick("Men's Pants")}
          className="text-black hover:underline cursor-pointer"
        >
          Mens Pants
        </p>
        <p
          onClick={() => handleCategoryClick("Men's Boot")}
          className="text-black hover:underline cursor-pointer"
        >
          Mens Boot
        </p>
        <p
          onClick={() => handleCategoryClick("Bag")}
          className="text-black hover:underline cursor-pointer"
        >
          Bag
        </p>
        <p
          onClick={() => handleCategoryClick("Cap")}
          className="text-black hover:underline cursor-pointer"
        >
          Cap
        </p>
        <p
          onClick={() => handleCategoryClick("Earphones")}
          className="text-black hover:underline cursor-pointer"
        >
          Earphones
        </p>
        <p
          onClick={() => handleCategoryClick("Bottle")}
          className="text-black hover:underline cursor-pointer"
        >
          Bottle
        </p>
      </div>

      {/* Right side product display area with margin to avoid overlap */}
      <div className="ml-64 flex-1 p-5">
        <div className="relative mb-4">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            className="bg-gray-100 focus:outline-none text-sm text-gray-700 w-full p-2 rounded-md"
            placeholder="Search for products..."
          />
          {search && (
            <IoMdClose
              onClick={() => setSearch("")}
              className="text-gray-500 absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
            />
          )}
        </div>

        {/* Grid for displaying product cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))
          ) : (
            <p className="col-span-full text-center">No products available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideNav;
