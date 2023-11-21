const Pedido = require("../models/pedido.model.js");
const Estoque = require("../models/estoque.model.js");
// Create and Save a new Pedido
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Pedido
  const pedido = new Pedido({
    tipo: req.body.tipo,
    personalizacao: req.body.personalizacao,
    quantidade: req.body.quantidade,
    clienteID: req.body.clienteID,
    produtoID: req.body.produtoID
  });
  let mandou = false;
  let message = "";
  Estoque.findById(req.body.produtoID, (err, data) => {
    
    if (parseInt(data.quantidade) < parseInt(req.body.quantidade)) {
      console.log("Estoque abaixo");
      return res.status(400).send({message: "O produto está com o estoque abaixo do necessário!"});
      message = "O produto está com o estoque abaixo do necessário!";
      mandou = true;
      console.log(mandou);
    }
    console.log("estoque: ", data);
    let qtd = parseInt(data.quantidade) - parseInt(req.body.quantidade);
    data.quantidade = qtd;
    console.log("estoque: ", data);
    Estoque.updateById(req.body.produtoID,
      new Estoque(data),
      (err, data) => {
        
      })
    Pedido.create(pedido, (err, data) => {
    
      if (err)
        return res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Pedido."
        });
      else return res.send(data);
    });
    
  });
  
};

// Retrieve all Pedidos from the database.
exports.findAll = (req, res) => {

    Pedido.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Pedidos."
        });
      else res.send(data);
    });
};

// Find a single Pedido with a id
exports.findOne = (req, res) => {
    Pedido.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Pedido with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Pedido with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

// Update a Pedido identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Pedido.updateById(
    req.params.id,
    new Pedido(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Pedido with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Pedido with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Pedido with the specified id in the request
exports.delete = (req, res) => {
    Pedido.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Pedido with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Pedido with id " + req.params.id
            });
          }
        } else res.send({ message: `Pedido was deleted successfully!` });
      });
};

// Delete all Pedidos from the database.
exports.deleteAll = (req, res) => {
    Pedido.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Pedidos."
          });
        else res.send({ message: `All Pedidos were deleted successfully!` });
      });
};