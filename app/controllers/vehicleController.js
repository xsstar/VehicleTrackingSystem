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

const getVehicles = (req, res) => {
  pg_client.query(
    "SELECT * FROM vehicles ORDER BY id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const updateVehicle = (req, res) => {
  const id = req.params.id;
  pg_client.query(
    "UPDATE vehicles SET vehicle_plate = $1, current_status = $2, is_active = $3 where id=$4",
    [req.body.vehicle_plate, req.body.current_status, req.body.is_active, id],

    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Vehicle with id-${id} successfully updated..`);
    }
  );
};

const deleteVehicle = async (req, res) => {
  const id = req.params.id;
  await pg_client.query(
    "DELETE FROM vehicles WHERE id = $1",
    [id],
    (error, results) => {
      if (error) throw error;
      res.status(200).send(`Vehicle with id-${id}  successfully deleted..`);
    }
  );
};

module.exports = {
  createVehicle,
  getVehicles,
  updateVehicle,
  deleteVehicle,
};
