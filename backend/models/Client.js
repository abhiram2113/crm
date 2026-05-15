const mongoose =
  require("mongoose");

const clientSchema =
  new mongoose.Schema({

    employeeName: {
      type: String,
    },

    clientName: {
      type: String,
    },

    email: {
      type: String,
    },

    phone: {
      type: String,
    },

    location: {
      type: String,
    },

    status: {
      type: String,
      default:
        "Not Done",
    },
  });

module.exports =
  mongoose.model(
    "Client",
    clientSchema
  );