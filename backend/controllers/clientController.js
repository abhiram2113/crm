const Client = require("../models/Client");


// ADD CLIENT
const addClient = async (req, res) => {

  try {

    const client =
      await Client.create(req.body);

    res.status(201).json(client);
  }

  catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



// GET ALL CLIENTS
const getClients = async (req, res) => {

  try {

    const clients =
      await Client.find();

    res.json(clients);
  }

  catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



// UPDATE STATUS
const updateStatus = async (req, res) => {

  try {

    const updatedClient =
      await Client.findByIdAndUpdate(
        req.params.id,

        {
          status: req.body.status,
        },

        {
          new: true,
        }
      );

    res.json(updatedClient);
  }

  catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addClient,
  getClients,
  updateStatus,
};