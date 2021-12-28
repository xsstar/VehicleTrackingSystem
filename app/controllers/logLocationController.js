const { pg_client } = require("../adapters/database/postgresql");

const createLogLocation = async (req, res) => {
  const data = {
    vehicle_id: req.body.vehicle_id,
    device_id: req.body.device_id,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    created_at: req.body.created_at,
  };
  const values = [
    data.vehicle_id,
    data.device_id,
    data.latitude,
    data.longitude,
    data.created_at,
  ];
  const x = await pg_client.query(
    "INSERT INTO log_location (vehicle_id,device_id,latitude,longitude,created_at) VALUES ($1,$2,$3,$4,$5)",
    values
  );
  console.log(x.rows);
  res.status(201).json(`successfully logged..`);
};

const getLogLocations = (req, res) => {
  pg_client.query(
    "SELECT * FROM log_location ORDER BY id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

module.exports = {
  createLogLocation,
  getLogLocations,
};
