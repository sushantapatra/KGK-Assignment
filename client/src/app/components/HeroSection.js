import React from "react";
import commonStyls from "@/app/styles/common.module.css";
import heroStyles from "@/app/styles/herosection.module.css";
import Link from "next/link";
import Image from "next/image";
import { Inter, Mulish } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const mulish = Mulish({
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
	display: "swap",
});
import aboutImage from "/public/about1.svg";

const HeroSection = ({ title, imageUrl }) => {
	return (
		<main className={heroStyles.main}>
			<div className={commonStyls.container}>
				<div className={commonStyls.grid_two_section}>
					<div className={heroStyles.hero_content}>
						<h1>{title}</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Incidunt facere veritatis cumque recusandae
							voluptatem repellendus neque sunt obcaecati
							aspernatur, et ratione eaque, voluptatum quos labore
							animi non odio autem. Modi!
						</p>
						<Link href="/movie">
							<button className={mulish.className}>
								Explore Movies
							</button>
						</Link>
					</div>
					<div className={heroStyles.hero_image}>
						<Image
							src={imageUrl}
							alt="watching netflix"
							width={500}
							height={500}
						/>
					</div>
				</div>
			</div>
		</main>
	);
};

export default HeroSection;
