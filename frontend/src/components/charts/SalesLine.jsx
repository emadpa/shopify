import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};

const formatRange = (data) => {
  if (!data || data.length === 0) return "";
  const start = new Date(data[0].date);
  const end = new Date(data[data.length - 1].date);
  const options = { month: "short", day: "numeric", year: "numeric" };
  return `${start.toLocaleDateString("en-US", options)} – ${end.toLocaleDateString("en-US", options)}`;
};

const formatK = (value) => {
  const num = Number(value);
  if (isNaN(num)) return "₹0";
  if (num >= 1e7) return `₹${(num / 1e7).toFixed(2)}Cr`;
  if (num >= 1e5) return `₹${(num / 1e5).toFixed(1)}L`;
  if (num >= 1e3) return `₹${(num / 1e3).toFixed(1)}K`;
  return `₹${num}`;
};

const aggregateData = (rawData) => {
  if (!rawData || rawData.length === 0) return [];
  const map = new Map();
  rawData.forEach((item) => {
    const d = new Date(item.date);
    if (isNaN(d.getTime())) return;
    const dateKey = d.toISOString().split("T")[0];
    const salesValue = Number(item.sales || 0);

    if (map.has(dateKey)) {
      map.get(dateKey).sales += salesValue;
    } else {
      map.set(dateKey, { ...item, sales: salesValue, date: dateKey });
    }
  });
  return Array.from(map.values()).sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );
};

const getTotalSales = (data = []) =>
  data.reduce((sum, item) => sum + Number(item.sales || 0), 0);

const SalesLine = ({ data = [], prevData = [] }) => {
  const processedData = aggregateData(data);
  const processedPrevData = aggregateData(prevData);

  const currentTotal = getTotalSales(processedData);
  const previousTotal = getTotalSales(processedPrevData);

  let percentage = 0;
  let isNewData = false;

  if (previousTotal > 0) {
    percentage = ((currentTotal - previousTotal) / previousTotal) * 100;
  } else if (currentTotal > 0) {
    percentage = 100;
    isNewData = true;
  }

  const isPositive = percentage >= 0;
  const currentRange = formatRange(processedData);
  const prevRange = formatRange(processedPrevData);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <h4
          style={{
            margin: 0,
            color: "#374151",
            fontWeight: 600,
            borderBottom: "1px dashed #9ca3af",
            paddingBottom: "1px",
            width: "fit-content",
          }}
        >
          Total sales
        </h4>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "4px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "28px",
              color: "#111827",
              fontWeight: "bold",
            }}
          >
            {formatK(currentTotal)}
          </h2>

          {previousTotal > 0 || currentTotal > 0 ? (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
                fontSize: "13px",
                fontWeight: "600",
                color: isPositive ? "#15803d" : "#dc2626",
                background: isPositive ? "#dcfce7" : "#fee2e2",
                padding: "2px 6px",
                borderRadius: "4px",
              }}
            >
              <span style={{ fontSize: "14px" }}>{isPositive ? "↗" : "↘"}</span>
              {isNewData ? "100%" : `${Math.abs(percentage).toFixed(0)}%`}
            </span>
          ) : (
            <span style={{ fontSize: "12px", color: "#9ca3af" }}>No data</span>
          )}
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, width: "100%" }}>
        {processedData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={processedData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                dy={10}
                minTickGap={30}
              />
              <YAxis
                tickFormatter={formatK}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                formatter={(value) => [formatK(value), "Sales"]}
                labelFormatter={formatDate}
              />

              {processedPrevData.length > 0 && (
                <Line
                  type="monotone"
                  data={processedPrevData}
                  dataKey="sales"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                  activeDot={false}
                />
              )}

              <Area
                type="monotone"
                dataKey="sales"
                stroke="#2563eb"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorSales)"
                activeDot={{
                  r: 6,
                  strokeWidth: 4,
                  stroke: "#fff",
                  fill: "#2563eb",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "#9ca3af",
              fontSize: "14px",
            }}
          >
            No sales data available for this filter
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          marginTop: "16px",
          borderTop: "1px solid #f8fafc",
          paddingTop: "12px",
        }}
      >
        {processedData.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              color: "#4b5563",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "3px",
                background: "#2563eb",
                borderRadius: "2px",
              }}
            ></div>
            <span>{currentRange || "Current"}</span>
          </div>
        )}

        {processedPrevData.length > 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              color: "#9ca3af",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "2px",
                borderTop: "2px dotted #94a3b8",
              }}
            ></div>
            <span>{prevRange}</span>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              color: "#e2e8f0",
            }}
          >
            <span>No prev data</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesLine;
