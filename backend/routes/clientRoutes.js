const express = require("express");

const router = express.Router();

const {
  addClient,
  getClients,
  updateStatus,
} = require("../controllers/clientController");


// ADD CLIENT
router.post(
  "/",
  addClient
);


// GET CLIENTS
router.get(
  "/",
  getClients
);


// UPDATE STATUS
router.put(
  "/:id",
  updateStatus
);

module.exports = router;