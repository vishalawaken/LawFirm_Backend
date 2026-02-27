const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./config/db.js")
const cookieParser = require("cookie-parser");
const practiceRoutes = require("./routes/practiceRoutes");
const consultationRoutes = require("./routes/consultationRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || "https://lawfirm-frontend-hr4a.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/practices", practiceRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.get("/", (req, res) => {
    res.send("Api is running ")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`
    )
})