
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));

const middlewares = jsonServer.defaults({
  static: __dirname
});

const port = Number(process.env.PORT) || 3000;

// Serve frontend files and enable default middleware
server.use(middlewares);

// Parse JSON request bodies
server.use(jsonServer.bodyParser);

// API routes
server.use(router);

// Start server
server.listen(port, '0.0.0.0', () => {
  console.log(`Movie Management System listening on port ${port}`);
});
