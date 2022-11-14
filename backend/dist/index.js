"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3030;
app.use(cors_1.default);
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
