import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors)
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