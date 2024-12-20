import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static("public"));

const USER_DATABASE = "./database/users.json";

let users = JSON.parse(fs.readFileSync(USER_DATABASE, "utf-8"));

app.get("/data", (req, res) => {
  fs.readFile(path.join("./database/", "data.json"), "utf8", (err, data) => {
    if (err) {
      console.error("Error occured during reading file:", err);
      res.status(500).send("Error occured during reading file.");
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post("/data", (req, res) => {
  const newData = req.body; // Új adatok, amiket a kérés küld

  // Az adatok mentése a data.json fájlba
  fs.writeFile(
    path.join("./database/", "data.json"),
    JSON.stringify(newData, null, 2),
    "utf8",
    (err) => {
      if (err) {
        console.error("An error occured during writeing file:", err);
        res.status(500).send("An error occured while saving data.");
      } else {
        res.status(200).send("Data succesfully changed.");
      }
    }
  );
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users/add", (req, res) => {
  const { email, password } = req.body;

  console.log("Received data:", req.body);

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const newUser = { id: users.length + 1, email, password };
  users.push(newUser);
  fs.writeFileSync(USER_DATABASE, JSON.stringify(users, null, 2), "utf-8");

  res.status(201).json(newUser);
  console.log(`Successfully registered new user: ${email}`);
});

app.post("/users/login", (req, res) => {
  const { email, password } = req.body;
  let users = JSON.parse(fs.readFileSync(USER_DATABASE, "utf-8"));
  console.log("Received data:", req.body);
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ id: user.id });
});

app.listen(port, () => {
  console.log(`Runs on: http://localhost:${port}`);
});
