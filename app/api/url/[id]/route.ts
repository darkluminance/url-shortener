import { dbConnect, disconnect } from '@/utils/mongodb';
import PostModel from '@/models/url-collection';

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		await dbConnect();
		const post = await PostModel.findOne({ value: params.id });
		const ret = post?.url;

		return Response.json({ url: ret });
	} catch (error) {
		console.log('error from route', error);
		return Response.json({ message: 'Error' });
	}
}
