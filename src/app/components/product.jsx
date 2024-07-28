"use client";
import Image from "next/image";
import Heart from "../../../public/icons/heart.svg";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import "../globals.css"

// Star rendering function
function StarRating({ rating }) {
    return (
        <div>
            {"⭐".repeat(rating) + "☆".repeat(5 - rating)}
        </div>
    );
}

const ImageGallery = ({ imageArray, handleImageClick, currentImage }) => (
    <div className="flex md:flex-col lg:flex-col justify-around md:h-72 lg:h-96 overflow-scroll hideScrollbar ml-2">
        {imageArray.map((value) => (
            <div key={value} className="my-1 mr-3">
                <img
                    className="rounded-md cursor-pointer w-32"
                    src={value}
                    alt="Product thumbnail"
                    onClick={() => handleImageClick(value)}
                />
            </div>
        ))}
    </div>
);

const ProductDetails = ({ name, brand, category, description, averageRating, price, producData, customColors = ["Pink", "Green "] }) => {
    const [cart, setCart] = useLocalStorageState('cart', {});
    const [selectedColor, setSelectedColor] = useState(customColors[0]);
    let [addedToCart, setBool] = useState(true)

    function addToCart(product) {
        try {
            setBool(false)
            console.log(addedToCart)
            setTimeout(() => {
                setBool(true)
            }, 3000)
            setCart((wCart) => ({
                ...wCart,
                product: {
                    ...product,
                    color: selectedColor,
                },
            }));

        }
        catch (e) {
            alert(`An error occured ${e}`)
        }
    }

    return (
        <div>
            <h1 className="font-[600] text-3xl text-wrap">{name}</h1>
            <p className="text-[#787878]">By {brand}</p>
            <p className="text-[#787878]">In {category}</p>
            <div className="description md:hidden lg:hidden mt-5">
                <h1>Description:</h1>
                <p>{description}</p>
            </div>
            <div className="starring mt- flex">
                <StarRating rating={Math.floor(averageRating)} />
                <p className="ml-2">{averageRating}</p>
            </div>
            <div className="price text-2xl text-dark-purple font-[700] mt-5">
                ${price}
            </div>
            <ColorPicker colors={customColors} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
            <CartButtons adc={addToCart} producData={producData} />

            <div className={`bg-teal-100 border-t-4 border-[teal] rounded-b text-[teal] px-4 py-3 shadow-md ${addedToCart ? 'hidden' : 'block'}`} role="alert">
                <div className="flex">
                    <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
                    <div>
                        <p className="font-bold">Product Has Been Added To Cart.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ColorPicker = ({ colors, selectedColor, setSelectedColor }) => (
    <div className="colorPicker mt-7">
        <div className="pText">Colors</div>
        <div className="flex">
            {colors.map((color, index) => (
                <button
                    key={index}
                    className={`w-10 h-10 rounded-md ${selectedColor === color ? 'border-2 border-black' : ''} mr-3`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label="Set Color"
                ></button>
            ))}
        </div>
    </div>
);

const CartButtons = ({ adc, producData }) => (
    <div className="cartButtons mt-7">
        <div className="flex wishlist">
            <button className="w-11/12 bg-light-purple py-3 rounded-md" onClick={() => { adc(producData) }} aria-label="Add to cart">
                <span className="text-dark-purple font-[600]" >Add To Cart</span>
            </button>
            <button className="border-dark-purple border ml-2 rounded-md px-1" aria-label="Wishlist button">
                <Image src={Heart} alt="Heart icon" />
            </button>
        </div>
        <button className="w-full bg-dark-purple py-3 mt-3 rounded-md" aria-label="Buy now button">
            <span className="text-white">Buy Now</span>
        </button>
    </div>
);

const ReviewList = ({ reviews }) => (
    <div className="mt-7">
        <p className="font-[700] text-xl">Customer Reviews</p>

        <ul>
            {reviews.map((review, index) => (
                <li key={index}>
                    <p className="font-[700]">{review.author}</p>
                    <p>{review.comment}</p>
                    <StarRating rating={review.rating} />
                </li>
            ))}
        </ul>
    </div>
);

function ProductPage(props) {
    const { reviews, name, averageRating, price, image, description, brand, category, customColors } = props.config;
    const [currentImage, setImage] = useState(image);
    const imageArray = ["https://picsum.photos/100", "https://picsum.photos/200", "https://picsum.photos/300", "https://picsum.photos/400", "https://picsum.photos/500"];

    function handleImageClick(imageUrl) {
        setImage(imageUrl);
    }

    return (
        <div className="md:flex lg:flex">
            <div className="wrap md:w-2/4 lg:w-2/4 md:ml-5 lg:ml-5 ml-0">
                <div className="productDisplay lg:flex md:flex flex flex-col-reverse md:flex-row lg:flex-row">
                    <ImageGallery imageArray={imageArray} handleImageClick={handleImageClick} currentImage={currentImage} />
                    <div className="mainImg flex w-full justify-center md:block lg:block">
                        <img src={currentImage} loading="eager" className="rounded-md md:ml-5 lg:ml-5 h-auto md:w-96 lg:w-96 w-96 sm:p-3 md:p-3 lg:p-3 ml-0 p-2" alt="Main product" />
                    </div>
                </div>
                <div className="description md:block lg:block hidden">
                    <h1>Description:</h1>
                    <p>{description}</p>
                </div>
            </div>
            <div className="md:w-5/12 lg:w-5/12 md:ml-10 lg:ml-10 p-5">
                <ProductDetails
                    name={name}
                    brand={brand}
                    category={category}
                    description={description}
                    averageRating={averageRating}
                    price={price}
                    producData={props.config}
                    customColors={customColors}
                />

                <ReviewList reviews={reviews} />
            </div>
        </div>
    );
}

export default ProductPage;

