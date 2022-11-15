import express from "express";
import cors from "cors";
import { Sequelize } from "sequelize";
import mysql from "mysql2";

const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "tarjetas",
  password: "Admin1234",
  database: "bd_tarjetas",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("MySQL connected successfully.");
});

const sequelize = new Sequelize("bd_tarjetas", "root", "iker7777", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
.authenticate()
.then(() => {
  console.log("Connection has been established properly");
})
.catch((error: any) => {
  console.log(`Unable to connect to the database ${error}`);
});

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.json())
app.listen(PORT, () => console.log("Okeyy!"));
app.get("/", (req, res) =>{
  res.send("Hola Mundo");
});
app.get("/nombre/:nombre", (req, res) => {
  res.send(`Hola ${req.params.nombre}`);
})
app.get("/user", (req, res) => {
  res.send(`Hola ${req.query.nombre}`);
})

app.post("/register", (req, res) => {
  const { mail, paswd } = req.body;
  console.log("BUenas noches")
  
  if( !mail || !paswd ){
    res.send(`Falta algún dato...`);
    return;
  };
  
  console.log(mail, paswd);
  res.send("OK!");
});