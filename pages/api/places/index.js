import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();

    return response.status(200).json(places);
  }

  if (request.method === "POST") {
    try {
      const placeData = request.body; 
      await Place.create(placeData);

      return response.status(201).json({status: "Place created."});
    } catch (error) {
      return response.status(500).json({error: error.message});
    }
  }
}
