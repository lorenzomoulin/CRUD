const sql = require("./db.js");

// constructor
const Pedido = function(pedido) {
  this.tipo = pedido.tipo;
  this.personalizacao = pedido.personalizacao;
  this.quantidade = pedido.quantidade;
  this.clienteID = pedido.clienteID;
  this.produtoID = pedido.produtoID;
};

Pedido.create = (newPedido, result) => {
  sql.query("INSERT INTO pedido SET ?", newPedido, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Pedido: ", { id: res.insertId, ...newPedido });
    result(null, { id: res.insertId, ...newPedido });
  });
};

Pedido.findById = (id, result) => {
  sql.query(`SELECT * FROM pedido WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found pedido: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Pedido with the id
    result({ kind: "not_found" }, null);
  });
};

Pedido.getAll= result => {
  sql.query("SELECT * FROM pedido", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Pedidos: ", res);
    result(null, res);
  });
};

Pedido.updateById = (id, pedido, result) => {
  sql.query(
    "UPDATE pedido SET tipo = ?, personalizacao = ?, quantidade = ?, clienteID = ?, produtoID = ? WHERE id = ?",
    [pedido.tipo, pedido.personalizacao, pedido.quantidade, pedido.clienteID, pedido.produtoID, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found pedido with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated pedido: ", { id: id, ...pedido });
      result(null, { id: id, ...pedido });
    }
  );
};

Pedido.remove = (id, result) => {
  sql.query("DELETE FROM pedido WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found pedido with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted pedido with id: ", id);
    result(null, res);
  });
};

Pedido.removeAll = result => {
  sql.query("DELETE FROM pedido", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} pedido`);
    result(null, res);
  });
};

module.exports = Pedido;