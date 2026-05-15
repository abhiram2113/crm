const mongoose = require("mongoose");

const attendanceSchema =
  new mongoose.Schema({

    employeeName: {
      type: String,
      required: true,
    },

    loginTime: {
      type: Date,
      default: Date.now,
    },

    logoutTime: {
      type: Date,
    },

    totalHours: {
      type: String,
      default: "0",
    },

  });

module.exports =
  mongoose.model(
    "Attendance",
    attendanceSchema
  );