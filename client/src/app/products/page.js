"use client";

import { useEffect, useState } from "react";
import ProductCard from "../../components/product/ProductCard";
import API from "../../lib/api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [color, setColor] = useState("");
  const [discount, setDiscount] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const productRes = await API.get("/products");
      const categoryRes = await API.get("/categories");

      setProducts(productRes.data.data);
      setFilteredProducts(productRes.data.data);
      setCategories(categoryRes.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let filtered = [...products];

    if (search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category) {
      filtered = filtered.filter(
        (item) => item.category?.toLowerCase() === category.toLowerCase(),
      );
    }

    if (color) {
      filtered = filtered.filter((item) => item.colors?.includes(color));
    }

    if (discount) {
      filtered = filtered.filter(
        (item) => item.discount_percentage >= Number(discount),
      );
    }

    if (priceSort === "lowToHigh") {
      filtered.sort((a, b) => a.price_min - b.price_min);
    }

    if (priceSort === "highToLow") {
      filtered.sort((a, b) => b.price_min - a.price_min);
    }

    setFilteredProducts(filtered);
  }, [search, category, color, discount, priceSort, products]);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setColor("");
    setDiscount("");
    setPriceSort("");
  };

  const uniqueColors = [
    ...new Set(products.flatMap((item) => item.colors || [])),
  ];

  return (
    <div className="bg-[#F9F6F1] min-h-screen">
      {/* Luxury Hero */}
      <section className="relative h-[60vh] flex items-center justify-center bg-black text-white text-center">
        <div>
          <p className="text-[#D4AF37] tracking-[6px] uppercase mb-4">
            Premium Collection
          </p>

          <h1 className="text-5xl md:text-7xl font-bold">Luxury Collection</h1>

          <p className="mt-5 text-gray-300">Discover premium ethnic fashion</p>
        </div>
      </section>

      <section className="px-4 md:px-10 py-14">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <div className="bg-white p-6 rounded-2xl h-fit sticky top-28">
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-bold">Filters</h2>

              <button onClick={clearFilters} className="text-red-500">
                Clear
              </button>
            </div>

            <input
              type="text"
              placeholder="Search..."
              className="w-full border p-3 rounded-lg mb-6"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Categories</h3>

              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setCategory(cat.name)}
                  className="block mb-2 text-left"
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Colors */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Colors</h3>

              <div className="flex gap-3 flex-wrap">
                {uniqueColors.map((clr) => (
                  <button
                    key={clr}
                    onClick={() => setColor(clr)}
                    className="w-8 h-8 rounded-full border"
                    style={{
                      backgroundColor: clr,
                    }}
                  ></button>
                ))}
              </div>
            </div>

            {/* Discount */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Discount</h3>

              {[10, 20, 30, 40, 50].map((d) => (
                <button
                  key={d}
                  onClick={() => setDiscount(d)}
                  className="block mb-2"
                >
                  {d}% & above
                </button>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <div className="flex justify-between mb-8">
              <h2 className="text-2xl font-bold">
                {filteredProducts.length}
                Products
              </h2>

              <select
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">Sort By</option>
                <option value="lowToHigh">Price Low to High</option>
                <option value="highToLow">Price High to Low</option>
              </select>
            </div>

            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
