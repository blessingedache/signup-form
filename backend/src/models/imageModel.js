import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    mimetype: {
      type: String,
      required: true
    },
  },
  { timestamps: true }  // ✅ Moved here as the second argument
);

const file = mongoose.model('Image', imageSchema);

export default file;
