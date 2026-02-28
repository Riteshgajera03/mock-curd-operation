const express = require("express");
const index = express();
require("./config/db");

index.use(express.urlencoded({ extended: true }));
index.use(express.static("uploads"));
index.set("view engine", "ejs");

const userRoutes = require("./routes/userRoutes");
index.use("/", userRoutes);

index.listen(3000, () => {
    console.log("Server Started at 3000");
});