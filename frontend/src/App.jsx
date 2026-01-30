import Dashboard from "./components/Dashboard";
import Navbar from "./components/navbar";

import "./index.css";
import About from "./components/About";

function App() {
  return (
    <>
      <Navbar />
      <About />
      <div className="app-container">
        <Dashboard />
      </div>
    </>
  );
}

export default App;
