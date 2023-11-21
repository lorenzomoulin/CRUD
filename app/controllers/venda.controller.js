const Venda = require("../models/venda.model.js");

// Create and Save a new Venda
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Venda
  const venda = new Venda({
    dataVenda: req.body.dataVenda,
    clienteID: req.body.clienteID,
    produtoID: req.body.produtoID
  });

  // Save Venda in the database
  Venda.create(venda, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Venda."
      });
    else res.send(data);
  });
};

// Retrieve all Vendas from the database.
exports.findAll = (req, res) => {

    Venda.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Vendas."
        });
      else res.send(data);
    });
};

// Find a single Venda with a id
exports.findOne = (req, res) => {
    Venda.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Venda with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Venda with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

// Update a Venda identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Venda.updateById(
    req.params.id,
    new Venda(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Venda with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Venda with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Venda with the specified id in the request
exports.delete = (req, res) => {
    Venda.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Venda with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Venda with id " + req.params.id
            });
          }
        } else res.send({ message: `Venda was deleted successfully!` });
      });
};

// Delete all Vendas from the database.
exports.deleteAll = (req, res) => {
    Venda.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Vendas."
          });
        else res.send({ message: `All Vendas were deleted successfully!` });
      });
};