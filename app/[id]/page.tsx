'use client';

export default function Page({ params }: { params: { id: string } }) {
	const getURL = async () => {
		const idd =
			'https://url-shortener-565c6-default-rtdb.asia-southeast1.firebasedatabase.app/urls/' +
			params.id.toString() +
			'.json';

		const res = await fetch(idd);
		const resjson = await res.json();

		location.href = resjson;
	};

	getURL();
	return <></>;
}
