import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function AddClient() {

  const navigate = useNavigate();

  const employee =
    JSON.parse(
      localStorage.getItem(
        "employee"
      )
    );








  const [clientName, setClientName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [location, setLocation] =
    useState("");








  // ADD CLIENT
  const addClient = async () => {

    try {

      await axios.post(

        "https://crm-1q6v.onrender.com/api/clients",

        {
          employeeName:
            employee.name,

          clientName,

          email,

          phone,

          location,

          status:
            "Not Done",
        }
      );








      alert(
        "Client Added Successfully"
      );








      // GO BACK TO DASHBOARD
      navigate(
        "/dashboard"
      );

    }

    catch (error) {

      console.log(error);

      alert(
        "Failed To Add Client"
      );
    }
  };












  return (

    <div
      style={{
        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        background:
          "linear-gradient(135deg,#020617,#0f172a,#1e293b)",

        padding: "20px",
      }}
    >

      <div
        style={{
          width: "450px",

          background:
            "#111827",

          padding: "40px",

          borderRadius: "20px",

          boxShadow:
            "0px 0px 30px rgba(0,0,0,0.4)",
        }}
      >

        <h1
          style={{
            color: "white",

            textAlign: "center",

            marginBottom: "10px",
          }}
        >
          Add Client
        </h1>








        <p
          style={{
            color: "#94a3b8",

            textAlign: "center",

            marginBottom: "30px",
          }}
        >
          Add New Client Details
        </p>









        {/* CLIENT NAME */}
        <input
          type="text"

          placeholder="Client Name"

          value={clientName}

          onChange={(e) =>
            setClientName(
              e.target.value
            )
          }

          style={inputStyle}
        />









        {/* EMAIL */}
        <input
          type="email"

          placeholder="Client Email"

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }

          style={inputStyle}
        />









        {/* PHONE */}
        <input
          type="text"

          placeholder="Phone Number"

          value={phone}

          onChange={(e) =>
            setPhone(
              e.target.value
            )
          }

          style={inputStyle}
        />









        {/* LOCATION */}
        <input
          type="text"

          placeholder="Location"

          value={location}

          onChange={(e) =>
            setLocation(
              e.target.value
            )
          }

          style={inputStyle}
        />









        {/* BUTTON */}
        <button
          onClick={addClient}

          style={{
            width: "100%",

            padding: "15px",

            border: "none",

            borderRadius: "12px",

            background: "#0ea5e9",

            color: "white",

            fontWeight: "bold",

            fontSize: "16px",

            cursor: "pointer",
          }}
        >
          Add Client
        </button>

      </div>

    </div>
  );
}










const inputStyle = {

  width: "100%",

  padding: "15px",

  marginBottom: "18px",

  borderRadius: "12px",

  border: "none",

  background: "#1e293b",

  color: "white",

  fontSize: "15px",
};










export default AddClient;