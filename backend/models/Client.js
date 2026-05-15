const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    default: "",
  },

  name: {
    type: String,
  },

  phone: {
    type: String,
  },

  email: {
    type: String,
  },

  location: {
    type: String,
  },

  status: {
    type: String,
    default: "Not Done",
  },
});

module.exports = mongoose.model(
  "Client",
  clientSchema
);