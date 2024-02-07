export async function POST(request: Request) {
	const body = await request.json();
	try {
		const data = await fetch(body.url);
		const html = await data.text();

		return Response.json(html);
	} catch (error) {
		console.log('error from route', error);
		return Response.json({ message: 'Error' });
	}
}
