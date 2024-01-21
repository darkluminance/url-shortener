import { dbConnect, disconnect } from '@/utils/mongodb';

export async function GET() {
	const con = await dbConnect();
	console.log('hit db connect');
	return Response.json({ message: 'connected' });
}
