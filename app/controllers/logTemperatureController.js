const { pg_client } = require("../adapters/database/postgresql");

const createLogTemperature = async (req, res) => {
  const data = {
    vehicle_id: req.body.vehicle_id,
    device_id: req.body.device_id,
    read_data: req.body.read_data,
    created_at:req.body.created_at
  };
  const values = [data.vehicle_id,data.device_id,data.read_data,data.created_at];
  const x = await pg_client.query(
    "INSERT INTO log_temperature (vehicle_id,device_id,read_data,created_at) VALUES ($1,$2,$3,$4)",
    values
  );
  console.log(x.rows);
  res.status(201).json(`successfully logged..`);
};

const getLogTemperatures = (req, res) => {
  pg_client.query(
    "SELECT * FROM log_temperature ORDER BY id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};


module.exports = {
  createLogTemperature,
  getLogTemperatures,
 
};
