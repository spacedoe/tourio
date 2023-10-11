import dbConnect from "../../../db/connect";
import Comment from "../../../db/models/Comment";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "DELETE") {
    await Comment.findByIdAndDelete(id);
    return response
      .status(200)
      .json({ status: "Comment deleted successfully" });
  }
}
