const Employee = require("../models/Employee");



// REGISTER
const registerEmployee = async (req, res) => {

  try {

    const existingEmployee =
      await Employee.findOne({
        email: req.body.email,
      });

    if (existingEmployee) {

      return res.status(400).json({
        message: "Employee Already Exists",
      });

    }



    const employee =
      await Employee.create({

        name: req.body.name,

        email: req.body.email,

        password: req.body.password,

      });



    res.status(201).json(employee);

  }

  catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};




// LOGIN
const loginEmployee = async (req, res) => {

  try {

    // HR LOGIN
    if (
      req.body.email === "hr@hireorbit.com"
      &&
      req.body.password === "hr123"
    ) {

      return res.json({

        role: "hr",

        employee: {
          name: "HR Admin",
        },

      });
    }



    // EMPLOYEE LOGIN
    const employee =
      await Employee.findOne({
        email: req.body.email,
      });



    if (!employee) {

      return res.status(400).json({
        message: "Employee Not Found",
      });

    }



    if (
      employee.password !==
      req.body.password
    ) {

      return res.status(400).json({
        message: "Invalid Password",
      });

    }



    res.json({

      role: "employee",

      employee,

    });

  }

  catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};





module.exports = {
  registerEmployee,
  loginEmployee,
};