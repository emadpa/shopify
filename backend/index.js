const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const Analytics = require("./model/Analytics");

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

app.use(
  cors({
    origin: process.env.URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

main()
  .then((res) => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(process.env.ATLAS_URL);
}
async function getAnalyticsData(filter = {}) {
  const latestEntry = await Analytics.findOne(filter).sort({ date: -1 });

  if (!latestEntry) {
    return { currentPeriod: [], previousPeriod: [] };
  }

  const endDate = new Date(latestEntry.date);

  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 30);

  const prevEndDate = new Date(startDate);

  const prevStartDate = new Date(prevEndDate);
  prevStartDate.setDate(prevStartDate.getDate() - 30);

  const currentPeriod = await Analytics.find({
    ...filter,
    date: { $gte: startDate, $lte: endDate },
  }).sort({ date: 1 });

  const previousPeriod = await Analytics.find({
    ...filter,
    date: { $gte: prevStartDate, $lt: startDate },
  }).sort({ date: 1 });

  return { currentPeriod, previousPeriod };
}
app.get("/analytics", async (req, res) => {
  try {
    const data = await getAnalyticsData({});
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/analytics/device/:device", async (req, res) => {
  try {
    const { device } = req.params;
    const data = await Analytics.find({ device });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server started");
});
