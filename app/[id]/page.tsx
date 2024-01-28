import type { Metadata, ResolvingMetadata } from 'next';
import Redirect from '../components/Redirect';

export async function generateMetadata(
	{ params }: { params: { id: string } },
	parent: ResolvingMetadata
): Promise<Metadata> {
	const id = params.id;
	const baseURL = 'http://smol-url.vercel.app';

	const res = await fetch(`${baseURL}/api/url/${id}`);
	const product = await res.json();

	console.log(product);
	return {
		title: product.title,
		openGraph: {
			images: [product.thumbnail],
		},
	};
}

export default function Page({ params }: { params: { id: string } }) {
	return (
		<>
			<Redirect id={params.id}></Redirect>
		</>
	);
}
