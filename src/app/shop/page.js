import React from "react";
import ProductPage from "../components/product";
//Fetching the data from api
async function fetchApi() {
  const res = await fetch(
    "https://linode25.eqserver.net/mock_product_response.json"
  );
  //Throwing error if response isnt ok
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // Retrurning the data in JSON Format
  return res.json();
}

export default async function Page() {
  const productData = await fetchApi();
  return (
    <div>
      <ProductPage config={productData} />
    </div>
  );
}
