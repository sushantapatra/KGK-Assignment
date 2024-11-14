import React from "react";
import Script from "next/script";
const Footer = () => {
	return (
		<div>
			<footer class="w-full bg-white text-right p-4">
				Built by{" "}
				<a
					target="_blank"
					href="https://davidgrzyb.com"
					class="underline"
				>
					David Grzyb
				</a>
				.
			</footer>

			{/* External or inline script */}
			<Script
				src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"
				defer
				strategy="behtmlForeInteractive"
			/>
			<Script
				src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/js/all.min.js"
				integrity="sha256-KzZiKy0DWYsnwMF+X1DvQngQ2/FxF7MF3Ff72XcpuPs="
				crossOrigin="anonymous"
				defer
				strategy="afterInteractive"
			/>
		</div>
	);
};

export default Footer;
