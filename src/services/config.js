require("dotenv").config();

module.exports = {
  port: process.env.APP_PORT || 3000,
  mongodb: {
    uri: process.env.MONGODB_URI,
  },
  notion: {
    deviceId: process.env.DEVICE_ID || "",
    email: process.env.EMAIL || "",
    password: process.env.PASSWORD || "",
  }
}
