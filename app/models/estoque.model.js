const sql = require("./db.js");

// constructor
const Estoque = function(estoque) {
  this.nome = estoque.nome;
  this.quantidade = estoque.quantidade;
  this.preco = estoque.preco;
};

Estoque.create = (newEstoque, result) => {
  sql.query("INSERT INTO estoque SET ?", newEstoque, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Estoque: ", { id: res.insertId, ...newEstoque });
    result(null, { id: res.insertId, ...newEstoque });
  });
};

Estoque.findById = (id, result) => {
  sql.query(`SELECT * FROM estoque WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found estoque: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Estoque with the id
    result({ kind: "not_found" }, null);
  });
};

Estoque.getAll= result => {
  sql.query("SELECT * FROM estoque", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Estoques: ", res);
    result(null, res);
  });
};

Estoque.updateById = (id, estoque, result) => {
  sql.query(
    "UPDATE estoque SET nome = ?, quantidade = ?, preco = ? WHERE id = ?",
    [estoque.nome, estoque.quantidade, estoque.preco, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found estoque with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated estoque: ", { id: id, ...estoque });
      result(null, { id: id, ...estoque });
    }
  );
};

Estoque.remove = (id, result) => {
  sql.query("DELETE FROM estoque WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Estoque with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Estoque with id: ", id);
    result(null, res);
  });
};

Estoque.removeAll = result => {
  sql.query("DELETE FROM estoque", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Estoque`);
    result(null, res);
  });
};

module.exports = Estoque;