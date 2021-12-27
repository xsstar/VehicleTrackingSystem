const { pg_client } = require("./../adapters/database/postgresql");

const createVehicle = async (req, res) => {
  const data = {
    vehicle_plate: req.body.vehicle_plate,
    current_status: req.body.current_status,
    is_active: req.body.is_active,
  };
  const values = [data.vehicle_plate, data.current_status, data.is_active];
  const x = await pg_client.query(
    "INSERT INTO vehicles (vehicle_plate, current_status, is_active) VALUES ($1,$2,$3) RETURNING *",
    values
  );
  console.log(x.rows);
  res.status(201).json(`${data.vehicle_plate} successfully created..`);
};

module.exports = {
  createVehicle
}

