import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const CountryLabel = ({ x, y, value }) => (
  <text
    x={x}
    y={y - 6}
    fill="#374151"
    fontSize="12"
    fontWeight="500"
    textAnchor="start"
  >
    {value}
  </text>
);

const formatK = (value) => {
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${value}`;
};

const SalesLabel = ({ x, y, width, value }) => (
  <text
    x={x + width + 8}
    y={y + 14}
    fill="#111827"
    fontSize="12"
    fontWeight="600"
    textAnchor="start"
  >
    {formatK(value)}
  </text>
);

const SalesByCountry = ({ data }) => {
  const countryData = Object.values(
    data.reduce((acc, item) => {
      acc[item.country] = acc[item.country] || {
        country: item.country,
        sales: 0,
      };
      acc[item.country].sales += item.sales;
      return acc;
    }, {}),
  ).sort((a, b) => b.sales - a.sales);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h4 style={{ margin: "0 0 10px 0", color: "#6b7280", fontSize: "16px" }}>
        Gross sales by country
      </h4>

      <div style={{ flex: 1, minHeight: 0, width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={countryData}
            layout="vertical"
            barCategoryGap="20%"
            margin={{ top: 10, right: 40, left: 0, bottom: 0 }}
          >
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="country" hide />

            <Tooltip
              cursor={{ fill: "transparent" }}
              formatter={(value) => formatK(value)}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            />

            <Bar
              dataKey="sales"
              fill="#3b82f6"
              radius={[0, 4, 4, 0]}
              maxBarSize={40}
            >
              <LabelList content={<CountryLabel />} dataKey="country" />
              <LabelList content={<SalesLabel />} dataKey="sales" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesByCountry;
