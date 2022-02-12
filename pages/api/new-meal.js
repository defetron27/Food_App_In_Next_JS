import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const DATABASE_NAME = "FoodApp";
  const DATABASE_PASSWORD = "k1i2s3h4o5r6e7";

  if (req.method === "POST") {
    const client = await MongoClient.connect(
      `mongodb+srv://defetron27:${DATABASE_PASSWORD}@foodappcluster.cfddr.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`
    );
    const db = client.db();
    const mealsCollection = db.collection("meals");
    await mealsCollection.insertOne(req.body);

    client.close();

    res.status(201).send({ Message: "Meal inserted" });
  }
};

export default handler;