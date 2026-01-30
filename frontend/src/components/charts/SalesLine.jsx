import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const formatDate = (value) => {
  const date = new Date(value);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
};

const formatK = (value) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${value}`;
};

const SalesLine = ({ data }) => (
  <>
    <h4>Total sales</h4>
    <h2>{formatK(20985950)}</h2>

    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data}>
        <XAxis dataKey="date" tickFormatter={formatDate} />
        <YAxis tickFormatter={formatK} />
        <Tooltip
          labelFormatter={(value) =>
            new Date(value).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          }
          formatter={(value) => formatK(value)}
        />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#2563eb"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </>
);

export default SalesLine;
