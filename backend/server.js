const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const clientRoutes =
  require("./routes/clientRoutes");

const employeeRoutes =
  require("./routes/employeeRoutes");

const attendanceRoutes =
  require("./routes/attendanceRoutes");

const app = express();


// MIDDLEWARE
app.use(cors());

app.use(express.json());


// ROUTES
app.use("/api/clients", clientRoutes);

app.use("/api/employees", employeeRoutes);

app.use("/api/attendance", attendanceRoutes);


// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Hire Orbit Backend Running");
});


// DATABASE
mongoose
  .connect(process.env.MONGO_URL)

  .then(() => {
    console.log("MongoDB Connected");
  })

  .catch((error) => {
    console.log(error);
  });


// SERVER
app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});