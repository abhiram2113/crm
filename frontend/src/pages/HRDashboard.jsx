// frontend/src/pages/HRDashboard.jsx

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

function HRDashboard() {

  const navigate = useNavigate();

  const [clients, setClients] =
    useState([]);

  useEffect(() => {

    getClients();

  }, []);

  const getClients = async () => {

    try {

      const response =
        await axios.get(
          "https://crm-1q6v.onrender.com/api/clients"
        );

      setClients(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const updateStatus =
    async (id, status) => {

      try {

        await axios.put(

          `https://crm-1q6v.onrender.com/api/clients/${id}`,

          { status }
        );

        getClients();

      } catch (error) {

        console.log(error);
      }
    };

  const logout = () => {

    localStorage.removeItem(
      "isHRLoggedIn"
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

      {/* TOP */}

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
            }}
          >
            HR Dashboard
          </h1>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Employee & Sales Management
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

        <div
          style={{
            background: "#111827",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <h3
            style={{
              color: "#94a3b8",
            }}
          >
            Total Clients
          </h3>

          <h1
            style={{
              color: "white",
              fontSize: "40px",
            }}
          >
            {clients.length}
          </h1>
        </div>

        <div
          style={{
            background: "#111827",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <h3
            style={{
              color: "#94a3b8",
            }}
          >
            Sales Done
          </h3>

          <h1
            style={{
              color: "#22c55e",
              fontSize: "40px",
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

      {/* TABLE */}

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
          Employee Clients
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
                Employee
              </th>

              <th style={thStyle}>
                Client
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

            {
              clients.map(
                (item, index) => (

                  <tr
                    key={index}
                  >

                    <td style={tdStyle}>
                      {item.employeeName}
                    </td>

                    <td style={tdStyle}>
                      {item.clientName}
                    </td>

                    <td style={tdStyle}>
                      {item.email}
                    </td>

                    <td style={tdStyle}>
                      {item.phone}
                    </td>

                    <td style={tdStyle}>
                      {item.location}
                    </td>

                    <td style={tdStyle}>

                      <select
                        value={
                          item.status
                        }
                        onChange={(e) =>
                          updateStatus(
                            item._id,
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
                            item.status ===
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
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}

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

export default HRDashboard;