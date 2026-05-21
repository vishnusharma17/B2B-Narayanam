"use client";

import {
  Heart,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
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

  const [quantity, setQuantity] = useState(1);

  const [selectedSize, setSelectedSize] = useState("");

  const [showImagePreview, setShowImagePreview] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setProduct(null);

      const res = await API.get(`/products/slug/${slug}`);

      const productData = res.data.data;

      await API.put(`/products/views/${productData._id}`);

      setProduct(productData);

      setSelectedImage(productData.mainImage || "/placeholder-product.jpg");

      const categoryId = productData.category?._id || productData.category;

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
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async () => {
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
        sessionId,
      });

      toast.success("Added to cart");

      setTimeout(() => {
        router.push("/cart");
      }, 500);
    } catch (error) {
      toast.error("Cart failed");
    }
  };

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
      toast.error("Wishlist failed");
    }
  };

  const handleBuyNow = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      return toast.error("Please select size");
    }

    router.push(
      `/checkout?productId=${product._id}&quantity=${quantity}&size=${selectedSize}`,
    );
  };

  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center text-xl">
        Loading Product...
      </div>
    );
  }

  const thumbnailImages = [product.mainImage, ...(product.galleryImages || [])];

  return (
    <div className="bg-[#faf7f2] min-h-screen pt-20 sm:pt-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 pt-6 text-sm text-gray-500">
        Home / Products / <span className="text-black">{product.name}</span>
      </div>

      <section className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT */}
          <div className="lg:sticky lg:top-28">
            {/* Main Image */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border">
              <img
                src={selectedImage}
                alt={product.name}
                onClick={() => setShowImagePreview(true)}
                className="
                  w-full
                  h-[320px]
                  sm:h-[450px]
                  md:h-[600px]
                  object-contain
                  bg-white
                  p-3
                  hover:scale-105
                  transition
                  duration-500
                  cursor-zoom-in
                "
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto mt-5 pb-2">
              {thumbnailImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`
                      min-w-[90px]
                      h-[90px]
                      rounded-2xl
                      overflow-hidden
                      border-2
                      bg-white
                      ${
                        selectedImage === img
                          ? "border-black"
                          : "border-gray-200"
                      }
                    `}
                >
                  <img
                    src={img}
                    alt="thumb"
                    className="
                        w-full
                        h-full
                        object-contain
                        p-1
                      "
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <p className="uppercase tracking-[4px] text-xs sm:text-sm text-[#b68d40] mb-3">
              Narayanam Premium
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-6 flex items-center gap-4 flex-wrap">
              <span className="text-3xl font-semibold">
                ₹{product.price_min}
              </span>

              {product.original_price && (
                <span className="line-through text-gray-400">
                  ₹{product.original_price}
                </span>
              )}

              {product.discount_percentage > 0 && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {product.discount_percentage}% OFF
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="mt-4">
              {product.stock > 0 ? (
                <span className="text-green-600 font-medium">In Stock</span>
              ) : (
                <span className="text-red-500 font-medium">Out of Stock</span>
              )}
            </div>

            {/* Description */}
            <div
              className="mt-6 text-gray-600 leading-7 prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
            />

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div className="mt-8">
                <p className="font-medium mb-4">Select Size</p>

                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2 border rounded-full transition ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "hover:bg-black hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-8">
              <p className="font-medium mb-4">Quantity</p>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  className="w-12 h-12 rounded-full bg-white shadow"
                >
                  -
                </button>

                <div className="w-16 h-12 rounded-xl bg-white flex items-center justify-center font-semibold shadow">
                  {quantity}
                </div>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-full bg-white shadow"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              <button
                onClick={handleAddToCart}
                className="bg-white border border-black py-4 rounded-full hover:bg-black hover:text-white transition flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                Add To Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="bg-black text-white py-4 rounded-full"
              >
                Buy Now
              </button>

              <button
                onClick={handleWishlist}
                className="bg-white py-4 rounded-full shadow flex items-center justify-center gap-2"
              >
                <Heart size={18} />
                Wishlist
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              <div className="bg-white p-5 rounded-2xl text-center">
                <Truck className="mx-auto mb-3" />
                <p className="text-sm">Fast Delivery</p>
              </div>

              <div className="bg-white p-5 rounded-2xl text-center">
                <ShieldCheck className="mx-auto mb-3" />
                <p className="text-sm">Secure Payment</p>
              </div>

              <div className="bg-white p-5 rounded-2xl text-center">
                <RotateCcw className="mx-auto mb-3" />
                <p className="text-sm">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 sm:py-20 px-4 md:px-10 bg-white">
          <div className="text-center mb-12">
            <p className="uppercase tracking-[4px] text-[#b68d40] text-sm mb-3">
              You May Also Like
            </p>

            <h2 className="text-3xl md:text-4xl font-light">
              Similar Products
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </section>
      )}

      {/* Full Preview */}
      {showImagePreview && (
        <div
          onClick={() => setShowImagePreview(false)}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        >
          <img
            src={selectedImage}
            alt={product.name}
            className="max-w-full max-h-full object-contain rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Sticky Mobile Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex gap-3 sm:hidden z-40">
        <button
          onClick={handleWishlist}
          className="w-14 bg-gray-100 rounded-full flex items-center justify-center"
        >
          <Heart size={20} />
        </button>

        <button
          onClick={handleAddToCart}
          className="flex-1 bg-black text-white py-3 rounded-full"
        >
          Add To Cart
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 bg-[#b68d40] text-white py-3 rounded-full"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
