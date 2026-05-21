"use client";

import {
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useSearchParams } from "next/navigation";

import ProductCard from "../../components/product/ProductCard";

import API from "../../lib/api";

export default function ProductsPage() {
  const searchParams =
    useSearchParams();

  // =========================
  // STATES
  // =========================

  const [products, setProducts] =
    useState([]);

  const [allProducts, setAllProducts] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [
    debouncedSearch,
    setDebouncedSearch,
  ] = useState("");

  const [category, setCategory] =
    useState("");

  const [priceSort, setPriceSort] =
    useState("");

  const [color, setColor] =
    useState("");

  const [discount, setDiscount] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState(100000);

  const [
    showFilters,
    setShowFilters,
  ] = useState(false);

  const [loading, setLoading] =
    useState(true);

  // PAGINATION
  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [
    totalProducts,
    setTotalProducts,
  ] = useState(0);

  // =========================
  // URL CATEGORY SUPPORT
  // =========================

  useEffect(() => {
    const categoryParam =
      searchParams.get("category");

    if (categoryParam) {
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

    return () =>
      clearTimeout(timer);
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
    fetchProducts();
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

      setProducts(
        res.data.data || [],
      );

      setTotalPages(
        res.data.pagination
          ?.totalPages || 1,
      );

      setTotalProducts(
        res.data.pagination
          ?.totalProducts || 0,
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH CATEGORIES
  // =========================

  const fetchCategories =
    async () => {
      try {
        const res =
          await API.get(
            "/categories",
          );

        setCategories(
          res.data.data || [],
        );
      } catch (error) {
        console.log(error);
      }
    };

  // =========================
  // FETCH ALL PRODUCTS
  // =========================

  const fetchAllProducts =
    async () => {
      try {
        const res =
          await API.get(
            "/products?limit=500",
          );

        setAllProducts(
          res.data.data || [],
        );
      } catch (error) {
        console.log(error);
      }
    };

  // =========================
  // UNIQUE COLORS
  // =========================

  const uniqueColors =
    useMemo(() => {
      return [
        ...new Set(
          allProducts.flatMap(
            (item) =>
              item.colors || [],
          ),
        ),
      ];
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
  // CLOSE MOBILE FILTER
  // =========================

  const closeMobileFilter =
    () => {
      if (
        typeof window !==
          "undefined" &&
        window.innerWidth < 1024
      ) {
        setShowFilters(false);
      }
    };

  // =========================
  // PAGINATION NUMBERS
  // =========================

  const getPaginationNumbers =
    () => {
      const pages = [];

      for (
        let i = Math.max(
          1,
          currentPage - 2,
        );
        i <=
        Math.min(
          totalPages,
          currentPage + 2,
        );
        i++
      ) {
        pages.push(i);
      }

      return pages;
    };

  return (
    <div className="bg-[#f8f3ec] min-h-screen pt-24">
      {/* HEADER */}
      <section className="text-center py-12 sm:py-16 px-4">
        <p className="uppercase tracking-[4px] text-[#b68d40] text-xs sm:text-sm mb-4">
          Narayanam Collection
        </p>

        <h1 className="text-3xl sm:text-5xl font-light leading-tight">
          Premium Fashion Store
        </h1>

        <p className="text-gray-600 mt-5 text-sm sm:text-base max-w-2xl mx-auto leading-7">
          Discover handcrafted
          elegance curated for
          luxury fashion retailers
          and boutiques.
        </p>
      </section>

      <section className="px-4 md:px-8 lg:px-10 pb-20">
        <div className="grid lg:grid-cols-[290px_1fr] gap-6 lg:gap-8">
          {/* MOBILE FILTER BUTTON */}
          <button
            onClick={() =>
              setShowFilters(true)
            }
            className="lg:hidden bg-black text-white py-3 px-5 rounded-2xl flex items-center justify-center gap-2 shadow-sm"
          >
            <SlidersHorizontal
              size={18}
            />
            Filters
          </button>

          {/* SIDEBAR */}
          <div
            className={`
              fixed
              lg:sticky
              top-[75px]
              lg:top-[105px]
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
              shadow-2xl
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
            {/* MOBILE HEADER */}
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <h2 className="font-semibold text-lg">
                Filters
              </h2>

              <button
                onClick={() =>
                  setShowFilters(false)
                }
              >
                <X />
              </button>
            </div>

            {/* FILTER HEADER */}
            <div className="hidden lg:flex justify-between items-center mb-6">
              <h2 className="font-semibold flex gap-2 items-center">
                <SlidersHorizontal
                  size={18}
                />
                Filters
              </h2>

              <button
                onClick={
                  clearFilters
                }
                className="text-red-500 text-sm"
              >
                Clear
              </button>
            </div>

            {/* SEARCH */}
            <div className="relative mb-7">
              <Search
                size={18}
                className="absolute left-3 top-4 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search products"
                value={search}
                onChange={(e) => {
                  setSearch(
                    e.target.value,
                  );

                  setCurrentPage(1);
                }}
                className="w-full border border-gray-200 rounded-2xl py-3 pl-10 pr-3 outline-none focus:border-black transition"
              />
            </div>

            {/* CATEGORY */}
            <div className="mb-7">
              <h3 className="font-semibold mb-4">
                Categories
              </h3>

              <div className="space-y-2">
                {categories.map(
                  (cat) => (
                    <button
                      key={cat._id}
                      onClick={() => {
                        // TOGGLE FIX
                        if (
                          category ===
                          cat._id
                        ) {
                          setCategory(
                            "",
                          );
                        } else {
                          setCategory(
                            cat._id,
                          );
                        }

                        setCurrentPage(
                          1,
                        );

                        closeMobileFilter();
                      }}
                      className={`block w-full text-left px-4 py-3 rounded-xl transition-all ${
                        category ===
                        cat._id
                          ? "bg-black text-white shadow-lg"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* PRICE */}
            <div className="mb-7">
              <div className="flex justify-between mb-3">
                <h3 className="font-semibold">
                  Price Range
                </h3>

                <span className="text-sm text-[#b68d40] font-medium">
                  ₹500 - ₹
                  {maxPrice}
                </span>
              </div>

              <input
                type="range"
                min="500"
                max="100000"
                step="500"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(
                    e.target.value,
                  );

                  setCurrentPage(1);
                }}
                className="w-full accent-black"
              />
            </div>

            {/* COLORS */}
            <div className="mb-7">
              <h3 className="font-semibold mb-4">
                Colors
              </h3>

              <div className="flex gap-3 flex-wrap">
                {uniqueColors.map(
                  (clr) => (
                    <button
                      key={clr}
                      onClick={() => {
                        // TOGGLE FIX
                        if (
                          color ===
                          clr
                        ) {
                          setColor(
                            "",
                          );
                        } else {
                          setColor(
                            clr,
                          );
                        }

                        setCurrentPage(
                          1,
                        );

                        closeMobileFilter();
                      }}
                      className={`w-9 h-9 rounded-full border-2 transition-all ${
                        color ===
                        clr
                          ? "border-black scale-110 ring-2 ring-black"
                          : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor:
                          clr,
                      }}
                    />
                  ),
                )}
              </div>
            </div>

            {/* DISCOUNT */}
            <div>
              <h3 className="font-semibold mb-4">
                Discount
              </h3>

              {[10, 20, 30, 40, 50].map(
                (d) => (
                  <button
                    key={d}
                    onClick={() => {
                      // TOGGLE FIX
                      if (
                        discount ===
                        String(d)
                      ) {
                        setDiscount(
                          "",
                        );
                      } else {
                        setDiscount(
                          String(d),
                        );
                      }

                      setCurrentPage(
                        1,
                      );

                      closeMobileFilter();
                    }}
                    className={`block mb-3 transition ${
                      discount ===
                      String(d)
                        ? "text-black font-semibold"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {d}% & above
                  </button>
                ),
              )}
            </div>
          </div>

          {/* OVERLAY */}
          {showFilters && (
            <div
              onClick={() =>
                setShowFilters(false)
              }
              className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            />
          )}

          {/* PRODUCTS */}
          <div>
            {/* TOP BAR */}
            <div className="sticky top-[82px] z-20 bg-[#f8f3ec]/90 backdrop-blur-md pb-4 mb-7">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white rounded-3xl p-5 shadow-sm">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {totalProducts}{" "}
                    Products
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Page{" "}
                    {currentPage} of{" "}
                    {totalPages}
                  </p>
                </div>

                <select
                  value={priceSort}
                  onChange={(e) => {
                    setPriceSort(
                      e.target.value,
                    );

                    setCurrentPage(1);
                  }}
                  className="border border-gray-200 rounded-2xl px-4 py-3 w-full sm:w-auto bg-white outline-none"
                >
                  <option value="">
                    Sort By
                  </option>

                  <option value="lowToHigh">
                    Price: Low to
                    High
                  </option>

                  <option value="highToLow">
                    Price: High to
                    Low
                  </option>
                </select>
              </div>

              {/* ACTIVE FILTERS */}
              {(category ||
                color ||
                discount) && (
                <div className="flex flex-wrap gap-3 mt-5">
                  {category && (
                    <button
                      onClick={() =>
                        setCategory("")
                      }
                      className="bg-white px-4 py-2 rounded-full text-sm shadow-sm border"
                    >
                      {
                        categories.find(
                          (c) =>
                            c._id ===
                            category,
                        )?.name
                      }{" "}
                      ✕
                    </button>
                  )}

                  {color && (
                    <button
                      onClick={() =>
                        setColor("")
                      }
                      className="bg-white px-4 py-2 rounded-full text-sm shadow-sm border"
                    >
                      {color} ✕
                    </button>
                  )}

                  {discount && (
                    <button
                      onClick={() =>
                        setDiscount(
                          "",
                        )
                      }
                      className="bg-white px-4 py-2 rounded-full text-sm shadow-sm border"
                    >
                      {discount}% ✕
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* LOADING */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {[...Array(8)].map(
                  (_, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-3xl overflow-hidden shadow-sm"
                    >
                      <div className="h-[280px] bg-gray-200 animate-pulse" />

                      <div className="p-4">
                        <div className="h-5 bg-gray-200 rounded animate-pulse mb-3" />

                        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  ),
                )}
              </div>
            ) : products.length ===
              0 ? (
              <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
                <div className="w-20 h-20 mx-auto rounded-full bg-[#f8f3ec] flex items-center justify-center mb-6">
                  <Sparkles
                    className="text-[#b68d40]"
                    size={34}
                  />
                </div>

                <h3 className="text-3xl font-light mb-4">
                  No Products
                  Found
                </h3>

                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Try adjusting
                  your filters or
                  search to
                  discover more
                  collections.
                </p>

                <button
                  onClick={
                    clearFilters
                  }
                  className="bg-black text-white px-7 py-3 rounded-full hover:opacity-90 transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {/* PRODUCTS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                  {products.map(
                    (product) => (
                      <ProductCard
                        key={
                          product._id
                        }
                        product={
                          product
                        }
                      />
                    ),
                  )}
                </div>

                {/* PAGINATION */}
                {totalPages >
                  1 && (
                  <div className="flex justify-center items-center gap-2 mt-14 flex-wrap">
                    {/* PREV */}
                    <button
                      disabled={
                        currentPage ===
                        1
                      }
                      onClick={() => {
                        setCurrentPage(
                          currentPage -
                            1,
                        );

                        window.scrollTo(
                          {
                            top: 0,
                            behavior:
                              "smooth",
                          },
                        );
                      }}
                      className="px-5 py-3 rounded-2xl border bg-white disabled:opacity-40 hover:bg-black hover:text-white transition"
                    >
                      Prev
                    </button>

                    {/* PAGE NUMBERS */}
                    {getPaginationNumbers().map(
                      (
                        page,
                      ) => (
                        <button
                          key={
                            page
                          }
                          onClick={() => {
                            setCurrentPage(
                              page,
                            );

                            window.scrollTo(
                              {
                                top: 0,
                                behavior:
                                  "smooth",
                              },
                            );
                          }}
                          className={`w-11 h-11 rounded-2xl transition ${
                            currentPage ===
                            page
                              ? "bg-black text-white scale-110 shadow-lg"
                              : "bg-white border hover:bg-black hover:text-white"
                          }`}
                        >
                          {page}
                        </button>
                      ),
                    )}

                    {/* NEXT */}
                    <button
                      disabled={
                        currentPage ===
                        totalPages
                      }
                      onClick={() => {
                        setCurrentPage(
                          currentPage +
                            1,
                        );

                        window.scrollTo(
                          {
                            top: 0,
                            behavior:
                              "smooth",
                          },
                        );
                      }}
                      className="px-5 py-3 rounded-2xl border bg-white disabled:opacity-40 hover:bg-black hover:text-white transition"
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