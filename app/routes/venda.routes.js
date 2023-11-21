module.exports = app => {
    const venda = require("../controllers/venda.controller.js");
  
    var router = require("express").Router();
  
    // Create a new venda
    router.post("/", venda.create);
  
    // Retrieve all venda
    router.get("/", venda.findAll);
  
    // Retrieve a single venda with id
    router.get("/:id", venda.findOne);
  
    // Update a venda with id
    router.put("/:id", venda.update);
  
    // Delete a venda with id
    router.delete("/:id", venda.delete);
  
    // Delete all venda
    router.delete("/", venda.deleteAll);
  
    app.use('/api/venda', router);
  };