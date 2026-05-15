const express = require("express");

const router = express.Router();

const {
  registerEmployee,
  loginEmployee,
} = require("../controllers/employeeController");



// REGISTER
router.post(
  "/register",
  registerEmployee
);



// LOGIN
router.post(
  "/login",
  loginEmployee
);




module.exports = router;