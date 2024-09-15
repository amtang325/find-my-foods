const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");
const pinRoutes = require("./routes/pinRoutes");

const app = express();
app.use(cors());

app.use("/pins", pinRoutes);

app.get("/getUsers", async (req, res) => {
  try {
    const response = await axios.get("https://api.clerk.com/v1/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });
    console.log(response);
    return res.status(200).send({ users: response.data });
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
});

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("App connected to database and");
    app.listen(port, () => {
      console.log(`listening on localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
