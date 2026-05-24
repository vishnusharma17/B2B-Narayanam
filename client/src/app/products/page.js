"use client";

import { Search, SlidersHorizontal, Sparkles, X } from "lucide-react";

import { useEffect, useMemo, useState } from "react";

import { useSearchParams } from "next/navigation";

import ProductCard from "../../components/product/ProductCard";

import API from "../../lib/api";

export default function ProductsPage() {
  const searchParams = useSearchParams();

  // =========================
  // STATES
  // =========================

  const [products, setProducts] = useState([]);

  const [allProducts, setAllProducts] = useState([]);

  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [category, setCategory] = useState("");

  const [priceSort, setPriceSort] = useState("");

  const [color, setColor] = useState("");

  const [discount, setDiscount] = useState("");

  const [maxPrice, setMaxPrice] = useState(100000);

  const [showFilters, setShowFilters] = useState(false);

  const [loading, setLoading] = useState(true);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [totalProducts, setTotalProducts] = useState(0);

  // =========================
  // URL CATEGORY SUPPORT
  // =========================

  useEffect(() => {
    const categoryParam = searchParams.get("category");

    if (categoryParam && categoryParam !== "undefined") {
      setCategory(categoryParam);
    }
  }, [searchParams]);

  // =========================
  // SEARCH DEBOUNCE
  // =========================

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // =========================
  // FETCH INITIAL DATA
  // =========================

  useEffect(() => {
    fetchCategories();

    fetchAllProducts();
  }, []);

  // =========================
  // FETCH PRODUCTS
  // =========================

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(timeout);
  }, [
    currentPage,
    debouncedSearch,
    category,
    color,
    discount,
    priceSort,
    maxPrice,
  ]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `/products?page=${currentPage}&limit=12&search=${debouncedSearch}&category=${category}&color=${color}&sort=${priceSort}&maxPrice=${maxPrice}&discount=${discount}`,
      );

      setProducts(res.data.data || []);

      setTotalPages(res.data.pagination?.totalPages || 1);

      setTotalProducts(res.data.pagination?.totalProducts || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // FETCH CATEGORIES
  // =========================

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");

      setCategories(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // FETCH ALL PRODUCTS
  // =========================

  const fetchAllProducts = async () => {
    try {
      const res = await API.get("/products?limit=500");

      setAllProducts(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // UNIQUE COLORS
  // =========================

  const uniqueColors = useMemo(() => {
    return [...new Set(allProducts.flatMap((item) => item.colors || []))];
  }, [allProducts]);

  // =========================
  // CLEAR FILTERS
  // =========================

  const clearFilters = () => {
    setSearch("");

    setDebouncedSearch("");

    setCategory("");

    setColor("");

    setDiscount("");

    setPriceSort("");

    setMaxPrice(100000);

    setCurrentPage(1);
  };

  // =========================
  // PAGINATION NUMBERS
  // =========================

  const getPaginationNumbers = () => {
    const pages = [];

    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="bg-[#f8f3ec] min-h-screen pt-20 sm:pt-24">
      {/* HEADER */}
      <section className="text-center py-10 sm:py-14 px-4">
        <p className="uppercase tracking-[3px] sm:tracking-[5px] text-[#b68d40] text-[10px] sm:text-xs mb-3">
          Narayanam Collection
        </p>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-light leading-tight">
          Premium Fashion Store
        </h1>

        <p className="text-gray-600 mt-4 text-xs sm:text-sm lg:text-base max-w-2xl mx-auto leading-6 sm:leading-7 px-2">
          Discover handcrafted elegance curated for luxury fashion retailers and
          boutiques.
        </p>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
        {/* MOBILE FILTER BUTTON */}
        <button
          onClick={() => setShowFilters(true)}
          className="
            lg:hidden
            w-full
            bg-black
            text-white
            py-3
            px-5
            rounded-2xl
            flex
            items-center
            justify-center
            gap-2
            shadow-sm
            mb-5
          "
        >
          <SlidersHorizontal size={18} />
          Filters
        </button>

        <div className="flex gap-6">
          {/* SIDEBAR */}
          <aside
            className={`
              fixed
              lg:sticky
              top-0
              lg:top-[95px]
              left-0
              h-screen
              lg:h-fit
              w-[85%]
              sm:w-[360px]
              lg:w-[280px]
              xl:w-[300px]
              shrink-0
              z-40
              lg:z-20
              transition-all
              duration-300
              ${
                showFilters
                  ? "translate-x-0"
                  : "-translate-x-full lg:translate-x-0"
              }
            `}
          >
            <div
              className="
                h-full
                lg:h-auto
                bg-white
                rounded-none
                lg:rounded-3xl
                border
                border-gray-200
                overflow-hidden
                flex
                flex-col
                shadow-2xl
                lg:shadow-sm
              "
            >
              {/* FILTER HEADER */}
              <div className="px-5 sm:px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                  <SlidersHorizontal size={18} />
                  Filters
                </h2>

                <div className="flex items-center gap-4">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-500"
                  >
                    Clear
                  </button>

                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* FILTER BODY */}
              <div className="flex-1 overflow-y-auto">
                {/* SEARCH */}
                <div className="p-5 sm:p-6 border-b border-gray-100">
                  <div className="relative">
                    <Search
                      size={17}
                      className="absolute left-4 top-3.5 text-gray-400"
                    />

                    <input
                      type="text"
                      placeholder="Search products"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);

                        setCurrentPage(1);
                      }}
                      className="
                        w-full
                        border
                        border-gray-200
                        rounded-xl
                        py-3
                        pl-11
                        pr-4
                        outline-none
                        focus:border-black
                        text-sm
                      "
                    />
                  </div>
                </div>

                {/* CATEGORY */}
                <div className="p-5 sm:p-6 border-b border-gray-100">
                  <h3 className="font-semibold text-sm uppercase tracking-wide mb-4">
                    Categories
                  </h3>

                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat._id}
                        onClick={() => {
                          if (category === cat._id) {
                            setCategory("");
                          } else {
                            setCategory(cat._id);
                          }

                          setCurrentPage(1);
                        }}
                        className={`
                          w-full
                          text-left
                          px-4
                          py-3
                          rounded-xl
                          transition
                          text-sm
                          ${
                            category === cat._id
                              ? "bg-black text-white"
                              : "hover:bg-gray-100"
                          }
                        `}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* PRICE */}
                <div className="p-5 sm:p-6 border-b border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-sm uppercase tracking-wide">
                      Price
                    </h3>

                    <span className="text-xs text-[#b68d40] font-medium">
                      ₹{maxPrice}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="500"
                    max="100000"
                    step="500"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(Number(e.target.value));

                      setCurrentPage(1);
                    }}
                    className="w-full accent-black"
                  />
                </div>

                {/* COLORS */}
                <div className="p-5 sm:p-6 border-b border-gray-100">
                  <h3 className="font-semibold text-sm uppercase tracking-wide mb-4">
                    Colors
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {uniqueColors.map((clr) => (
                      <button
                        key={clr}
                        onClick={() => {
                          if (color === clr) {
                            setColor("");
                          } else {
                            setColor(clr);
                          }

                          setCurrentPage(1);
                        }}
                        className={`
                          w-9
                          h-9
                          rounded-full
                          border-2
                          transition-all
                          ${
                            color === clr
                              ? "border-black scale-110 ring-2 ring-black"
                              : "border-gray-300"
                          }
                        `}
                        style={{
                          backgroundColor: clr,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* DISCOUNT */}
                <div className="p-5 sm:p-6">
                  <h3 className="font-semibold text-sm uppercase tracking-wide mb-4">
                    Discount
                  </h3>

                  <div className="space-y-3">
                    {[10, 20, 30, 40, 50].map((d) => (
                      <button
                        key={d}
                        onClick={() => {
                          if (discount === String(d)) {
                            setDiscount("");
                          } else {
                            setDiscount(String(d));
                          }

                          setCurrentPage(1);
                        }}
                        className={`
                          block
                          text-sm
                          transition
                          ${
                            discount === String(d)
                              ? "font-semibold text-black"
                              : "text-gray-500 hover:text-black"
                          }
                        `}
                      >
                        {d}% & Above
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* OVERLAY */}
          {showFilters && (
            <div
              onClick={() => setShowFilters(false)}
              className="
                fixed
                inset-0
                bg-black/40
                z-[5]
                lg:hidden
              "
            />
          )}

          {/* PRODUCTS */}
          <div className="flex-1 min-w-0">
            {/* TOP BAR */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold">
                  {totalProducts} Products
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Page {currentPage} of {totalPages}
                </p>
              </div>

              <select
                value={priceSort}
                onChange={(e) => {
                  setPriceSort(e.target.value);

                  setCurrentPage(1);
                }}
                className="
                  border
                  border-gray-200
                  rounded-xl
                  px-4
                  py-3
                  bg-white
                  outline-none
                  text-sm
                  w-full
                  sm:w-auto
                "
              >
                <option value="">Sort By</option>

                <option value="lowToHigh">Price: Low to High</option>

                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>

            {/* LOADING */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                  >
                    <div className="h-[220px] sm:h-[280px] bg-gray-200 animate-pulse" />

                    <div className="p-4">
                      <div className="h-5 bg-gray-200 rounded animate-pulse mb-3" />

                      <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 sm:p-14 text-center shadow-sm">
                <div className="w-20 h-20 mx-auto rounded-full bg-[#f8f3ec] flex items-center justify-center mb-6">
                  <Sparkles className="text-[#b68d40]" size={32} />
                </div>

                <h3 className="text-3xl font-light mb-4">No Products Found</h3>

                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Try adjusting your filters or search to discover more
                  collections.
                </p>

                <button
                  onClick={clearFilters}
                  className="bg-black text-white px-6 py-3 rounded-full hover:opacity-90 transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {/* PRODUCT GRID */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
                    {/* PREV */}
                    <button
                      disabled={currentPage === 1}
                      onClick={() => {
                        setCurrentPage(currentPage - 1);

                        scrollTop();
                      }}
                      className="px-5 py-3 rounded-xl border bg-white disabled:opacity-40 hover:bg-black hover:text-white transition text-sm"
                    >
                      Prev
                    </button>

                    {/* PAGE NUMBERS */}
                    {getPaginationNumbers().map((page) => (
                      <button
                        key={page}
                        onClick={() => {
                          setCurrentPage(page);

                          scrollTop();
                        }}
                        className={`w-11 h-11 rounded-xl transition text-sm ${
                          currentPage === page
                            ? "bg-black text-white"
                            : "bg-white border hover:bg-black hover:text-white"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    {/* NEXT */}
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => {
                        setCurrentPage(currentPage + 1);

                        scrollTop();
                      }}
                      className="px-5 py-3 rounded-xl border bg-white disabled:opacity-40 hover:bg-black hover:text-white transition text-sm"
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
