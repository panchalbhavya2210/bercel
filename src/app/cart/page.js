"use client";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";

export default function Cart() {
  // getting the data from local storage
  const [cart, setCart] = useLocalStorageState("cart", {});
  const getProductData = () => Object.values(cart || {});
  const productData = getProductData();

  // checkout button inner text
  let [checkOutText, changeText] = useState("Checkout");

  // function to remove product
  function removeProduct(index) {
    // copying the array
    const copyCart = { ...cart };
    //accessing the key of the copied array
    const cartKey = Object.keys(copyCart);
    // assigning the key for removing process
    const keyRemoval = cartKey[index];
    // deleting the data for specific key
    delete copyCart[keyRemoval];
    // re rendering the array
    setCart(copyCart);
  }

  // function for online payment
  async function onlineCheckout() {
    changeText("Processing...");
    const response = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [cart],
        totalAmt: 399,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      window.location.replace(data.sessionData.url);
    }
  }

  return (
    <div className="mt-8 p-5">
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {productData.map((product, index) => (
            <li key={index} className="sm:flex md:flex lg:flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  alt={product.imageAlt}
                  src={product.image}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="sm:ml-4 md:ml-4 lg:ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <p className="font-[600]"> {product.name}</p>
                      <p className="text-[#545454]">{product.description}</p>
                    </h3>
                    <p className="ml-4 font-[600]">${product.price}</p>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="mt-1 text-sm text-gray-500">
                    Color: {product.color}
                  </p>

                  <div className="flex">
                    {/* using index instead of product id */}
                    <button
                      type="button"
                      className="font-medium text-[red] "
                      onClick={() => removeProduct(index)}
                      aria-label="Remove Product"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
          <p className={`${productData.length == 0 ? "block" : "hidden"}`}>
            Nothing in cart, add something first.
          </p>
          <div className="flex justify-center">
            <button
              className={`mt-5 bg-[#a7ffa7] px-5 py-3 rounded-md text-xl font-[600] ${
                productData.length == 0 ? "hidden" : "block"
              }`}
              onClick={() => onlineCheckout()}
              aria-label="Checkout"
            >
              {checkOutText}
            </button>
          </div>

          <div className="useCreditData mt-5">
            <strong>Use this data during checkout</strong>
            <p>Email : any email</p>
            <p>Credit Card Information:</p>
            <p>Number : 4242 4242 4242 4242</p>
            <p>Data : 12/34</p>
            <p>CVV: 567</p>
          </div>
        </ul>
      </div>
    </div>
  );
}
