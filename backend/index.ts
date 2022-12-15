// Importante: Iniciar la base de datos desde terminal antes de iniciar el proyecto, da igual en que directorio:
  // sudo service mysql start
  // check if is it started -> sudo service mysql status

import express from "express";
import cors from "cors";
import { DataTypes, Sequelize } from "sequelize";
import mysql from "mysql2";
import { ALL } from "dns";
import { userInfo } from "os";

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
const sequelize = new Sequelize("bd_tarjetas", "tarjetas", "Admin1234", {
  host: "localhost",
  dialect: "mysql",
});

// Conectar el backend con la base de datos a partir de sequalize 
sequelize
.authenticate()
.then(() => {
  console.log("Connection has been established properly");
})
.catch((error: any) => {
  console.log(`Unable to connect to the database ${error}`);
});

// Modelo de usuario. Modelo = Tabla.
// No estás creando nada en la base de datos, solo le estás diciendo que User es un modelo dentro de la BBDD
// Intermediario entre la base de datos y el código
const User = sequelize.define("user", {
  mail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  paswd: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

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

// Creación del servidor
const app = express();
const PORT = process.env.PORT || 3030;

// Permite hacer peticiones de todas partes. En producción no sería buena práctica.
// En prod tendrías que configurar qué dominios pueden y no pueden hacer peticiones
app.use(cors());
// Todas las peticiones que vengan se transforman en un json
app.use(express.json())
// El servidor escucha en ese puerto
app.listen(PORT, () => console.log("Okeyy!"));

// GET -> Devolver información
app.get("/", (req, res) =>{
  res.send("Hola Mundo");
});
// Parámetros: localhost:3030/nombre/Santy
app.get("/nombre/:nombre", (req, res) => {
  res.send(`Hola ${req.params.nombre}`);
})

// Query. Más sencillo para poner más de una variable
// localhost:3030/user?nombre=Iker
app.get("/user", (req, res) => {
  res.send(`Hola ${req.query.nombre}`);
})

// POST-> Insertar información
app.post("/register", async (req, res) => {
  const { mail, paswd } = req.body;
  console.log("Buenas noches")
  
  if( !mail || !paswd ){
    res.send(`Falta algún dato...`);
    return;
  };
  
  // Coger un usuario de la tabla user
  // Condiciones: que encuentre un email igual al que le hemos pasado en la petición del POST
  let user = await User.findOne({
    where: {
      mail: mail
    }
  })
  console.log("hola");
  
  // Si está registrado ya. No hacemos nada.
  if(user){
    res.send(`El email ya está registrado`);
    return
  }
  
  // En cambio, si el email no existe, creamos un usuario nuevo dentro de la BBDD
  User.create({
    mail,
    paswd,
  })
  
  console.log(mail, paswd);
  res.send("OK!");
});

app.post("/login", async (req, res) => {
  const { mail, paswd } = req.body;
  console.log("Buenas noches");
  
  if (!mail || !paswd) {
    res.send(`Falta algún dato...`);
    return;
  }
  
  let user = await User.findOne({
    where: {
      mail: mail,
    },
  });
  
  if (!user){
    res.send({
      error: true,
      text: "Mail incorrecto"
    })
    return
  }

  if(user.dataValues.paswd != paswd){
     res.send({
       error: true,
       text: "Contraseña incorrecto",
     });
     return
  }

  res.send(user);
});