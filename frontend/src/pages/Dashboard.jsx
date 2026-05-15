import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const [clients, setClients] =
    useState([]);

  const [employee, setEmployee] =
    useState(null);





  // CHECK LOGIN
  useEffect(() => {

    const storedEmployee =
      localStorage.getItem(
        "employee"
      );



    if (!storedEmployee) {

      navigate("/");

      return;
    }



    setEmployee(
      JSON.parse(storedEmployee)
    );



    fetchClients();

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
  const handleLogout =
    async () => {

      try {

        const attendanceId =
          localStorage.getItem(
            "attendanceId"
          );



        if (attendanceId) {

          await fetch(
            `http://localhost:5000/api/attendance/logout/${attendanceId}`,
            {
              method: "PUT",
            }
          );
        }






        // CLEAR STORAGE
        localStorage.removeItem(
          "employee"
        );

        localStorage.removeItem(
          "attendanceId"
        );






        // REDIRECT
        navigate("/");

      }

      catch (error) {

        console.log(error);

      }
    };









  return (

    <div
      style={{
        padding: "30px",
        background: "#f4f4f4",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "20px",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
        }}
      >

        <div>

          <h1>
            Hire Orbit CRM
          </h1>

          <h3>
            Welcome{" "}
            {employee?.name}
          </h3>

        </div>





        <button
          onClick={handleLogout}

          style={{
            padding: "10px 20px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>

      </div>









      {/* ADD CLIENT */}
      <button
        onClick={() =>
          navigate("/add-client")
        }

        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Client
      </button>









      {/* CLIENT TABLE */}
      <table
        border="1"
        cellPadding="10"

        style={{
          width: "100%",
          borderCollapse:
            "collapse",
          background: "white",
        }}
      >

        <thead>

          <tr>

            <th>Name</th>

            <th>Email</th>

            <th>Phone</th>

            <th>Location</th>

            <th>Status</th>

          </tr>

        </thead>








        <tbody>

          {clients.map((client) => (

            <tr key={client._id}>

              <td>
                {client.name}
              </td>

              <td>
                {client.email}
              </td>

              <td>
                {client.phone}
              </td>

              <td>
                {client.location}
              </td>





              <td>

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

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Dashboard;