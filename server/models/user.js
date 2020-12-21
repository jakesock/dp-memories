import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
