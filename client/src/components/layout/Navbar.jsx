"use client";

export const dynamic = "force-dynamic";

import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import API from "../../lib/api";

export default function Navbar() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [userData, setUserData] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [
    searchResults,
    setSearchResults,
  ] = useState([]);

  const [
    searchLoading,
    setSearchLoading,
  ] = useState(false);

  // =========================
  // CHECK USER
  // =========================

  useEffect(() => {
    checkUser();

    window.addEventListener(
      "storage",
      checkUser,
    );

    return () => {
      window.removeEventListener(
        "storage",
        checkUser,
      );
    };
  }, []);

  const checkUser = () => {
    try {
      const user =
        localStorage.getItem(
          "userData",
        );

      if (user) {
        setUserData(
          JSON.parse(user),
        );
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.log(error);

      setUserData(null);
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem(
      "userData",
    );

    localStorage.removeItem(
      "userToken",
    );

    setUserData(null);

    toast.success(
      "Logout successful",
    );

    window.location.href = "/";
  };

  // =========================
  // LIVE SEARCH
  // =========================

  useEffect(() => {
    const fetchSearch =
      async () => {
        try {
          if (
            search.trim() ===
            ""
          ) {
            setSearchResults(
              [],
            );

            return;
          }

          setSearchLoading(
            true,
          );

          const res =
            await API.get(
              `/products/search?q=${search}`,
            );

          setSearchResults(
            res.data.data ||
              [],
          );
        } catch (error) {
          console.log(error);
        } finally {
          setSearchLoading(
            false,
          );
        }
      };

    const timer =
      setTimeout(() => {
        fetchSearch();
      }, 400);

    return () =>
      clearTimeout(timer);
  }, [search]);

  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Collection",
      path: "/products",
    },
    {
      name: "Wholesale",
      path: "/wholesale",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <>
      {/* NAVBAR */}

      <nav
        className="
          fixed
          top-0
          left-0
          w-full
          z-50
          bg-black/85
          backdrop-blur-xl
          border-b
          border-[#D4AF37]/20
          text-white
        "
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* DESKTOP */}

          <div className="hidden lg:flex items-center justify-between h-[85px]">

            {/* LEFT */}

            <div className="flex items-center gap-6">

              {links
                .slice(0, 2)
                .map((link) => (
                  <Link
                    key={
                      link.name
                    }
                    href={
                      link.path
                    }
                    className="uppercase tracking-[2px] text-sm hover:text-[#D4AF37] transition"
                  >
                    {
                      link.name
                    }
                  </Link>
                ))}

            </div>

            {/* LOGO */}

            <Link
              href="/"
              aria-label="Narayanam home"
            >
              <div className="text-center">

                <div className="text-3xl tracking-[8px] font-light text-[#D4AF37]">
                  NARAYANAM
                </div>

                <p className="text-[10px] tracking-[4px] text-gray-400 uppercase mt-1">
                  Luxury Ethnic
                  House
                </p>

              </div>
            </Link>

            {/* RIGHT */}

            <div className="flex items-center gap-5">

              {/* SEARCH */}

              <div className="relative hidden xl:block">

                <Search
                  size={18}
                  aria-hidden="true"
                  className="absolute left-4 top-3.5 text-gray-400"
                />

                <input
                  type="text"
                  aria-label="Search products"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target
                        .value,
                    )
                  }
                  className="w-[240px] bg-white/10 border border-white/10 rounded-full py-3 pl-11 pr-4 text-sm outline-none focus:border-[#D4AF37] transition"
                />

                {/* SEARCH DROPDOWN */}

                {search.length >
                  0 && (
                  <div className="absolute top-[60px] left-0 w-full bg-white text-black rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[450px] overflow-y-auto">

                    {searchLoading ? (
                      <div className="p-5 text-center text-sm">
                        Searching...
                      </div>
                    ) : searchResults.length ===
                      0 ? (
                      <div className="p-5 text-center text-sm">
                        No products
                        found
                      </div>
                    ) : (
                      searchResults.map(
                        (
                          item,
                        ) => (
                          <Link
                            key={
                              item._id
                            }
                            href={`/product/${item.slug}`}
                            onClick={() => {
                              setSearch(
                                "",
                              );

                              setSearchResults(
                                [],
                              );
                            }}
                          >
                            <div className="flex items-center gap-4 p-4 hover:bg-gray-100 transition border-b">

                              <img
                                src={
                                  item.mainImage
                                }
                                alt={
                                  item.name
                                }
                                width="64"
                                height="64"
                                loading="lazy"
                                decoding="async"
                                className="w-16 h-16 object-cover rounded-xl"
                              />

                              <div>

                                <h3 className="font-medium line-clamp-1">
                                  {
                                    item.name
                                  }
                                </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                  ₹
                                  {
                                    item.price_min
                                  }
                                </p>

                              </div>

                            </div>
                          </Link>
                        ),
                      )
                    )}

                  </div>
                )}

              </div>

              {/* LINKS */}

              {links
                .slice(2)
                .map((link) => (
                  <Link
                    key={
                      link.name
                    }
                    href={
                      link.path
                    }
                    className="uppercase tracking-[2px] text-sm hover:text-[#D4AF37] transition"
                  >
                    {
                      link.name
                    }
                  </Link>
                ))}

              {/* USER AREA */}

              {userData ? (
                <div className="flex items-center gap-5 ml-2">

                  <Link
                    href="/wishlist"
                    aria-label="Wishlist"
                  >
                    <Heart
                      size={20}
                      aria-hidden="true"
                      className="hover:text-[#D4AF37] transition"
                    />
                  </Link>

                  <Link
                    href="/cart"
                    aria-label="Shopping cart"
                  >
                    <ShoppingBag
                      size={20}
                      aria-hidden="true"
                      className="hover:text-[#D4AF37] transition"
                    />
                  </Link>

                  <Link
                    href="/profile"
                    aria-label="Profile"
                  >
                    <User
                      size={20}
                      aria-hidden="true"
                      className="hover:text-[#D4AF37] transition"
                    />
                  </Link>

                </div>
              ) : (
                <div className="flex gap-4 uppercase tracking-[2px] text-sm">

                  <Link
                    href="/login"
                    className="hover:text-[#D4AF37]"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="border border-[#D4AF37] px-4 py-2 rounded-full hover:bg-[#D4AF37] hover:text-black transition"
                  >
                    Register
                  </Link>

                </div>
              )}

            </div>

          </div>

          {/* MOBILE */}

          <div className="lg:hidden flex items-center justify-between h-[75px]">

            <Link
              href="/"
              aria-label="Narayanam home"
            >
              <div className="text-2xl tracking-[5px] font-light text-[#D4AF37]">
                NARAYANAM
              </div>
            </Link>

            <div className="flex items-center gap-4">

              {userData && (
                <>

                  <Link
                    href="/wishlist"
                    aria-label="Wishlist"
                  >
                    <Heart
                      size={20}
                      aria-hidden="true"
                    />
                  </Link>

                  <Link
                    href="/cart"
                    aria-label="Shopping cart"
                  >
                    <ShoppingBag
                      size={22}
                      aria-hidden="true"
                    />
                  </Link>

                </>
              )}

              <button
                type="button"
                aria-label="Open menu"
                onClick={() =>
                  setMenuOpen(
                    true,
                  )
                }
              >
                <Menu
                  size={28}
                  aria-hidden="true"
                />
              </button>

            </div>

          </div>

        </div>

      </nav>

      {/* MOBILE MENU */}

      <div
        className={`fixed inset-0 z-[60] transition-all duration-300 ${
          menuOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      >

        <div
          onClick={() =>
            setMenuOpen(
              false,
            )
          }
          className="absolute inset-0 bg-black/60"
        />

        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-[380px] bg-black text-white p-6 transition-all duration-300 ${
            menuOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-xl font-semibold">
              Menu
            </h2>

            <button
              type="button"
              aria-label="Close menu"
              onClick={() =>
                setMenuOpen(
                  false,
                )
              }
            >
              <X
                size={28}
                aria-hidden="true"
              />
            </button>

          </div>

          {/* MOBILE SEARCH */}

          <div className="relative mb-8">

            <Search
              size={18}
              aria-hidden="true"
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <input
              type="text"
              aria-label="Search products"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target
                    .value,
                )
              }
              className="w-full bg-white/10 border border-white/10 rounded-full py-3 pl-11 pr-4 text-sm outline-none"
            />

          </div>

          {/* MOBILE LINKS */}

          <div className="flex flex-col gap-5 uppercase tracking-[3px] text-sm">

            {links.map(
              (link) => (
                <Link
                  key={
                    link.name
                  }
                  href={
                    link.path
                  }
                  onClick={() =>
                    setMenuOpen(
                      false,
                    )
                  }
                  className="hover:text-[#D4AF37]"
                >
                  {
                    link.name
                  }
                </Link>
              ),
            )}

            {userData ? (
              <>

                <Link href="/wishlist">
                  Wishlist
                </Link>

                <Link href="/cart">
                  Cart
                </Link>

                <Link href="/profile">
                  Profile
                </Link>

                <button
                  type="button"
                  onClick={
                    handleLogout
                  }
                  className="text-left hover:text-red-400"
                >
                  Logout
                </button>

              </>
            ) : (
              <>

                <Link href="/login">
                  Login
                </Link>

                <Link href="/register">
                  Register
                </Link>

              </>
            )}

          </div>

        </div>

      </div>
    </>
  );
}