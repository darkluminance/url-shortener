import { Document, Model } from 'mongoose';
import * as Mongoose from 'mongoose';

const urlListSchema = new Mongoose.Schema({
	url: {
		type: String,
		required: true,
	},
	value: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: false,
	},
	thumbnail: {
		type: String,
		required: false,
	},
	createdAt: { type: Date, default: Date.now, expires: '1h' },
});
//how our post looks like
interface IPost {
	url: string;
	value: string;
	title: string;
	thumbnail: string;
}

interface IPostDocument extends IPost, Document {}
interface IPostModel extends Model<IPostDocument> {}

//postSchema->Document->Model

// const PostModel: IPostModel = Mongoose.model<IPostDocument>("post", postSchema);

const PostModel: IPostModel =
	Mongoose.models.post || Mongoose.model<IPostDocument>('post', urlListSchema);

export default PostModel;
