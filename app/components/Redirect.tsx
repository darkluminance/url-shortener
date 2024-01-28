'use client';

import { useEffect } from 'react';

function Redirect({ id }: { id: string }) {
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
			alert('Could not find the page');
		}
	};

	useEffect(() => {
		getURL();
	}, []);

	return <h1>Redirecting to url...</h1>;
}

export default Redirect;
