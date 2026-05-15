const express = require("express");

const router = express.Router();

const Employee =
  require("../models/Employee");



// REGISTER
router.post(
  "/register",
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
      } = req.body;

      const employee =
        new Employee({
          name,
          email,
          password,
        });

      await employee.save();

      res.json({
        success: true,
        message:
          "Employee Registered",
      });

    }

    catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  }
);



// LOGIN
router.post(
  "/login",
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      const employee =
        await Employee.findOne({
          email,
          password,
        });

      if (!employee) {

        return res.status(400).json({
          success: false,
          message:
            "Invalid Credentials",
        });
      }

      res.json({
        success: true,
        employee,
      });

    }

    catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  }
);



// GET ALL EMPLOYEES
router.get(
  "/",
  async (req, res) => {

    try {

      const employees =
        await Employee.find();

      res.json(employees);

    }

    catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);



// DELETE EMPLOYEE
router.delete(
  "/:id",
  async (req, res) => {

    try {

      await Employee.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Employee Removed",
      });

    }

    catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  }
);

module.exports = router;