import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import hbs from "express-handlebars";
import session from "express-session";
import flash from "express-flash";

import routes from "./routes/routes.js";

const app = express();
dotenv.config();

app.use(session({
  secret: 'alx',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

// app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: false }));
app.use(cors());

app.use("/public", express.static("public"));

app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.use("/", routes);

const connectionURL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is up on port http://localhost:${PORT}`))
  )
  .catch((error) => console.log(error.message));
