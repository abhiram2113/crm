import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function HRDashboard() {

  const navigate = useNavigate();

  const [employees, setEmployees] =
    useState([]);

  const [clients, setClients] =
    useState([]);








  useEffect(() => {

    getEmployees();

    getClients();

  }, []);








  // GET EMPLOYEES
  const getEmployees =
    async () => {

      try {

        const response =
          await axios.get(

            "https://crm-1q6v.onrender.com/api/employees"
          );








        setEmployees(
          response.data
        );

      }

      catch (error) {

        console.log(error);
      }
    };








  // GET CLIENTS
  const getClients =
    async () => {

      try {

        const response =
          await axios.get(

            "https://crm-1q6v.onrender.com/api/clients"
          );








        setClients(
          response.data
        );

      }

      catch (error) {

        console.log(error);
      }
    };








  // DELETE EMPLOYEE
  const deleteEmployee =
    async (id) => {

      try {

        await axios.delete(

          `https://crm-1q6v.onrender.com/api/employees/${id}`
        );








        alert(
          "Employee Removed"
        );








        getEmployees();

      }

      catch (error) {

        console.log(error);

        alert(
          "Failed To Remove Employee"
        );
      }
    };








  // LOGOUT
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
          "linear-gradient(135deg,#020617,#020617,#0f172a)",

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

              fontSize: "42px",

              fontWeight: "bold",
            }}
          >
            HireOrbit HR
          </h1>








          <p
            style={{
              color: "#94a3b8",

              marginTop: "8px",

              fontSize: "18px",
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
              "14px 25px",

            border: "none",

            borderRadius: "12px",

            background: "#ef4444",

            color: "white",

            fontWeight: "bold",

            cursor: "pointer",
          }}
        >
          Logout
        </button>

      </div>









      {/* TOP CARDS */}
      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",

          gap: "20px",

          marginBottom: "35px",
        }}
      >

        {/* EMPLOYEES */}
        <div style={cardStyle}>

          <h3 style={cardTitle}>
            Total Employees
          </h3>








          <h1 style={cardValue}>
            {employees.length}
          </h1>

        </div>








        {/* CLIENTS */}
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









      {/* EMPLOYEE SECTION */}
      <div
        style={{
          background: "#111827",

          borderRadius: "20px",

          padding: "25px",

          marginBottom: "35px",
        }}
      >

        <h2
          style={{
            color: "white",

            marginBottom: "20px",
          }}
        >
          Employees
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
                Employee Name
              </th>

              <th style={thStyle}>
                Email
              </th>

              <th style={thStyle}>
                Remove
              </th>

            </tr>

          </thead>








          <tbody>

            {employees.map(
              (employee, index) => (

                <tr key={index}>

                  <td style={tdStyle}>
                    {employee.name}
                  </td>








                  <td style={tdStyle}>
                    {employee.email}
                  </td>








                  <td style={tdStyle}>

                    <button
                      onClick={() =>
                        deleteEmployee(
                          employee._id
                        )
                      }

                      style={{
                        padding:
                          "10px 15px",

                        border:
                          "none",

                        borderRadius:
                          "10px",

                        background:
                          "#ef4444",

                        color:
                          "white",

                        cursor:
                          "pointer",
                      }}
                    >
                      Remove
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>









      {/* CLIENT SECTION */}
      <div
        style={{
          background: "#111827",

          borderRadius: "20px",

          padding: "25px",
        }}
      >

        <h2
          style={{
            color: "white",

            marginBottom: "20px",
          }}
        >
          Employee Clients &
          Sales
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
                Sales Status
              </th>

            </tr>

          </thead>








          <tbody>

            {clients.map(
              (client, index) => (

                <tr key={index}>

                  <td style={tdStyle}>
                    {
                      client.employeeName
                    }
                  </td>








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

                    <span
                      style={{
                        padding:
                          "8px 14px",

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

  marginBottom: "10px",
};










const cardValue = {

  color: "white",

  fontSize: "40px",

  fontWeight: "bold",
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










export default HRDashboard;