const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary")

const app = express();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const postRoutes = require("./routes/postRoute");
const userRoutes = require("./routes/userRoute");

dotenv.config();

connectDB();

const Port = process.env.PORT || 4000;

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
})

app.use(express.static("build"));

app.use(express.json({limit : "30mb"}));
app.use(express.urlencoded({limit : "30mb", extended : true}))
app.use(cookieParser());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/post", postRoutes);
app.use("/user", userRoutes);


app.listen(Port, () => {
    console.log(`Server running on port http://localhost:${Port}`);
});