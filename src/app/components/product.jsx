import { useEffect, useState } from "react";
function StarRating({ rating }) {
    return (
        <div>
            {"⭐".repeat(rating) + "☆".repeat(5 - rating)}
        </div>
    );
}
function ProductPage(props) {
    const { reviews, name, averageRating, price, image, description } = props.config;

    const [currentImage, setImage] = useState(image);

    function handleImageClick(imageUrl) {
        setImage(imageUrl)
        console.log(currentImage)
    }
    useEffect(() => {
        console.log(currentImage);
    }, [currentImage]);
    return (
        <div className="flex">
            <div className="wrap w-2/4 ml-5">
                <div className="productDisplay flex ">
                    <div className="flex flex-col justify-around h-96 overflow-scroll">
                        <div className="my-1"><img className="rounded-md cursor-pointer" src="https://picsum.photos/100" alt="" onClick={() => handleImageClick("https://picsum.photos/100")} /></div>
                        <div className="my-1"><img className="rounded-md cursor-pointer" src="https://picsum.photos/100" alt="" onClick={() => handleImageClick("https://picsum.photos/200")} /></div>
                        <div className="my-1"><img className="rounded-md cursor-pointer" src="https://picsum.photos/100" alt="" onClick={() => handleImageClick("https://picsum.photos/300")} /></div>
                        <div className="my-1"><img className="rounded-md cursor-pointer" src="https://picsum.photos/100" alt="" onClick={() => handleImageClick("https://picsum.photos/400")} /></div>
                        <div className="my-1"><img className="rounded-md cursor-pointer" src="https://picsum.photos/100" alt="" onClick={() => handleImageClick("https://picsum.photos/500")} /></div>
                    </div>
                    <div className="mainImg">
                        <img src={currentImage} loading="eager" className="rounded-md ml-5 h-auto w-96" alt="" srcset="" />
                    </div>
                </div>
                <div className="description">
                    <h1>Description:</h1>
                    <p>{description}</p>
                </div>
            </div>

            <div className="productDetails">
                <h1 className="font-[600] text-3xl text-wrap">{name} </h1>

                <div className="starring mt-5 flex">
                    <StarRating rating={Math.floor(averageRating)} />
                    <p className="ml-2">{averageRating}</p>
                </div>

                <div className="price text-2xl text-purple-900 font-[700] mt-5">
                    ${price}
                </div>

                <div className="colorPicker flex">
                    <div className="w-10 h-10  bg-slate-400"></div>
                    <div className="w-10 h-10 ml-1 bg-cyan-500"></div>
                </div>

                {/* <div>
                    <ul>
                        {reviews.map((review, index) => (
                            <li key={index}>
                                <p><strong>{review.author}</strong> rated it {review.rating} stars</p>
                                <p>{review.comment}</p>
                                <StarRating rating={review.rating} />
                            </li>
                        ))}
                    </ul>
                </div> */}
            </div>
        </div>
    )
}
export default ProductPage;