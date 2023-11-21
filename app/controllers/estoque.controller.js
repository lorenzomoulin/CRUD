const Estoque = require("../models/estoque.model.js");

// Create and Save a new Estoque
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Estoque
  const estoque = new Estoque({
    nome: req.body.nome,
    quantidade: req.body.quantidade,
    preco: req.body.preco
  });

  // Save Estoque in the database
  Estoque.create(estoque, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Estoque."
      });
    else res.send(data);
  });
};

// Retrieve all Estoques from the database.
exports.findAll = (req, res) => {

    Estoque.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Estoques."
        });
      else res.send(data);
    });
};

// Find a single Estoque with a id
exports.findOne = (req, res) => {
    Estoque.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Estoque with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Estoque with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

// Update a Estoque identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Estoque.updateById(
    req.params.id,
    new Estoque(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Estoque with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Estoque with id " + req.params.id
          });
        }
      } else {
        res.send(data);
        res.end();
        if (data.quantidade < 10) {
          //alerta
          console.log("Estoque abaixo do limiar para produto ", req.params.id);
        }
      }
    }
  );
};

// Delete a Estoque with the specified id in the request
exports.delete = (req, res) => {
    Estoque.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Estoque with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Estoque with id " + req.params.id
            });
          }
        } else res.send({ message: `Estoque was deleted successfully!` });
      });
};

// Delete all Estoques from the database.
exports.deleteAll = (req, res) => {
    Estoque.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Estoques."
          });
        else res.send({ message: `All Estoques were deleted successfully!` });
      });
};