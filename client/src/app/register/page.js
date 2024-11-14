"use client";
import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import FooterWithSidebar from "../components/FooterWithSidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
const Register = () => {
	const router = useRouter();
	const [input, setInput] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);

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
				"http://localhost:8080/api/v1/user/register",
				input
			);
			if (res.data.success) {
				setInput({
					name: "",
					email: "",
					phone: "",
					password: "",
				});
				router.push("/login");
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

	return (
		<div>
			<Header />

			<section className="bg-gray-50 bg-gray-200">
				<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
					<div className="flex flex-col justify-center">
						<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none dark:text-gray-900 md:text-5xl lg:text-6xl">
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
								Sign up to CRM
							</h2>
							<form
								className="mt-8 space-y-6"
								action="#"
								onSubmit={handleSubmit}
							>
								<div>
									<label
										htmlFor="name"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Name
									</label>
									<input
										type="name"
										name="name"
										value={input.name}
										onChange={handleInput}
										id="name"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="enter your name"
										required
									/>
								</div>
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
										placeholder="enter your email"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="phone"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Phone
									</label>
									<input
										type="phone"
										name="phone"
										value={input.phone}
										onChange={handleInput}
										id="phone"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="enter your phone no"
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

								{loading ? (
									<button className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
										Please wait...
									</button>
								) : (
									<button
										type="submit"
										className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									>
										Register
									</button>
								)}

								<div className="text-sm font-medium text-gray-900 dark:text-white">
									Already have an account?
									<Link
										href="/login"
										className="text-blue-600 hover:underline dark:text-blue-500"
									>
										Login here
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

export default Register;
