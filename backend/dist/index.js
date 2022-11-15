"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const sequelize_1 = require("sequelize");
const mysql2_1 = __importDefault(require("mysql2"));
const con = mysql2_1.default.createConnection({
    host: "127.0.0.1",
    user: "tarjetas",
    password: "Admin1234",
    database: "bd_tarjetas",
});
con.connect(function (err) {
    if (err)
        throw err;
    console.log("MySQL connected successfully.");
});
const sequelize = new sequelize_1.Sequelize("bd_tarjetas", "root", "iker7777", {
    host: "localhost",
    dialect: "mysql",
});
sequelize
    .authenticate()
    .then(() => {
    console.log("Connection has been established properly");
})
    .catch((error) => {
    console.log(`Unable to connect to the database ${error}`);
});
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3030;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.listen(PORT, () => console.log("Okeyy!"));
app.get("/", (req, res) => {
    res.send("Hola Mundo");
});
app.get("/nombre/:nombre", (req, res) => {
    res.send(`Hola ${req.params.nombre}`);
});
app.get("/user", (req, res) => {
    res.send(`Hola ${req.query.nombre}`);
});
app.post("/register", (req, res) => {
    const { mail, paswd } = req.body;
    console.log("BUenas noches");
    if (!mail || !paswd) {
        res.send(`Falta algún dato...`);
        return;
    }
    ;
    console.log(mail, paswd);
    res.send("OK!");
});
