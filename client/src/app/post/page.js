"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import FooterWithSidebar from "../components/FooterWithSidebar";
import Header from "../components/Header";
import RandomPost from "../components/RandomPost";
import axios from "axios";
import { useCookies } from "next-client-cookies";

import Image from "next/image";
import pic1 from "../../../assets/images/pic1.png";
import pic2 from "../../../assets/images/pic2.png";
import pic3 from "../../../assets/images/pic3.png";
import pic4 from "../../../assets/images/pic4.png";
import pic5 from "../../../assets/images/pic5.png";
import pic6 from "../../../assets/images/pic6.png";
import pic7 from "../../../assets/images/pic7.png";

function Post() {
	const cookies = useCookies();
	const [posts, setPosts] = useState([]);
	const [randomPosts, setRandomPosts] = useState([]);
	//get post list data
	const getPosts = async () => {
		try {
			const token = cookies.get("token");
			const res = await axios.get(
				"http://localhost:8080/api/v1/post/all-posts",
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
				setRandomPosts(res.data.posts);
			} else {
				setRandomPosts([]);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getPosts();
		getRandomPosts();
	}, []);
	return (
		<>
			<Header />
			<div className="py-4 bg-gray-200 ">
				<div className="container mx-auto px-4 flex flex-wrap lg:flex-nowrap ">
					{/* <div className="w-3/12 hidden xl:block ">
						<RandomPost title="Random Posts" />
					</div> */}
					<div className="xl:w-9/12 lg:w-9/12 w-full xl:ml-6 lg:mr-6 ">
						<div className="flex bg-white px-3 py-4 justify-between items-center rounded-sm ">
							<h5 className="text-base uppercase font-semibold font-roboto ">
								CRM Posts
							</h5>
						</div>

						{/* Main Posts Start */}
						{/* Start Blog Main Post */}

						{posts.length > 0 ? (
							posts.map((post) => (
								<div className="rounded-sm overflow-hidden bg-white shadow-sm ">
									<div className="p-4 pb-5 ">
										<Link href={`/post/${post.id}`}>
											<h2 className="block text-2xl font-semibold text-gray-700 hover:text-blue-500 transition font-roboto ">
												{post.title}
											</h2>
										</Link>

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
							))
						) : (
							<div className="rounded-sm overflow-hidden bg-white shadow-sm ">
								<p className="text-gray-500 text-sm mt-2 p-4">
									Post not avaliable
								</p>
							</div>
						)}
						{/* End Blog Main Post */}

						{/* Main Posts End */}
					</div>
					<div class="lg:w-3/12 w-full mt-8 lg:mt-0 ">
						<RandomPost title="Popular Posts" />
					</div>
				</div>
			</div>
			<FooterWithSidebar />
		</>
	);
}
export default Post;
