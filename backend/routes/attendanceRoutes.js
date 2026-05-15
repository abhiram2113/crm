const express = require("express");

const router = express.Router();

const {
  loginAttendance,
  logoutAttendance,
  getAttendance,
} = require("../controllers/attendanceController");


// LOGIN ATTENDANCE
router.post(
  "/login",
  loginAttendance
);


// LOGOUT ATTENDANCE
router.put(
  "/logout/:id",
  logoutAttendance
);


// GET ATTENDANCE
router.get(
  "/",
  getAttendance
);

module.exports = router;