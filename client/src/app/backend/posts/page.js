"use client";
import React, { useEffect, useState, useRef } from "react";
import Sidebar from "@/app/components/backend/Sidebar";
import Header from "@/app/components/backend/Header";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { initFlowbite } from "flowbite";
import { BsFillPencilFill } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
	ClassicEditor,
	Bold,
	Essentials,
	Heading,
	Indent,
	IndentBlock,
	Italic,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	Table,
	Undo,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
import { Drawer } from "flowbite";
import { useRouter } from "next/navigation";
import { truncateText } from "../../Utility";

const PostList = () => {
	const cookies = useCookies();
	const editorRef = useRef();
	const router = useRouter();
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [postLoading, setPostLoading] = useState(false);
	const [postId, setPostId] = useState(null);
	const [input, setInput] = useState({
		title: "",
		slug: "",
		content: "",
	});

	//get post list data
	const getPosts = async () => {
		try {
			setLoading(true);
			const token = cookies.get("token");
			const res = await axios.get(
				"http://localhost:8080/api/v1/post/get-user-posts",
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
		} finally {
			setLoading(false);
		}
	};

	function generateSlug(title) {
		return title
			.toLowerCase() // Convert to lowercase
			.trim() // Remove leading/trailing spaces
			.replace(/[^a-z0-9\s]/g, "") // Remove non-alphanumeric characters (except spaces)
			.replace(/\s+/g, "-") // Replace spaces with hyphens
			.replace(/-+/g, "-"); // Remove multiple hyphens
	}
	const handleInput = (e) => {
		const { name, value } = e.target;
		setInput((prev) => ({
			...prev,
			[name]: value,
		}));

		if (name == "title") {
			const slug = generateSlug(value);
			setInput((prev) => ({
				...prev,
				slug: slug,
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(input);
		const token = cookies.get("token");
		try {
			setLoading(true);
			const res = await axios.post(
				"http://localhost:8080/api/v1/post/add-post",
				input,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					withCredentials: true,
				}
			);
			if (res.data.success) {
				setInput({
					title: "",
					slug: "",
					content: "",
				});
				setPostLoading(true);
				document
					.getElementById("drawer-right-product")
					.classList.add("hidden");
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
	const getPostById = async (id) => {
		try {
			setLoading(true);
			const token = cookies.get("token");
			const res = await axios.get(
				"http://localhost:8080/api/v1/post/get-post/" + id,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					withCredentials: true,
				}
			);
			if (res.data.success) {
				//setPosts(res.data.posts);
				setInput((prev) => ({
					...prev,
					title: res.data.posts.title,
					slug: res.data.posts.slug,
					content: res.data.posts.content,
				}));
			} else {
				setInput({
					title: "",
					slug: "",
					content: "",
				});
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const openDrawer = (id) => {
		getPostById(id);
		setPostId(id);
		const $targetEl = document.getElementById("drawer-right-example2");
		const options = {
			placement: "right",
			backdrop: true,
			bodyScrolling: false,
			edge: false,
			edgeOffset: "",
			backdropClasses:
				"bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30",
			onHide: () => {
				console.log("drawer is hidden");
			},
			// onShow: () => {
			// 	console.log("drawer is shown");
			// },
			// onToggle: () => {
			// 	console.log("drawer has been toggled");
			// },
		};

		// instance options object
		const instanceOptions = {
			id: "drawer-right-example2",
			override: true,
		};
		const drawer = new Drawer($targetEl, options, instanceOptions);
		// if (drawer) {
		// 	const flowbiteDrawer = new window.Flowbite.Drawer(drawer);
		// 	flowbiteDrawer.show(); // Manually show the drawer
		// }

		drawer.show();
	};
	const closeDrawer = () => {
		const $targetEl = document.getElementById("drawer-right-example2");
		const options = {
			placement: "right",
			backdrop: true,
			bodyScrolling: false,
			edge: false,
			edgeOffset: "",
			backdropClasses:
				"bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30",
			// onHide: () => {
			// 	console.log("drawer is hidden");
			// },
			// onShow: () => {
			// 	console.log("drawer is shown");
			// },
			// onToggle: () => {
			// 	console.log("drawer has been toggled");
			// },
		};

		// instance options object
		const instanceOptions = {
			id: "drawer-right-example2",
			override: true,
		};
		const drawer = new Drawer($targetEl, options, instanceOptions);
		drawer.hide();
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		const token = cookies.get("token");
		try {
			setLoading(true);
			const res = await axios.post(
				"http://localhost:8080/api/v1/post/update-post/" + postId,
				input,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					withCredentials: true,
				}
			);
			if (res.data.success) {
				setInput({
					title: "",
					slug: "",
					content: "",
				});
				setPostId(null);
				setPostLoading(true);
				closeDrawer();
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
				"http://localhost:8080/api/v1/post/delete-post/" + id,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					withCredentials: true,
				}
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
	const postPreview = async (id) => {
		//getPostById(id);
		//router.push("/post/" + id);
		window.open(`/post/${id}`, "_blank");
	};
	useEffect(() => {
		getPosts();
	}, [postLoading]);
	useEffect(() => {
		// Initialize Flowbite components manually
		initFlowbite();
	}, []);

	useEffect(() => {
		if (input.content) {
			editorRef.current.editor.setData(input.content); // Dynamically set data
			//editorRef.current.setData(input.content);
		}
	}, [input.content]);
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
											data-drawer-target="drawer-right-product"
											data-drawer-show="drawer-right-product"
											data-drawer-placement="right"
											aria-controls="drawer-right-product"
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
											Add product
										</button>
									</div>
								</div>
								<div className="overflow-x-auto">
									<table className="w-full table-fixed text-sm text-left text-gray-500 dark:text-gray-400">
										<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
											<tr>
												<th
													scope="col"
													className="px-4 py-3 w-1/4 overflow-hidden text-ellipsis whitespace-nowrap"
												>
													Title
												</th>
												<th
													scope="col"
													className="px-4 py-3 w-1/4"
												>
													Slug
												</th>
												{/* <th
													scope="col"
													className="px-4 py-3 w-1/6"
												>
													Image
												</th> */}
												<th
													scope="col"
													className="px-4 py-3 w-1/2 overflow-hidden text-ellipsis whitespace-nowrap"
												>
													Content
												</th>
												<th
													scope="col"
													className="px-4 py-3 w-1/6"
												>
													Created Date
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
											{posts.length > 0 ? (
												posts.map((post) => (
													<tr
														className="border-b dark:border-gray-700"
														key={post.id}
													>
														<th
															scope="row"
															className="px-4 py-3 font-medium text-gray-900 dark:text-white overflow-hidden text-ellipsis whitespace-nowrap"
														>
															{post.title}
														</th>
														<td className="px-4 py-3 overflow-hidden text-ellipsis whitespace-nowrap">
															{post.slug}
														</td>
														{/* <td className="px-4 py-3">
															<Image
																src={post.image}
																height={50}
																width={50}
																alt={post.title}
															/>
														</td> */}
														<td className="px-4 py-3 overflow-hidden text-ellipsis whitespace-nowrap">
															<div
																dangerouslySetInnerHTML={{
																	__html: truncateText(
																		post.content,
																		10
																	),
																}}
															/>
														</td>
														<td className="px-4 py-3">
															{
																new Date(
																	post.created_at
																)
																	.toISOString()
																	.split(
																		"T"
																	)[0]
															}
														</td>
														<td className="px-4 py-3 flex items-center justify-end">
															<div className="inline-flex space-x-4 p-2 rounded-md shadow-sm">
																<BsFillPencilFill
																	className="text-gray-600 hover:text-blue-500 hover:scale-125 transition-transform duration-300 p-2 hover:cursor-pointer"
																	size={28}
																	onClick={() =>
																		openDrawer(
																			post.id
																		)
																	}
																	//data-drawer-target="drawer-right-example2"
																	// data-drawer-show="drawer-right-example2"
																	// data-drawer-placement="right"
																	// aria-controls="drawer-right-example2"
																/>
																<BsFillTrash3Fill
																	className="text-gray-600 hover:text-red-500 hover:scale-125 transition-transform duration-300 p-2 hover:cursor-pointer"
																	size={28}
																	onClick={() =>
																		postDelete(
																			post.id
																		)
																	}
																/>
																<BsEye
																	className="text-gray-600 hover:text-green-500 hover:scale-125 transition-transform duration-300 p-2 hover:cursor-pointer"
																	size={28}
																	onClick={() =>
																		postPreview(
																			post.id
																		)
																	}
																/>
															</div>
														</td>
													</tr>
												))
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
											{posts.length}
										</span>
									</span>
									{/* <ul className="inline-flex items-stretch -space-x-px">
										<li>
											<a
												href="#"
												className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
											>
												<span className="sr-only">
													Previous
												</span>
												<svg
													className="w-5 h-5"
													aria-hidden="true"
													fill="currentColor"
													viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fillRule="evenodd"
														d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
														clipRule="evenodd"
													/>
												</svg>
											</a>
										</li>
										<li>
											<a
												href="#"
												className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
											>
												1
											</a>
										</li>
										<li>
											<a
												href="#"
												className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
											>
												2
											</a>
										</li>
										<li>
											<a
												href="#"
												aria-current="page"
												className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
											>
												3
											</a>
										</li>
										<li>
											<a
												href="#"
												className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
											>
												...
											</a>
										</li>
										<li>
											<a
												href="#"
												className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
											>
												100
											</a>
										</li>
										<li>
											<a
												href="#"
												className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
											>
												<span className="sr-only">
													Next
												</span>
												<svg
													className="w-5 h-5"
													aria-hidden="true"
													fill="currentColor"
													viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fillRule="evenodd"
														d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
														clipRule="evenodd"
													/>
												</svg>
											</a>
										</li>
									</ul> */}
								</nav>
							</div>
						</div>
					</section>
					{/* Add Drawer */}
					<div
						id="drawer-right-product"
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
							Add Post
						</h4>
						<button
							type="button"
							data-drawer-hide="drawer-right-product"
							aria-controls="drawer-right-product"
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
										htmlFor="title"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Title
									</label>
									<input
										type="title"
										id="title"
										name="title"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="Enter title"
										required
										value={input.title}
										onChange={handleInput}
									/>
								</div>
								<div className="mb-5">
									<label
										htmlFor="slug"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Slug
									</label>
									<input
										type="text"
										id="slug"
										name="slug"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required
										placeholder="Enter slug"
										value={input.slug}
										onChange={handleInput}
									/>
								</div>
								<div className="mb-5">
									<label
										htmlFor="content"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Content
									</label>
									<CKEditor
										editor={ClassicEditor}
										config={{
											toolbar: [
												"undo",
												"redo",
												"|",
												"heading",
												"|",
												"bold",
												"italic",
												"|",
												"link",
												"insertTable",
												"mediaEmbed",
												"|",
												"bulletedList",
												"numberedList",
												"indent",
												"outdent",
											],
											placeholder:
												"Enter your content here...",
											plugins: [
												Bold,
												Essentials,
												Heading,
												Indent,
												IndentBlock,
												Italic,
												Link,
												List,
												MediaEmbed,
												Paragraph,
												Table,
												Undo,
											],
											// initialData:
											// 	"<h1>Hello from CKEditor 5!</h1>",
											height: "500px",
										}}
										name="content" // Set the name as 'content'
										value={input.content}
										onChange={(event, editor) => {
											const data = editor.getData();
											setInput((prev) => ({
												...prev,
												content: data, // Update content in state
											}));
											//console.log(data); // Handle the data change event here
										}}
									/>
								</div>
								{/* <div className="mb-5">
									<label
										htmlFor="image"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Image
									</label>
									<input
										classNAme="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
										id="image"
										type="file"
										name="image"
										required
									/>
								</div> */}

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
					{/* Edit Drawer */}
					<div
						id="drawer-right-example2"
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
							Edit Post
						</h4>
						<button
							type="button"
							data-drawer-hide="drawer-right-example2"
							aria-controls="drawer-right-example2"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
							onClick={() => closeDrawer()}
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
								onSubmit={handleUpdate}
							>
								<div className="mb-5">
									<label
										htmlFor="title"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Title
									</label>
									<input
										type="title"
										id="title"
										name="title"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="Enter title"
										required
										value={input.title}
										onChange={handleInput}
									/>
								</div>
								<div className="mb-5">
									<label
										htmlFor="slug"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Slug
									</label>
									<input
										type="text"
										id="slug"
										name="slug"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required
										placeholder="Enter slug"
										value={input.slug}
										onChange={handleInput}
									/>
								</div>
								<div className="mb-5">
									<label
										htmlFor="content"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Content
									</label>
									<CKEditor
										editor={ClassicEditor}
										config={{
											toolbar: [
												"undo",
												"redo",
												"|",
												"heading",
												"|",
												"bold",
												"italic",
												"|",
												"link",
												"insertTable",
												"mediaEmbed",
												"|",
												"bulletedList",
												"numberedList",
												"indent",
												"outdent",
											],
											placeholder:
												"Enter your content here...",
											plugins: [
												Bold,
												Essentials,
												Heading,
												Indent,
												IndentBlock,
												Italic,
												Link,
												List,
												MediaEmbed,
												Paragraph,
												Table,
												Undo,
											],
											// initialData:
											// 	"<h1>Hello from CKEditor 5!</h1>",
											height: "500px",
										}}
										name="content" // Set the name as 'content'
										// value={input.content}
										onChange={(event, editor) => {
											const data = editor.getData();
											setInput((prev) => ({
												...prev,
												content: data, // Update content in state
											}));
											console.log(data); // Handle the data change event here
										}}
										// onReady={(editor) => {
										// 	if (
										// 		input.content &&
										// 		!editor.isReadOnly
										// 	) {
										// 		editor.setData(input.content); // Only set if there's data and it's not read-only
										// 	}
										// }}
										ref={editorRef}
									/>
								</div>
								{/* <div className="mb-5">
									<label
										htmlFor="image"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Image
									</label>
									<input
										classNAme="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
										id="image"
										type="file"
										name="image"
										required
									/>
								</div> */}

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

export default PostList;
