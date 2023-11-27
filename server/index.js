const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "clinica2",
});

app.use(cors());
app.use(express.json());

// VACINA
app.post("/cadastrarVacina", (req, res) => {
  const { nome } = req.body;
  const { lote } = req.body;
  const { quantidade } = req.body;

  let sql = "INSERT INTO vacina (nome, lote, quantidade) VALUES (?, ?, ?)";
  db.query(sql, [nome, lote, quantidade], (err, result) => {
    if (err) console.log("ERRO:" + err);
    else res.send(result);
  });
});

app.put("/editarVacina", (req, res) => {
  const { id } = req.body;
  const { nome } = req.body;
  const { quantidade } = req.body;
  const { lote } = req.body;
  let sql =
    "UPDATE vacina SET nome = ?, quantidade = ?, lote = ? WHERE id = ? ";

  db.query(sql, [nome, quantidade, lote, id], (err, result) => {
    if (err) console.log("erro: " + err);
    else res.send(result);
  });
});

app.get("/getVacina", (req, res) => {
  let sql = "SELECT * FROM vacina";

  db.query(sql, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.delete("/deleteVacina/:id", (req, res) => {
  const { id } = req.params;

  let sql = "DELETE FROM vacina WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});
// fim vacina

// FUNCIONÁRIO
app.post("/cadastrarFuncionario", (req, res) => {
  const { nome } = req.body;
  const { cargo } = req.body;
  const { acesso } = req.body;

  let sql = "INSERT INTO funcionario (nome, cargo, acesso) VALUES (?, ?, ?)";

  db.query(sql, [nome, cargo, acesso], (err, result) => {
    if (err) console.log("ERRO:" + err);
    else res.send(result);
  });
});

app.put("/editarFuncionario", (req, res) => {
  const { id } = req.body;
  const { nome } = req.body;
  const { cargo } = req.body;
  const { acesso } = req.body;

  let sql =
    "UPDATE funcionario SET nome = ?, cargo = ?, acesso = ? WHERE id = ?";

  db.query(sql, [nome, cargo, acesso, id], (err, result) => {
    if (err) console.log("erro: " + err);
    else res.send(result);
  });
});

app.get("/getFuncionario", (req, res) => {
  let sql = "SELECT * FROM funcionario";

  db.query(sql, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.delete("/deleteFuncionario/:id", (req, res) => {
  const { id } = req.params;

  let sql = "DELETE FROM funcionario WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// FIM FUNCIONÁRIO

// PACIENTE

app.post("/cadastrarPaciente", (req, res) => {
  const { nome } = req.body;
  const { sexo } = req.body;
  const { endereco } = req.body;
  const { observacao } = req.body;
  const { dataCadastro } = req.body;

  let sql =
    "INSERT INTO paciente (nome, sexo, endereco, observacao, dataCadastro) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [nome, sexo, endereco, observacao, dataCadastro],
    (err, result) => {
      if (err) console.log("ERRO:" + err);
      else res.send(result);
    }
  );
});

app.put("/editarPaciente", (req, res) => {
  const { id } = req.body;
  const { nome } = req.body;
  const { sexo } = req.body;
  const { endereco } = req.body;
  const { observacao } = req.body;
  const { dataCadastro } = req.body;

  let sql =
    "UPDATE paciente SET nome = ?, sexo = ?, endereco = ?, observacao = ?, dataCadastro = ? WHERE id = ?";

  db.query(
    sql,
    [nome, sexo, endereco, observacao, dataCadastro, id],
    (err, result) => {
      if (err) console.log("erro: " + err);
      else res.send(result);
    }
  );
});

app.get("/getPaciente", (req, res) => {
  let sql = "SELECT * FROM paciente WHERE id > 1";

  db.query(sql, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.get("/getAllPaciente", (req, res) => {
  let sql = "SELECT * FROM paciente WHERE 1";

  db.query(sql, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.delete("/deletePaciente/:id", (req, res) => {
  const { id } = req.params;

  let sql = "DELETE FROM atendimento WHERE paciente_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) console.log(err);
  });

  let sql2 = "DELETE FROM registrovenda WHERE paciente_id = ?";
  db.query(sql2, [id], (err, result) => {
    if (err) console.log(err);
  });

  let sql3 = "DELETE FROM paciente WHERE id = ?";

  db.query(sql3, [id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});
// FIM PACIENTE

// FORNECEDOR
app.delete("/getFornecedorById/:id", (req, res) => {
  const { id } = req.params;

  let sql = "SELECT nome FROM fornecedor WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.get("/getFornecedor", (req, res) => {
  let sql = "SELECT * FROM fornecedor";

  db.query(sql, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// FIM FORNECEDOR

// VENDAS
app.get("/getVenda", (req, res) => {
  let sql =
    "SELECT registrovenda.*, vacina.nome AS nomeVacina, vacina.precoUni AS precoVacina, paciente.nome AS nomePaciente FROM registrovenda LEFT JOIN paciente ON paciente.id = registrovenda.paciente_id LEFT JOIN vacina ON vacina.id = registrovenda.vacina_id WHERE registrovenda.id IS NOT NULL";

  db.query(sql, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.post("/cadastrarVenda", (req, res) => {
  const { preco } = req.body;
  const { descricao } = req.body;
  const { quantidade } = req.body;
  const { paciente_id } = req.body;
  const { vacina_id } = req.body;
  const { dataVenda } = req.body;

  let sql =
    "INSERT INTO registrovenda (preco, descricao, quantidade, paciente_id, vacina_id, dataVenda) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [preco, descricao, quantidade, paciente_id, vacina_id, dataVenda],
    (err, result) => {
      if (err) console.log("ERRO:" + err);
      else res.send(result);
    }
  );
});

app.put("/editarVenda", (req, res) => {
  const { id } = req.body;
  const { preco } = req.body;
  const { descricao } = req.body;
  const { quantidade } = req.body;
  const { paciente_id } = req.body;
  const { vacina_id } = req.body;
  const { dataVenda } = req.body;

  let sql =
    "UPDATE registrovenda SET preco = ?, descricao = ?, quantidade = ?, paciente_id = ?, vacina_id = ?, dataVenda = ? WHERE id = ?";

  db.query(
    sql,
    [preco, descricao, quantidade, paciente_id, vacina_id, dataVenda, id],
    (err, result) => {
      if (err) console.log("erro: " + err);
      else res.send(result);
    }
  );
});

app.delete("/deleteVenda/:id", (req, res) => {
  const { id } = req.params;

  let sql = "DELETE FROM registrovenda WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// FIM VENDAS

// COMPRAS
app.get("/getCompra", (req, res) => {
  let sql =
    "SELECT registrocompra.*, fornecedor.nome AS nomeFornecedor, vacina.nome AS nomeVacina FROM registrocompra INNER JOIN fornecedor ON fornecedor.id = registrocompra.fornecedor_id INNER JOIN vacina ON vacina.id = registrocompra.vacina_id WHERE registrocompra.fornecedor_id IS NOT NULL";

  db.query(sql, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.post("/cadastrarCompra", (req, res) => {
  const { descricao } = req.body;
  const { quantidade } = req.body;
  const { precoUni } = req.body;
  const { fornecedor_id } = req.body;
  const { vacina_id } = req.body;
  const { dataCompra } = req.body;

  let sql = "UPDATE vacina SET precoUni = ? WHERE id = ?";
  db.query(sql, [precoUni, vacina_id], (err, result) => {
    if (err) console.log(err);
  });

  let sql2 =
    "INSERT INTO registrocompra (descricao, quantidade, precoUni, dataCompra, fornecedor_id, vacina_id) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    sql2,
    [descricao, quantidade, precoUni, fornecedor_id, dataCompra, vacina_id],
    (err, result) => {
      if (err) console.log("ERRO:" + err);
      else res.send(result);
    }
  );
});

app.put("/editarCompra", (req, res) => {
  const { id } = req.body;
  const { descricao } = req.body;
  const { quantidade } = req.body;
  const { precoUni } = req.body;
  const { fornecedor_id } = req.body;
  const { vacina_id } = req.body;
  const { dataCompra } = req.body;

  let sql =
    "UPDATE registrocompra SET descricao = ?, quantidade = ?, precoUni = ?, dataCompra = ?, fornecedor_id = ?, vacina_id = ? WHERE id = ?";

  db.query(
    sql,
    [descricao, quantidade, precoUni, fornecedor_id, dataCompra, vacina_id, id],
    (err, result) => {
      if (err) console.log("erro: " + err);
      else res.send(result);
    }
  );
});

app.delete("/deleteCompra/:id", (req, res) => {
  const { id } = req.params;

  let sql = "DELETE FROM registrocompra WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});
// FIM COMPRAS

// INICIO DESCARTE
app.get("/getQuantidadeByIdVacina/:id", (req, res) => {
  const { id } = req.params;

  let sql = "SELECT vacina.quantidade FROM vacina WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.post("/cadastrarDescarte", (req, res) => {
  const { vacina_id } = req.body;
  const { descricao } = req.body;
  const { qtdeDescartada } = req.body;

  let sql =
    "UPDATE vacina SET quantidade = (SELECT quantidade FROM vacina WHERE id = ?) - ? WHERE id = ?";

  db.query(sql, [vacina_id, qtdeDescartada, vacina_id], (err, result) => {
    if (err) console.log(err);
  });

  let sql2 =
    "INSERT INTO registrodescarte (descricao, qtdeDescartada, vacina_id, dataDescarte) VALUES (?, ?, ?, (SELECT CURRENT_TIMESTAMP()))";

  db.query(sql2, [descricao, qtdeDescartada, vacina_id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.get("/getDescarte", (req, res) => {
  let sql =
    "SELECT registrodescarte.*, vacina.id AS vacina_id, vacina.nome AS nomeVacina, vacina.quantidade AS quantidadeAtual FROM registrodescarte INNER JOIN vacina ON vacina.id = registrodescarte.vacina_id WHERE 1";

  db.query(sql, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.put("/editarDescarte", (req, res) => {
  const { id } = req.body;
  const { descricao } = req.body;
  const { qtdeDescartada } = req.body;
  const { vacina_id } = req.body;

  let sql =
    "UPDATE vacina SET quantidade = (SELECT quantidade FROM vacina WHERE id = ?) - ? WHERE id = ?";

  db.query(sql, [vacina_id, qtdeDescartada, vacina_id], (err, result) => {
    if (err) console.log(err);
  });

  let sql2 =
    "UPDATE registrodescarte SET descricao = ?, qtdeDescartada = ?, vacina_id = ?, dataDescarte = (SELECT CURRENT_TIMESTAMP()) WHERE id = ?";

  db.query(sql2, [descricao, qtdeDescartada, vacina_id, id], (err, result) => {
    if (err) console.log("erro: " + err);
    else res.send(result);
  });
});

app.delete("/deleteDescarte/:id/:qtde/:vacina_id", (req, res) => {
  const { id } = req.params;
  const { qtde } = req.params;
  const { vacina_id } = req.params;
  console.log(id);
  let sql =
    "UPDATE vacina SET quantidade = (SELECT quantidade FROM vacina WHERE id = ?) + ? WHERE id = ?";

  db.query(sql, [vacina_id, qtde, vacina_id], (err, result) => {
    if (err) console.log(err);
  });

  let sql2 = "DELETE FROM registrodescarte WHERE id = ?";

  db.query(sql2, [id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// FIM DESCARTE

// AGENDAMENTO
app.get("/getAtendimento", (req, res) => {
  let sql =
    "SELECT atendimento.*, paciente.nome AS nomePaciente from atendimento INNER JOIN paciente ON paciente.id = atendimento.paciente_id WHERE 1";

  db.query(sql, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.post("/cadastrarAtendimento", (req, res) => {
  const { dataInicio } = req.body;
  const { descricao } = req.body;
  const { paciente_id } = req.body;

  let sql =
    "INSERT INTO atendimento (descricao, dataInicio, paciente_id) VALUES (?, ?, ?)";

  db.query(sql, [descricao, dataInicio, paciente_id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.put("/editarAtendimento", (req, res) => {
  const { id } = req.body;
  const { dataInicio } = req.body;
  const { descricao } = req.body;
  const { paciente_id } = req.body;
  console.log("desc: " + descricao);
  let sql =
    "UPDATE atendimento SET descricao = ?, dataInicio = ?, paciente_id = ? WHERE id = ?";

  db.query(sql, [descricao, dataInicio, paciente_id, id], (err, result) => {
    if (err) console.log("erro: " + err);
    else res.send(result);
  });
});

app.delete("/deleteAtendimento/:id", (req, res) => {
  const { id } = req.params;

  let sql = "DELETE FROM atendimento WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});
// FIM AGENDAMENTO

// RELATORIOS
app.get("/getVendasPaciente", (req, res) => {
  let sql =
    'SELECT CONCAT(registrovenda.id, " - ", paciente.NOME) AS pacienteNome, paciente.endereco AS endereco, CONCAT(vacina.nome,", Lote:", vacina.lote) AS nomeVacina, registrovenda.preco AS precoUniVenda, registrovenda.quantidade AS qtdeVenda, (registrovenda.preco * registrovenda.quantidade) AS total FROM registrovenda INNER JOIN vacina ON vacina.id = registrovenda.vacina_id INNER JOIN paciente ON paciente.id = registrovenda.paciente_id WHERE paciente.id > 1';

  db.query(sql, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.get("/getComprasFornecedor", (req, res) => {
  let sql =
    "SELECT registrocompra.id, registrocompra.descricao, registrocompra.precoUni, registrocompra.quantidade, vacina.nome FROM registrocompra INNER JOIN fornecedor ON fornecedor.id = registrocompra.fornecedor_id INNER JOIN vacina ON vacina.id = registrocompra.vacina_id WHERE registrocompra.id > 0";

  db.query(sql, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// FIM RELATORIOS

// LOGIN
app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM funcionario WHERE email = ?",
    [email],
    (err, result) => {
      if (err) res.send("ERRO:" + err);
      if (result.length == 0) {
        db.query(
          "INSERT INTO funcionario (email, password) VALUES (?, ?)",
          [email, password],
          (err, result) => {
            if (err) res.send(err);
            else res.send(result);
          }
        );
      }
    }
  );
});
/*db.query(sql, [descricao, dataInicio, paciente_id, id], (err, result) => {
    if (err) console.log("erro: " + err);
    else res.send(result);
  }); */

/*
  
  return new Promise(function(res, rej) {
            cnn.query(sql, valores, function (error, results, fields) {
                if (error) 
                    rej(error);
                else 
                    res(results);
            });
        })
  */
/*
db.query(sql, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
  */
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let sql = "SELECT * FROM funcionario WHERE email = ? AND password = ? ";

  db.query(sql, [email, password], (err, result) => {
    console.log("result: " + result[0]);
    if (err) {
      res.send("ERRO:" + err);
    } else if (result.length > 0) {
      res.send({ usuario: result });
    } else {
      res.send({ msg: "Não foi possivel acessar" });
    }
  });
});

app.get("/getLogin/:email", (req, res) => {
  const email = req.params.email;
  console.log("email:" + email);
  let sql = "SELECT * FROM funcionario where email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});
// FIM LOGIN
/*res.send({
          id: result["id"],
          nome: result["nome"],
          cargo: result["cargo"],
        });*/

app.listen(3001, () => {
  console.log("Executando Servidor...");
});
