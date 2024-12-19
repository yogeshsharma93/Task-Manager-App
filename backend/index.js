const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config()
const app = express();
app.use(express.json());
app.use(cors());

const taskRoutes = require("./routes/tasksroute");
app.use("/tasks", taskRoutes);

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("mongoDB connected"))
    .catch((err) => console.log(err.message));

app.listen(8000, () => console.log("server running on port 8000"));