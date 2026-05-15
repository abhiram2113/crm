const Attendance =
  require("../models/Attendance");


// LOGIN ATTENDANCE
const loginAttendance =
  async (req, res) => {

    try {

      const attendance =
        await Attendance.create({
          employeeName:
            req.body.employeeName,
        });

      res.status(201).json(attendance);
    }

    catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  };



// LOGOUT ATTENDANCE
const logoutAttendance =
  async (req, res) => {

    try {

      const attendance =
        await Attendance.findById(
          req.params.id
        );

      attendance.logoutTime =
        new Date();



      const diff =
        attendance.logoutTime -
        attendance.loginTime;

      const hours =
        diff / (1000 * 60 * 60);

      attendance.totalHours =
        hours.toFixed(2);



      await attendance.save();

      res.json(attendance);
    }

    catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  };



// GET ALL ATTENDANCE
const getAttendance =
  async (req, res) => {

    try {

      const records =
        await Attendance.find();

      res.json(records);
    }

    catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
  loginAttendance,
  logoutAttendance,
  getAttendance,
};