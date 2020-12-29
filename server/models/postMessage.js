import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  selectedFile: {
    cloudId: String,
    url: String,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage;
