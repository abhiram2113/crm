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

  const login = async () => {

    try {

      // HR LOGIN

      if (isHR) {

        if (
          email === "hr@gmail.com"
          &&
          password === "123456"
        ) {

          localStorage.setItem(
            "isHRLoggedIn",
            "true"
          );

          navigate("/hr-dashboard");

        } else {

          alert("Invalid HR Credentials");
        }

        return;
      }

      // EMPLOYEE LOGIN

      const response =
        await axios.post(

          "https://crm-1q6v.onrender.com/api/employees/login",

          {
            email,
            password,
          }
        );

      if (response.data.success) {

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

        navigate("/dashboard");

      } else {

        alert(response.data.message);
      }

    } catch (error) {

      alert(
        error.response?.data?.message
        ||
        error.message
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
          "linear-gradient(135deg,#0f172a,#1e293b)",
        padding: "20px",
      }}
    >

      <div
        style={{
          width: "400px",
          background: "#111827",
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
          Hire Orbit CRM
        </h1>

        <p
          style={{
            color: "#94a3b8",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          CRM & Employee Management
        </p>

        {/* TOGGLE */}

        <div
          style={{
            display: "flex",
            background: "#1e293b",
            borderRadius: "10px",
            overflow: "hidden",
            marginBottom: "20px",
          }}
        >

          <button
            onClick={() => setIsHR(false)}
            style={{
              flex: 1,
              padding: "12px",
              border: "none",
              background:
                !isHR
                  ? "#0ea5e9"
                  : "transparent",
              color: "white",
              cursor: "pointer",
            }}
          >
            Employee
          </button>

          <button
            onClick={() => setIsHR(true)}
            style={{
              flex: 1,
              padding: "12px",
              border: "none",
              background:
                isHR
                  ? "#8b5cf6"
                  : "transparent",
              color: "white",
              cursor: "pointer",
            }}
          >
            HR Portal
          </button>

        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "none",
            background: "#1e293b",
            color: "white",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "none",
            background: "#1e293b",
            color: "white",
          }}
        />

        <button
          onClick={login}
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "10px",
            background:
              isHR
                ? "#8b5cf6"
                : "#0ea5e9",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {isHR
            ? "HR Login"
            : "Employee Login"}
        </button>

      </div>

    </div>
  );
}

export default Login;