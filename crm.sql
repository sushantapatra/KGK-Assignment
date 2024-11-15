-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 15, 2024 at 03:30 PM
-- Server version: 8.3.0
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crm`
--

-- --------------------------------------------------------

--
-- Table structure for table `imageslider`
--

DROP TABLE IF EXISTS `imageslider`;
CREATE TABLE IF NOT EXISTS `imageslider` (
  `img_id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1-Active,0-Inactive',
  PRIMARY KEY (`img_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `imageslider`
--

INSERT INTO `imageslider` (`img_id`, `image`, `status`) VALUES
(1, 'https://res.cloudinary.com/ddw12zb61/image/upload/v1731484360/cwau8o6vbnsj2zrzkb5b.jpg', 1),
(2, 'https://res.cloudinary.com/ddw12zb61/image/upload/v1731484360/cwau8o6vbnsj2zrzkb5b.jpg', 1),
(3, 'https://res.cloudinary.com/ddw12zb61/image/upload/v1731662915/ufkg6dbfjfamx5w1jyua.jpg', 1),
(4, 'https://res.cloudinary.com/ddw12zb61/image/upload/v1731662986/ueoz9gksexiow9e7kuvd.jpg', 1),
(5, 'https://res.cloudinary.com/ddw12zb61/image/upload/v1731663077/iezhjari3b7frn71wphy.jpg', 1),
(6, 'https://res.cloudinary.com/ddw12zb61/image/upload/v1731663190/ga9xumbz3iom1ahbyvgj.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `plugins`
--

DROP TABLE IF EXISTS `plugins`;
CREATE TABLE IF NOT EXISTS `plugins` (
  `plugin_id` int NOT NULL AUTO_INCREMENT,
  `plugin_name` varchar(100) NOT NULL,
  `menu_name` varchar(100) NOT NULL,
  `menu_route` varchar(100) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1-Active,0-Inactive',
  PRIMARY KEY (`plugin_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `plugins`
--

INSERT INTO `plugins` (`plugin_id`, `plugin_name`, `menu_name`, `menu_route`, `status`) VALUES
(1, 'Image Sliders', 'Image Slider', 'imageslider', 1),
(2, 'Custom Forms', 'Custom Form', 'customforms', 0),
(3, 'Video Embeds', 'Video Embed', 'videoembeds', 0);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0-Inactive,1-Active,2-Deleted',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `title`, `slug`, `content`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'this is tile', 'this-is-title', '<p><strong>KGK Group</strong> began its journey in the gemstones business, laying the foundation htmlFor what would become a legacy. Fifty years ago, we ventured into diamonds, a move that has since grown into the largest vertical of KGK Group. We’ve evolved from purchasing our first stone to establishing the largest manufacturing presence in Africa and the most extensive networks of sales offices in the diamond industry.</p>', 'https://res.cloudinary.com/ddw12zb61/image/upload/v1731484360/cwau8o6vbnsj2zrzkb5b.jpg', 1, '2024-11-13 13:23:03', '2024-11-14 21:54:54'),
(2, 1, 'Cookies are a fundamental aspect of web development', 'this-is-title2', 'Cookies are a fundamental aspect of web development. You can use them for a wide array of tasks, from user authentication and session management to tracking user preferences and storing temporary data.\n\nAs Next.js has grown in complexity, it means there are a number of different ways to use cookies, each with their own caveats. You can read them in server components in the App Router, but you can’t modify them. You can set them in getServerSideProps using the Pages Router and make them HttpOnly so they can’t be read from Javascript. You can use middleware to set them, but, currently, you can’t easily forward them from your middleware to your downstream routes.\n\nIt can be a lot, but in this guide, we’ll walk through all the different ways to use cookies in <b>Next.js</b>.', 'https://res.cloudinary.com/ddw12zb61/image/upload/v1731485443/k7tdouseebldbobfvhqa.jpg', 1, '2024-11-13 13:41:06', '2024-11-13 14:14:17'),
(3, 1, 'Set cursor to specific position in CKEditor', 'set-cursor-to-specific-position-in-ckeditor', '<p style=\"margin-left:0px;\">The basic way of setting selection is by <a href=\"http://docs.ckeditor.com/#!/api/CKEDITOR.editor-method-createRange\">creating</a> a <a href=\"http://docs.ckeditor.com/#!/api/CKEDITOR.dom.range\">Range</a>, setting its position and <a href=\"http://docs.ckeditor.com/#!/api/CKEDITOR.dom.selection-method-selectRanges\">selecting</a> it.</p><p style=\"margin-left:0px;\"><strong>Note</strong>: if you don\'t know the Range API (or at least the idea which stands behind ranges), you won\'t be able to use selection. Here\'s a pretty good introduction - <a href=\"http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html\">DOM Range spec</a> (yep, it is a spec, but it\'s good). <a href=\"http://docs.ckeditor.com/#!/api/CKEDITOR.dom.range\">CKEditor\'s Range API</a> is very similar, but a little bit bigger.</p><p style=\"margin-left:0px;\">For example:</p><p>// Having this HTML in editor: // &lt;p id=\"someId1\"&gt;foo &lt;em id=\"someId2\"&gt;bar&lt;/em&gt;.&lt;/p&gt; var range = editor.createRange(); range.setStart( editor.document.getById( \'someId1\' ), 0 ); // &lt;p&gt;^foo range.setEnd( editor.document.getById( \'someId2\' ).getFirst(), 1 ); // &lt;em&gt;b^ar&lt;/em&gt; editor.getSelection().selectRanges( [ range ] ); // Will select: // &lt;p id=\"someId1\"&gt;[foo &lt;em id=\"someId2\"&gt;b]ar&lt;/em&gt;.&lt;/p&gt;</p><p style=\"margin-left:0px;\">Or other case:</p><p>// Having this HTML in editor: // &lt;p&gt;foo bar.&lt;/p&gt; var range = editor.createRange(); range.moveToElementEditablePosition( editor.editable(), true ); // bar.^&lt;/p&gt; editor.getSelection().selectRanges( [ range ] ); // Will select: // &lt;p&gt;foo bar.^&lt;/p&gt;</p><h2 style=\"margin-left:0px;\">Restoring selection after changing DOM</h2><p style=\"margin-left:0px;\">But very often you don\'t want to select a new range, but to restore an old selection or range. First thing you need to know is that it is <strong>impossible to correctly restore selection if you made an uncontrolled DOM changes</strong>. You need to be able to keep track of the containers and offsets of the selection\'s start and end.</p><p style=\"margin-left:0px;\">Range keeps the references to its start and end containers (in startContainer and endContainer properties). Unfortunately, this references may be violated by:</p><ul><li>overwriting innerHTML,</li><li>moving DOM nodes around,</li><li>deleting DOM nodes.</li></ul><p style=\"margin-left:0px;\">The same may happen with offsets (startOffset and endOffset properties) - if you removed one of start/end container\'s child nodes these offsets may need to be updated.</p><p style=\"margin-left:0px;\">So in some situations range instance is not helpful when we want to remember a selection position. I\'ll explain three basic ways to deal with this problem.</p><p style=\"margin-left:0px;\">First, this is our plan:</p><ol><li>We get the current selection position.</li><li>We store it (somehow).</li><li>We do the DOM changes.</li><li>We restore selection.</li></ol><p style=\"margin-left:0px;\"><strong>Note:</strong> From now on I use \"ranges\" in plural form because Firefox supports multiple range selections - one selection can contain more than one range (try e.g. to use CTRL key while making selections).</p><h3 style=\"margin-left:0px;\">Solution 1 - by a range</h3><p>var ranges = editor.getSelection().getRanges(); // Make DOM changes. editor.getSelection().selectRanges( ranges );</p><p style=\"margin-left:0px;\">This is the simplest solution. It will work only if the DOM changes which we made haven\'t outdated ranges or we know how to update them.</p><h3 style=\"margin-left:0px;\">Solution 2 - by an intrusive bookmarks</h3><p>var bookmarks = editor.getSelection().createBookmarks(); // Make DOM changes. editor.getSelection().selectBookmarks( bookmarks );</p><p style=\"margin-left:0px;\">Bookmarks created by the <a href=\"http://docs.ckeditor.com/#!/api/CKEDITOR.dom.selection\">createBookmarks</a> method insert invisible &lt;span&gt; elements with special attributes (including data-cke-bookmark) at the selection\'s ranges start and end points.</p><p style=\"margin-left:0px;\">If you can avoid uncontrolled innerHTML changes and instead append/remove/move some nodes, then just remember that you have to preserve these &lt;span&gt; elements and this method will work perfectly. You can also move bookmarks\' elements if your modifications should change the selection as well.</p><p style=\"margin-left:0px;\">By default bookmarks keep references to their &lt;span&gt; elements, but you can also create serializable bookmarks passing true to the createBookmarks method. This kind of bookmarks will keep references to nodes by ids, so you can overwrite entire innerHTML.</p><p style=\"margin-left:0px;\">Note: This method is also available in a <a href=\"http://docs.ckeditor.com/#!/api/CKEDITOR.dom.range-method-createBookmark\">Range API</a>.</p><p style=\"margin-left:0px;\">This is the most popular method, because you have the full control over selection and you can change DOM, although you need to take care of bookmarks\' spans.</p><h3 style=\"margin-left:0px;\">Solution 3 - by a non intrusive bookmarks</h3><p>var bookmarks = editor.getSelection().createBookmarks2(); // Make DOM changes. editor.getSelection().selectBookmarks( bookmarks );</p><p style=\"margin-left:0px;\">Note: In this solution we use <a href=\"http://docs.ckeditor.com/#!/api/CKEDITOR.dom.selection-method-createBookmarks2\">createBookmarks<strong>2</strong></a> method.</p><p style=\"margin-left:0px;\">Here we also create an array of bookmarks objects, but we do not insert any elements into DOM. These bookmarks store their positions by the addresses. <a href=\"http://docs.ckeditor.com/#!/api/CKEDITOR.dom.node-method-getAddress\">Address</a> is an array of ancestors\' indexes in their parents.</p><p style=\"margin-left:0px;\">This solution is very similar to solution 1, but you can overwrite entire innerHTML, because it (most likely ;&gt;) won\'t change the addresses of bookmarks\' nodes. Although, in such a case you should pass true to createBookmarks2 to get normalized addresses because adjacent text nodes will be joined and empty ones removed when setting innerHTML.</p>', NULL, 1, '2024-11-14 18:57:48', '2024-11-14 21:56:43'),
(4, 1, 'How do I get uploaded image in next js and save it?', 'how-do-i-get-uploaded-image-in-next-js-and-save-it', '<p style=\"margin-left:0px;\">How do I get uploaded image in next.js API route and save it on public folder? I have front end ready. I\'m uploading images to an endpoint using plain JavaScript. here is the onSubmit function for uploading images. Suggest me if I\'m doing it wrong here. The main question is how do I retrieve it?</p><p style=\"margin-left:0px;\">&nbsp; const onSubmit=async(e)=&gt;{ &nbsp; &nbsp; &nbsp; &nbsp;e.preventDefault(); &nbsp; &nbsp; &nbsp; &nbsp;const fd=new FormData() &nbsp; &nbsp; &nbsp; &nbsp;fd.append(\'myfile\',image.name) &nbsp; &nbsp; &nbsp; &nbsp;let res=await fetch(`http://localhost:3000/api/upload`,{ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;method: \'POST\', &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;headers: { &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;\"Content-Type\": \"image/jpeg\", &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}, &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;body: fd, &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; let response=await res.json();</p><p style=\"margin-left:0px;\">one more bonus question, it\'s surely not a good idea to save the uploaded images on public folder. I have save it somewhere on the cloud.</p><ul><li><p style=\"margin-left:0px;\"><a href=\"https://stackoverflow.com/questions/tagged/javascript\"><strong>javascript</strong></a></p></li><li><p style=\"margin-left:0px;\"><a href=\"https://stackoverflow.com/questions/tagged/file-upload\"><strong>file-upload</strong></a></p></li><li><p style=\"margin-left:0px;\"><a href=\"https://stackoverflow.com/questions/tagged/next.js\"><strong>next.js</strong></a></p></li></ul><p style=\"margin-left:calc(var(--su8) / 2);\"><a href=\"https://stackoverflow.com/q/72663673\">Share</a></p><p style=\"margin-left:calc(var(--su8) / 2);\"><a href=\"https://stackoverflow.com/posts/72663673/edit\">Improve this question</a></p><p style=\"margin-left:calc(var(--su8) / 2);\">Follow</p><p style=\"margin-left:0px;\"><a href=\"https://stackoverflow.com/posts/72663673/revisions\">edited Jun 17, 2022 at 18:58</a></p><p style=\"margin-left:8px;\">&nbsp;</p><p style=\"margin-left:0px;\">asked Jun 17, 2022 at 18:53</p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:8px;\"><a href=\"https://stackoverflow.com/users/18624390/vraj-solanki\">Vraj Solanki</a></p><p style=\"margin-left:0px;\"><strong>101</strong>11 gold badge11 silver badge55 bronze badges</p><p style=\"margin-left:0px;\"><a href=\"https://stackoverflow.com/questions/72663673/how-do-i-get-uploaded-image-in-next-js-and-save-it#\">Add a comment</a></p><h2 style=\"margin-left:0px;\">4 Answers</h2><p style=\"margin-left:0px;\">Sorted by:</p><p style=\"margin-left:0px;\">Highest score (default) Trending (recent votes count more) Date modified (newest first) Date created (oldest first)</p><p style=\"margin-left:calc(var(--su4) / 2);\">24</p><p style=\"margin-left:0px;\">NextJS 13+ is perfectly capable of handling form data and image upload by its own. You don\'t need formidable, multer, etc... You can easily save images to your local directory with the below code.</p><p style=\"margin-left:0px;\">import { NextResponse } from \"next/server\"; import path from \"path\"; import { writeFile } from \"fs/promises\"; export const POST = async (req, res) =&gt; { &nbsp;const formData = await req.formData(); &nbsp;const file = formData.get(\"file\"); &nbsp;if (!file) { &nbsp; &nbsp;return NextResponse.json({ error: \"No files received.\" }, { status: 400 }); &nbsp;} &nbsp;const buffer = Buffer.from(await file.arrayBuffer()); &nbsp;const filename = Date.now() + file.name.replaceAll(\" \", \"_\"); &nbsp;console.log(filename); &nbsp;try { &nbsp; &nbsp;await writeFile( &nbsp; &nbsp; &nbsp;path.join(process.cwd(), \"public/uploads/\" + filename), &nbsp; &nbsp; &nbsp;buffer &nbsp; &nbsp;); &nbsp; &nbsp;return NextResponse.json({ Message: \"Success\", status: 201 }); &nbsp;} catch (error) { &nbsp; &nbsp;console.log(\"Error occured \", error); &nbsp; &nbsp;return NextResponse.json({ Message: \"Failed\", status: 500 }); &nbsp;} };</p><p style=\"margin-left:calc(var(--su8) / 2);\"><a href=\"https://stackoverflow.com/a/76850378\">Share</a></p><p style=\"margin-left:calc(var(--su8) / 2);\"><a href=\"https://stackoverflow.com/posts/76850378/edit\">Improve this answer</a></p><p style=\"margin-left:calc(var(--su8) / 2);\">Follow</p><p style=\"margin-left:0px;\"><a href=\"https://stackoverflow.com/posts/76850378/revisions\">edited Jul 27 at 8:55</a></p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:8px;\"><a href=\"https://stackoverflow.com/users/15802748/10x-engineer\">10x engineer</a></p><p style=\"margin-left:0px;\"><strong>70</strong>1010 bronze badges</p><p style=\"margin-left:0px;\">answered Aug 7, 2023 at 9:26</p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:8px;\"><a href=\"https://stackoverflow.com/users/22351228/teljo-antony\">Teljo Antony</a></p><p style=\"margin-left:0px;\"><strong>251</strong>22 silver badges44 bronze badges</p><ul><li><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;\">great. this code is works on me. but, how do i restrict to only images upload with file size less than 100kb?</p><p style=\"margin-left:0px;\">–&nbsp;<a href=\"https://stackoverflow.com/users/2093802/herahadi-an\">Herahadi An</a></p><p style=\"margin-left:0px;\"><a href=\"https://stackoverflow.com/questions/72663673/how-do-i-get-uploaded-image-in-next-js-and-save-it#comment135584503_76850378\">CommentedAug 16, 2023 at 4:17</a></p></li><li><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;\">Oh god, I have been struggling for a day to make this work and the solution is in this answer. Can you update the answer with the resources that you came up with this solution? and does this work if I publish the app to vercel?</p><p style=\"margin-left:0px;\">–&nbsp;<a href=\"https://stackoverflow.com/users/3050794/alsabsab\">alsabsab</a></p><p style=\"margin-left:0px;\"><a href=\"https://stackoverflow.com/questions/72663673/how-do-i-get-uploaded-image-in-next-js-and-save-it#comment135945877_76850378\">CommentedSep 15, 2023 at 22:11</a></p></li><li><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;\">AAhhh..... Thanks a lotttt.... i was searching whole day. and now got this one. its working as expected</p><p style=\"margin-left:0px;\">–&nbsp;<a href=\"https://stackoverflow.com/users/3977699/zulqarnain-jalil\">Zulqarnain Jalil</a></p><p style=\"margin-left:0px;\"><a href=\"https://stackoverflow.com/questions/72663673/how-do-i-get-uploaded-image-in-next-js-and-save-it#comment136792394_76850378\">CommentedDec 3, 2023 at 4:22</a></p></li><li><p style=\"margin-left:0px;\">2</p><p style=\"margin-left:0px;\">For some reason this solution is not working for me, I am getting req.formData is not a function error. I am getting the binary file content inside the req.body with other metadata like: ------WebKitFormBoundaryHc3JkFDcb8Z3cuDo Also, I am using the next version 14.0.2 in my projetc.</p><p style=\"margin-left:0px;\">–&nbsp;<a href=\"https://stackoverflow.com/users/5892553/rito\">Rito</a></p><p style=\"margin-left:0px;\"><a href=\"https://stackoverflow.com/questions/72663673/how-do-i-get-uploaded-image-in-next-js-and-save-it#comment136948702_76850378\">CommentedDec 18, 2023 at 17:16</a></p></li></ul><p style=\"margin-left:0px;\"><a href=\"https://stackoverflow.com/questions/72663673/how-do-i-get-uploaded-image-in-next-js-and-save-it#\">Add a comment</a></p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:calc(var(--su4) / 2);\">8</p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;\">This is the endpoint code I used for uploading image in nextjs, it requires some additional packages I will list them bellow also.</p><ol><li><p style=\"margin-left:0px;\">next-connect</p></li><li><p style=\"margin-left:0px;\">multer</p></li><li><p style=\"margin-left:0px;\">uuid</p></li></ol><p style=\"margin-left:0px;\">import nextConnect from \"next-connect\"; import multer from \"multer\"; import { v4 as uuidv4 } from \"uuid\"; let filename = uuidv4() + \"-\" + new Date().getTime(); const upload = multer({ &nbsp; &nbsp;storage: multer.diskStorage({ &nbsp; &nbsp; &nbsp; &nbsp;destination: \"./public/uploads/profiles\", // destination folder &nbsp; &nbsp; &nbsp; &nbsp;filename: (req, file, cb) =&gt; cb(null, getFileName(file)), &nbsp; &nbsp;}), }); const getFileName = (file) =&gt; { &nbsp; &nbsp;filename += &nbsp; &nbsp; &nbsp; &nbsp;\".\" + &nbsp; &nbsp; &nbsp; &nbsp;file.originalname.substring( &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;file.originalname.lastIndexOf(\".\") + 1, &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;file.originalname.length &nbsp; &nbsp; &nbsp; &nbsp;); &nbsp; &nbsp;return filename; }; const apiRoute = nextConnect({ &nbsp; &nbsp;onError(error, req, res) { &nbsp; &nbsp; &nbsp; &nbsp;res &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;.status(501) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;.json({ error: `Sorry something Happened! ${error.message}` }); &nbsp; &nbsp;}, &nbsp; &nbsp;onNoMatch(req, res) { &nbsp; &nbsp; &nbsp; &nbsp;res.status(405).json({ error: `Method \'${req.method}\' Not Allowed` }); &nbsp; &nbsp;}, }); apiRoute.use(upload.array(\"file\")); // attribute name you are sending the file by apiRoute.post((req, res) =&gt; { &nbsp; &nbsp;res.status(200).json({ data: `/uploads/profiles/${filename}` }); // response }); export default apiRoute; export const config = { &nbsp; &nbsp;api: { &nbsp; &nbsp; &nbsp; &nbsp;bodyParser: false, // Disallow body parsing, consume as stream &nbsp; &nbsp;}, };</p><p style=\"margin-left:calc(var(--su8) / 2);\"><a href=\"https://stackoverflow.com/a/72663792\">Share</a></p><p style=\"margin-left:calc(var(--su8) / 2);\"><a href=\"https://stackoverflow.com/posts/72663792/edit\">Improve this answer</a></p><p style=\"margin-left:calc(var(--su8) / 2);\">Follow</p><p style=\"margin-left:0px;\">answered Jun 17, 2022 at 19:06</p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:8px;\"><a href=\"https://stackoverflow.com/users/16911908/abdullah-qasemi\">Abdullah Qasemi</a></p><p style=\"margin-left:0px;\"><strong>459</strong>22 silver badges1212 bronze badges</p><ul><li><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;\">Hey I have copied pasted your code in on my endpoints, no error whatsoever but the files are not uploading. The folder upload/profile has also been created but images, files aren\'t there.</p><p style=\"margin-left:0px;\">–&nbsp;<a href=\"https://stackoverflow.com/users/18624390/vraj-solanki\">Vraj Solanki</a></p><p style=\"margin-left:0px;\"><a href=\"https://stackoverflow.com/questions/72663673/how-do-i-get-uploaded-image-in-next-js-and-save-it#comment128353969_72663792\">CommentedJun 17, 2022 at 19:25</a></p></li><li><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;\">Have you changed apiRoute.use(upload.array(\"file //--&gt; this\")); to your attribute name? In your case I think it is \"myfile\" as used above.</p><p style=\"margin-left:0px;\">–&nbsp;<a href=\"https://stackoverflow.com/users/16911908/abdullah-qasemi\">Abdullah Qasemi</a></p><p style=\"margin-left:0px;\"><a href=\"https://stackoverflow.com/questions/72663673/how-do-i-get-uploaded-image-in-next-js-and-save-it#comment128354056_72663792\">CommentedJun 17, 2022 at 19:30</a></p></li><li><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;\">I noticed something in your code, you have appended the filename to your FormData object fd.append(\'myfile\',image.name) you have to append the actual file to the object as fd.append(\'myfile\', image) , and also change the \"Content-Type\": \"image/jpeg\" to \"Content-Type\": \"multipart/form-data\".</p><p style=\"margin-left:0px;\">–&nbsp;<a href=\"https://stackoverflow.com/users/16911908/abdullah-qasemi\">Abdullah Qasemi</a></p><p style=\"margin-left:0px;\"><a href=\"https://stackoverflow.com/questions/72663673/how-do-i-get-uploaded-image-in-next-js-and-save-it#comment128354079_72663792\">CommentedJun 17, 2022 at 19:32</a></p></li></ul>', NULL, 1, '2024-11-14 19:07:12', '2024-11-15 20:11:59'),
(5, 1, 'this is demo 3', 'this-is-demo-3', '<p><strong>this-is-demo-3abcdef hello w</strong></p><p>&nbsp;</p><p>&nbsp;</p>', NULL, 1, '2024-11-14 19:08:04', '2024-11-14 20:42:02');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(150) NOT NULL,
  `image` varchar(250) DEFAULT NULL,
  `user_type` tinyint(1) NOT NULL DEFAULT '2' COMMENT '1-Admin,2-User',
  `permissions` varchar(100) NOT NULL,
  `plugins` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0-Inactive,1-Active,2-Deleted',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `image`, `user_type`, `permissions`, `plugins`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Sushanta Kumar Patra', 'sushanta@gmail.com', '9998887770', '$2a$10$acos8p3ciDaTPZKK8t8Ks.FPbCkdRcvcw.i8ht3WOQdlv9HsHIVum', 'https://res.cloudinary.com/ddw12zb61/image/upload/v1731482223/dejqlzltn3api3u6l9hc.jpg', 2, '', '[1]', 1, '2024-11-12 23:53:55', '2024-11-13 12:47:26'),
(2, 'Subrat Panda', 'subrat@gmail.com', '9999888820', '$2a$10$acos8p3ciDaTPZKK8t8Ks.FPbCkdRcvcw.i8ht3WOQdlv9HsHIVum', NULL, 2, '', '', 1, '2024-11-13 00:30:43', NULL),
(3, 'Ranjita Sahoo', 'ranjita@gmail.com', '9876541236', '$2a$10$QDhVF6nwjt5dsYqCf3GEtuEwbI5KA5sqXT.RgnJYYMeNYxgadR68O', NULL, 2, '', '', 1, '2024-11-13 19:33:22', NULL),
(4, 'deepak', 'deepak@gmail.com', '9876541236', '$2a$10$eVuE5D3Xi4lx4AAbyFaYmuOKit7KNPdOqGL0x7e23I6xQHxTvz1Hi', NULL, 2, '', '', 1, '2024-11-14 18:51:47', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
