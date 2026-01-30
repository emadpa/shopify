import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = {
  mobile: "#2979ff",
  desktop: "#5c6bc0",
  tablet: "#00b0ff",
  other: "#9c27b0",
};

const DeviceSalesList = ({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        minWidth: "140px",
      }}
    >
      {data.map((item) => (
        <div
          key={item.name}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: COLORS[item.name] || COLORS.other,
                borderRadius: "3px",
              }}
            />
            <span
              style={{
                textTransform: "capitalize",
                fontSize: "14px",
                color: "#4b5563",
              }}
            >
              {item.name}
            </span>
          </div>
          <span style={{ fontWeight: "600", fontSize: "14px" }}>
            {item.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

const SessionsByDevice = ({ data }) => {
  // Aggregate sessions by device
  const aggregated = data.reduce((acc, item) => {
    const knownDevices = ["mobile", "desktop", "tablet"];
    const deviceName = knownDevices.includes(item.device)
      ? item.device
      : "other";
    acc[deviceName] = (acc[deviceName] || 0) + item.sessions;
    return acc;
  }, {});

  // Transform to array format for Recharts
  const sessionsData = Object.entries(aggregated).map(([name, value]) => ({
    name,
    value,
  }));

  const totalSessions = sessionsData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div>
      <h3 style={{ fontSize: "16px", marginBottom: "20px", color: "#374151" }}>
        Sessions by device
      </h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {/* Left: Pie Chart with Center Text */}
        <div style={{ width: "180px", height: "180px", position: "relative" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sessionsData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                stroke="none"
              >
                {sessionsData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[entry.name] || COLORS.other}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Centered Total Text */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>
              {(totalSessions / 1000).toFixed(0)}K
            </div>
          </div>
        </div>

        {/* Right: Legend/List */}
        <DeviceSalesList data={sessionsData} />
      </div>
    </div>
  );
};

export default SessionsByDevice;
