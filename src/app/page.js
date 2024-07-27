import React from "react";

async function getRepo() {
  const res = await fetch(
    "https://linode25.eqserver.net/mock_product_response.json"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const repo = await getRepo();
  console.log(repo.price);
  return (
    <div>
      <p>Stars: {repo.price}</p>
    </div>
  );
}
