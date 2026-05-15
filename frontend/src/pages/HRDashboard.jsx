import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

function HRDashboard() {

  const navigate = useNavigate();

  const [clients, setClients] =
    useState([]);

  const [attendance, setAttendance] =
    useState([]);

  const [showAttendance,
    setShowAttendance] =
    useState(false);

  const [showSales,
    setShowSales] =
    useState(false);






  // CHECK LOGIN
  useEffect(() => {

    const employee =
      localStorage.getItem(
        "employee"
      );



    if (!employee) {

      navigate("/");

      return;
    }



    fetchClients();

    fetchAttendance();

  }, []);









  // FETCH CLIENTS
  const fetchClients =
    async () => {

      try {

        const response =
          await fetch(
            "http://localhost:5000/api/clients"
          );

        const data =
          await response.json();

        setClients(data);

      }

      catch (error) {

        console.log(error);

      }
    };










  // FETCH ATTENDANCE
  const fetchAttendance =
    async () => {

      try {

        const response =
          await fetch(
            "http://localhost:5000/api/attendance"
          );

        const data =
          await response.json();

        setAttendance(data);

      }

      catch (error) {

        console.log(error);

      }
    };










  // UPDATE STATUS
  const updateStatus =
    async (id, status) => {

      try {

        await fetch(
          `http://localhost:5000/api/clients/${id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              status,
            }),
          }
        );



        fetchClients();

      }

      catch (error) {

        console.log(error);

      }
    };










  // LOGOUT
  const logout = () => {

    localStorage.clear();

    navigate("/");
  };










  // SALES DONE LIST
  const salesDone =
    clients.filter(
      (client) =>
        client.status ===
        "Sale Done"
    );










  // ACTIVE EMPLOYEES
  const activeEmployees =
    attendance.filter(
      (item) =>
        !item.logoutTime
    );












  return (

    <div
      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(135deg,#020617,#0f172a,#1e293b)",

        padding: "30px",

        fontFamily:
          "'Poppins', sans-serif",

        color: "white",
      }}
    >

      {/* HEADER */}
      <div
        style={{
          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center",

          background:
            "rgba(255,255,255,0.08)",

          backdropFilter:
            "blur(10px)",

          padding: "25px",

          borderRadius: "20px",

          marginBottom: "25px",
        }}
      >

        <div>

          <h1>
            HR Dashboard
          </h1>

          <p
            style={{
              color: "#cbd5e1",
            }}
          >
            Employee Management Portal
          </p>

        </div>







        <button
          onClick={logout}

          style={{
            padding:
              "12px 22px",

            background:
              "linear-gradient(to right,#ef4444,#dc2626)",

            border: "none",

            borderRadius: "12px",

            color: "white",

            cursor: "pointer",

            fontWeight: "600",
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

          marginBottom: "25px",
        }}
      >

        {/* LEADS */}
        <div
          style={cardStyle(
            "#8b5cf6",
            "#7c3aed"
          )}
        >

          <h1>
            {clients.length}
          </h1>

          <p>
            Total Leads
          </p>

        </div>








        {/* ATTENDANCE */}
        <div
          onClick={() =>
            setShowAttendance(
              !showAttendance
            )
          }

          style={cardStyle(
            "#22c55e",
            "#16a34a"
          )}
        >

          <h1>
            {
              activeEmployees.length
            }
          </h1>

          <p>
            Active Employees
          </p>

        </div>








        {/* SALES */}
        <div
          onClick={() =>
            setShowSales(
              !showSales
            )
          }

          style={cardStyle(
            "#38bdf8",
            "#0ea5e9"
          )}
        >

          <h1>
            {
              salesDone.length
            }
          </h1>

          <p>
            Sales Done
          </p>

        </div>

      </div>









      {/* ATTENDANCE PANEL */}
      {showAttendance && (

        <div
          style={panelStyle}
        >

          <h2>
            Employee Attendance
          </h2>








          <table
            style={tableStyle}
          >

            <thead>

              <tr>

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
                  Status
                </th>

              </tr>

            </thead>








            <tbody>

              {attendance.map(
                (item) => (

                  <tr
                    key={item._id}
                  >

                    <td style={tdStyle}>
                      {
                        item.employeeName
                      }
                    </td>







                    <td style={tdStyle}>
                      {new Date(
                        item.loginTime
                      ).toLocaleString()}
                    </td>







                    <td style={tdStyle}>

                      {item.logoutTime
                        ?
                        new Date(
                          item.logoutTime
                        ).toLocaleString()
                        :
                        "Still Working"}

                    </td>







                    <td style={tdStyle}>

                      {!item.logoutTime
                        ?
                        "🟢 Active"
                        :
                        "🔴 Logged Out"}

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>
      )}









      {/* SALES PANEL */}
      {showSales && (

        <div
          style={panelStyle}
        >

          <h2>
            Sales Done Clients
          </h2>








          <table
            style={tableStyle}
          >

            <thead>

              <tr>

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

              </tr>

            </thead>








            <tbody>

              {salesDone.map(
                (client) => (

                  <tr
                    key={client._id}
                  >

                    <td style={tdStyle}>
                      {
                        client.employeeName
                      }
                    </td>







                    <td style={tdStyle}>
                      {client.name}
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

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>
      )}









      {/* CLIENT TABLE */}
      <div
        style={panelStyle}
      >

        <h2>
          Employee Clients
        </h2>








        <table
          style={tableStyle}
        >

          <thead>

            <tr>

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

            {clients.map(
              (client) => (

                <tr
                  key={client._id}
                >

                  <td style={tdStyle}>
                    {
                      client.employeeName
                    }
                  </td>







                  <td style={tdStyle}>
                    {client.name}
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
                          "8px 12px",

                        borderRadius:
                          "10px",

                        border: "none",

                        background:
                          client.status ===
                          "Sale Done"
                            ? "#22c55e"
                            : "#f59e0b",

                        color: "white",

                        fontWeight:
                          "600",
                      }}
                    >

                      <option value="Not Done">
                        Not Done
                      </option>

                      <option value="Sale Done">
                        Sale Done
                      </option>

                    </select>

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










const cardStyle =
  (c1, c2) => ({

    background:
      `linear-gradient(to right,${c1},${c2})`,

    padding: "25px",

    borderRadius: "18px",

    cursor: "pointer",

    transition: "0.3s",
  });










const panelStyle = {

  background:
    "rgba(255,255,255,0.08)",

  backdropFilter:
    "blur(10px)",

  borderRadius: "20px",

  padding: "25px",

  overflowX: "auto",

  marginBottom: "25px",
};










const tableStyle = {

  width: "100%",

  borderCollapse:
    "collapse",
};










const thStyle = {

  padding: "15px",

  textAlign: "left",

  background:
    "rgba(255,255,255,0.1)",
};










const tdStyle = {

  padding: "15px",

  borderBottom:
    "1px solid rgba(255,255,255,0.08)",
};










export default HRDashboard;