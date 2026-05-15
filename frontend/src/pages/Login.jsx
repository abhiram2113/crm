import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [isHR, setIsHR] =
    useState(false);

  const [isSignup, setIsSignup] =
    useState(false);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [rememberMe, setRememberMe] =
    useState(false);

  // LOAD SAVED LOGIN

  useEffect(() => {

    const savedEmail =
      localStorage.getItem(
        "savedEmail"
      );

    const savedPassword =
      localStorage.getItem(
        "savedPassword"
      );

    if (
      savedEmail &&
      savedPassword
    ) {

      setEmail(savedEmail);

      setPassword(savedPassword);

      setRememberMe(true);
    }

  }, []);

  // LOGIN

  const login = async () => {

    try {

      // HR LOGIN

      if (isHR) {

        const savedHR =
          JSON.parse(
            localStorage.getItem(
              "hrAccount"
            )
          );

        if (
          savedHR &&
          savedHR.email === email &&
          savedHR.password === password
        ) {

          localStorage.setItem(
            "isHRLoggedIn",
            "true"
          );

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

        // REMEMBER LOGIN

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

        navigate("/dashboard");

      } else {

        alert(
          response.data.message
        );
      }

    } catch (error) {

      alert(
        error.response?.data?.message
        ||
        error.message
      );
    }
  };

  // SIGNUP

  const signup = async () => {

    try {

      // HR SIGNUP

      if (isHR) {

        const hrData = {
          name,
          email,
          password,
        };

        localStorage.setItem(
          "hrAccount",
          JSON.stringify(hrData)
        );

        alert(
          "HR Account Created"
        );

        setIsSignup(false);

        return;
      }

      // EMPLOYEE SIGNUP

      const response =
        await axios.post(

          "https://crm-1q6v.onrender.com/api/employees/register",

          {
            name,
            email,
            password,
          }
        );

      alert(
        response.data.message
      );

      setIsSignup(false);

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
        justifyContent:
          "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#020617,#0f172a,#1e293b)",
        padding: "20px",
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
          backdropFilter:
            "blur(10px)",
        }}
      >

        {/* TITLE */}

        <h1
          style={{
            color: "white",
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "35px",
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
            Employee
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
            HR Portal
          </button>

        </div>

        {/* NAME */}

        {
          isSignup && (

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              style={inputStyle}
            />
          )
        }

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email"
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

        {
          !isSignup && (

            <div
              style={{
                display: "flex",
                alignItems:
                  "center",
                gap: "10px",
                marginBottom:
                  "20px",
                color: "white",
              }}
            >

              <input
                type="checkbox"
                checked={
                  rememberMe
                }
                onChange={() =>
                  setRememberMe(
                    !rememberMe
                  )
                }
              />

              Remember Me

            </div>
          )
        }

        {/* BUTTON */}

        <button
          onClick={
            isSignup
              ? signup
              : login
          }
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
            marginBottom: "20px",
          }}
        >
          {
            isSignup
              ? (
                isHR
                  ? "Create HR Account"
                  : "Create Employee Account"
              )
              : (
                isHR
                  ? "HR Login"
                  : "Employee Login"
              )
          }
        </button>

        {/* SWITCH */}

        <p
          style={{
            color: "#94a3b8",
            textAlign: "center",
          }}
        >

          {
            isSignup
              ? "Already have account?"
              : "New user?"
          }

          <span
            onClick={() =>
              setIsSignup(
                !isSignup
              )
            }
            style={{
              color: "#0ea5e9",
              cursor: "pointer",
              marginLeft: "8px",
              fontWeight: "bold",
            }}
          >
            {
              isSignup
                ? "Login"
                : "Signup"
            }
          </span>

        </p>

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