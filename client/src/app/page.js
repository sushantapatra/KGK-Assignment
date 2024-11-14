import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import FooterWithSidebar from "./components/FooterWithSidebar";
import RandomPost from "./components/RandomPost";

import pic1 from "../../assets/images/pic1.png";
import pic2 from "../../assets/images/pic2.png";
import pic3 from "../../assets/images/pic3.png";
import pic4 from "../../assets/images/pic4.png";
import pic5 from "../../assets/images/pic5.png";
import pic6 from "../../assets/images/pic6.png";
import pic7 from "../../assets/images/pic7.png";
export default function Home() {
	return (
		<>
			<Header />
			<div className="py-4 bg-gray-200 ">
				<div className="container mx-auto px-4 flex flex-wrap lg:flex-nowrap ">
					<div className="w-3/12 hidden xl:block ">
						<RandomPost title="Random Posts" />
					</div>
					<div className="xl:w-6/12 lg:w-9/12 w-full xl:ml-6 lg:mr-6 ">
						<div className="flex bg-white px-3 py-4 justify-between items-center rounded-sm ">
							<h5 className="text-base uppercase font-semibold font-roboto ">
								CRM Posts
							</h5>
							<a
								href="#"
								className="text-white py-1 px-3 rounded-xl uppercase text-sm bg-blue-500 border border-blue-500 hover:text-blue-500 hover:bg-transparent transition  "
							>
								See More
							</a>
						</div>

						{/* Main Posts Start */}
						{/* Start Blog Main Post */}
						<div className="rounded-sm overflow-hidden bg-white shadow-sm ">
							<Link
								href="/post/1"
								className="block rounded-md overflow-hidden "
							>
								<Image
									src={pic6}
									className="w-full h-96 object-cover transhtmlForm hover:scale-110 transition duration-500 "
								/>
							</Link>

							<div className="p-4 pb-5 ">
								<Link href="/post/1">
									<h2 className="block text-2xl font-semibold text-gray-700 hover:text-blue-500 transition font-roboto ">
										Lorem, ipsum dolor sit amet consectetur
										adipisicing elit. Iddo loremque,
									</h2>
								</Link>

								<p className="text-gray-500 text-sm mt-2 ">
									Lorem ipsum dolor sit amet, consectetur
									adipisicing elit. Autem distinctio
									doloremque placeat ipsa! Sequi, recusandae.
									In numquam similique molestiae error, magni
									velit suscipit repudiandae itaqu....
								</p>
								<div className="mt-3 flex space-x-4 ">
									<div className="flex text-gray-400 text-sm items-center ">
										<span className="mr-2 text-xs">
											<i className="far fa-user"></i>
										</span>
										Blogiing Tips
									</div>

									<div className="flex text-gray-400 text-sm items-center ">
										<span className="mr-2 text-xs">
											<i className="far fa-clock"></i>
										</span>
										July 15, 2022
									</div>
								</div>
							</div>
						</div>
						{/* End Blog Main Post */}
						{/* Start All Post */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 ">
							<div className="rounded-xl bg-white p-4 pb-5 shadow-sm ">
								<Link
									href="/post/1"
									className="block rounded-md overflow-hidden "
								>
									<Image
										src={pic5}
										className="w-full h-60 object-cover transhtmlForm hover:scale-110 transition duration-500 "
									/>
								</Link>
								<div className="mt-3">
									<Link href="/post/1">
										<h2 className="block text-xl font-semibold text-gray-700 hover:text-blue-500 transition font-roboto ">
											Lorem, ipsum dolor sit amet
											consectetur adipisicing elit.
										</h2>
									</Link>

									<div className="mt-3 flex space-x-4 ">
										<div className="flex text-gray-400 text-sm items-center ">
											<span className="mr-2 text-xs">
												<i className="far fa-user"></i>
											</span>
											Blogiing Tips
										</div>

										<div className="flex text-gray-400 text-sm items-center ">
											<span className="mr-2 text-xs">
												<i className="far fa-clock"></i>
											</span>
											July 15, 2022
										</div>
									</div>
								</div>
							</div>

							<div className="rounded-xl bg-white p-4 pb-5 shadow-sm ">
								<Link
									href="/post/1"
									className="block rounded-md overflow-hidden "
								>
									<Image
										src={pic1}
										className="w-full h-60 object-cover transhtmlForm hover:scale-110 transition duration-500 "
									/>
								</Link>
								<div className="mt-3">
									<Link href="/post/1">
										<h2 className="block text-xl font-semibold text-gray-700 hover:text-blue-500 transition font-roboto ">
											Lorem, ipsum dolor sit amet
											consectetur adipisicing elit.
										</h2>
									</Link>

									<div className="mt-3 flex space-x-4 ">
										<div className="flex text-gray-400 text-sm items-center ">
											<span className="mr-2 text-xs">
												<i className="far fa-user"></i>
											</span>
											Blogiing Tips
										</div>

										<div className="flex text-gray-400 text-sm items-center ">
											<span className="mr-2 text-xs">
												<i className="far fa-clock"></i>
											</span>
											July 15, 2022
										</div>
									</div>
								</div>
							</div>

							<div className="rounded-xl bg-white p-4 pb-5 shadow-sm ">
								<Link
									href="/post/1"
									className="block rounded-md overflow-hidden "
								>
									<Image
										src={pic2}
										className="w-full h-60 object-cover transhtmlForm hover:scale-110 transition duration-500 "
									/>
								</Link>
								<div className="mt-3">
									<Link href="/post/1">
										<h2 className="block text-xl font-semibold text-gray-700 hover:text-blue-500 transition font-roboto ">
											Lorem, ipsum dolor sit amet
											consectetur adipisicing elit.
										</h2>
									</Link>

									<div className="mt-3 flex space-x-4 ">
										<div className="flex text-gray-400 text-sm items-center ">
											<span className="mr-2 text-xs">
												<i className="far fa-user"></i>
											</span>
											Blogiing Tips
										</div>

										<div className="flex text-gray-400 text-sm items-center ">
											<span className="mr-2 text-xs">
												<i className="far fa-clock"></i>
											</span>
											July 15, 2022
										</div>
									</div>
								</div>
							</div>

							<div className="rounded-xl bg-white p-4 pb-5 shadow-sm ">
								<Link
									href="/post/1"
									className="block rounded-md overflow-hidden "
								>
									<Image
										src={pic3}
										className="w-full h-60 object-cover transhtmlForm hover:scale-110 transition duration-500 "
									/>
								</Link>
								<div className="mt-3">
									<Link href="/post/1">
										<h2 className="block text-xl font-semibold text-gray-700 hover:text-blue-500 transition font-roboto ">
											Lorem, ipsum dolor sit amet
											consectetur adipisicing elit.
										</h2>
									</Link>

									<div className="mt-3 flex space-x-4 ">
										<div className="flex text-gray-400 text-sm items-center ">
											<span className="mr-2 text-xs">
												<i className="far fa-user"></i>
											</span>
											Blogiing Tips
										</div>

										<div className="flex text-gray-400 text-sm items-center ">
											<span className="mr-2 text-xs">
												<i className="far fa-clock"></i>
											</span>
											July 15, 2022
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* End All Post */}

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
