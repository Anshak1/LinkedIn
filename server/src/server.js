import dotenv from "dotenv";
dotenv.config();

import server from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});