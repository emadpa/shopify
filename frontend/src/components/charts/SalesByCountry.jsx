import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

// Custom label for country (above bar)
const CountryLabel = ({ x, y, value }) => (
  <text
    x={x}
    y={y - 6}
    fill="#111827"
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
// Custom label for sales (right of bar)
const SalesLabel = ({ x, y, width, value }) => (
  <text
    x={x + width + 8}
    y={y + 14}
    fill="#000000" // BLACK price
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
  );

  return (
    <div style={{ padding: "16px" }}>
      <h4 style={{ marginBottom: "12px" }}>Gross sales by country</h4>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={countryData} layout="vertical" barCategoryGap={20}>
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="country" hide />
          <Tooltip />

          <Bar dataKey="sales" fill="#3b82f6" radius={[0, 6, 6, 0]}>
            {/* Country name ABOVE bar */}
            <LabelList content={<CountryLabel />} dataKey="country" />

            {/* Sales value RIGHT of bar */}
            <LabelList content={<SalesLabel />} dataKey="sales" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesByCountry;
