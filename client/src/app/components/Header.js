import React from "react";
import Image from "next/image";
import Link from "next/link";
import easyshop from "../../../assets/images/easyshop.png";

const Header = () => {
	return (
		<div>
			<nav className="bg-slate-300 shadow-sm shadow-slate-300 ">
				<div className="container mx-auto px-4 py-3 flex items-center ">
					<a href="#">
						{/* <img src={easyshop} alt="Company Logo" /> */}
						{/* <Image src={easyshop} alt="Company Logo" /> */}
						<h1>KGK-CRM</h1>
					</a>

					{/* <div className="ml-12 lg:flex space-x-5 hidden ">
						<Link
							href="/"
							className="flex items-center font-semibold text-md hover:text-blue-700 transition "
						>
							<span className="mr-2">
								<i className="fas fa-home"></i>
							</span>
							Home
						</Link>
					</div> */}

					<div className="ml-12 lg:flex space-x-5 hidden ">
						<Link
							href="/post"
							className="flex items-center font-semibold text-md hover:text-blue-700 transition "
						>
							<span className="mr-2">
								<i className="fas fa-file-alt"></i>
							</span>
							Post
						</Link>
					</div>

					{/* <div className="ml-12 lg:flex space-x-5 hidden ">
						<a
							href="#"
							className="flex items-center font-semibold text-md hover:text-blue-700 transition "
						>
							<span className="mr-2">
								<i className="fas fa-phone"></i>
							</span>
							Contact
						</a>
					</div> */}

					<div className="relative ml-auto hidden lg:block ">
						<span className="absolute left-3 top-2 text-sm text-gray-600 ">
							<i className="fas fa-search"></i>
						</span>
						<input
							type="text"
							placeholder="Search..."
							className="block w-full rounded-3xl pl-11 pr-2 py-2 focus:outline-none bg-gray-200 text-sm text-gray-600 shadow-sm shadow-slate-300 "
						/>
					</div>

					<div className="ml-5">
						<Link
							href="/login"
							className="flex items-center font-semibold text-md text-gray-900 hover:text-blue-700 transition"
						>
							<span className="mr-2">
								<i className="far fa-user"></i>
							</span>
							Login
						</Link>
					</div>

					<div
						className="text-xl text-gray-700 cursor-pointer ml-4 xl:hidden block hover:text-blue-700 transition "
						id="open_sidebar"
					>
						<i className="fas fa-bars "></i>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Header;
