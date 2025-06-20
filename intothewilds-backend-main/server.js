const express = require("express");
const dotenv = require("dotenv");
const connectToMongo = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const inventoryRoutes = require("./routes/inventoryRoute");
const bookingRoutes = require("./routes/bookingRoute");
const userRoutes = require("./routes/userRoutes");
const propertiesRoutes = require("./routes/propertiesRoutes");
const morgan = require("morgan");
const contactRoutes = require("./routes/contactRoutes");
const cors = require("cors");
const propertyListingQueryRoutes = require("./routes/propertyListingQueryRoutes");
const toursQueryRoutes = require("./routes/toursQueryRoutes");
const eventQueryRoutes = require("./routes/eventQueryRoutes");
const reviewsRoutes = require("./routes/reviewRoutes");
const airbnbRoutes = require("./routes/calendarRoutes");
const rateLimiter = require("express-rate-limit");
const dashboardRoutes = require('./routes/dashboardRoutes');
const reservationRoute = require("./routes/reservationRoute");

dotenv.config();

const app = express();
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  })
);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://intothewildstays.in",
      "https://www.intothewildstays.in",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  })
);
app.use(morgan("tiny"));
connectToMongo();

//middlewares
app.use(express.json()); //parse json bodies

const ADMIN_USERNAME = process.env.ADMIN_USER || "myadmin";
const ADMIN_PASSWORD = process.env.ADMIN_PASS || "into_wild_stays";

app.post("/auth/login", express.json(), (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    res.json({
      user: {
        name: "myadmin",
        role: "admin",
      },
    });
  } else {
    res.status(401).send("Invalid Credentials");
  }
});

//routes
app.get("/", (req, res) => {
  res.send("ITW Backend is running!");
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/inventory", inventoryRoutes);
app.use("/api/v1/booking", bookingRoutes);
app.use("/api/v1/reservation", reservationRoute);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/properties", propertiesRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/propertyListingQuery", propertyListingQueryRoutes);
app.use("/api/v1/toursQuery", toursQueryRoutes);
app.use("/api/v1/eventQuery", eventQueryRoutes);
app.use("/api/v1/reviews", reviewsRoutes);
app.use("/api/v1/calendar", airbnbRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
