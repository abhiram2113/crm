import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

function Login() {

  const navigate =
    useNavigate();

  const [isHR, setIsHR] =
    useState(false);

  const [isSignup,
    setIsSignup] =
    useState(false);

  const [rememberMe,
    setRememberMe] =
    useState(false);

  const [formData,
    setFormData] =
    useState({

      name: "",

      email: "",

      password: "",
    });








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

      setFormData({

        name: "",

        email:
          savedEmail,

        password:
          savedPassword,
      });

      setRememberMe(true);
    }

  }, []);









  // HANDLE INPUT
  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,
      });
    };









  // HANDLE SUBMIT
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        // SIGNUP
        if (
          isSignup &&
          !isHR
        ) {

          const response =
            await fetch(
              "http://localhost:5000/api/employees/register",
              {
                method:
                  "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body:
                  JSON.stringify(
                    formData
                  ),
              }
            );

          const data =
            await response.json();

          alert(
            data.message
          );

          setIsSignup(false);

          return;
        }









        // LOGIN
        const response =
          await fetch(
            "http://localhost:5000/api/employees/login",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  email:
                    formData.email,

                  password:
                    formData.password,
                }),
            }
          );



        const data =
          await response.json();








        if (!response.ok) {

          alert(
            data.message
          );

          return;
        }









        // REMEMBER ME
        if (rememberMe) {

          localStorage.setItem(
            "savedEmail",
            formData.email
          );

          localStorage.setItem(
            "savedPassword",
            formData.password
          );

        } else {

          localStorage.removeItem(
            "savedEmail"
          );

          localStorage.removeItem(
            "savedPassword"
          );
        }









        // SAVE USER
        localStorage.setItem(
          "employee",

          JSON.stringify(
            data.employee
          )
        );










        // HR LOGIN
        if (
          data.role ===
          "hr"
        ) {

          navigate(
            "/hr-dashboard"
          );

          return;
        }










        // ATTENDANCE LOGIN
        const attendanceResponse =
          await fetch(
            "http://localhost:5000/api/attendance/login",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  employeeName:
                    data.employee.name,
                }),
            }
          );



        const attendanceData =
          await attendanceResponse.json();








        localStorage.setItem(
          "attendanceId",
          attendanceData._id
        );



        navigate(
          "/dashboard"
        );

      }

      catch (error) {

        console.log(error);

        alert(
          "Something went wrong"
        );
      }
    };












  return (

    <div
      style={{
        minHeight:
          "100vh",

        display: "flex",

        justifyContent:
          "center",

        alignItems:
          "center",

        background:
          "linear-gradient(135deg,#0f172a,#1e293b,#334155)",

        fontFamily:
          "'Poppins', sans-serif",

        padding: "20px",
      }}
    >

      {/* LOGIN CARD */}
      <div
        style={{
          width: "420px",

          background:
            "rgba(255,255,255,0.08)",

          backdropFilter:
            "blur(15px)",

          border:
            "1px solid rgba(255,255,255,0.1)",

          borderRadius:
            "24px",

          padding: "40px",

          boxShadow:
            "0 10px 40px rgba(0,0,0,0.3)",

          color: "white",
        }}
      >

        {/* TITLE */}
        <div
          style={{
            textAlign:
              "center",

            marginBottom:
              "30px",
          }}
        >

          <h1
            style={{
              fontSize:
                "38px",

              marginBottom:
                "10px",
            }}
          >
            Hire Orbit
          </h1>

          <p
            style={{
              color:
                "#cbd5e1",
            }}
          >
            CRM & Employee Management
          </p>

        </div>









        {/* TOGGLE */}
        <div
          style={{
            display: "flex",

            background:
              "rgba(255,255,255,0.08)",

            borderRadius:
              "14px",

            padding: "5px",

            marginBottom:
              "25px",
          }}
        >

          <button
            onClick={() =>
              setIsHR(false)
            }

            style={{
              flex: 1,

              padding:
                "12px",

              border: "none",

              borderRadius:
                "10px",

              background:
                !isHR
                  ?
                  "#38bdf8"
                  :
                  "transparent",

              color:
                "white",

              fontWeight:
                "600",

              cursor:
                "pointer",
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

              padding:
                "12px",

              border: "none",

              borderRadius:
                "10px",

              background:
                isHR
                  ?
                  "#38bdf8"
                  :
                  "transparent",

              color:
                "white",

              fontWeight:
                "600",

              cursor:
                "pointer",
            }}
          >
            HR Portal
          </button>

        </div>









        {/* FORM */}
        <form
          onSubmit={
            handleSubmit
          }
        >

          {/* NAME */}
          {isSignup &&
            !isHR && (

              <input
                type="text"

                name="name"

                placeholder="Full Name"

                value={
                  formData.name
                }

                onChange={
                  handleChange
                }

                required

                style={
                  inputStyle
                }
              />
            )}









          {/* EMAIL */}
          <input
            type="email"

            name="email"

            placeholder="Email Address"

            value={
              formData.email
            }

            onChange={
              handleChange
            }

            required

            style={
              inputStyle
            }
          />










          {/* PASSWORD */}
          <input
            type="password"

            name="password"

            placeholder="Password"

            value={
              formData.password
            }

            onChange={
              handleChange
            }

            required

            style={
              inputStyle
            }
          />










          {/* REMEMBER */}
          {!isSignup && (

            <div
              style={{
                display:
                  "flex",

                alignItems:
                  "center",

                marginBottom:
                  "20px",
              }}
            >

              <input
                type="checkbox"

                checked={
                  rememberMe
                }

                onChange={(e) =>
                  setRememberMe(
                    e.target.checked
                  )
                }
              />

              <span
                style={{
                  marginLeft:
                    "10px",

                  color:
                    "#cbd5e1",
                }}
              >
                Remember Me
              </span>

            </div>
          )}










          {/* BUTTON */}
          <button
            type="submit"

            style={{
              width: "100%",

              padding:
                "14px",

              border: "none",

              borderRadius:
                "14px",

              background:
                "linear-gradient(to right,#38bdf8,#0ea5e9)",

              color:
                "white",

              fontWeight:
                "700",

              fontSize:
                "16px",

              cursor:
                "pointer",

              marginBottom:
                "20px",
            }}
          >

            {isSignup
              ?
              "Create Account"
              :
              isHR
              ?
              "Enter HR Portal"
              :
              "Employee Login"}

          </button>

        </form>










        {/* FOOTER */}
        {!isHR && (

          <div
            style={{
              textAlign:
                "center",

              color:
                "#cbd5e1",
            }}
          >

            {isSignup
              ?
              "Already have account?"
              :
              "New Employee?"}

            <span
              onClick={() =>
                setIsSignup(
                  !isSignup
                )
              }

              style={{
                color:
                  "#38bdf8",

                marginLeft:
                  "8px",

                cursor:
                  "pointer",

                fontWeight:
                  "600",
              }}
            >

              {isSignup
                ?
                "Login"
                :
                "Signup"}

            </span>

          </div>
        )}

      </div>

    </div>
  );
}










const inputStyle = {

  width: "100%",

  padding: "14px",

  marginBottom:
    "18px",

  border: "none",

  outline: "none",

  borderRadius:
    "14px",

  background:
    "rgba(255,255,255,0.08)",

  color: "white",

  fontSize: "15px",
};










export default Login;