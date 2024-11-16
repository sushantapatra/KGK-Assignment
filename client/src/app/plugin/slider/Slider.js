"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

// import pic1 from "../../../../assets/images/pic1.png";
// import pic2 from "../../../../assets/images/pic2.png";
// import pic3 from "../../../../assets/images/pic3.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
// const images = [
// 	{
// 		src: pic1,
// 	},
// 	{
// 		src: pic2,
// 	},
// 	{
// 		src: pic3,
// 	},
// ];
const Slider = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const [imgSlides, setImgSlides] = useState([]);

	const getImageSlideData = async () => {
		try {
			const res = await axios.get(
				"http://localhost:8080/api/v1/imageslider/get-image-slider"
			);
			if (res.data.success) {
				const images = res.data.imagesliders.map((item) => ({
					src: item.image,
				}));
				// console.log(images[currentIndex].src);
				setImgSlides(images);
			} else {
				setImgSlides([]);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getImageSlideData();
	}, []);

	const prevSlide = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + imgSlides.length) % imgSlides.length
		);
	};
	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % imgSlides.length);
	};

	useEffect(() => {
		// Start interval for automatic slide change if not hovered
		if (!isHovered) {
			const interval = setInterval(() => {
				nextSlide();
			}, 3000);

			// Cleanup the interval on component unmount
			return () => {
				clearInterval(interval);
			};
		}
	}, [isHovered]);

	// Handle mouse over event
	const handleMouseOver = () => {
		setIsHovered(true);
	};

	// Handle mouse leave event
	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<>
			{imgSlides && imgSlides.length > 0 && (
				<div className="bg-white shadow-sm shadow-white rounded-xl p-4 mt-4">
					<h3 className="text-xl font-semibold text-gray-700 font-roboto ">
						Image Slider
					</h3>
					<div className="relative w-full mx-auto mt-4">
						<div
							className="relative h-[260px] mx-12 group hover:-translate-y-2"
							onMouseOver={handleMouseOver}
							onMouseLeave={handleMouseLeave}
						>
							{imgSlides && imgSlides[currentIndex] && (
								<Image
									src={imgSlides[currentIndex].src}
									alt={`Slider Image ${currentIndex + 1}`}
									layout="fill"
									objectFit="cover"
									className="rounded-xl transition-all duration-500 ease-in-out cursor-pointer"
									priority
								/>
							)}
						</div>
						<button
							className="absolute left-0 top-1/2 transform h-[260px] rounded-xl hover:bg-[#1a222f] mx-1 -mt-[10px] -translate-y-1/2 bg-[#111927] text-white p-2 group"
							onClick={prevSlide}
						>
							<ChevronLeft className="text-gray-400 group-hover:text-white" />
						</button>
						<button
							className="absolute right-0 top-1/2 transform h-[260px] rounded-xl hover:bg-[#1a222f] mx-1 -mt-[10px] -translate-y-1/2 bg-[#111927] text-white p-2 group"
							onClick={nextSlide}
						>
							<ChevronRight className="text-gray-400 group-hover:text-white" />
						</button>
						<div className="flex justify-center mt-4">
							{imgSlides.map((_, index) => (
								<div
									key={index}
									className={`h-1 w-10 mx-1 ${
										index === currentIndex
											? "bg-[#beff46] rounded-xl"
											: "bg-gray-300 rounded-xl"
									} transition-all duration-500 ease-in-out`}
								></div>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Slider;
