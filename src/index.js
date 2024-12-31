const express = require("express");
const { PORT } = require("./config/serverConfig");
const materialRouter =  require('./routes/materials.js')
const orderRoutes =  require('./routes/orders.js')

const cookieParser = require("cookie-parser");
const app = express();
const db = require("./config/dbconfig.js");
app.use(express.json());
app.use(cookieParser());
app.use("/materials", materialRouter);
app.use("/purchaseorders", orderRoutes);



const startServer = async () => {
  try {
    await db.connect(process.env.DB_URI);
    await app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

startServer();
