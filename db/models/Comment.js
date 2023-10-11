import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  comment: { type: String, required: true },
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
