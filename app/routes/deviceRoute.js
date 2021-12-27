const express = require("express");
const vehicleController = require("../controllers/deviceController");

const router = express.Router();

router.route("/device_add").post(vehicleController.createDevice);
router.route("/device_list").get(vehicleController.getDevices);
router.route("/device_update/:id").patch(vehicleController.updateDevice);
router.route("/device_delete/:id").delete(vehicleController.deleteDevice);

module.exports = router;
