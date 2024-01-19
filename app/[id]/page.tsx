'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Page({ params }: { params: { id: string } }) {
	const getURL = async () => {
		const res = await fetch('/api/url/' + params.id.toString());
		const ret = await res.json();
		const obtainedURL = ret.url;
		// console.log(ret);
		if (obtainedURL !== undefined && obtainedURL != null) {
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
