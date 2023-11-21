module.exports = app => {
    const pedido = require("../controllers/pedido.controller.js");
  
    var router = require("express").Router();
  
    // Create a new pedido
    router.post("/", pedido.create);
  
    // Retrieve all pedido
    router.get("/", pedido.findAll);
  
    // Retrieve a single pedido with id
    router.get("/:id", pedido.findOne);
  
    // Update a pedido with id
    router.put("/:id", pedido.update);
  
    // Delete a pedido with id
    router.delete("/:id", pedido.delete);
  
    // Delete all pedido
    router.delete("/", pedido.deleteAll);
  
    app.use('/api/pedido', router);
  };