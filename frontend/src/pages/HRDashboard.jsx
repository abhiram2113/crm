import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function HRDashboard() {

  const navigate = useNavigate();

  const [employees, setEmployees] =
    useState([]);








  useEffect(() => {

    getEmployees();

  }, []);








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
  const removeEmployee =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Remove Employee?"
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
          "Failed To Remove"
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









      {/* EMPLOYEE TABLE */}
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
                        removeEmployee(
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

                        fontWeight:
                          "bold",

                        cursor:
                          "pointer",
                      }}
                    >
                      Remove Employee
                    </button>

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