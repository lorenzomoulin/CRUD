CREATE TABLE IF NOT EXISTS `cliente` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome varchar(255) NOT NULL,
  endereco varchar(255) NOT NULL,
  telefone varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `estoque` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome varchar(255) NOT NULL,
  quantidade int(11) NOT NULL,
  preco int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `pedido` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  tipo varchar(255) NOT NULL,
  personalizacao varchar(255) NOT NULL,
  quantidade int NOT NULL,
  clienteID int(11) NOT NULL,
  FOREIGN KEY (clienteID) REFERENCES cliente(id),
  produtoID int(11) NOT NULL,
  FOREIGN KEY (produtoID) REFERENCES estoque(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `venda` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  dataVenda date NOT NULL,
  clienteID int(11) NOT NULL,
  FOREIGN KEY (clienteID) REFERENCES cliente(id),
  pedidoID int(11) NOT NULL,
  FOREIGN KEY (pedidoID) REFERENCES pedido(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



