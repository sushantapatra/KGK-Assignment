"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import FooterWithSidebar from "../components/FooterWithSidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "next-client-cookies";
const Login = () => {
	const router = useRouter();
	const [input, setInput] = useState({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const cookies = useCookies();

	const handleInput = (e) => {
		const { name, value } = e.target;
		setInput((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const res = await axios.post(
				"http://localhost:8080/api/v1/user/login",
				input
			);
			if (res.data.success) {
				setInput({
					email: "",
					password: "",
				});
				cookies.set("token", res.data.token);
				router.push("/backend/posts");
				toast.success(res.data.message, {
					autoClose: 1000,
				});
			} else {
				toast.error(res.data.message, {
					autoClose: 1000,
				});
			}
		} catch (error) {
			console.log(error);
			toast.success(error.message);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div>
			<Header />
			<section className="h-screen bg-gray-50  bg-gray-200">
				<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
					<div className="flex flex-col justify-center">
						<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none dark:text-gray-900 md:text-5xl lg:text-6xl ">
							KGK Diamonds (I) Pvt. Ltd.
						</h1>
						<p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
							KGK Group began its journey in the gemstones
							business, laying the foundation htmlFor what would
							become a legacy. Fifty years ago, we ventured into
							diamonds, a move that has since grown into the
							largest vertical of KGK Group. We’ve evolved from
							purchasing our first stone to establishing the
							largest manufacturing presence in Africa and the
							most extensive networks of sales offices in the
							diamond industry.
						</p>
						{/* <a
							href="#"
							className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center"
						>
							Read more about our app
							<svg
								className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 10"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M1 5h12m0 0L9 1m4 4L9 9"
								/>
							</svg>
						</a> */}
					</div>
					<div>
						<div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
								Sign in to CRM
							</h2>
							<form
								className="mt-8 space-y-6"
								action="#"
								onSubmit={handleSubmit}
							>
								<div>
									<label
										htmlFor="email"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Email
									</label>
									<input
										type="email"
										name="email"
										value={input.email}
										onChange={handleInput}
										id="email"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="name@company.com"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="password"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Password
									</label>
									<input
										type="password"
										name="password"
										value={input.password}
										onChange={handleInput}
										id="password"
										placeholder="••••••••"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required
									/>
								</div>
								{/* <div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											id="remember"
											aria-describedby="remember"
											name="remember"
											type="checkbox"
											className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
											required
										/>
									</div>
									<div className="ms-3 text-sm">
										<label
											htmlFor="remember"
											className="font-medium text-gray-500 dark:text-gray-400"
										>
											Remember this device
										</label>
									</div>
									<a
										href="#"
										className="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
									>
										Lost Password?
									</a>
								</div> */}
								{loading ? (
									<button className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
										Please wait...
									</button>
								) : (
									<button
										type="submit"
										className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									>
										Login
									</button>
								)}

								<div className="text-sm font-medium text-gray-900 dark:text-white">
									Not registered yet?
									<Link
										href="/register"
										className="text-blue-600 hover:underline dark:text-blue-500"
									>
										Create account
									</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>

			<FooterWithSidebar />
		</div>
	);
};

export default Login;
