const { pg_client } = require("../adapters/database/postgresql");

const createDeviceType = async (req, res) => {
  const data = {
    type_name: req.body.type_name,
    type_description: req.body.type_description,
    is_active: req.body.is_active,
  };
  const values = [data.type_name,data.type_description,data.is_active,
  ];
  const x = await pg_client.query(
    "INSERT INTO devices_type (type_name,type_description,is_active) VALUES ($1,$2,$3)",
    values
  );
  console.log(x.rows);
  res.status(201).json(`${data.type_name} successfully created..`);
};

const getDevicesType = (req, res) => {
  pg_client.query(
    "SELECT * FROM devices_type ORDER BY id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};


const deleteDeviceType = async (req, res) => {
  const id = req.params.id;
  await pg_client.query(
    "DELETE FROM devices_type WHERE id = $1",
    [id],
    (error, results) => {
      if (error) throw error;
      res.status(200).send(`Device Type with id-${id}  successfully deleted..`);
    }
  );
};

module.exports = {
  createDeviceType,
  getDevicesType,
  deleteDeviceType,
};
