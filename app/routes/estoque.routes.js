module.exports = app => {
    const estoque = require("../controllers/estoque.controller.js");
  
    var router = require("express").Router();
  
    // Create a new estoque
    router.post("/", estoque.create);
  
    // Retrieve all estoque
    router.get("/", estoque.findAll);
  
    // Retrieve a single estoque with id
    router.get("/:id", estoque.findOne);
  
    // Update a estoque with id
    router.put("/:id", estoque.update);
  
    // Delete a estoque with id
    router.delete("/:id", estoque.delete);
  
    // Delete all estoque
    router.delete("/", estoque.deleteAll);
  
    app.use('/api/estoque', router);
  };