import { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [isHR, setIsHR] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [rememberMe, setRememberMe] =
    useState(false);








  // LOGIN
  const login = async () => {

    try {

      // SAVE LOGIN
      if (rememberMe) {

        localStorage.setItem(
          "savedEmail",
          email
        );

        localStorage.setItem(
          "savedPassword",
          password
        );

      }








      // ======================
      // HR LOGIN
      // ======================

      if (isHR) {

        // STATIC HR LOGIN
        if (
          email === "hr@gmail.com"
          &&
          password === "123456"
        ) {

          localStorage.setItem(
            "isHRLoggedIn",
            "true"
          );



          navigate(
            "/hr-dashboard"
          );



        } else {

          alert(
            "Invalid HR Credentials"
          );
        }

        return;
      }








      // ======================
      // EMPLOYEE LOGIN
      // ======================

      const response =
        await axios.post(

          "https://crm-1q6v.onrender.com/api/employees/login",

          {
            email,
            password,
          }
        );








      // SUCCESS
      if (response.data.employee) {

        localStorage.setItem(
          "isLoggedIn",
          "true"
        );



        localStorage.setItem(
          "employee",

          JSON.stringify(
            response.data.employee
          )
        );



        navigate(
          "/dashboard"
        );

      } else {

        alert(
          "Invalid Employee Credentials"
        );
      }

    }

    catch (error) {

      console.log(error);

      alert(
        "Login Failed"
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
      }}
    >

      <div
        style={{
          width: "420px",

          background:
            "rgba(17,24,39,0.95)",

          padding: "40px",

          borderRadius: "25px",

          boxShadow:
            "0px 0px 40px rgba(0,0,0,0.5)",
        }}
      >

        {/* TITLE */}

        <h1
          style={{
            color: "white",

            textAlign: "center",

            marginBottom: "10px",
          }}
        >
          Hire Orbit CRM
        </h1>








        <p
          style={{
            color: "#94a3b8",

            textAlign: "center",

            marginBottom: "30px",
          }}
        >
          Employee & HR Portal
        </p>









        {/* TOGGLE */}
        <div
          style={{
            display: "flex",

            background: "#1e293b",

            borderRadius: "12px",

            overflow: "hidden",

            marginBottom: "25px",
          }}
        >

          <button
            onClick={() =>
              setIsHR(false)
            }

            style={{
              flex: 1,

              padding: "14px",

              border: "none",

              background:
                !isHR
                  ? "#0ea5e9"
                  : "transparent",

              color: "white",

              fontWeight: "bold",

              cursor: "pointer",
            }}
          >
            Employee Login
          </button>








          <button
            onClick={() =>
              setIsHR(true)
            }

            style={{
              flex: 1,

              padding: "14px",

              border: "none",

              background:
                isHR
                  ? "#8b5cf6"
                  : "transparent",

              color: "white",

              fontWeight: "bold",

              cursor: "pointer",
            }}
          >
            HR Login
          </button>

        </div>









        {/* EMAIL */}
        <input
          type="email"

          placeholder={
            isHR
              ? "HR Email"
              : "Employee Email"
          }

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }

          style={inputStyle}
        />









        {/* PASSWORD */}
        <input
          type="password"

          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }

          style={inputStyle}
        />









        {/* REMEMBER */}
        <div
          style={{
            display: "flex",

            alignItems: "center",

            gap: "10px",

            marginBottom: "20px",

            color: "white",
          }}
        >

          <input
            type="checkbox"

            checked={rememberMe}

            onChange={() =>
              setRememberMe(
                !rememberMe
              )
            }
          />

          Remember Me

        </div>









        {/* LOGIN BUTTON */}
        <button
          onClick={login}

          style={{
            width: "100%",

            padding: "15px",

            border: "none",

            borderRadius: "12px",

            background:
              isHR
                ? "#8b5cf6"
                : "#0ea5e9",

            color: "white",

            fontWeight: "bold",

            fontSize: "17px",

            cursor: "pointer",
          }}
        >

          {isHR
            ? "Login As HR"
            : "Login As Employee"}

        </button>









        {/* HR CREDENTIALS */}
        {isHR && (

          <div
            style={{
              marginTop: "20px",

              background: "#1e293b",

              padding: "15px",

              borderRadius: "12px",

              color: "#cbd5e1",

              fontSize: "14px",
            }}
          >

            <p>
              HR Email:
              hr@gmail.com
            </p>

            <p>
              Password:
              123456
            </p>

          </div>
        )}

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










export default Login;