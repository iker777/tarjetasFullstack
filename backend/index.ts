// Importante: Iniciar la base de datos desde terminal antes de iniciar el proyecto, da igual en que directorio:
// sudo service mysql start
// check if is it started -> sudo service mysql status

import express from "express";
import cors from "cors";
import { DataTypes, Sequelize } from "sequelize";
// No hace falta importarlo, pero para el sequelize es necesario tener la dependencia instalada
import mysql from "mysql2";

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

// Definir tabla "cards", relación 1 -> n con "users"
const Cards = sequelize.define("cards", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
  ,
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.STRING,
    allowNull: true
  }
})

// Crearía la tabla User .sync() No es necesario, pero se suele utilizar en desarrollo para meter datos
// Sin necesidad de hacer Inserts a mano
sequelize
.sync()
.then(() => {
  console.log("User table created successfully!");
})
.catch((error) => {
  console.error("Unable to create table : ", error);
});

// Creación del servidor con express
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
// Parámetros en la URL: localhost:3030/nombre/Santy
app.get("/nombre/:nombre", (req, res) => {
  res.send(`Hola ${req.params.nombre}`);
})

// Query en la URL. Más sencillo para poner más de una variable
// localhost:3030/user?nombre=Iker
app.get("/user", (req, res) => {
  res.send(`Hola ${req.query.nombre}`);
})

// POST-> Insertar información
app.post("/register", async (req, res) => {
  const { mail, paswd } = req.body;
  
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
  
  // Si está registrado ya. No hacemos nada.
  if(user){
    res.send({newUserRegisted: false, text: `El email ya está registrado`});
    return
  }
  
  // En cambio, si el email no existe, creamos un usuario nuevo dentro de la BBDD
  await User.create({
    mail,
    paswd,
  });
  
  user = await User.findOne({
    where: {
      mail: mail
    }
  })
  res.send({newUserRegisted:true, user});
});

app.post("/login", async (req, res) => {
  const { mail, paswd } = req.body;
  
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

// Desde el frontend se hace un post a la url -> "/addCard", desde aquí gestionamos la respuesta de ese POST
app.post("/addCard", async (req, res) => {
  const { userId, title, message } = req.body;
  if(!userId || !title){
    res.send({
      error: true,
      text: "Faltan datos",
    });
    return
  }
  let user = await User.findOne({
    where: {
      id: userId,
    },
  });
  
  
  if (!user) {
    res.send({
      error: true,
      text: "El usuario no existe",
    });
    return;
  };
  
  await Cards.create({
    userId,
    title,
    message,
  });
  
  // Respuesta al frontend
  res.send({error: false, text: "OK"})
})

app.get("/getCards/:userId", async (req, res) => {
  const { userId } = req.params;
  if (!userId || isNaN(parseInt(userId))) {
    res.send({ error: true, text: "userId incorrecto" });
    return;
  }
  
  const cards = await Cards.findAll({
    where: {
      userId: userId
    }
  })
  res.send({error: false, data: cards})
})

// Borrar cartas
app.post("/deleteCard/:cardId", async (req, res) => {
  const { cardId } = req.params;
  if(!cardId || isNaN(parseInt(cardId))) {
    res.send({ error: true, text: "cardId incorrecto" });
    return;
  }
  
  await Cards.destroy({
    where: {
      id: cardId
    }
  })
  res.send({error: false, text: "OK"});
})

// Editar cartas
app.post("/editCard", async(req, res) => {
  const {cardId, newTitle, newMessage} = req.body
  if (!cardId || isNaN(parseInt(cardId))) {
    res.send({ error: true, text: "cardId incorrecto" });
    return;
  }
  await Cards.update(
    {
      title: newTitle,
      message: newMessage,
    },
    {
      where: {
        id: cardId
      }
    }
    )
    res.send({error:false, text: "OK"})
  })

// Borrar usuario
app.post("/deleteUser/:id", async (req, res) => {
  const { id } = req.params;
  if (!id || isNaN(parseInt(id))) {
    res.send({ error: true, text: "cardId incorrecto" });
    return;
  }
  await User.destroy({
    where: {
      id: id
    }
  })
  res.send({error: false, text: "User deleted"});
})