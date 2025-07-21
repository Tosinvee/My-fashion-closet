import { config } from 'dotenv';
import mongoose, { model } from 'mongoose';

import { TagSchema } from '../features/closet/schema/tag.schema';

config();

const { env } = process;
const MONGODB_URI = env.MONGODB_URI;

const Tag = model('Tag', TagSchema);

const tags = ['Casual', 'Work', 'Winter', 'Date Night', 'Formal', 'Dirty'];

async function seedtags() {
  try {
    await mongoose.connect(MONGODB_URI);

    for (const name of tags) {
      await Tag.updateOne(
        { name },
        { $setOnInsert: { name } },
        { upsert: true },
      );
    }
    console.log('Tags seeded');
  } catch (error) {
    console.error('Error seeding tags');
  } finally {
    await mongoose.disconnect;
  }
}

seedtags();
