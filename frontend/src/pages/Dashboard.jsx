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

    if (!employee) {

      navigate("/login");

      return;
    }








    fetchClients();

  }, []);








  // FETCH CLIENTS
  const fetchClients = async () => {

    try {

      const response =
        await axios.get(

          "https://crm-1q6v.onrender.com/api/clients"
        );








      // FILTER CLIENTS
      const filteredClients =
        response.data.filter(
          (client) =>

            client.employeeName
              ?.trim()
              .toLowerCase()

            ===

            employee.name
              ?.trim()
              .toLowerCase()
        );








      setClients(
        filteredClients
      );

    }

    catch (error) {

      console.log(error);

      alert(
        "Failed To Load Clients"
      );
    }
  };








  // UPDATE SALES STATUS
  const updateStatus =
    async (id, status) => {

      try {

        await axios.put(

          `https://crm-1q6v.onrender.com/api/clients/${id}`,

          { status }
        );








        // UPDATE UI
        setClients((prev) =>

          prev.map((client) =>

            client._id === id

              ? {
                  ...client,
                  status,
                }

              : client
          )
        );

      }

      catch (error) {

        console.log(error);

        alert(
          "Failed To Update Status"
        );
      }
    };








  // LOGOUT
  const logout = () => {

    localStorage.removeItem(
      "isLoggedIn"
    );








    localStorage.removeItem(
      "employee"
    );








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

              fontWeight: "bold",

              marginBottom: "5px",
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









      {/* STATS */}
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
                (client) =>
                  client.status ===
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
                Sales Status
              </th>

            </tr>

          </thead>








          <tbody>

            {clients.length > 0 ? (

              clients.map(
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
                      {
                        client.location
                      }
                    </td>








                    <td style={tdStyle}>

                      <select
                        value={
                          client.status
                        }

                        onChange={(e) =>
                          updateStatus(
                            client._id,
                            e.target.value
                          )
                        }

                        style={{
                          padding:
                            "10px",

                          borderRadius:
                            "10px",

                          border:
                            "none",

                          background:
                            client.status ===
                            "Done"
                              ? "#22c55e"
                              : "#f59e0b",

                          color:
                            "white",
                        }}
                      >

                        <option>
                          Not Done
                        </option>

                        <option>
                          Done
                        </option>

                      </select>

                    </td>

                  </tr>
                )
              )

            ) : (

              <tr>

                <td
                  colSpan="5"

                  style={{
                    padding:
                      "20px",

                    textAlign:
                      "center",

                    color:
                      "#94a3b8",
                  }}
                >
                  No Clients Added
                </td>

              </tr>
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