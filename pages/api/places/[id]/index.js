import Place from "../../../../db/models/Place";
import dbConnect from "../../../../db/connect";
import Comment from "../../../../db/models/Comment";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "POST") {
    try {
      const newComment = await Comment.create(request.body);
      await Place.findByIdAndUpdate(
        id,
        { $push: { comments: newComment._id } },
        { new: true }
      );

      return response.status(201).json({ status: "Comment created." });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  if (request.method === "GET") {
    const place = await Place.findById(id).populate("comments");
    // const allCommentIds = comment?.map((comment) => comment.$oid) || [];
    // const comment = place?.comments;
    // const comments = db_comments.filter((comment) =>
    //   allCommentIds.includes(comment._id.$oid)
    // );

    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }

    return response.status(200).json(place);
  }

  if (request.method === "PATCH") {
    const placeToUpdate = await Place.findByIdAndUpdate(
      id,
      {
        $set: request.body,
      },
      { new: true }
    );
    return response.status(200).json(placeToUpdate);
  }

  if (request.method === "DELETE") {
    const placeToDelete = await Place.findByIdAndDelete(id);
    await Comment.deleteMany({
      _id: { $in: placeToDelete.comments },
    });
    return response.status(200).json(placeToDelete);
  }
}
