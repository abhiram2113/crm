// frontend/src/pages/Dashboard.jsx

import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const employee =
    JSON.parse(
      localStorage.getItem(
        "employee"
      )
    );

  const [clients, setClients] =
    useState([]);








  useEffect(() => {

    getClients();

  }, []);








  // GET CLIENTS
  const getClients = async () => {

    try {

      const response =
        await axios.get(

          "https://crm-1q6v.onrender.com/api/clients"
        );








      const filtered =
        response.data.filter(
          (item) =>
            item.employeeName ===
            employee.name
        );








      setClients(filtered);

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

              marginBottom: "5px",

              fontSize: "38px",

              fontWeight: "bold",
            }}
          >
            HireOrbit
          </h1>








          <p
            style={{
              color: "#94a3b8",

              fontSize: "18px",
            }}
          >

            Welcome,
            {" "}

            <span
              style={{
                color: "#0ea5e9",

                fontWeight: "bold",
              }}
            >
              {employee?.name}
            </span>

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









      {/* CARDS */}
      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",

          gap: "20px",

          marginBottom: "30px",
        }}
      >

        {/* TOTAL CLIENTS */}
        <div style={cardStyle}>

          <h3 style={cardTitle}>
            Total Clients
          </h3>








          <h1 style={cardValue}>
            {clients.length}
          </h1>

        </div>








        {/* SALES DONE */}
        <div style={cardStyle}>

          <h3 style={cardTitle}>
            Sales Done
          </h3>








          <h1
            style={{
              ...cardValue,
              color: "#22c55e",
            }}
          >

            {
              clients.filter(
                (item) =>
                  item.status ===
                  "Done"
              ).length
            }

          </h1>

        </div>

      </div>









      {/* ADD CLIENT */}
      <button
        onClick={() =>
          navigate("/add-client")
        }

        style={{
          padding:
            "14px 25px",

          border: "none",

          borderRadius: "12px",

          background: "#0ea5e9",

          color: "white",

          fontWeight: "bold",

          cursor: "pointer",

          marginBottom: "30px",
        }}
      >
        + Add Client
      </button>









      {/* CLIENT TABLE */}
      <div
        style={{
          background: "#111827",

          borderRadius: "20px",

          padding: "20px",

          overflowX: "auto",
        }}
      >

        <h2
          style={{
            color: "white",

            marginBottom: "20px",
          }}
        >
          My Clients
        </h2>








        <table
          style={{
            width: "100%",

            borderCollapse:
              "collapse",
          }}
        >

          <thead>

            <tr
              style={{
                background: "#1e293b",
              }}
            >

              <th style={thStyle}>
                Client Name
              </th>

              <th style={thStyle}>
                Email
              </th>

              <th style={thStyle}>
                Phone
              </th>

              <th style={thStyle}>
                Location
              </th>

              <th style={thStyle}>
                Status
              </th>

            </tr>

          </thead>








          <tbody>

            {clients.map(
              (client, index) => (

                <tr key={index}>

                  <td style={tdStyle}>
                    {
                      client.clientName
                    }
                  </td>








                  <td style={tdStyle}>
                    {client.email}
                  </td>








                  <td style={tdStyle}>
                    {client.phone}
                  </td>








                  <td style={tdStyle}>
                    {client.location}
                  </td>








                  <td style={tdStyle}>

                    <span
                      style={{
                        padding:
                          "8px 15px",

                        borderRadius:
                          "20px",

                        background:
                          client.status ===
                          "Done"
                            ? "#22c55e"
                            : "#f59e0b",

                        color:
                          "white",
                      }}
                    >

                      {client.status}

                    </span>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}










const cardStyle = {

  background: "#111827",

  padding: "25px",

  borderRadius: "20px",
};










const cardTitle = {

  color: "#94a3b8",
};










const cardValue = {

  color: "white",

  fontSize: "40px",
};










const thStyle = {

  padding: "15px",

  color: "white",

  textAlign: "left",
};










const tdStyle = {

  padding: "15px",

  color: "#cbd5e1",

  borderBottom:
    "1px solid #1e293b",
};










export default Dashboard;