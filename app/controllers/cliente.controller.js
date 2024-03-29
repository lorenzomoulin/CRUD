const Cliente = require("../models/cliente.model.js");

// Create and Save a new Cliente
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Cliente
  const cliente = new Cliente({
    nome: req.body.nome,
    endereco: req.body.endereco,
    telefone: req.body.telefone
  });

  // Save Cliente in the database
  Cliente.create(cliente, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cliente."
      });
    else res.send(data);
  });
};

// Retrieve all Clientes from the database.
exports.findAll = (req, res) => {

    Cliente.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Clientes."
        });
      else res.send(data);
    });
};

// Find a single Cliente with a id
exports.findOne = (req, res) => {
    Cliente.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Cliente with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Cliente with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

// Update a Cliente identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Cliente.updateById(
    req.params.id,
    new Cliente(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Cliente with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Cliente with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Cliente with the specified id in the request
exports.delete = (req, res) => {
    Cliente.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Cliente with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Cliente with id " + req.params.id
            });
          }
        } else res.send({ message: `Cliente was deleted successfully!` });
      });
};

// Delete all Clientes from the database.
exports.deleteAll = (req, res) => {
    Cliente.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Clientes."
          });
        else res.send({ message: `All Clientes were deleted successfully!` });
      });
};