const { pg_client } = require("./../adapters/database/postgresql");

const createDevice = async (req, res) => {
  const data = {
    vehicle_id: req.body.vehicle_id,
    device_type_id: req.body.device_type_id,
    device_name: req.body.device_name,
    is_online: req.body.is_online,
    is_active: req.body.is_active,
  };
  const values = [data.vehicle_id,data.device_type_id,data.device_name,data.is_online,data.is_active,
  ];
  const x = await pg_client.query(
    "INSERT INTO devices (vehicle_id,device_type_id,device_name,is_online,is_active) VALUES ($1,$2,$3,$4,$5)",
    values
  );
  console.log(x.rows);
  res.status(201).json(`${data.device_name} successfully created..`);
};

const getDevices = (req, res) => {
  pg_client.query(
    "SELECT * FROM devices ORDER BY id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const updateDevice = (req, res) => {
  const id = req.params.id;
  pg_client.query(
    "UPDATE devices SET vehicle_id = $1, device_type_id = $2, device_name = $3,is_online = $4, is_active = $5 WHERE id = $6",
    [req.body.vehicle_id, req.body.device_type_id, req.body.device_name,req.body.is_online, req.body.is_active, id],

    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Device with id-${id} successfully updated..`);
    }
  );
};

const deleteDevice = async (req, res) => {
  const id = req.params.id;
  await pg_client.query(
    "DELETE FROM devices WHERE id = $1",
    [id],
    (error, results) => {
      if (error) throw error;
      res.status(200).send(`Device with id-${id}  successfully deleted..`);
    }
  );
};

module.exports = {
  createDevice,
  getDevices,
  updateDevice,
  deleteDevice,
};
