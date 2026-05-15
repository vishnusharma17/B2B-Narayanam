import { useEffect, useState } from "react";
import API from "../lib/api";

export default function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products").then((res) => setProducts(res.data.data));
  }, []);

  return products;
}
