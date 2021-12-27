const express = require("express");
const vehicleRoute = require("./app/routes/vehicleRoute");
const deviceRoute = require("./app/routes/deviceRoute");
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/vehicle",vehicleRoute);
app.use("/device",deviceRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
