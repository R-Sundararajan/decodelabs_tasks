const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

function readUsers() {
    return JSON.parse(fs.readFileSync("users.json"));
}

function writeUsers(users) {
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
}

app.get("/users", (req, res) => {
    res.json(readUsers());
});

app.get("/users/:id", (req, res) => {
    const users = readUsers();
    const user = users.find(u => u.id == req.params.id);

    if (!user)
        return res.status(404).json({ message: "User not found" });

    res.json(user);
});

app.post("/users", (req, res) => {
    const users = readUsers();

    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name: req.body.name,
        email: req.body.email
    };

    users.push(newUser);
    writeUsers(users);

    res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
    const users = readUsers();

    const index = users.findIndex(u => u.id == req.params.id);

    if (index === -1)
        return res.status(404).json({ message: "User not found" });

    users[index].name = req.body.name;
    users[index].email = req.body.email;

    writeUsers(users);

    res.json(users[index]);
});

app.delete("/users/:id", (req, res) => {
    const users = readUsers();

    const index = users.findIndex(u => u.id == req.params.id);

    if (index === -1)
        return res.status(404).json({ message: "User not found" });

    users.splice(index, 1);
    writeUsers(users);

    res.json({ message: "User deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});