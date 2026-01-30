import { useState, useEffect } from "react";
import axios from "axios";
import SalesLine from "./charts/SalesLine";
import SalesByCountry from "./charts/SalesByCountry";
import SessionsByDevice from "./charts/SessionsByDevice";

const Dashboard = () => {
  // 1. Declare State ONCE
  const [device, setDevice] = useState("");
  const [data, setData] = useState([]);
  const [prevData, setPrevData] = useState([]);

  // Filter Pills
  const filters = [
    { label: "All", value: "" },
    { label: "Mobile", value: "mobile" },
    { label: "Desktop", value: "desktop" },
    { label: "Tablet", value: "tablet" },
    { label: "Other", value: "other" },
  ];

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const url = device
          ? import.meta.env.VITE_URL + `/device/${device}`
          : import.meta.env.VITE_URL + "/analytics";

        const res = await axios.get(url, { withCredentials: true });

        // Handle both object {current, prev} and array formats
        if (res.data.currentPeriod) {
          setData(res.data.currentPeriod);
          setPrevData(res.data.previousPeriod || []);
        } else {
          setData(res.data);
          setPrevData([]);
        }
      } catch (err) {
        console.error("Failed to fetch analytics", err);
      }
    };

    fetchAnalytics();
  }, [device]);

  return (
    <div style={{ padding: "24px", background: "#f1f5f9", minHeight: "100vh" }}>
      {/* Header & Filter */}
      <div
        style={{
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#1e293b",
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          Analytics
        </h2>

        {/* Filter Pills */}
        <div
          style={{
            background: "#fff",
            padding: "4px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            display: "flex",
            gap: "4px",
          }}
        >
          {filters.map((f) => (
            <button
              key={f.label}
              onClick={() => setDevice(f.value)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s",
                backgroundColor: device === f.value ? "#0f172a" : "transparent",
                color: device === f.value ? "#fff" : "#64748b",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "20px",
          width: "100%",
        }}
      >
        <div
          style={{
            height: "400px",
            background: "#fff",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <SalesLine data={data} prevData={prevData} />
        </div>
        <div
          style={{
            height: "400px",
            background: "#fff",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <SalesByCountry data={data} />
        </div>
        <div
          style={{
            height: "400px",
            background: "#fff",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <SessionsByDevice data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
