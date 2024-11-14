import Script from "next/script";

const FooterWithSidebar = () => {
	return (
		<div>
			{/* Other content */}

			<footer className="border-t py-4">
				<p className="text-sm text-center">
					Copyright @ 2022{" "}
					<span className="font-semibold">EasyLearning</span> All
					Rights Reserved
				</p>
			</footer>

			{/* External or inline script */}
			<Script
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
            document.querySelector('#open_sidebar').addEventListener('click', function() {
              document.querySelector('#sidebar').classList.remove('-left-80');
              document.querySelector('#sidebar').classList.add('left-0');
              document.querySelector('#sidebar_wrapper').classList.remove('opacity-0');
              document.querySelector('#sidebar_wrapper').classList.remove('invisible');
            });

            document.body.addEventListener('click', function(e){
              if(e.target.id === 'sidebar_wrapper'){
                document.querySelector('#sidebar').classList.add('-left-80');
                document.querySelector('#sidebar').classList.remove('left-0');
                document.querySelector('#sidebar_wrapper').classList.add('opacity-0');
                document.querySelector('#sidebar_wrapper').classList.add('invisible');
              }
            });
          `,
				}}
			/>
		</div>
	);
};

export default FooterWithSidebar;
