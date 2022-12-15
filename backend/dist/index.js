"use strict";
// Importante: Iniciar la base de datos desde terminal antes de iniciar el proyecto, da igual en que directorio:
// sudo service mysql start
// check if is it started -> sudo service mysql status
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const sequelize_1 = require("sequelize");
// Estos son los pasos necesarios si no tuvieramos sequelize
// const con = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "tarjetas",
//   password: "Admin1234",
//   database: "bd_tarjetas",
// });
// con.connect(function (err) {
//   if (err) throw err;
//   console.log("MySQL connected successfully.");
// });
// Rellenar la configuración del sequelize
// sequelize tiene la ventaja de poder conectar fácilmente con cualquier tipo de base de datos
const sequelize = new sequelize_1.Sequelize("bd_tarjetas", "tarjetas", "Admin1234", {
    host: "localhost",
    dialect: "mysql",
});
// Conectar el backend con la base de datos a partir de sequalize 
sequelize
    .authenticate()
    .then(() => {
    console.log("Connection has been established properly");
})
    .catch((error) => {
    console.log(`Unable to connect to the database ${error}`);
});
// Modelo de usuario. Modelo = Tabla.
// No estás creando nada en la base de datos, solo le estás diciendo que User es un modelo dentro de la BBDD
// Intermediario entre la base de datos y el código
const User = sequelize.define("user", {
    mail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    paswd: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
// Crearía la tabla User .sync() No es necesario, pero se suele utilizar en desarrollo para meter datos
// Sin necesidad de hacer Inserts a mano
// sequelize
//   .sync()
//   .then(() => {
//     console.log("User table created successfully!");
//   })
//   .catch((error) => {
//     console.error("Unable to create table : ", error);
//   });
// Creación del servidor con express
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3030;
// Permite hacer peticiones de todas partes. En producción no sería buena práctica.
// En prod tendrías que configurar qué dominios pueden y no pueden hacer peticiones
app.use((0, cors_1.default)());
// Todas las peticiones que vengan se transforman en un json
app.use(express_1.default.json());
// El servidor escucha en ese puerto
app.listen(PORT, () => console.log("Okeyy!"));
// GET -> Devolver información
app.get("/", (req, res) => {
    res.send("Hola Mundo");
});
// Parámetros en la URL: localhost:3030/nombre/Santy
app.get("/nombre/:nombre", (req, res) => {
    res.send(`Hola ${req.params.nombre}`);
});
// Query en la URL. Más sencillo para poner más de una variable
// localhost:3030/user?nombre=Iker
app.get("/user", (req, res) => {
    res.send(`Hola ${req.query.nombre}`);
});
// POST-> Insertar información
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mail, paswd } = req.body;
    console.log("Buenas noches");
    if (!mail || !paswd) {
        res.send(`Falta algún dato...`);
        return;
    }
    ;
    // Coger un usuario de la tabla user
    // Condiciones: que encuentre un email igual al que le hemos pasado en la petición del POST
    let user = yield User.findOne({
        where: {
            mail: mail
        }
    });
    console.log("hola");
    // Si está registrado ya. No hacemos nada.
    if (user) {
        res.send(`El email ya está registrado`);
        return;
    }
    // En cambio, si el email no existe, creamos un usuario nuevo dentro de la BBDD
    User.create({
        mail,
        paswd,
    });
    console.log(mail, paswd);
    res.send("OK!");
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mail, paswd } = req.body;
    console.log("Buenas noches");
    if (!mail || !paswd) {
        res.send(`Falta algún dato...`);
        return;
    }
    let user = yield User.findOne({
        where: {
            mail: mail,
        },
    });
    if (!user) {
        res.send({
            error: true,
            text: "Mail incorrecto"
        });
        return;
    }
    if (user.dataValues.paswd != paswd) {
        res.send({
            error: true,
            text: "Contraseña incorrecto",
        });
        return;
    }
    res.send(user);
}));
