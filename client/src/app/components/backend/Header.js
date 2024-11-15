"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsFillGearFill } from "react-icons/bs";
import { toast } from "react-toastify";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { initFlowbite } from "flowbite";
const TopHeader = () => {
	const cookies = useCookies();
	const router = useRouter();
	const [plugins, setPlugins] = useState([]);
	const [selectedPlugin, setSelectedPlugin] = useState([]);
	const [runApi, setRunApi] = useState(false);
	const [pluginMenuNames, setPluginMenuNames] = useState([]);

	//Showing Plugin to user
	const getPlugin = async () => {
		try {
			const res = await axios.get(
				"http://localhost:8080/api/v1/plugin/get-plugin"
			);
			if (res.data.success) {
				setPlugins(res.data.plugins);
			} else {
				setPlugins([]);
			}
		} catch (error) {
			console.log(error);
		}
	};
	//user wise active plugin to selected data
	const getPluginByUser = async () => {
		try {
			const token = cookies.get("token");
			const res = await axios.get(
				"http://localhost:8080/api/v1/plugin/get-active-plugin",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					withCredentials: true,
				}
			);
			if (res.data.success) {
				const plugins = JSON.parse(res.data.plugins[0].plugins);
				setSelectedPlugin(plugins);
				setActivePlugin(plugins);
			} else {
				setActivePlugin([]);
			}
		} catch (error) {
			console.log(error);
		}
	};
	// Handle checkbox change
	const handleCheckboxChange = async (e) => {
		const { value, checked } = e.target;

		setSelectedPlugin((prevSelected) => {
			const valueInt = parseInt(value); // Convert value to integer

			// If checked, add to the array
			if (checked && !prevSelected.includes(valueInt)) {
				return [...prevSelected, valueInt];
			}

			// If unchecked, remove from the array
			return prevSelected.filter((pluginId) => pluginId !== valueInt);
		});
		setRunApi(true);
	};

	// Handle form submission
	const handleSubmit = async (data) => {
		try {
			const token = cookies.get("token");
			const res = await axios.post(
				"http://localhost:8080/api/v1/plugin/active-plugin",
				{ plugins: data },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					withCredentials: true,
				}
			);
			if (res.data.success) {
				setRunApi(false);
				//getPluginByUser();
				// setSelectedPlugin([]);
				// document
				// 	.getElementById("drawer-right-setting")
				// 	.classList.add("hidden");
				// toast.success(res.data.message);
			} else {
				//toast.error(res.data.message);
			}
			//console.log("Languages updated:", updatedLanguages);
		} catch (error) {
			console.error("Error saving languages:", error);
		}
	};

	const logout = async () => {
		try {
			const res = await axios.get(
				"http://localhost:8080/api/v1/user/logout"
			);
			if (res.data.success) {
				cookies.remove("token");
				router.push("/login");
				//toast.success(res.data.message);
			} else {
				toast.error(res.data.message, {
					autoClose: 1000,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	//show plugin wise menu
	const getPluginMenuName = async () => {
		try {
			const token = cookies.get("token");
			const res = await axios.get(
				"http://localhost:8080/api/v1/plugin/get-active-plugin-name",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					withCredentials: true,
				}
			);
			if (res.data.success) {
				console.log(res.data.plugins);
				setPluginMenuNames(res.data.plugins);
			} else {
				setPluginMenuNames([]);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getPlugin();
		getPluginByUser();
		getPluginMenuName();
	}, []);
	useEffect(() => {
		if (runApi) {
			handleSubmit(selectedPlugin);
			getPluginByUser();
			getPluginMenuName();
		}
	}, [runApi]);

	useEffect(() => {
		// Initialize Flowbite components manually
		initFlowbite();
	}, []);
	return (
		<>
			<nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
				<div className="px-3 py-3 lg:px-5 lg:pl-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center justify-start rtl:justify-end">
							<button
								data-drawer-target="logo-sidebar"
								data-drawer-toggle="logo-sidebar"
								aria-controls="logo-sidebar"
								type="button"
								className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							>
								<span className="sr-only">Open sidebar</span>
								<svg
									className="w-6 h-6"
									aria-hidden="true"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										clipRule="evenodd"
										fillRule="evenodd"
										d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
									></path>
								</svg>
							</button>
							<a href="#" className="flex ms-2 md:me-24">
								<Image
									src="https://flowbite.com/docs/images/logo.svg"
									className="h-8 me-3"
									alt="FlowBite Logo"
									width={50}
									height={50}
								/>
								<span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
									KGK-CRM
								</span>
							</a>
						</div>
						<div className="flex items-center">
							<div className="flex items-center ms-3">
								<div>
									<button
										type="button"
										className="flex text-sm bg-gray-200 rounded-full focus:ring-4 focus:ring-gray-300"
										aria-expanded="false"
										// data-dropdown-toggle="dropdown-user"
										data-drawer-target="drawer-right-setting"
										data-drawer-show="drawer-right-setting"
										data-drawer-placement="right"
										aria-controls="drawer-right-setting"
									>
										<span className="sr-only">
											Open user menu
										</span>
										{/* <Image
											className="w-8 h-8 rounded-full"
											src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
											alt="user photo"
											width={50}
											height={50}
										/> */}
										<BsFillGearFill className="h-8 w-8" />
									</button>
								</div>
								<div
									className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
									id="dropdown-user"
								>
									<div className="px-4 py-3" role="none">
										<p
											className="text-sm text-gray-900 dark:text-white"
											role="none"
										>
											Neil Sims
										</p>
										<p
											className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
											role="none"
										>
											neil.sims@flowbite.com
										</p>
									</div>
									<ul className="py-1" role="none">
										<li>
											<a
												href="#"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
												role="menuitem"
											>
												Dashboard
											</a>
										</li>
										<li>
											<a
												href="#"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
												role="menuitem"
											>
												Settings
											</a>
										</li>
										<li>
											<a
												href="#"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
												role="menuitem"
											>
												Earnings
											</a>
										</li>
										<li>
											<a
												href="#"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
												role="menuitem"
											>
												Sign out
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

					{/* Dwawer */}
					<div
						id="drawer-right-setting"
						className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800"
						tabIndex="-1"
						aria-labelledby="drawer-right-label"
					>
						<h3
							id="drawer-right-label"
							className="text-3xl inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
						>
							<BsFillGearFill className="w-4 h-4 me-2.5" />
							Settings
						</h3>
						<button
							type="button"
							data-drawer-hide="drawer-right-setting"
							aria-controls="drawer-right-setting"
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
						<div className="p-2">
							<h6 className="font-bold dark:text-white mb-2">
								Plugin
							</h6>
							{plugins.map((plugin) => (
								<div key={plugin.plugin_id}>
									<hr />
									<label className="inline-flex items-center mb-4 mt-4 cursor-pointer">
										<span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 w-48">
											{plugin.plugin_name}
										</span>
										<input
											type="checkbox"
											value={plugin.plugin_id}
											className="sr-only peer"
											onChange={handleCheckboxChange}
											checked={selectedPlugin.includes(
												plugin.plugin_id
											)}
										/>
										<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
									</label>
								</div>
							))}
						</div>
					</div>
				</div>
			</nav>
			<aside
				id="logo-sidebar"
				className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transhtmlForm -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
				aria-label="Sidebar"
			>
				<div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
					<ul className="space-y-2 font-medium">
						<li>
							<Link
								href="/backend/dashboard"
								className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
							>
								<svg
									className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 22 21"
								>
									<path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
									<path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
								</svg>
								<span className="ms-3">Dashboard</span>
							</Link>
						</li>
						<li>
							<Link
								href="/backend/posts"
								className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
							>
								<svg
									className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 18 18"
								>
									<path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
								</svg>
								<span className="flex-1 ms-3 whitespace-nowrap">
									Post
								</span>
							</Link>
						</li>
						{pluginMenuNames.length > 0 &&
							pluginMenuNames.map((pluginMenuName) => (
								<li key={pluginMenuName.plugin_id}>
									<Link
										href={pluginMenuName.menu_route}
										className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
									>
										<svg
											className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 18 18"
										>
											<path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
										</svg>
										<span className="flex-1 ms-3 whitespace-nowrap">
											{pluginMenuName.menu_name}
										</span>
									</Link>
								</li>
							))}

						<li>
							<Link
								href="#"
								onClick={() => logout()}
								className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
							>
								<svg
									className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 18 16"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
									/>
								</svg>
								<span className="flex-1 ms-3 whitespace-nowrap">
									Sign Out
								</span>
							</Link>
						</li>
						{/* <li>
							<button
								type="button"
								className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
								aria-controls="dropdown-example"
								data-collapse-toggle="dropdown-example"
							>
								<svg
									className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 18 21"
								>
									<path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
								</svg>
								<span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
									E-commerce
								</span>
								<svg
									className="w-3 h-3"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 10 6"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="m1 1 4 4 4-4"
									/>
								</svg>
							</button>
							<ul
								id="dropdown-example"
								className="hidden py-2 space-y-2"
							>
								<li>
									<a
										href="#"
										className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
									>
										Products
									</a>
								</li>
								<li>
									<a
										href="#"
										className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
									>
										Billing
									</a>
								</li>
								<li>
									<a
										href="#"
										className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
									>
										Invoice
									</a>
								</li>
							</ul>
						</li> */}
					</ul>
				</div>
			</aside>
		</>
	);
};

export default TopHeader;
