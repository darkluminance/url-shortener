'use client';

import { useEffect, useState } from 'react';

function Redirect({ id }: { id: string }) {
	const [isError, setIsError] = useState(false);

	const getURL = async () => {
		const res = await fetch('/api/url/' + id.toString());
		const ret = await res.json();

		let obtainedURL = ret.url;

		if (obtainedURL !== undefined && obtainedURL != null) {
			// Check if last character is a '/' else include one
			if (obtainedURL.slice(-1) != '/') {
				obtainedURL += '/';
			}
			location.href = obtainedURL;
		} else {
			setIsError(true);
		}
	};

	useEffect(() => {
		getURL();
	}, []);

	if (!isError) return <h1>Redirecting to url...</h1>;
	else
		return (
			<main className="h-screen flex  justify-center items-center">
				<h1 className="text-2xl">Sorry, the page was not found</h1>
			</main>
		);
}

export default Redirect;
