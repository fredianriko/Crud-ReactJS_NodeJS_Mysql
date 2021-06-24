const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

// establishing connection with database
// this is usually the same for most database or project
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "karyawan",
});

// read about cors later
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/get", (req, res) => {
  const sqlSelect =
    "SELECT CONCAT_WS('-','K',id_karyawan) as id_karyawan,name_karyawan,DATE_FORMAT(tanggal_masuk_kerja,'%d-%m-%Y') as tanggal_masuk_kerja ,no_hp,DATE_FORMAT(tanggal_masuk_kerja,'%d-%m-%Y') as input_date,CONCAT_WS(' ', 'Rp', limit_reimburse) as limit_reimburse, DATE_FORMAT(update_date,'%d-%m-%Y') as update_date FROM crud_karyawan";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const nameKaryawan = req.body.nameKaryawan;
  const noKaryawan = req.body.noKaryawan;
  const tanggalMasukKerja = req.body.tanggalMasukKerja;
  const limitReimburse = req.body.limitReimburse;
  const inputDate = req.body.inputDate;
  const sqlInsert = "INSERT INTO crud_karyawan (name_karyawan, tanggal_masuk_kerja, no_hp,limit_reimburse, input_date) VALUES (?,?,?,?,?)";
  db.query(sqlInsert, [nameKaryawan, tanggalMasukKerja, noKaryawan, limitReimburse, inputDate], (err, result) => {
    console.log(result);
  });
});

app.delete("/api/delete/:idKaryawan", (req, res) => {
  const idKaryawan = req.params.idKaryawan;
  const sqlDelete = "DELETE FROM crud_karyawan WHERE id_karyawan = RIGHT(?, 3)";
  db.query(sqlDelete, idKaryawan, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/api/update/", (req, res) => {
  const nameKaryawan = req.body.nameKaryawan;
  const idKaryawan = req.body.idKaryawan;
  const sqlUpdate = "UPDATE crud_karyawan SET name_karyawan = '?' WHERE id_karyawan = RIGHT(?, 3) ";
  db.query(sqlUpdate, [nameKaryawan, idKaryawan], (err, result) => {
    if (err) console.log(err);
  });
});

app.listen(3001, (req, res) => {
  console.log("running on port 3001");
});
