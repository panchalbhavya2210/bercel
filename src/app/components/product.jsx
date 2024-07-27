"use client"
import Image from "next/image";
import Heart from "../../../public/heart.svg";
import { useState } from "react";

// Star rendering function
function StarRating({ rating }) {
    return (
        <div>
            {"⭐".repeat(rating) + "☆".repeat(5 - rating)}
        </div>
    );
}

const ImageGallery = ({ imageArray, handleImageClick, currentImage }) => (
    <div className="flex md:flex-col lg:flex-col justify-around md:h-96 lg:h-96 overflow-scroll">
        {imageArray.map((value) => (
            <div key={value} className="my-1 mx-3">
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

const ProductDetails = ({ name, brand, category, description, averageRating, price }) => (
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
        <ColorPicker />
        <CartButtons />
    </div>
);

const ColorPicker = () => (
    <div className="colorPicker mt-7">
        <div className="pText">Colors</div>
        <div className="flex">
            <button className="w-10 h-10 bg-[#f005] rounded-md"></button>
            <button className="w-10 h-10 ml-1 bg-[#f90] rounded-md"></button>
        </div>
    </div>
);

const CartButtons = () => (
    <div className="cartButtons mt-7">
        <div className="flex wishlist">
            <button className="w-11/12 bg-light-purple py-3 rounded-md">
                <span className="text-dark-purple font-[600]">Add To Cart</span>
            </button>
            <button className="border-dark-purple border ml-2 rounded-md px-1">
                <Image src={Heart} alt="Heart icon" />
            </button>
        </div>
        <button className="w-full bg-dark-purple py-3 mt-3 rounded-md">
            <span className="text-white">Buy Now</span>
        </button>
    </div>
);

const ReviewList = ({ reviews }) => (
    <div className="mt-7">
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
    const { reviews, name, averageRating, price, image, description, brand, category } = props.config;
    const [currentImage, setImage] = useState(image);
    const imageArray = ["https://picsum.photos/100", "https://picsum.photos/200", "https://picsum.photos/300", "https://picsum.photos/400", "https://picsum.photos/500"];

    function handleImageClick(imageUrl) {
        setImage(imageUrl);
    }

    return (
        <div className="md:flex lg:flex">
            <div className="wrap md:w-2/4 lg:w-2/4 ml-5">
                <div className="productDisplay lg:flex md:flex flex flex-col-reverse md:flex-row lg:flex-row">
                    <ImageGallery imageArray={imageArray} handleImageClick={handleImageClick} currentImage={currentImage} />
                    <div className="mainImg flex w-full justify-center md:block lg:block">
                        <img src={currentImage} loading="eager" className="rounded-md md:ml-5 lg:ml-5 h-auto md:w-96 lg:w-96 w-96 p-3" alt="Main product" />
                    </div>
                </div>
                <div className="description md:block lg:block hidden">
                    <h1>Description:</h1>
                    <p>{description}</p>
                </div>
            </div>
            <div className="md:w-5/12 lg:w-5/12 md:ml-10 lg:ml-10 p-5">
                <ProductDetails name={name} brand={brand} category={category} description={description} averageRating={averageRating} price={price} />
                <ReviewList reviews={reviews} />
            </div>
        </div>
    );
}

export default ProductPage;
