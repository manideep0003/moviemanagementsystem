const jsonServer = require("json-server");
const express = require("express");
const path = require("path");

const server = jsonServer.create();

const router = jsonServer.router(
    path.join(__dirname, "db.json")
);

// Homepage
server.get("/", (req, res) => {
    res.redirect("/login.html");
});

// Login and details pages
server.use(
    express.static(path.join(__dirname, "views"))
);

// Serve the main movie page from the project root
server.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Serve CSS
server.use(
    "/CSS",
    express.static(path.join(__dirname, "CSS"))
);

// Serve JavaScript
server.use(
    "/js",
    express.static(path.join(__dirname, "js"))
);

// Serve assets
server.use(
    "/assets",
    express.static(path.join(__dirname, "assets"))
);

// JSON Server API
server.use(router);

const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Movie Management System running on port ${PORT}`);
});