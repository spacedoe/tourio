import Place from "../../../../db/models/Place";
import dbConnect from "../../../../db/connect";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
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
    return response.status(200).json(placeToDelete);
  }
}
