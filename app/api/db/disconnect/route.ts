import { dbConnect, disconnect } from '@/utils/mongodb';

export async function GET() {
	const con = await disconnect();
	console.log('hit db disconnect');
	return Response.json({ message: 'disconnected' });
}
