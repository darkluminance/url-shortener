'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
	const [url, seturl] = useState('');
	const [short, setShort] = useState('');

	const generateURL = async () => {
		const res = await fetch(
			'https://url-shortener-565c6-default-rtdb.asia-southeast1.firebasedatabase.app/urls.json',
			{
				method: 'POST',
				body: JSON.stringify(url),
			}
		);
		const id = await res.json();

		const shortURL = 'localhost:3000/' + id.name;
		setShort(shortURL);
	};
	return (
		<>
			<main className="flex min-h-screen flex-col items-center justify-center align-center p-24">
				{short !== '' && (
					<div
						className="mb-8 px-8 py-4 hover:bg-gray-100 flex"
						onClick={() => {
							navigator.clipboard.writeText(short);
						}}
					>
						<span className="text-4xl font-bold leading-none tracking-tight">
							{short}
						</span>
						<div className="ml-2">
							<img src="/link.png" />
						</div>
					</div>
				)}
				<div className="flex w-full max-w-3xl items-center space-x-2 mb-8">
					<input
						className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						type="text"
						placeholder="Enter URL"
						value={url}
						onChange={(e) => {
							seturl(e.target.value);
						}}
						id="url"
						name="url"
					/>
				</div>
				<button
					onClick={generateURL}
					className="border px-8 py-2 rounded-md bg-gray-100 hover:bg-gray-200 active:bg-gray-400"
				>
					Generate short URL
				</button>
			</main>
		</>
	);
}
