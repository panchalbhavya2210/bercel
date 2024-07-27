"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductPage from "./components/product";

export default function Home() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    let apiUrl = "https://linode25.eqserver.net/mock_product_response.json";
    axios.get(apiUrl).then((response) => setProduct(response.data));
  }, []);

  if (!product) {
    return <div>loading...</div>;
  } else {
    return (
      <main>
        <h1>Main Page</h1>
        <ProductPage config={product} />
      </main>
    );
  }
}
