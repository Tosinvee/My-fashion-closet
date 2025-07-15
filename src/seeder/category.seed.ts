import { config } from 'dotenv';
import mongoose, { model } from 'mongoose';
import { CategorySchema } from '../features/closet/schema/category.schema';

config();

const { env } = process;
const MONGODB_URI = env.MONGODB_URI;

const Category = model('Category', CategorySchema);

const categories = ['Tops', 'Gowns', 'Shoes', 'Bags', 'Natives', 'Trousers'];

async function seedCategories() {
  try {
    await mongoose.connect(MONGODB_URI);

    for (const name of categories) {
      await Category.updateOne(
        { name },
        { $setOnInsert: { name } }, //insert if not found,
        { upsert: true },
      );
    }
    console.log('Categories seeded');
  } catch (error) {
    console.error('error seeding categories');
  } finally {
    await mongoose.disconnect();
  }
}
seedCategories();
