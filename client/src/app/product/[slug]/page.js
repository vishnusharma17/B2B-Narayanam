"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "../../../components/product/ProductCard";
import API from "../../../lib/api";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug;
  const router = useRouter();

  const [product, setProduct] = useState(null);

  const [selectedImage, setSelectedImage] = useState("");

  const [relatedProducts, setRelatedProducts] = useState([]);

  const [reviews, setReviews] = useState([]);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!slug) return;
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${slug}`);

      const productData = res.data;

      setProduct(productData);

      setSelectedImage(productData.images?.[0]);

      // Related products
      try {
        const relatedRes = await API.get(
          `/products/related/${productData.category}`,
        );

        let filteredProducts = relatedRes.data.data.filter(
          (item) => item._id !== productData._id,
        );

        // fallback
        if (filteredProducts.length === 0) {
          const allProducts = await API.get("/products");

          filteredProducts = allProducts.data.data
            .filter((item) => item._id !== productData._id)
            .slice(0, 4);
        }

        setRelatedProducts(filteredProducts);
      } catch (error) {
        console.log(error);
      }

      // Reviews
      try {
        const reviewRes = await API.get(`/reviews/${productData._id}`);

        setReviews(reviewRes.data.data);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl">
        Loading Product...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F3EC] overflow-x-hidden pt-[120px]">
      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side */}
          <div className="w-full">
            <div className="bg-white p-5 rounded-[30px] shadow-lg">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-[550px] object-cover rounded-2xl"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-6 flex-wrap">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setSelectedImage(img)}
                  className={`w-24 h-24 object-cover rounded-xl cursor-pointer border-2 ${
                    selectedImage === img
                      ? "border-[#C9A227]"
                      : "border-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full overflow-hidden lg:pl-6">
            <p className="text-[#C9A227] uppercase tracking-[6px] text-xs font-medium">
              Exclusive Collection
            </p>

            <h1 className="text-4xl md:text-6xl font-light mt-4 leading-tight text-black tracking-wide">
              {product.name}
            </h1>

            <div className="w-20 h-[2px] bg-[#C9A227] mt-6"></div>

            <p className="mt-6 text-4xl font-semibold text-[#7A1E1E]">
              ₹{product.price_min}
            </p>

            <p className="mt-2 text-gray-500 text-lg">
              Minimum Order: {product.moq} Pieces
            </p>

            {/* Stock Box */}
            <div className="mt-8 bg-white p-8 rounded-3xl shadow-md border border-[#eee]">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-400 uppercase text-sm tracking-[2px]">
                    Stock
                  </p>

                  <p className="text-2xl font-semibold text-green-600 mt-2">
                    {product.stock}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 uppercase text-sm tracking-[2px]">
                    SKU
                  </p>

                  <p className="text-lg font-semibold mt-2 break-words">
                    {product.sku}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="mt-8 text-gray-600 leading-9 text-lg">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="mt-10">
              <p className="text-lg font-medium mb-5">Select Quantity</p>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  className="w-14 h-14 rounded-full bg-white shadow-md text-xl"
                >
                  -
                </button>

                <div className="w-24 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center text-xl font-bold">
                  {quantity}
                </div>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-14 h-14 rounded-full bg-white shadow-md text-xl"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buy Now */}
            <div className="mt-10">
              {product.stock > 0 ? (
                <button
                  onClick={() =>
                    router.push(
                      `/checkout?productId=${product._id}&quantity=${quantity}`,
                    )
                  }
                  className="w-full bg-black hover:bg-[#7A1E1E] text-white py-5 rounded-full text-lg tracking-[2px] uppercase transition"
                >
                  Buy Now
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-400 text-white py-5 rounded-full"
                >
                  Out Of Stock
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="bg-white py-24 px-6 md:px-10">
          <h2 className="text-5xl font-light text-center mb-14">
            Customer Reviews
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-[#F8F3EC] p-8 rounded-3xl shadow-sm"
              >
                <h3 className="font-semibold text-xl">{review.name}</h3>

                <p className="text-[#C9A227] mt-3">
                  {"★".repeat(review.rating)}
                </p>

                <p className="mt-5 text-gray-600 leading-8">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Similar Products */}
      {relatedProducts.length > 0 && (
        <section className="py-24 px-6 md:px-10 bg-white">
          <h2 className="text-5xl font-light text-center mb-14">
            Similar Products
          </h2>

          <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-8">
            {relatedProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
