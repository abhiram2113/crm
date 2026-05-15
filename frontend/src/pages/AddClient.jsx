import { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

function AddClient() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");

  const [location, setLocation] =
    useState("");



  const saveClient = async () => {

    try {

      const newClient = {
        employeeName:
          localStorage.getItem(
            "username"
          ),

        name,
        phone,
        email,
        location,
      };



      await axios.post(
        "http://localhost:5000/api/clients",
        newClient
      );



      alert("Client Added Successfully");

      navigate("/");
    }

    catch (error) {

      console.log(error);
    }
  };



  return (

    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
      }}
    >

      <h2>Add Client</h2>



      <input
        type="text"
        placeholder="Client Name"

        value={name}

        onChange={(e) =>
          setName(e.target.value)
        }

        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
        }}
      />



      <input
        type="text"
        placeholder="Phone"

        value={phone}

        onChange={(e) =>
          setPhone(e.target.value)
        }

        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
        }}
      />



      <input
        type="email"
        placeholder="Email"

        value={email}

        onChange={(e) =>
          setEmail(e.target.value)
        }

        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
        }}
      />



      <input
        type="text"
        placeholder="Location"

        value={location}

        onChange={(e) =>
          setLocation(e.target.value)
        }

        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
        }}
      />



      <button
        onClick={saveClient}

        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >

        Save Client

      </button>

    </div>
  );
}

export default AddClient;