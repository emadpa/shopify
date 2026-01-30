import { useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/navbar";
import axios from "axios";
import "./index.css";

function App() {
  useEffect(() => {
    const seedDatabase = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/seed",
          {},
          { withCredentials: true },
        );

        console.log(response.data);
      } catch (error) {
        console.error("Error seeding database:", error);
      }
    };

    seedDatabase();
  });
  return (
    <>
      <Navbar />
      <div className="app-container">
        <Dashboard />
      </div>
    </>
  );
}

export default App;
