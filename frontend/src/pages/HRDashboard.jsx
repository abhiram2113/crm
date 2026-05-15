// frontend/src/pages/HRDashboard.jsx

import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function HRDashboard() {

  const navigate = useNavigate();

  const [employees, setEmployees] =
    useState([]);

  const [attendance, setAttendance] =
    useState([]);

  const [clients, setClients] =
    useState([]);








  useEffect(() => {

    getEmployees();

    getAttendance();

    getClients();

  }, []);








  const getEmployees = async () => {

    try {

      const response =
        await axios.get(

          "https://crm-1q6v.onrender.com/api/employees"
        );

      setEmployees(response.data);

    }

    catch (error) {

      console.log(error);
    }
  };








  const getAttendance = async () => {

    try {

      const response =
        await axios.get(

          "https://crm-1q6v.onrender.com/api/attendance"
        );

      setAttendance(response.data);

    }

    catch (error) {

      console.log(error);
    }
  };








  const getClients = async () => {

    try {

      const response =
        await axios.get(

          "https://crm-1q6v.onrender.com/api/clients"
        );

      setClients(response.data);

    }

    catch (error) {

      console.log(error);
    }
  };








  // LOGOUT
  const logout = () => {

    // REMOVE ONLY SESSION

    localStorage.removeItem(
      "isLoggedIn"
    );








    localStorage.removeItem(
      "isHRLoggedIn"
    );








    localStorage.removeItem(
      "employee"
    );








    // KEEP SAVED LOGIN DETAILS

    navigate("/login");
  };












  return (

    <div
      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(135deg,#020617,#0f172a)",

        padding: "30px",
      }}
    >

      {/* HEADER */}
      <div
        style={{
          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center",

          marginBottom: "30px",
        }}
      >

        <div>

          <h1
            style={{
              color: "white",

              fontSize: "38px",
            }}
          >
            HireOrbit HR
          </h1>








          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Employee Monitoring &
            Sales Management
          </p>

        </div>








        <button
          onClick={logout}

          style={{
            padding:
              "12px 25px",

            border: "none",

            borderRadius: "10px",

            background: "#ef4444",

            color: "white",

            fontWeight: "bold",

            cursor: "pointer",
          }}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default HRDashboard;