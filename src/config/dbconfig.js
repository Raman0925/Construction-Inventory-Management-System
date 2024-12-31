const mongoose = require("mongoose");
let isconnected = false;

const connect = async (uri) => {
  if (isconnected) {
    console.log("Already connected to the database");
    return;
    
  }
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log("Database connection error:", error);
    throw error;
  }
};

const disconnect = async () => {
  if (isconnected) {
    await mongoose.connection.close();
    isconnected = false;
    console.log("Database disconnected successfully");
  }
};

module.exports = {
  connect,
  disconnect,
};
