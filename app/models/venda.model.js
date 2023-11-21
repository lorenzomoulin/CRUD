const sql = require("./db.js");

// constructor
const Venda = function(venda) {
  this.dataVenda = venda.dataVenda;
  this.clienteID = venda.clienteID;
  this.pedidoID = venda.pedidoID;
};

Venda.create = (newVenda, result) => {
  sql.query("INSERT INTO venda SET ?", newVenda, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Venda: ", { id: res.insertId, ...newVenda });
    result(null, { id: res.insertId, ...newVenda });
  });
};

Venda.findById = (id, result) => {
  sql.query(`SELECT * FROM venda WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Venda: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Venda with the id
    result({ kind: "not_found" }, null);
  });
};

Venda.getAll= result => {
  sql.query("SELECT * FROM venda", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Vendas: ", res);
    result(null, res);
  });
};

Venda.updateById = (id, venda, result) => {
  sql.query(
    "UPDATE venda SET dataVenda = ?, clienteID = ?, produtoID = ? WHERE id = ?",
    [venda.data, venda.clienteID, venda.produtoID, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Venda with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Venda: ", { id: id, ...venda });
      result(null, { id: id, ...venda });
    }
  );
};

Venda.remove = (id, result) => {
  sql.query("DELETE FROM venda WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Venda with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Venda with id: ", id);
    result(null, res);
  });
};

Venda.removeAll = result => {
  sql.query("DELETE FROM venda", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Venda`);
    result(null, res);
  });
};

module.exports = Venda;