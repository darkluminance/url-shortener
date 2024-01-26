'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Page({ params }: { params: { id: string } }) {
	const getURL = async () => {
		const res = await fetch('/api/url/' + params.id.toString());
		const ret = await res.json();
		let obtainedURL = ret.url;

		if (obtainedURL !== undefined && obtainedURL != null) {
			// Check if last character is a '/' else include one
			if (obtainedURL.slice(-1) != '/') {
				obtainedURL += '/';
			}
			location.href = obtainedURL;
		} else {
			alert('Could not find the page');
		}
	};

	useEffect(() => {
		getURL();
	}, []);

	return (
		<>
			<h1>Redirecting to url...</h1>
		</>
	);
}
