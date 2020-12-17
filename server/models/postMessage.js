import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = Schema({
  title: String,
  message: String,
  creator: String,
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
