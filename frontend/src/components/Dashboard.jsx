import { useState, useEffect } from "react";
import axios from "axios";
import SalesLine from "./charts/SalesLine";
import SalesByCountry from "./charts/SalesByCountry";
import SessionsByDevice from "./charts/SessionsByDevice";

const Dashboard = () => {
  const [device, setDevice] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const url = device
          ? `http://localhost:5000/analytics/device/${device}`
          : "http://localhost:5000/analytics";

        const res = await axios.get(url, {
          withCredentials: true,
        });

        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch analytics", err);
      }
    };

    fetchAnalytics();
  }, [device]);

  // Use useMemo for filtering to improve performance
  // const filteredData = useMemo(() => {
  //   if (!device) return analyticsData;
  //   return analyticsData.filter((item) => item.device === device);
  // }, [device]);

  return (
    <div
      className="dashboard-container"
      style={{ padding: "20px", background: "#f9fafb" }}
    >
      <div
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0 }}>Analytics</h2>

        <select
          value={device}
          onChange={(e) => setDevice(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ddd",
          }}
        >
          <option value="">All devices</option>
          <option value="mobile">Mobile</option>
          <option value="desktop">Desktop</option>
          <option value="tablet">Tablet</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div
        className="grid"
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {/* Main Sales Chart */}
        <div
          className="card wide"
          style={{
            gridColumn: "1 / -1",
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          <SalesLine data={data} />
        </div>

        {/* Country Breakdown */}
        <div
          className="card"
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          <SalesByCountry data={data} />
        </div>

        {/* Device Breakdown */}
        <div
          className="card"
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          <SessionsByDevice data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
