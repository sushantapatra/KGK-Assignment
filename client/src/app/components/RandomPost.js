"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useCookies } from "next-client-cookies";

const RandomPost = ({ title }) => {
	const cookies = useCookies();
	const [posts, setPosts] = useState([]);
	const getRandomPosts = async () => {
		try {
			const token = cookies.get("token");
			const res = await axios.get(
				"http://localhost:8080/api/v1/post/random-posts",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					withCredentials: true,
				}
			);
			if (res.data.success) {
				setPosts(res.data.posts);
			} else {
				setPosts([]);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getRandomPosts();
	}, []);

	return (
		<div className="bg-white shadow-sm shadow-white rounded-xl p-4">
			<h3 className="text-xl font-semibold text-gray-700 font-roboto ">
				{title}
			</h3>

			<div className="mt-4">
				{posts.length > 0 ? (
					posts.map((post) => (
						<Link
							href={`/post/${post.id}`}
							className="flex group mt-4 "
							key={post.id}
						>
							{/* <div className="flex-shrink-0 ">
									<Image
										src={pic1}
										className="h-14 w-20 rounded object-cover hover:brightness-200 "
									/>
								</div> */}
							<div className="flex-grow pl-3 ">
								<h5 className="text-md leading-5 block font-roboto font-semibold transition group-hover:text-blue-500 ">
									{post.title}
								</h5>
								<div className="flex text-gray-400 text-sm items-center ">
									<span className="mr-1 text-xs">
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
						</Link>
					))
				) : (
					<div className="rounded-sm overflow-hidden bg-white shadow-sm ">
						<p className="text-gray-500 text-sm mt-2 p-4">
							Post not avaliable
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default RandomPost;
