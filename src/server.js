import dotenv from 'dotenv';
import { connectToDatabase } from './db/db.js';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is not defined");
  process.exit(1);
}

// Connect to MongoDB
await connectToDatabase(MONGO_URI);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
