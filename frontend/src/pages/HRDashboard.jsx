import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

function HRDashboard() {

  const navigate = useNavigate();

  const [clients, setClients] =
    useState([]);

  const [attendance, setAttendance] =
    useState([]);

  const [employees, setEmployees] =
    useState([]);








  useEffect(() => {

    getClients();

    getAttendance();

    getEmployees();

  }, []);








  // GET CLIENTS
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








  // GET ATTENDANCE
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








  // GET EMPLOYEES
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








  // DELETE EMPLOYEE
  const deleteEmployee =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Remove this employee?"
        );

      if (!confirmDelete)
        return;

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








  // UPDATE SALE STATUS
  const updateStatus =
    async (id, status) => {

      try {

        await axios.put(

          `https://crm-1q6v.onrender.com/api/clients/${id}`,

          { status }
        );

        getClients();

      }

      catch (error) {

        console.log(error);
      }
    };








  // LOGOUT
  const logout = () => {

    localStorage.removeItem(
      "isHRLoggedIn"
    );

    navigate("/login");
  };








  // CALCULATE HOURS
  const calculateHours =
    (loginTime, logoutTime) => {

      if (!logoutTime)
        return "Still Working";

      const start =
        new Date(loginTime);

      const end =
        new Date(logoutTime);

      const diff =
        end - start;

      const hours =
        Math.floor(
          diff / 1000 / 60 / 60
        );

      const minutes =
        Math.floor(
          (diff / 1000 / 60) % 60
        );

      return `${hours}h ${minutes}m`;
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
            }}
          >
            HR Dashboard
          </h1>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Employee Management
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

        <div style={cardStyle}>
          <h3 style={cardTitle}>
            Total Employees
          </h3>

          <h1 style={cardValue}>
            {employees.length}
          </h1>
        </div>








        <div style={cardStyle}>
          <h3 style={cardTitle}>
            Active Employees
          </h3>

          <h1
            style={{
              ...cardValue,
              color: "#22c55e",
            }}
          >
            {
              attendance.filter(
                (item) =>
                  !item.logoutTime
              ).length
            }
          </h1>
        </div>








        <div style={cardStyle}>
          <h3 style={cardTitle}>
            Sales Done
          </h3>

          <h1
            style={{
              ...cardValue,
              color: "#0ea5e9",
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









      {/* EMPLOYEE LIST */}
      <div style={tableContainer}>

        <h2 style={sectionTitle}>
          Employees
        </h2>








        <table style={tableStyle}>

          <thead>

            <tr
              style={{
                background: "#1e293b",
              }}
            >

              <th style={thStyle}>
                Name
              </th>

              <th style={thStyle}>
                Email
              </th>

              <th style={thStyle}>
                Action
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
                          "10px 18px",

                        border: "none",

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









      {/* ATTENDANCE */}
      <div
        style={{
          ...tableContainer,
          marginTop: "30px",
        }}
      >

        <h2 style={sectionTitle}>
          Attendance
        </h2>








        <table style={tableStyle}>

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
                Login Time
              </th>

              <th style={thStyle}>
                Logout Time
              </th>

              <th style={thStyle}>
                Working Hours
              </th>

              <th style={thStyle}>
                Status
              </th>

            </tr>

          </thead>








          <tbody>

            {attendance.map(
              (item, index) => (

                <tr key={index}>

                  <td style={tdStyle}>
                    {
                      item.employeeName
                    }
                  </td>








                  <td style={tdStyle}>
                    {
                      new Date(
                        item.loginTime
                      ).toLocaleString()
                    }
                  </td>








                  <td style={tdStyle}>

                    {item.logoutTime
                      ?
                      new Date(
                        item.logoutTime
                      ).toLocaleString()
                      :
                      "--"}

                  </td>








                  <td style={tdStyle}>

                    {
                      calculateHours(
                        item.loginTime,
                        item.logoutTime
                      )
                    }

                  </td>








                  <td style={tdStyle}>

                    <span
                      style={{
                        padding:
                          "8px 15px",

                        borderRadius:
                          "20px",

                        background:
                          item.logoutTime
                            ? "#ef4444"
                            : "#22c55e",

                        color:
                          "white",
                      }}
                    >

                      {item.logoutTime
                        ? "Offline"
                        : "Active"}

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










const tableContainer = {

  background: "#111827",

  borderRadius: "20px",

  padding: "20px",

  overflowX: "auto",
};










const sectionTitle = {

  color: "white",

  marginBottom: "20px",
};










const tableStyle = {

  width: "100%",

  borderCollapse:
    "collapse",
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