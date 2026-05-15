import { createContext, useState } from "react";

export const ClientContext = createContext();

function ClientProvider({ children }) {
  const [clients, setClients] = useState([
    {
      name: "Rahul",
      phone: "9876543210",
      email: "rahul@gmail.com",
      location: "Mumbai",
      status: "Sale Done",
    },

    {
      name: "Priya",
      phone: "9123456780",
      email: "priya@gmail.com",
      location: "Delhi",
      status: "Not Done",
    },
  ]);

  return (
    <ClientContext.Provider value={{ clients, setClients }}>
      {children}
    </ClientContext.Provider>
  );
}

export default ClientProvider;