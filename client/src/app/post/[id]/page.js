"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import Header from "@/app/components/Header";
import FooterWithSidebar from "@/app/components/FooterWithSidebar";
import axios from "axios";

import RandomPost from "@/app/components/RandomPost";
const PostDetails = () => {
	const { id } = useParams();

	const [post, setPost] = useState({});
	const getPostById = async (postid) => {
		try {
			const res = await axios.get(
				"http://localhost:8080/api/v1/post/get-post-data/" + postid
			);
			if (res.data.success) {
				setPost(res.data.posts);
			} else {
				setPost([]);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		if (id) {
			getPostById(id);
		}
	}, []);
	return (
		<>
			<Header />
			<div className="py-12 bg-gray-200 ">
				<div className="container mx-auto px-4 flex ">
					<div className="xl:w-9/12 lg:w-9/12 w-full xl:ml-6 lg:mr-6 ">
						<div className="flex bg-white px-3 py-4 justify-between items-center rounded-sm ">
							<h5 className="text-base uppercase font-semibold font-roboto ">
								BUSINESS
							</h5>
							<a
								href="#"
								className="text-white py-1 px-3 rounded-xl uppercase text-sm bg-blue-500 border border-blue-500 hover:text-blue-500 hover:bg-transparent transition  "
							>
								See More
							</a>
						</div>

						<div className="rounded-sm overflow-hidden bg-white shadow-sm ">
							{/* <a
								href="#"
								className="block rounded-md overflow-hidden "
							>
								<Image
									src={pic6}
									className="w-full h-96 object-cover transhtmlForm hover:scale-110 transition duration-500 "
								/>
							</a> */}

							<div className="p-4 pb-5 ">
								<a href="#">
									<h2 className="block text-2xl font-semibold text-gray-700 hover:text-blue-500 transition font-roboto ">
										{post.title}
									</h2>
								</a>

								<div
									className="text-gray-500 text-sm mt-2 "
									dangerouslySetInnerHTML={{
										__html: post.content,
									}}
								/>

								<div className="mt-3 flex space-x-4 ">
									<div className="flex text-gray-400 text-sm items-center ">
										<span className="mr-2 text-xs">
											<i className="far fa-user"></i>
										</span>
										{post.name}
									</div>

									<div className="flex text-gray-400 text-sm items-center ">
										<span className="mr-2 text-xs">
											<i className="far fa-clock"></i>
										</span>
										{new Date(
											post.created_at
										).toLocaleDateString("en-US", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="lg:w-3/12 w-full mt-8 lg:mt-0 ">
						<RandomPost title="Popular Posts" />
					</div>
				</div>
			</div>

			<FooterWithSidebar />
		</>
	);
};

export default PostDetails;
