import dbConnect from "../../../db/connect";
import Comment from "../../../db/models/Comment";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "DELETE") {
    try {
      console.log("ID", id); // Place id
      console.log("request.body:", request.body); // comment id
      const commentToDelete = await Comment.findByIdAndDelete(request.body.id);
      await Place.findByIdAndUpdate(id, {
        $pull: { comments: commentToDelete.id },
      });

      return response
        .status(200)
        .json({ status: "Comment deleted successfully" });
    } catch (error) {
      response.status(404).json({ error: error.message });
    }
  }

  if (request.method === "PUT") {
    try {
      await Comment.findByIdAndUpdate(id, {
        $set: {
          comment: request.body,
        },
      });

      return response
        .status(200)
        .json({ status: "Comment updated successfully" });
    } catch (error) {
      response.status(404).json({ error: error.message });
    }
  }
}
