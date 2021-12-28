const express = require("express");
const vehicleRoute = require("./app/routes/vehicleRoute");
const deviceRoute = require("./app/routes/deviceRoute");
const deviceTypeRoute = require("./app/routes/deviceTypeRoute");
const logTemperatureRoute = require("./app/routes/logTemperatureRoute");
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/vehicle",vehicleRoute);
app.use("/device",deviceRoute);
app.use("/type",deviceTypeRoute);
app.use("/temp",logTemperatureRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
