"use client";

import {
  Heart,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
  X,
} from "lucide-react";

import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import ProductCard from "../../../components/product/ProductCard";

import API from "../../../lib/api";

export default function ProductDetailPage() {
  const params = useParams();

  const slug = params?.slug;

  const router = useRouter();

  const [product, setProduct] = useState(null);

  const [selectedImage, setSelectedImage] = useState("");

  const [relatedProducts, setRelatedProducts] = useState([]);

  const [variantProducts, setVariantProducts] = useState([]);

  const [quantity, setQuantity] = useState(1);

  const [selectedSize, setSelectedSize] = useState("");

  const [selectedColor, setSelectedColor] = useState("");

  const [showImagePreview, setShowImagePreview] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/products/slug/${slug}`);

      const productData = res.data.data;

      // Product turant show karo
      setProduct(productData);

      setSelectedImage(productData.mainImage || "/placeholder-product.jpg");

      // SAME DESIGN KE SABHI COLORS LOAD KARO
      if (productData.variantGroup) {
        try {
          const variantRes = await API.get(
            `/products/variants/${productData.variantGroup}`,
          );

          setVariantProducts(variantRes.data.data || []);
        } catch (err) {
          console.log(err);
        }
      }

      if (productData.colors?.length > 0) {
        setSelectedColor(productData.colors[0]);
      }

      // Loading yahin band
      setLoading(false);

      // Background me view count update
      API.put(`/products/views/${productData._id}`).catch(() => {});

      // Background me related products fetch
      const categoryId = productData.category?._id || productData.category;

      try {
        const relatedRes = await API.get(`/products/related/${categoryId}`);

        let filtered = (relatedRes.data.data || []).filter(
          (item) => item._id !== productData._id,
        );

        if (filtered.length === 0) {
          const allProducts = await API.get("/products");

          filtered = (allProducts.data.data || [])
            .filter((item) => item._id !== productData._id)
            .slice(0, 4);
        }

        setRelatedProducts(filtered.slice(0, 4));
      } catch (err) {
        console.log(err);
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to load product");

      setLoading(false);
    }
  };

  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = async () => {
    const user = localStorage.getItem("userData");

    if (!user) {
      toast.error("Please login first");

      router.push("/login");

      return;
    }

    try {
      if (product.sizes?.length > 0 && !selectedSize) {
        return toast.error("Please select size");
      }

      let sessionId = localStorage.getItem("sessionId");

      if (!sessionId) {
        sessionId = Math.random().toString(36).substring(2);

        localStorage.setItem("sessionId", sessionId);
      }

      await API.post("/cart", {
        productId: product._id,
        quantity,
        size: selectedSize,
        color: selectedColor,
        sessionId,
      });

      toast.success("Added to cart");

      setTimeout(() => {
        router.push("/cart");
      }, 500);
    } catch (error) {
      console.log(error);

      toast.error("Cart failed");
    }
  };

  // =========================
  // WISHLIST
  // =========================

  const handleWishlist = async () => {
    try {
      let sessionId = localStorage.getItem("sessionId");

      if (!sessionId) {
        sessionId = Math.random().toString(36).substring(2);

        localStorage.setItem("sessionId", sessionId);
      }

      await API.post("/wishlist", {
        productId: product._id,
        sessionId,
      });

      toast.success("Added to wishlist");
    } catch (error) {
      console.log(error);

      toast.error("Wishlist failed");
    }
  };

  // =========================
  // BUY NOW
  // =========================

  const handleBuyNow = () => {
    const user = localStorage.getItem("userData");

    if (!user) {
      toast.error("Please login first");

      router.push("/login");

      return;
    }

    if (product.sizes?.length > 0 && !selectedSize) {
      return toast.error("Please select size");
    }

    router.push(
      `/checkout?productId=${product._id}&quantity=${quantity}&size=${selectedSize}&color=${selectedColor}`
    );
  };

  // =========================
  // LOADING
  // =========================

  if (loading || !product) {
    return (
      <div className="h-screen flex justify-center items-center text-xl">
        Loading Product...
      </div>
    );
  }

  // =========================
  // IMAGES
  // =========================

  const thumbnailImages = [
    product.mainImage,
    ...(product.galleryImages || []),
  ].filter((img, index, self) => img && self.indexOf(img) === index);

  return (
    <div className="bg-[#faf7f2] min-h-screen pt-20 sm:pt-24">
      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 pt-6 text-xs sm:text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
        Home / Products / <span className="text-black">{product.name}</span>
      </div>

      {/* MAIN SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* LEFT */}
          <div className="lg:sticky lg:top-28">
            <div className="flex flex-col-reverse md:flex-row gap-3 sm:gap-4">
              {/* THUMBNAILS */}
              <div
                className="
                  flex
                  md:flex-col
                  gap-2
                  sm:gap-3
                  overflow-x-auto
                  md:overflow-y-auto
                  md:max-h-[650px]
                  scrollbar-hide
                  pb-2
                "
              >
                {thumbnailImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`
                      relative
                      min-w-[72px]
                      w-[72px]
                      h-[90px]
                      sm:min-w-[85px]
                      sm:w-[85px]
                      sm:h-[105px]
                      rounded-xl
                      sm:rounded-2xl
                      overflow-hidden
                      border-2
                      bg-white
                      transition-all
                      duration-300
                      shadow-sm
                      flex-shrink-0
                      group

                      ${
                        selectedImage === img
                          ? "border-black scale-105 shadow-xl"
                          : "border-gray-200 hover:border-black"
                      }
                    `}
                  >
                    <img
                      src={img}
                      alt={`thumb-${index}`}
                      className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-110
                      "
                    />

                    {selectedImage === img && (
                      <div
                        className="
                          absolute
                          inset-0
                          border-2
                          border-black
                          rounded-xl
                          sm:rounded-2xl
                        "
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* MAIN IMAGE */}
              <div
                className="
                  flex-1
                  bg-white
                  rounded-2xl
                  sm:rounded-3xl
                  overflow-hidden
                  shadow-sm
                  border
                  group
                  relative
                "
              >
                <img
                  src={selectedImage}
                  alt={product.name}
                  onClick={() => setShowImagePreview(true)}
                  className="
                    w-full
                    h-[320px]
                    sm:h-[500px]
                    lg:h-[650px]
                    object-contain
                    bg-white
                    p-3
                    sm:p-4
                    transition-all
                    duration-700
                    ease-in-out
                    group-hover:scale-105
                    cursor-zoom-in
                  "
                />

                {/* IMAGE COUNT */}
                <div
                  className="
                    absolute
                    top-3
                    sm:top-4
                    left-3
                    sm:left-4
                    bg-black/70
                    text-white
                    text-[10px]
                    sm:text-xs
                    px-3
                    py-1.5
                    sm:py-2
                    rounded-full
                    backdrop-blur
                    z-20
                  "
                >
                  {thumbnailImages.findIndex((img) => img === selectedImage) +
                    1}
                  /{thumbnailImages.length}
                </div>

                {/* ZOOM TEXT */}
                <div
                  className="
                    absolute
                    bottom-3
                    sm:bottom-4
                    right-3
                    sm:right-4
                    bg-black/70
                    text-white
                    text-[10px]
                    sm:text-xs
                    px-3
                    py-1.5
                    sm:py-2
                    rounded-full
                    backdrop-blur
                    z-20
                  "
                >
                  Click to Zoom
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="pb-24 sm:pb-0">
            <p className="uppercase tracking-[3px] sm:tracking-[4px] text-[10px] sm:text-xs text-[#b68d40] mb-3">
              Narayanam Premium
            </p>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-light leading-tight">
              {product.name}
            </h1>

            {/* PRICE */}
            <div className="mt-5 sm:mt-6 flex items-center gap-3 sm:gap-4 flex-wrap">
              <span className="text-2xl sm:text-3xl font-semibold">
                ₹{product.price_min}
              </span>

              {product.original_price && (
                <span className="line-through text-gray-400 text-sm sm:text-base">
                  ₹{product.original_price}
                </span>
              )}

              {product.discount_percentage > 0 && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  {product.discount_percentage}% OFF
                </span>
              )}
            </div>

            {/* STOCK */}
            <div className="mt-4">
              {product.stock > 0 ? (
                <span className="text-green-600 font-medium text-sm sm:text-base">
                  In Stock
                </span>
              ) : (
                <span className="text-red-500 font-medium text-sm sm:text-base">
                  Out of Stock
                </span>
              )}
            </div>

            {/* DESCRIPTION */}
            <div
              className="
                mt-6
                text-gray-600
                leading-7
                prose
                max-w-none
                text-sm
                sm:text-base
              "
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
            />

            {/* COLORS */}
            {product.colors?.length > 0 && (
              <div className="mt-7 sm:mt-8">
                <p className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">
                  Select Color
                </p>

                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`
                        px-4
                        sm:px-5
                        py-2
                        rounded-full
                        border
                        transition-all
                        duration-300
                        capitalize
                        text-sm

                        ${
                          selectedColor === color
                            ? "bg-black text-white border-black"
                            : "bg-white hover:bg-black hover:text-white"
                        }
                      `}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* MORE COLORS */}

            {variantProducts.length > 1 && (
              <div className="mt-8">
                <h3 className="font-medium mb-4">More Colors</h3>

                <div className="flex gap-3 flex-wrap">
                  {variantProducts.map((item) => (
                    <button
                      key={item._id}
                      onClick={() => router.push(`/product/${item.slug}`)}
                      className={`
            w-20
            h-24
            rounded-xl
            overflow-hidden
            border-2
            transition-all

            ${
              item._id === product._id
                ? "border-black"
                : "border-gray-200 hover:border-black"
            }
          `}
                    >
                      <img
                        src={item.mainImage}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            
            {/* SIZES */}
            {product.sizes?.length > 0 && (
              <div className="mt-7 sm:mt-8">
                <p className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">
                  Select Size
                </p>

                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        px-4
                        sm:px-5
                        py-2
                        border
                        rounded-full
                        transition
                        text-sm
                        ${
                          selectedSize === size
                            ? "bg-black text-white border-black"
                            : "hover:bg-black hover:text-white"
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY */}
            <div className="mt-7 sm:mt-8">
              <p className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">
                Quantity
              </p>

              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow text-lg"
                >
                  -
                </button>

                <div className="w-14 sm:w-16 h-10 sm:h-12 rounded-xl bg-white flex items-center justify-center font-semibold shadow text-sm sm:text-base">
                  {quantity}
                </div>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-8 sm:mt-10">
              <button
                onClick={handleAddToCart}
                className="
                  bg-white
                  border
                  border-black
                  py-3.5
                  sm:py-4
                  rounded-full
                  hover:bg-black
                  hover:text-white
                  transition
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-sm
                "
              >
                <ShoppingBag size={18} />
                Add To Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="
                  bg-black
                  text-white
                  py-3.5
                  sm:py-4
                  rounded-full
                  text-sm
                "
              >
                Buy Now
              </button>

              <button
                onClick={handleWishlist}
                className="
                  bg-white
                  py-3.5
                  sm:py-4
                  rounded-full
                  shadow
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-sm
                "
              >
                <Heart size={18} />
                Wishlist
              </button>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8 sm:mt-10">
              <div className="bg-white p-3 sm:p-5 rounded-2xl text-center">
                <Truck className="mx-auto mb-2 sm:mb-3 w-5 h-5 sm:w-6 sm:h-6" />
                <p className="text-[11px] sm:text-sm">Fast Delivery</p>
              </div>

              <div className="bg-white p-3 sm:p-5 rounded-2xl text-center">
                <ShieldCheck className="mx-auto mb-2 sm:mb-3 w-5 h-5 sm:w-6 sm:h-6" />
                <p className="text-[11px] sm:text-sm">Secure Payment</p>
              </div>

              <div className="bg-white p-3 sm:p-5 rounded-2xl text-center">
                <RotateCcw className="mx-auto mb-2 sm:mb-3 w-5 h-5 sm:w-6 sm:h-6" />
                <p className="text-[11px] sm:text-sm">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="py-16 sm:py-20 px-4 md:px-10 bg-white">
          <div className="text-center mb-10 sm:mb-12">
            <p className="uppercase tracking-[4px] text-[#b68d40] text-xs sm:text-sm mb-3">
              You May Also Like
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light">
              Similar Products
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </section>
      )}

      {/* IMAGE PREVIEW */}
      {showImagePreview && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setShowImagePreview(false)}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 text-white"
          >
            <X size={30} />
          </button>

          <img
            src={selectedImage}
            alt={product.name}
            className="max-w-full max-h-full object-contain rounded-2xl"
          />
        </div>
      )}

      {/* MOBILE STICKY BUTTONS */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex gap-3 sm:hidden z-40">
        <button
          onClick={handleWishlist}
          className="w-14 bg-gray-100 rounded-full flex items-center justify-center"
        >
          <Heart size={20} />
        </button>

        <button
          onClick={handleAddToCart}
          className="flex-1 bg-black text-white py-3 rounded-full text-sm"
        >
          Add To Cart
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 bg-[#b68d40] text-white py-3 rounded-full text-sm"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
