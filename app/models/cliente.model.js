const sql = require("./db.js");

// constructor
const Cliente = function(cliente) {
  this.nome = cliente.nome;
  this.endereco = cliente.endereco;
  this.telefone = cliente.telefone;
};

Cliente.create = (newCliente, result) => {
  sql.query("INSERT INTO cliente SET ?", newCliente, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Cliente: ", { id: res.insertId, ...newCliente });
    result(null, { id: res.insertId, ...newCliente });
  });
};

Cliente.findById = (id, result) => {
  sql.query(`SELECT * FROM cliente WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found client: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Cliente with the id
    result({ kind: "not_found" }, null);
  });
};

Cliente.getAll= result => {
  sql.query("SELECT * FROM cliente", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("clientes: ", res);
    result(null, res);
  });
};

Cliente.updateById = (id, cliente, result) => {
  sql.query(
    "UPDATE cliente SET nome = ?, endereco = ?, telefone = ? WHERE id = ?",
    [cliente.nome, cliente.endereco, cliente.telefone, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found cliente with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated cliente: ", { id: id, ...cliente });
      result(null, { id: id, ...cliente });
    }
  );
};

Cliente.remove = (id, result) => {
  sql.query("DELETE FROM cliente WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Cliente with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted cliente with id: ", id);
    result(null, res);
  });
};

Cliente.removeAll = result => {
  sql.query("DELETE FROM cliente", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} cliente`);
    result(null, res);
  });
};

module.exports = Cliente;