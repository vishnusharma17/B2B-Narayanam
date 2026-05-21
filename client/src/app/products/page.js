"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import ProductCard from "../../components/product/ProductCard";
import API from "../../lib/api";

export default function ProductsPage() {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [priceSort, setPriceSort] = useState("");

  const [color, setColor] = useState("");

  const [discount, setDiscount] = useState("");

  const [maxPrice, setMaxPrice] = useState(100000);

  const [showFilters, setShowFilters] = useState(false);

  const [loading, setLoading] = useState(true);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;

  // URL category support
  useEffect(() => {
    const categoryParam = searchParams.get("category");

    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const productRes = await API.get("/products");

      const categoryRes = await API.get("/categories");

      setProducts(productRes.data.data || []);

      setFilteredProducts(productRes.data.data || []);

      setCategories(categoryRes.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // FILTERS
  useEffect(() => {
    let filtered = [...products];

    // Search
    if (search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Category
    if (category) {
      filtered = filtered.filter(
        (item) => item.category?.name?.toLowerCase() === category.toLowerCase(),
      );
    }

    // Color
    if (color) {
      filtered = filtered.filter((item) => item.colors?.includes(color));
    }

    // Discount
    if (discount) {
      filtered = filtered.filter(
        (item) => item.discount_percentage >= Number(discount),
      );
    }

    // Price
    filtered = filtered.filter(
      (item) => Number(item.price_min || 0) <= maxPrice,
    );

    // Sort
    if (priceSort === "lowToHigh") {
      filtered.sort((a, b) => a.price_min - b.price_min);
    }

    if (priceSort === "highToLow") {
      filtered.sort((a, b) => b.price_min - a.price_min);
    }

    setFilteredProducts(filtered);

    // RESET PAGE
    setCurrentPage(1);
  }, [search, category, color, discount, priceSort, maxPrice, products]);

  const uniqueColors = [
    ...new Set(products.flatMap((item) => item.colors || [])),
  ];

  // PAGINATION
  const indexOfLastProduct = currentPage * productsPerPage;

  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setColor("");
    setDiscount("");
    setPriceSort("");
    setMaxPrice(100000);
  };

  return (
    <div className="bg-[#f8f3ec] min-h-screen pt-24">
      {/* Header */}
      <section className="text-center py-10 sm:py-14 px-4">
        <p className="uppercase tracking-[4px] text-[#b68d40] text-xs sm:text-sm mb-3">
          Narayanam Collection
        </p>

        <h1 className="text-3xl sm:text-5xl font-light">
          Premium Fashion Store
        </h1>

        <p className="text-gray-600 mt-4 text-sm sm:text-base max-w-2xl mx-auto">
          Discover handcrafted elegance curated for luxury fashion retailers and
          boutiques.
        </p>
      </section>

      <section className="px-4 md:px-8 lg:px-10 pb-16">
        <div className="grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-8">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(true)}
            className="lg:hidden bg-black text-white py-3 px-5 rounded-xl flex items-center justify-center gap-2"
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>

          {/* Sidebar */}
          <div
            className={`
              fixed
              lg:sticky
              top-[75px]
              lg:top-[110px]
              left-0
              h-[calc(100vh-75px)]
              lg:h-fit
              w-[85%]
              sm:w-[400px]
              lg:w-full
              z-40
              bg-white
              rounded-none
              lg:rounded-3xl
              p-5
              shadow-xl
              lg:shadow-sm
              overflow-y-auto
              transition-all
              duration-300
              ${
                showFilters
                  ? "translate-x-0"
                  : "-translate-x-full lg:translate-x-0"
              }
            `}
          >
            {/* Mobile Header */}
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <h2 className="font-semibold text-lg">Filters</h2>

              <button onClick={() => setShowFilters(false)}>
                <X />
              </button>
            </div>

            {/* Filter Header */}
            <div className="hidden lg:flex justify-between items-center mb-6">
              <h2 className="font-semibold flex gap-2 items-center">
                <SlidersHorizontal size={18} />
                Filters
              </h2>

              <button onClick={clearFilters} className="text-red-500 text-sm">
                Clear
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search
                size={18}
                className="absolute left-3 top-4 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-xl py-3 pl-10 pr-3"
              />
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Categories</h3>

              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => setCategory(cat.name)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                      category === cat.name
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Max Price</h3>

              <input
                type="range"
                min="500"
                max="100000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full"
              />

              <p className="text-sm text-gray-500 mt-2">Up to ₹{maxPrice}</p>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Colors</h3>

              <div className="flex gap-3 flex-wrap">
                {uniqueColors.map((clr) => (
                  <button
                    key={clr}
                    onClick={() => setColor(clr)}
                    className={`w-8 h-8 rounded-full border-2 transition ${
                      color === clr
                        ? "border-black scale-110"
                        : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor: clr,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Discount */}
            <div>
              <h3 className="font-medium mb-3">Discount</h3>

              {[10, 20, 30, 40, 50].map((d) => (
                <button
                  key={d}
                  onClick={() => setDiscount(d)}
                  className={`block mb-2 transition ${
                    discount === String(d)
                      ? "text-black font-semibold"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {d}% & above
                </button>
              ))}
            </div>
          </div>

          {/* Overlay */}
          {showFilters && (
            <div
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            />
          )}

          {/* Products */}
          <div>
            {/* Top Bar */}
            <div className="sticky top-[85px] z-20 bg-[#f8f3ec] pb-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {filteredProducts.length} Products
                  </h2>

                  {category && (
                    <p className="text-sm text-gray-500 mt-1">
                      Category: {category}
                    </p>
                  )}
                </div>

                <select
                  value={priceSort}
                  onChange={(e) => setPriceSort(e.target.value)}
                  className="border rounded-xl px-4 py-3 w-full sm:w-auto bg-white"
                >
                  <option value="">Sort By</option>

                  <option value="lowToHigh">Price: Low to High</option>

                  <option value="highToLow">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-3xl h-[380px] animate-pulse"
                  />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center shadow-sm">
                <h3 className="text-2xl font-semibold mb-3">
                  No Products Found
                </h3>

                <p className="text-gray-500 mb-5">
                  Try changing your filters or search.
                </p>

                <button
                  onClick={clearFilters}
                  className="bg-black text-white px-6 py-3 rounded-full"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                  {currentProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
                    {/* Prev */}
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                      className="px-4 py-2 rounded-xl border bg-white disabled:opacity-40"
                    >
                      Prev
                    </button>

                    {/* Numbers */}
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`w-10 h-10 rounded-xl transition ${
                          currentPage === index + 1
                            ? "bg-black text-white"
                            : "bg-white border"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}

                    {/* Next */}
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                      className="px-4 py-2 rounded-xl border bg-white disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
