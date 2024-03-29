import { dbConnect, disconnect } from '@/utils/mongodb';
import PostModel from '@/models/url-collection';

export async function POST(request: Request) {
	const body = await request.json();
	const id = Date.now();

	try {
		await dbConnect();

		const post = await PostModel.create({
			url: body.url,
			value: id.toString(16).slice(-6),
			title: body.title,
			thumbnail: body.thumbnail,
			createdAt: new Date(),
		});
		const ret = post?.value;
		// await disconnect();

		return Response.json({ url: ret });
	} catch (error) {
		console.log('error from route', error);
		return Response.json({ message: 'Error' });
	}
}
