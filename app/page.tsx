'use client';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
	const [url, seturl] = useState('');
	const [loading, setloading] = useState(false);
	const [short, setShort] = useState('');
	const [copyText, setCopyText] = useState('Copy');

	const generateURL = async () => {
		if (url === '' || url === null || url === undefined) {
			alert('Please enter a URL');
			return;
		}
		if (!isValidURL()) {
			alert('URL is not valid');
			return;
		}

		// Check if last character is a '/' else include one
		if (url.slice(-1) != '/') {
			seturl(url + '/');
		}

		setloading(true);
		let urlMetadata = {
			title: 'URL shortener',
			thumbnail: null,
		};
		try {
			const urlmeta = await getURLTitleAndThumbnail(url);
			urlMetadata = {
				title: urlmeta.title,
				thumbnail: urlmeta.thumbnail,
			};
		} catch (error) {
			console.log(error);
		}

		const res = await fetch('/api', {
			method: 'POST',
			body: JSON.stringify({
				url: url,
				title: urlMetadata.title,
				thumbnail: urlMetadata.thumbnail,
			}),
		});
		const ret = await res.json();

		setShort(location.host + location.pathname + ret.url);
		setloading(false);
	};

	const getURLTitleAndThumbnail = async (link: string) => {
		// Fetch HTML content of the URL
		const response = await fetch('/api/fetchurlmetadata', {
			method: 'POST',
			body: JSON.stringify({
				url: link,
			}),
		});

		const html = await response.json();

		// Parse HTML using DOMParser
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');

		// Extract title
		const title = doc.querySelector('title')?.innerText;

		// Extract thumbnail (you may need to adjust the selector based on the structure of the HTML)
		const thumbnailElement = doc.querySelector('meta[property="og:image"]');
		const thumbnail = thumbnailElement
			? thumbnailElement.getAttribute('content')
			: null;

		return { title, thumbnail };
	};

	const isValidURL = () => {
		const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
		return urlRegex.test(url);
	};

	const connectToDB = async () => {
		const res = await fetch('api/db/connect');
	};
	const disconnectFromDB = async () => {
		const res = await fetch('api/db/disconnect');
	};

	useEffect(() => {
		connectToDB();
		// return () => {
		// 	disconnectFromDB();
		// };
	}, []);

	return (
		<>
			<main className="flex min-h-screen flex-col items-center justify-center align-center p-2 lg:p-24">
				{short !== '' && (
					<div
						className="fixed top-1/4 lg:top-1/3 mb-8 px-8 py-4 w-full"
						onClick={() => {
							navigator.clipboard.writeText(short);
						}}
					>
						<div className=" flex flex-wrap md:flex-nowrap justify-center align-center ">
							<span className="text-xl md:text-2xl lg:text-4xl truncate">
								{short}
							</span>
							<button
								onClick={() => {
									navigator.clipboard.writeText(short);
									setCopyText('Copied');
									setTimeout(() => {
										setCopyText('Copy');
									}, 2800);
								}}
								className="ml-4 px-8 py-2 rounded-md bg-gray-200 hover:bg-gray-300 active:bg-gray-400 w-36"
							>
								{copyText}
							</button>
						</div>
						<div className="flex justify-center mt-6">
							Link will expire in 1h
						</div>
					</div>
				)}
				<div className="flex flex-wrap lg:flex-nowrap w-full gap-4 max-w-screen-lg justify-center items-center  mb-8">
					<input
						className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						type="text"
						placeholder="Enter URL to shorten"
						value={url}
						onChange={(e) => {
							seturl(e.target.value);
						}}
						id="url"
						name="url"
					/>
					{!loading && (
						<button
							onClick={generateURL}
							className="w-full lg:w-60 px-8 py-2 rounded-md bg-gray-700 hover:bg-gray-500 active:bg-gray-400 text-slate-100"
						>
							Generate
						</button>
					)}
					{loading && (
						<button className="w-full lg:w-60 px-8 py-2 rounded-md bg-gray-700 text-slate-100 border">
							<svg
								aria-hidden="true"
								role="status"
								className="inline mr-2 w-4 h-4 text-slate-100 animate-spin"
								viewBox="0 0 100 101"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
									fill="currentColor"
								></path>
								<path
									d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
									fill="#1C64F2"
								></path>
							</svg>
							Loading...
						</button>
					)}
				</div>
			</main>
		</>
	);
}
