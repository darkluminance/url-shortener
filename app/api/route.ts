import { dbConnect, disconnect } from '@/utils/mongodb';
import PostModel from '@/models/url-collection';

export async function POST(request: Request) {
	const url = await request.json();
	const id = Date.now();

	try {
		await dbConnect();
		const post = await PostModel.create({
			url: url,
			value: id.toString(16),
			createdAt: new Date(),
		});
		// await disconnect();

		return Response.json({ url: post.value });
	} catch (error) {
		console.log('error from route', error);
		return Response.json({ message: 'Error' });
	}
}
