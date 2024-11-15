"use client";
import React, { useEffect, useState, useRef } from "react";
import Header from "@/app/components/backend/Header";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { BsFillPencilFill } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";
import { initFlowbite } from "flowbite";
import { Drawer } from "flowbite";

const ImageSlider = () => {
	const cookies = useCookies();
	const [imagesliders, setImagesliders] = useState([]);
	const [loading, setLoading] = useState(false);
	const [postLoading, setPostLoading] = useState(false);
	const [postId, setPostId] = useState(null);
	const [input, setInput] = useState("");

	//get Image Slider list data
	const getImageSlider = async () => {
		try {
			setLoading(true);
			//const token = cookies.get("token");
			const res = await axios.get(
				"http://localhost:8080/api/v1/imageslider/get-image-slider"
			);
			if (res.data.success) {
				setImagesliders(res.data.imagesliders);
			} else {
				setImagesliders([]);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleInput = (e) => {
		const uploadedFile = e.target.files[0];
		if (uploadedFile) {
			setInput(uploadedFile);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("image", input);

		const token = cookies.get("token");
		try {
			setLoading(true);
			const res = await axios.post(
				"http://localhost:8080/api/v1/imageslider/add-image-slider",
				formData
				// {
				// 	headers: {
				// 		Authorization: `Bearer ${token}`,
				// 	},
				// 	withCredentials: true,
				// }
			);
			if (res.data.success) {
				setInput("");
				setPostLoading(true);
				// document
				// 	.getElementById("drawer-right-image")
				// 	.classList.add("hidden");
				const $targetEl = document.getElementById("drawer-right-image");
				const options = {
					placement: "right",
					backdrop: true,
					bodyScrolling: false,
					edge: false,
					edgeOffset: "",
					backdropClasses:
						"bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30",
				};

				// instance options object
				const instanceOptions = {
					id: "drawer-right-image",
					override: true,
				};
				const drawer = new Drawer($targetEl, options, instanceOptions);
				drawer.hide();

				toast.success(res.data.message);
			} else {
				toast.error(res.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.success(error.message);
		} finally {
			setLoading(false);
		}
	};

	const postDelete = async (id) => {
		try {
			const token = cookies.get("token");
			const res = await axios.delete(
				"http://localhost:8080/api/v1/imageslider/delete-image-slider/" +
					id
				// {
				// 	headers: {
				// 		Authorization: `Bearer ${token}`,
				// 	},
				// 	withCredentials: true,
				// }
			);
			if (res.data.success) {
				toast.success(res.data.message);
				setPostLoading(true);
			} else {
				toast.error(res.data.message);
				setPostLoading(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getImageSlider();
	}, [postLoading]);

	useEffect(() => {
		// Initialize Flowbite components manually
		initFlowbite();
	}, []);

	return (
		<>
			<Header />
			{/* <Sidebar /> */}
			<div className="p-4 sm:ml-64">
				<div className="p-4 rounded-lg dark:border-gray-700 mt-14">
					<section>
						<div className="mx-auto max-w-screen-xl px-1 lg:px-1">
							{/* <!-- Start coding here --> */}

							<div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
								<div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
									<div className="w-full md:w-1/2">
										<form className="flex items-center">
											<label
												htmlFor="simple-search"
												className="sr-only"
											>
												Search
											</label>
											<div className="relative w-full">
												<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
													<svg
														aria-hidden="true"
														className="w-5 h-5 text-gray-500 dark:text-gray-400"
														fill="currentColor"
														viewBox="0 0 20 20"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															fillRule="evenodd"
															d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
															clipRule="evenodd"
														/>
													</svg>
												</div>
												<input
													type="text"
													id="simple-search"
													className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
													placeholder="Search"
													required=""
												/>
											</div>
										</form>
									</div>
									<div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
										<button
											type="button"
											className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
											data-drawer-target="drawer-right-image"
											data-drawer-show="drawer-right-image"
											data-drawer-placement="right"
											aria-controls="drawer-right-image"
										>
											<svg
												className="h-3.5 w-3.5 mr-2"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
												aria-hidden="true"
											>
												<path
													clipRule="evenodd"
													fillRule="evenodd"
													d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
												/>
											</svg>
											Add Image
										</button>
									</div>
								</div>
								<div className="overflow-x-auto">
									<table className="w-full table-fixed text-sm text-left text-gray-500 dark:text-gray-400">
										<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
											<tr>
												<th
													scope="col"
													className="px-4 py-3 w-1/6"
												>
													Image
												</th>

												<th
													scope="col"
													className="px-4 py-3 w-1/4"
												>
													<span className="sr-only">
														Actions
													</span>
												</th>
											</tr>
										</thead>
										<tbody>
											{imagesliders.length > 0 ? (
												imagesliders.map(
													(images, index) => (
														<tr
															className="border-b dark:border-gray-700"
															key={index}
														>
															<td className="px-4 py-3">
																<Image
																	src={
																		images.image
																	}
																	height={250}
																	width={250}
																	alt="image-slider"
																/>
															</td>

															<td className="px-4 py-3 flex items-center justify-end">
																<div className="inline-flex space-x-4 p-2 rounded-md shadow-sm">
																	<BsFillTrash3Fill
																		className="text-gray-600 hover:text-red-500 hover:scale-125 transition-transform duration-300 p-2 hover:cursor-pointer"
																		size={
																			28
																		}
																		onClick={() =>
																			postDelete(
																				images.img_id
																			)
																		}
																	/>
																</div>
															</td>
														</tr>
													)
												)
											) : (
												<tr>
													<td
														colSpan={5}
														className="text-center text-red-500 py-4"
													>
														No data found
													</td>
												</tr>
											)}
										</tbody>
									</table>
								</div>

								<nav
									className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
									aria-label="Table navigation"
								>
									<span className="text-sm font-normal text-gray-500 dark:text-gray-400">
										Showing &nbsp;
										<span className="font-semibold text-gray-900 dark:text-white">
											1-10
										</span>
										&nbsp; of &nbsp;
										<span className="font-semibold text-gray-900 dark:text-white">
											{imagesliders.length}
										</span>
									</span>
								</nav>
							</div>
						</div>
					</section>
					{/* Add Drawer */}
					<div
						id="drawer-right-image"
						className="fixed top-14 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white  w-1/3 dark:bg-gray-800"
						tabIndex="-1"
						aria-labelledby="drawer-right-label"
					>
						<h4
							id="drawer-right-label"
							className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
						>
							<svg
								className="w-4 h-4 me-2.5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
							</svg>
							Add Image
						</h4>
						<button
							type="button"
							data-drawer-hide="drawer-right-image"
							aria-controls="drawer-right-image"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
						>
							<svg
								className="w-3 h-3"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
								/>
							</svg>
							<span className="sr-only">Close menu</span>
						</button>
						<div>
							<form
								className="max-w-md mx-auto  h-screen"
								onSubmit={handleSubmit}
							>
								<div className="mb-5">
									<label
										htmlFor="image"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Image
									</label>
									<input
										className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
										id="image"
										type="file"
										name="image"
										onChange={handleInput}
										required
									/>
								</div>

								{loading ? (
									<button className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
										Please wait...
									</button>
								) : (
									<button
										type="submit"
										className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									>
										Submit
									</button>
								)}
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ImageSlider;
