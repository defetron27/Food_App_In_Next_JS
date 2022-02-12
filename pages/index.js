import MealList from "../components/MealList";
import { MongoClient } from "mongodb";
const HomePage = (props) => {
  return <MealList meals={props.mealList} />;
};
export async function getStaticProps({ params: {slug} }) {
  console.log(`Building slug: ${slug}`)

  const DATABASE_NAME = "FoodApp";
  const DATABASE_PASSWORD = "k1i2s3h4o5r6e7";

  const client = await MongoClient.connect(
    `mongodb+srv://defetron27:${DATABASE_PASSWORD}@foodappcluster.cfddr.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`
  );
  const db = client.db();
  const mealsCollection = db.collection("meals");
  const meals = await mealsCollection.find().toArray();

  client.close();

  return {
    props: {
      mealList: meals.map((meal) => ({
        id: meal._id.toString(),
        name: meal.name,
        image: meal.image_path,
        dish: meal.dishes,
        chef: meal.chef,
      })),
    },
  };
}
export default HomePage;