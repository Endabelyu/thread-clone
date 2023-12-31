import mongoose from 'mongoose';
let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URL) return console.log('MONGODB_URL not found');

  if (isConnected) return console.log('Already Connected to MongoDB');

  try {
    const url = atob(process.env.MONGODB_URL);
    await mongoose.connect(url);
    isConnected = true;

    console.log('connect to MongoDB');
  } catch (error) {}
};
